import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosServicesService } from '../services/productos-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {

  editProducto: FormGroup;
  imageString: string | ArrayBuffer | null = '';

  constructor(private productosService: ProductosServicesService, 
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public modal: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.editProducto = this.fb.group({
        nombre: [data.nombre, Validators.required],
        descripcion: [data.descripcion, Validators.required],
        imagen: [data.imagen, Validators.required],
        precio: [data.precio, Validators.required]
      })
    }

    onSubmit() {
      if(this.editProducto.valid) {
        console.log('ID: ' + this.data.id);
        console.log('Form Values: ' + this.editProducto.value.nombre);
        const producto: Producto =  this.editProducto.value;
        producto.id = this.data.id;
        this.productosService.editProducto(producto).subscribe({
          next: (value) => {
              this.modal.close();
              this.snackbar.open('Producto Editado', 'Cerrar', 
                {duration: 3000}
              );
          },
          error: (error) => {
            console.log(error);
            this.snackbar.open('Error al Editar Producto', 'Cerrar', 
                {duration: 3000}
              );
          }
        });
      }
    }
  
    onNoClick(): void {
      this.modal.close();
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
      console.log('imagen' + this.imageString);
      this.editProducto.patchValue({imagen: this.imageString});
    }

}
