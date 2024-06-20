import { Component, OnInit } from '@angular/core';
import { ProductoInsumo } from '../models/producto-insumo';
import { InsumosService } from '../Services/insumos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosServicesService } from '../Services/productos-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/producto';
import { Insumo } from '../models/insumo';

@Component({
  selector: 'app-insumos-producto',
  templateUrl: './insumos-producto.component.html',
  styleUrl: './insumos-producto.component.css'
})
export class InsumosProductoComponent implements OnInit {
  displayedColumns: string[] = ['insumo', 'cantidad','actions'];

  productoId: number = 0;

  insumoProducto: any[] = [];

  resultado: any[] = [];

  constructor(private insumosServices: InsumosService, 
    private productosService:ProductosServicesService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoId = params['id'];
      this.productosService.getProductoById(this.productoId).subscribe({
        next: (data: Producto) => {
          this.insumoProducto = data.insumos;
        },
        error: (error) => {
          console.log(error);
          this.snackbar.open('Error al obtener producto', 'Cerrar', 
            {duration: 3000}
          )
        }
      })
    });

    this.insumosServices.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        this.resultado = this.insumoProducto.map(ip => {
          const insumo = data.find(i => i.id == ip.id);
          if (insumo) {
            return {
              ...insumo,
              cantidad: ip.cantidad
            };
          }
          return null;
        })
        console.log(this.resultado);
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar los insumos del producto', 'Cerrar',
          {duration: 3000}
        )
      }
    })

  }


  deleteInsumo(insumoId: number) {
    this.productosService.deleteInsumoFromProducto(this.productoId, insumoId).subscribe({
      next: (data) => {
        const insumoIndex = this.resultado.findIndex(r => r.id === insumoId);

        if (insumoIndex !== -1) {
          this.resultado.splice(insumoIndex, 1);

          this.resultado = this.resultado.slice();
        }
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al eliminar insumo', 'Cerrar', 
          {duration: 3000}
        )
      }
    })
  }

  addInsumo() {
    this.router.navigate(['/addInsumoProducto', this.productoId]);
  }
}
