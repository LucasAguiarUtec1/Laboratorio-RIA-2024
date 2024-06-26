import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LabBackendService } from '../Services/lab-backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  });

  private token: string | null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private labBackendService: LabBackendService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.labBackendService.resetPassword(this.token, newPassword).subscribe({
        next: (data) => {
          this.snackBar.open('Contraseña restablecida con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.snackBar.open('Error al restablecer la contraseña', 'Cerrar', {
            duration: 3000,
          });
        }
      });
    }
  }
}
