import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-new-category-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './add-new-category-dialog.component.html',
  styleUrl: './add-new-category-dialog.component.scss'
})
export class AddNewCategoryDialogComponent {
  constructor(
    public _dialogRef: MatDialogRef<AddNewCategoryDialogComponent>
  ) { }

  // add category dialog close
  addCategoryDialogClose = () => {
    console.log("save category button click!!!");
    return this._dialogRef.close();
  }

  // 
  onSave = () => {
    return this._dialogRef.close();
  }

  removeCollectionImage = () => {

  }

  compressImage = () => {

  }
}
