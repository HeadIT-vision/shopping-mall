import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface Message {
  message: string;
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  constructor(
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: Message,
    private router: Router) { }

  openSnackbar(message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message }
    });
  }

  closeSnackbar(bool: boolean) {
    this.snackBar.dismiss();
  }
}