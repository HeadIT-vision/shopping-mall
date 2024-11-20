import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Message {
  title: string;
  content: string;
  registerbutton: string;
  deletebutton: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Message) {}

  closeDialog(bool: boolean) {
    this.dialogRef.close(bool);
  }
}
