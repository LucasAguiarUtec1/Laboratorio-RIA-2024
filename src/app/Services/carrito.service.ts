import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosEnCarrito: any[] = [];

  constructor() { }

  agregarProducto(producto: any) {
    this.productosEnCarrito.push(producto);
  }

  obtenerProductos() {
    return this.productosEnCarrito.map(producto => ({
      ...producto,
      cantidad: 1 // agregar la propiedad cantidad
    }));
  }
}