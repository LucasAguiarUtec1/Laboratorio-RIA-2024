import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entregado-confirm-dialog',
  template: `
    <h2 mat-dialog-title>¿Seguro que deseas modificar a entregado?</h2>
    <div mat-dialog-content>
      Una vez entregado, no se podrá modificar más.
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Aceptar</button>
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
    </div>
  `,
})
export class EntregadoDialogComponent {
  constructor(public dialogRef: MatDialogRef<EntregadoDialogComponent>) {}
}