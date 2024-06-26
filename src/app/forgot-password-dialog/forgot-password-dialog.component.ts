import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LabBackendService } from '../Services/lab-backend.service';
import { AuthService } from '../Services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrl: './forgot-password-dialog.component.css'
})
export class ForgotPasswordDialogComponent {
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private labBackendService: LabBackendService,
              private authService: AuthService,
              private snackbar: MatSnackBar) { }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.labBackendService.olvioContrasena(email).subscribe({  
        next: (data) => {
          console.log('Se envio correctamente', data);
          this.forgotPasswordForm.reset();
          this.snackbar.open('Se envio el mail para cambiar su contraseña', 'Cerrar', 
            {duration: 3000}
          )
        },
        error: (error) => {
          console.error('Error al enviar el mail', error);
        }
      });
    }
  }
}
