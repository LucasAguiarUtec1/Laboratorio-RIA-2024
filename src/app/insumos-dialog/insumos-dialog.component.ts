import { Component, Inject } from '@angular/core';
import { InsumosService } from '../Services/insumos.service';
import { Insumo } from '../models/insumo'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-insumos-dialog',
  templateUrl: './insumos-dialog.component.html',
  styleUrl: './insumos-dialog.component.css'
})
export class InsumosDialogComponent {
  insumos: Insumo[] = [];

  constructor(
    private insumosService: InsumosService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ){}

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
    const insumo = this.insumos.find(i => i.id === id);
    return insumo ? insumo.nombre : '';
  }

  getInsumoUnidad(id: number): string {
    const insumo = this.insumos.find(i => i.id === id);
    return insumo ? insumo.unidad : '';
  }
}
