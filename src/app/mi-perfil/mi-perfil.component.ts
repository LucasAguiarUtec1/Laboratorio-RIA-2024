import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabBackendService } from '../Services/lab-backend.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  edit: boolean = false;
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private snackbar: MatSnackBar,
    private labService: LabBackendService
  ) {
    // Inicializar el formulario en el constructor
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Inicializar el formulario con valores del AuthService
    this.loginForm.setValue({
      email: this.authService.nombre || '',
      telefono: this.authService.telefono || ''
    });
  }

  editProfile() {
    this.edit = true;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const newEmail = this.loginForm.get('email')?.value;
      const telefono = this.loginForm.get('telefono')?.value;
      if (this.authService.nombre !== null) {
        this.labService.updateUser(this.authService.nombre, newEmail, telefono).subscribe({
          next: (data) => {
            console.log('Perfil actualizado', data);
            this.snackbar.open('Perfil actualizado', 'Cerrar', {
              duration: 2000
            });
            // Actualizar valores en AuthService y en la vista
            if (data) {
              this.authService.nombre = newEmail; // Actualizar el nombre con el nuevo email
              this.authService.telefono = telefono;
              this.ngOnInit(); // Volver a inicializar los valores del formulario
            }
            this.edit = false;
          },
          error: (error) => {
            console.error('Error al actualizar perfil', error);
            this.snackbar.open('Error al actualizar perfil', 'Cerrar', {
              duration: 2000
            });
          }
        });
      }
    }
  }
}
