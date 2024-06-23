import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rango-fecha-dialog',
  templateUrl: './rango-fecha-dialog.component.html',
  styleUrls: ['./rango-fecha-dialog.component.css']
})
export class RangoFechaDialogComponent {
  fechaInicio: Date;
  fechaFin: Date | null; 
  fechaFinFilter: (d: Date | null) => boolean;

  constructor(
    public dialogRef: MatDialogRef<RangoFechaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fechaInicio = data.fechaInicio;
    this.fechaFin = data.fechaFin;
    this.fechaFinFilter = this.filtrarFechaFin.bind(this);
  }

  cerrar(): void {
    this.dialogRef.close({ fechaInicio: this.fechaInicio, fechaFin: this.fechaFin });
  }

  onFechaInicioChange(fecha: Date): void {
    this.fechaInicio = fecha;
    // Trigger change detection for the date filter
    this.fechaFinFilter = this.filtrarFechaFin.bind(this);
    // Optionally reset fechaFin if it's now invalid
    if (this.fechaFin && this.fechaFin < this.fechaInicio) {
      this.fechaFin = null;
    }
  }

  filtrarFechaFin(d: Date | null): boolean {
    if (!d || !this.fechaInicio) {
      return true;
    }
    return d >= this.fechaInicio;
  }
}
