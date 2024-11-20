import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Message {
  title: string;
  content: string;
  registerbutton: string;
}

@Component({
  selector: 'app-alert-single',
  templateUrl: './alert-single.component.html',
  styleUrl: './alert-single.component.scss'
})

export class AlertSingleComponent {
  constructor(public dialogRef: MatDialogRef<AlertSingleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Message) {}

  closeDialog(bool: boolean) {
    this.dialogRef.close(bool);
  }
}
