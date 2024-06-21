import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductosServicesService } from '../Services/productos-services.service';
import { Producto } from '../models/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productosService: ProductosServicesService, 
    private snackbar: MatSnackBar,
    public modal: MatDialog,
    private router: Router,
  ){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  productos: Producto[] = [];
  dataSource!: MatTableDataSource<Producto>;
  filtroNombre: string = ''; 

  displayedColumns: string[] = ['nombre', 'descripcion', 'imagen', 'precio', 'actions'];

  getProductos() {
    this.productosService.getProductos().subscribe({
      next: (data: Producto[]) => {
          this.productos = data;
          this.dataSource = new MatTableDataSource<Producto>(this.productos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = this.customFilterPredicate();
          console.log(this.productos);
      },
      error: (error) => {
          console.error(error);
          this.snackbar.open('Error al cargar los productos', 'Cerrar', 
            {duration: 3000}
          );
      }
    });
  }

  openEditModal(producto: any, prodId: number): void {
    const modal = this.modal.open(EditarProductoComponent, {
      width: '300px',
      data: producto
    });
  }

  eliminarProducto(id: number) {
    this.productosService.deleteProducto(id).subscribe({
      next: (data) => {
        const deletedProducto = data[0];
        const deletedProductoIndex = this.productos.findIndex(p => p.id == deletedProducto.id);
        this.productos.splice(deletedProductoIndex, 1);
        this.productos = [...this.productos];
        this.snackbar.open('Producto Eliminado', 'Cerrar',
          {duration: 3000}
        );
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al eliminar producto', 'Cerrar',
          {duration: 3000}
        );
      }
    })
  }

customFilterPredicate(): (data: Producto, filter: string) => boolean {
  const filterFunction = (data: Producto, filter: string): boolean => {
    return data.nombre.toLowerCase().includes(filter.toLowerCase());
  };
  return filterFunction;
}


  ngOnInit(): void {
    this.getProductos();
    console.log(this.productos);
  }

  applyFilter() {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = this.filtroNombre.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Volver a la primera página al aplicar un filtro
    }
  }

  verInsumoProducto(id: number) {
    this.router.navigate(['/insumoProducto', id]);
  }
}
