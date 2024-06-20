import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsumosService } from '../Services/insumos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Insumo } from '../models/insumo';

@Component({
  selector: 'app-editar-insumo',
  templateUrl: './editar-insumo.component.html',
  styleUrl: './editar-insumo.component.css'
})
export class EditarInsumoComponent {
  editInsumo: FormGroup;

  constructor(private insumoService: InsumosService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public modal: MatDialogRef<EditarInsumoComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any,
  )
  {
    this.editInsumo = this.fb.group({
      nombre: [data.nombre, Validators.required],
      unidad: [data.unidad, Validators.required]
    })
  }

  onSubmit() {
    if (this.editInsumo.valid) {
      const insumo: Insumo = this.editInsumo.value;
      insumo.id = this.data.id;

      this.insumoService.editInsumo(insumo).subscribe({
        next: (value) => {
          this.modal.close();
          this.snackbar.open('Insumo Editado!', 'Cerrar', 
            {duration: 3000}
          );
        },
        error: (error) => {
          console.log(error);
          this.snackbar.open('Error al editar Insumo', 'Cerrar', 
            {duration: 3000}
          )
        }
      })
    }
  }

  onNoClick(): void {
    this.modal.close();
  }

  
}
