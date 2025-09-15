import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-create-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon color="primary">check_circle</mat-icon>
      Blog Created
    </h2>
    <div mat-dialog-content>
      <p>"{{ data.title }}" was created successfully.</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="close('new')">
        <mat-icon>note_add</mat-icon>
        Create Another
      </button>
      <button mat-raised-button color="primary" (click)="close('go')">
        <mat-icon>list</mat-icon>
        Go to Blogs
      </button>
    </div>
  `,
})
export class BlogCreateSuccessDialog {
  constructor(
    private ref: MatDialogRef<BlogCreateSuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
  ) {}

  close(action: 'go' | 'new') {
    this.ref.close(action);
  }
}
