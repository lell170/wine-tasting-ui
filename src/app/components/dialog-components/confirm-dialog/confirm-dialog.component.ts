import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title = 'Wein Löschen';
  message = 'Möchten Sie wirklich löschen?';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onDismiss(): void {
    this.data.dataKey.next(false);
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.data.dataKey.next(true);
    this.dialogRef.close();
  }
}
