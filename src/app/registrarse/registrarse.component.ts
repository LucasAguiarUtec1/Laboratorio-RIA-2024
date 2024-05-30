import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LabBackendService } from '../services/lab-backend.service';
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
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required)
  });

  constructor(private labBackendService: LabBackendService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const nuevoUsuario: Usuario = this.registerForm.value;
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
          this.router.navigate(['/iniciarSesion']);
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
