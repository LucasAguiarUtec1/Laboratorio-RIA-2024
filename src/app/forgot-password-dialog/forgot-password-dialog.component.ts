import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LabBackendService } from '../Services/lab-backend.service';
import { AuthService } from '../Services/auth-service.service';
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
              private authService: AuthService) { }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.labBackendService.olvioContrasena(email).subscribe({  
        next: (data) => {
          console.log('Se envio correctamente', data);
        },
        error: (error) => {
          console.error('Error al enviar el mail', error);
        }
      });
    }
  }
}
