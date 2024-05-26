import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LabBackendService } from '../services/lab-backend.service';
import { Usuario } from '../models/usuario';

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

  constructor(private labBackendService: LabBackendService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const nuevoUsuario: Usuario = this.registerForm.value;
      this.labBackendService.registerUser(nuevoUsuario.email, nuevoUsuario.contraseña, nuevoUsuario.role, nuevoUsuario.telefono).subscribe({  
        next: (data) => {
          console.log('Usuario registrado exitosamente', data);
        },
        error: (error) => {
          console.error('Error al registrar el usuario', error);
        }
      });
    }
  }
}
