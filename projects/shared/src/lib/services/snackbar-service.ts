import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly snackBar = inject(MatSnackBar);

  public success(message: string, duration?: number): void {
    this.show(message, 'success-snackbar', duration);
  }

  public error(message: string, duration?: number): void {
    this.show(message, 'error-snackbar', duration);
  }

  public warning(message: string, duration?: number): void {
    this.show(message, 'warning-snackbar', duration);
  }

  public info(message: string, duration?: number): void {
    this.show(message, 'info-snackbar', duration);
  }

  private show(message: string, panelClass: string, duration: number = 3000): void {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    };

    this.snackBar.open(message, 'Close', config);
  }
}