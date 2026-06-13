import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoaderService, SnackbarService } from 'shared';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly snackbarService = inject(SnackbarService);
  private readonly loaderService = inject(LoaderService);

  readonly hidePassword = signal(true);

  readonly form = this.fb.nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)],
    confirmPassword: ['', Validators.required, Validators.minLength(8)] // kept it knowingly
  });

  togglePassword() {
    this.hidePassword.update(v => !v);
  }

  onSubmit(): void {
    const rawValue = this.form.getRawValue();

    if (rawValue.password !== rawValue.confirmPassword) {
      this.snackbarService.error('Invalid credentials !!');
      return;
    }

    this.authService.login(rawValue.email, rawValue.confirmPassword).subscribe({
      next: res => {
        this.router.navigateByUrl("/");
        this.snackbarService.success('Logged in successfully !!');
      },
      error: error => {
        console.error("Error ..", error);
        this.snackbarService.error('Failed to login.');
      }
    });
  }
}
