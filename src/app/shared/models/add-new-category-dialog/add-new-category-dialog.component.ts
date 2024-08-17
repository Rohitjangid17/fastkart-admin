import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-category-dialog',
  standalone: true,
  imports: [],
  templateUrl: './add-new-category-dialog.component.html',
  styleUrl: './add-new-category-dialog.component.scss'
})
export class AddNewCategoryDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddNewCategoryDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Save logic here
    this.dialogRef.close();
  }
}
