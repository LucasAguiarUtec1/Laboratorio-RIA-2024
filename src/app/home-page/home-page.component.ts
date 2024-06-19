import { Component, OnInit } from '@angular/core';
import { ProductosServicesService } from '../Services/productos-services.service'; // Asegúrate de importar correctamente el servicio
import { Producto } from '../models/producto'; // Importa el modelo Producto
import { CarritoService } from '../Services/carrito.service'; // Importa el servicio CarritoService

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  productos: Producto[] = []; 

  constructor(private productosService: ProductosServicesService,
    private carritoService: CarritoService
  ) { } 

  ngOnInit() {
    this.cargarProductos(); 
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos; 
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }

  toggleDescripcion(producto: any) {
    producto.mostrarDescripcionCompleta = !producto.mostrarDescripcionCompleta;
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
  }
}