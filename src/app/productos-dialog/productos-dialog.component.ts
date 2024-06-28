import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Services/auth-service.service';
import { InsumosService } from '../Services/insumos.service';
import { Insumo } from '../models/insumo'; // Asegúrate de importar el modelo de Insumo si es necesario
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productos-dialog',
  templateUrl: './productos-dialog.component.html',
})
export class ProductosDialogComponent implements OnInit {
  insumos: Insumo[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { productos: any[] },
    public authService: AuthService,
    private insumosService: InsumosService,
    private snackbar: MatSnackBar, 
  ) {}

  ngOnInit(): void {
    this.cargarInsumos();
  }

  cargarInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        this.insumos = data;
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar insumos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  getInsumoNombre(id: number): string {
    const insumo = this.insumos.find(i => i.id == id);
    return insumo ? insumo.nombre : '';
  }

  getInsumoUnidad(id: number): string {
    const insumo = this.insumos.find(i => i.id == id);
    return insumo ? insumo.unidad : '';
  }
}
