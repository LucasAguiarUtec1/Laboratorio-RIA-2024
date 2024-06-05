import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LabBackendService } from '../Services/lab-backend.service';
import { AuthService } from '../Services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private labBackendService: LabBackendService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  openForgotPasswordDialog() {
    this.dialog.open(ForgotPasswordDialogComponent, {
      width: '500px'
    });
  }

  ngOnInit() {
      this.loginForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', Validators.required),
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.labBackendService.loginUser(email, password).subscribe({  
        next: (data) => {
          console.log('Se inicio sesion exitosamente', data);
          this.authService.setToken(data.token!);
          this.authService.setLoggedIn(true, data.role, data.nombre);
        },
        error: (error) => {
          console.error('Error al iniciar sesion', error);
        }
      });
    }
  }
}
