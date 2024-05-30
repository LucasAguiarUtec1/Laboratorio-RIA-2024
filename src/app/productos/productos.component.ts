import { Component } from '@angular/core';
import { ProductosServicesService } from '../services/productos-services.service';
import { Producto } from '../models/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {

  constructor(private productosService: ProductosServicesService, 
    private snackbar: MatSnackBar,
    public modal: MatDialog){}

  productos: Producto[] = [];

  displayedColumns: string[] = ['nombre', 'descripcion', 'imagen', 'precio', 'actions']
  getProductos() {
    this.productosService.getProductos().subscribe({
      next: (data: Producto[]) => {
          this.productos = data;
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
}
