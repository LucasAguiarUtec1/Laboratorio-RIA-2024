import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LabBackendService } from '../Services/lab-backend.service';
import { AuthService } from '../Services/auth-service.service';
import { Usuario } from '../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('USER'), 
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]),
  });
  defaultRole = 'USER';

  constructor(private labBackendService: LabBackendService,
    private snackBar: MatSnackBar,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('USER', [Validators.required]), 
      telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const nuevoUsuario: Usuario = this.registerForm.value;
      if (!this.authService.isLoggedIn) {
        nuevoUsuario.role = 'USER';
      }
      this.labBackendService.registerUser(nuevoUsuario.nombre, nuevoUsuario.password, nuevoUsuario.role, nuevoUsuario.telefono).subscribe({  
        next: (data) => {
          console.log('Usuario registrado exitosamente', data);
          this.snackBar.open('Usuario registrado exitosamente', '', {
            duration: 2000, 
          });
          this.registerForm.reset();
          this.registerForm.markAsPristine();
          this.registerForm.markAsUntouched();
          Object.keys(this.registerForm.controls).forEach(key => {
            this.registerForm.get(key)?.setErrors(null);
          });
          if (!this.authService.role) {
            this.router.navigate(['/iniciarSesion']);
          }
        },
        error: (error) => {
          console.error('Error al registrar el usuario', error);
          this.snackBar.open('Error al registrar el usuario', 'Cerrar', 
              {duration: 3000}
            );
        }
      });
    }
  }
}
