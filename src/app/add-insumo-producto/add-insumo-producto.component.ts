import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Insumo } from '../models/insumo';
import { Producto } from '../models/producto';
import { InsumosService } from '../Services/insumos.service';
import { ProductosServicesService } from '../Services/productos-services.service';

@Component({
  selector: 'app-add-insumo-producto',
  templateUrl: './add-insumo-producto.component.html',
  styleUrls: ['./add-insumo-producto.component.css']
})
export class AddInsumoProductoComponent implements OnInit {
  productoId: number = 0;
  insumoProducto: any[] = [];
  insumos: Insumo[] = [];
  resultado: Insumo[] = [];
  selectedInsumo: Insumo | null = null;
  cantidad: number = 0;

  constructor(private productosService: ProductosServicesService,
              private insumosService: InsumosService,
              private snackbar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoId = params['id'];
    });

    this.productosService.getProductoById(this.productoId).subscribe({
      next: (data: Producto) => {
        this.insumoProducto = data.insumos;
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar insumos de producto', 'Cerrar', { duration: 3000 });
      }
    });

    this.insumosService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        this.resultado = data.filter(insumo =>
          !this.insumoProducto.some(ip => ip.id === insumo.id)
        );
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar los insumos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  agregarInsumo() {
    if (!this.selectedInsumo || this.cantidad <= 0) {
      this.snackbar.open('Selecciona un insumo y especifica la cantidad', 'Cerrar', { duration: 3000 });
      return;
    }

    const nuevoInsumo = {
      insumoId: this.selectedInsumo.id,
      cantidad: this.cantidad
    };

    /*this.productosService.agregarInsumoAProducto(this.productoId, nuevoInsumo).subscribe({
      next: (data) => {
        this.snackbar.open('Insumo agregado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/ruta-del-producto']); // Redirige a la página del producto después de agregar
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al agregar insumo', 'Cerrar', { duration: 3000 });
      }
    });*/
  }
}
