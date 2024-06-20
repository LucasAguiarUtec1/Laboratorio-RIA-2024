import { Component, OnInit } from '@angular/core';
import { InsumosService } from '../Services/insumos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nuevo-insumo',
  templateUrl: './nuevo-insumo.component.html',
  styleUrl: './nuevo-insumo.component.css'
})
export class NuevoInsumoComponent implements OnInit {
 
  insumosForm: FormGroup;

  constructor (private fb: FormBuilder,
    private insumosService: InsumosService,
    private snackbar: MatSnackBar
  )
  {
    this.insumosForm = this.fb.group({
      nombre: ['', Validators.required],
      unidad: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.insumosForm.valid) {
      const nuevoInsumo = this.insumosForm.value;
      this.insumosService.createInsumo(nuevoInsumo).subscribe({
        next: (next) => {
          this.snackbar.open('Insumo Creado!', 'Cerrar',
            {duration: 3000}
          )
          this.insumosForm.reset();
        },
        error: (error) => {
          console.log(error);
          this.snackbar.open('Error al crear insumo', 'Cerrar' ,
            {duration: 3000}
          )
        }
      })
    }
  }
 
  ngOnInit(): void {
  }

}
