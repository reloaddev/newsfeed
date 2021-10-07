import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-post-delete-dialog',
  templateUrl: './post-delete-dialog.component.html',
  styleUrls: ['./post-delete-dialog.component.css']
})
export class PostDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<PostDeleteDialogComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }

}
