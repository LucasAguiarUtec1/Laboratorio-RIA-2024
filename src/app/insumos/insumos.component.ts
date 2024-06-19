import { Component } from '@angular/core';
import { ProductosServicesService } from '../Services/productos-services.service';
import { Insumo } from '../models/insumo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css'
})
export class InsumosComponent {

  displayedColumns: string[] = ['nombre'];

  constructor(private productosService: ProductosServicesService, private snackbar: MatSnackBar) {}

  insumos: Insumo[] = [];

  getInsumos(): void {
    this.productosService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
          this.insumos = data;
          this.snackbar.open('Insumos Cargados', 'Cerrar' ,
            {duration: 3000}
          );
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar insumos', 'Cerrar',
           {duration: 3000}
        );
      }
    })
  }

  ngOnInit(): void {
    this.getInsumos();
  }
}
