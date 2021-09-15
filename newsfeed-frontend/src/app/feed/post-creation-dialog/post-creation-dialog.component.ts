import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-post-creation-dialog',
  templateUrl: './post-creation-dialog.component.html',
  styleUrls: ['./post-creation-dialog.component.css']
})
export class PostCreationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PostCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public post: string
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
