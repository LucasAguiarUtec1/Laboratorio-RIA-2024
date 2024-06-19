import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CarritoService } from '../Services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productosEnCarrito: any[] = [];
  carritoForm: FormGroup;
  totalPrecio: number = 0;

  constructor(private carritoService: CarritoService, private fb: FormBuilder) {
    this.carritoForm = this.fb.group({
      productos: this.fb.array([])
    });
  }

  ngOnInit() {
    this.productosEnCarrito = this.carritoService.obtenerProductos();
    this.setProductos();
    this.calcularTotal();
  }

  get productos() {
    return this.carritoForm.get('productos') as FormArray;
  }

  setProductos() {
    this.productosEnCarrito.forEach(producto => {
      this.productos.push(this.fb.group({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad
      }));
    });
    this.productos.valueChanges.subscribe(() => this.calcularTotal());
  }

  calcularTotal() {
    this.totalPrecio = this.productos.value.reduce((acc: number, producto: any) => acc + producto.precio * producto.cantidad, 0);
  }
}
