import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-productos-dialog',
  templateUrl: './productos-dialog.component.html',
})
export class ProductosDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { productos: any[] }) {}
}
