import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../models/producto';
import { ProductosServicesService } from '../Services/productos-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent implements OnInit {

  productosForm: FormGroup;
  submitted = false;
  imageString: string | ArrayBuffer | null = '';

  constructor(private fb: FormBuilder, 
    private productosService: ProductosServicesService, 
    private snackbar: MatSnackBar,
    private router: Router){
    this.productosForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      imagen: [null, Validators.required],
      precio: [0, Validators.required]
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoaded.bind(this)
      reader.readAsDataURL(file);
      
    }
  }

  handlerReaderLoaded(event: any): void {
    this.imageString = event.target.result;
    this.productosForm.patchValue({imagen: this.imageString});
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.productosForm.valid) {
      const nuevoProducto = this.productosForm.value;
      this.productosService.createProducto(nuevoProducto).subscribe({
        next: (next) => {
          console.log(next);
          this.snackbar.open('Productos Creado!', 'Cerrar',
            {duration: 3000}
          );
          this.productosForm.reset();
          this.router.navigate(['/productos']);
        },
        error: (error) => {
            console.log(error);
            this.snackbar.open('Error al crear Producto', 'Cerrar', 
              {duration: 3000}
            );
        },
      })
    }
  }

  ngOnInit(): void {
    console.log('coso');
  }

}
