import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CarritoService } from '../Services/carrito.service';
import { PedidosServiceService } from '../Services/pedidos-service.service';
import { AuthService } from '../Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productosEnCarrito: any[] = [];
  carritoForm: FormGroup;
  totalPrecio: number = 0;
  productosCount: number = 0;
  minDate: Date = new Date();

  constructor(private carritoService: CarritoService, 
    private fb: FormBuilder, 
    private PedidosService: PedidosServiceService, 
    private authService: AuthService,
    private router: Router) {
    this.carritoForm = this.fb.group({
      productos: this.fb.array([]),
      fechaEntrega: [''],

    });
    this.minDate.setDate(this.minDate.getDate() + 1);
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
        cantidad: [producto.cantidad, [Validators.required, Validators.min(1)]]
      }));
    });
    this.productos.valueChanges.subscribe(() => {
      this.calcularTotal();
      this.productosCount = this.productos.length;
    });
  }

  calcularTotal() {
    this.totalPrecio = this.productos.value.reduce((acc: number, producto: any) => acc + producto.precio * producto.cantidad, 0);
  }

  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
    this.productos.removeAt(index);
    this.calcularTotal(); 
    this.productosCount = this.productos.length;
  }

  confirmarPedido() {
    if (this.carritoForm.valid) {
      const pedido = this.carritoForm.value;
      pedido.productosPedido = pedido.productos;
      delete pedido.productos;
      pedido.precioTotal = this.totalPrecio;
      pedido.email = this.authService.nombre;
        this.PedidosService.agregarPedido(pedido).subscribe({
        next: (respuesta) => {
          // Maneja la respuesta del servidor
          console.log('Pedido enviado con éxito', respuesta);
          this.carritoService.vaciarCarrito();
          this.productosEnCarrito = [];
          this.productos.clear();
          this.totalPrecio = 0;
          this.productosCount = 0;
          this.router.navigate(['/pedidos']);


        },
        error: (error) => {
          // Maneja el error
          console.error('Error al enviar el pedido', error);
        }
      });
    }
  }
}
