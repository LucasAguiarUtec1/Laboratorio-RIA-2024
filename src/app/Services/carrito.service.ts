import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosEnCarrito: any[] = [];
  private productosCountSubject = new BehaviorSubject<number>(0);
  productosCount$ = this.productosCountSubject.asObservable();

  agregarProducto(producto: any) {
    const productoExistente = this.productosEnCarrito.find(p => p.nombre === producto.nombre);

    if (!productoExistente) {
      // Si el producto no está en el carrito, lo agrega
      this.productosEnCarrito.push(producto);
      console.log('Producto agregado al carrito:', producto.nombre);
    } else {
      // Aquí puedes decidir qué hacer si el producto ya está en el carrito.
      // Por ejemplo, podrías incrementar la cantidad del producto existente.
      console.log('El producto ya está en el carrito:', producto.nombre);
    }

    this.actualizarCuentaProductos();
  }

  obtenerProductos() {
    return this.productosEnCarrito.map(producto => ({
      ...producto,
      cantidad: 1 // agregar la propiedad cantidad
    }));
  }

  eliminarProducto(index: number) {
    this.productosEnCarrito.splice(index, 1);
    this.actualizarCuentaProductos();
  }

  actualizarCuentaProductos() {
    this.productosCountSubject.next(this.productosEnCarrito.length);
  }
}