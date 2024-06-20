import { Component } from '@angular/core';
import { ProductosServicesService } from '../Services/productos-services.service';
import { Producto } from '../models/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {

  constructor(private productosService: ProductosServicesService, 
    private snackbar: MatSnackBar,
    public modal: MatDialog,
    private router: Router,
  ){} // Elimina la inyección de dependencia del pipe

  productos: Producto[] = [];
  filtroNombre: string = ''; // Agrega el filtro de nombre

  displayedColumns: string[] = ['nombre', 'descripcion', 'imagen', 'precio', 'actions'];

  getProductos() {
    this.productosService.getProductos().subscribe({
      next: (data: Producto[]) => {
          this.productos = data;
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

  ngOnInit(): void {
    this.getProductos();
    console.log(this.productos);
  }

  filtrarProductos(productos: Producto[], filtroNombre: string): Producto[] {
    if (!filtroNombre) {
      return productos;
    }
    return productos.filter(producto => 
      producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    );
  }

  verInsumoProducto(id: number) {
    this.router.navigate(['/insumoProducto', id]);
  }
}
