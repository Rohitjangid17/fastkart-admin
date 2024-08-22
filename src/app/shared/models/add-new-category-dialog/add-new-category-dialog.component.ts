import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomImageCompressService } from '../../services/custom-image-compress.service';
import { CategoriesService } from '../../../modules/admin/categories/categories.service';
import { Category } from '../../interfaces/common.type';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-category-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    ToastrModule
  ],
  templateUrl: './add-new-category-dialog.component.html',
  styleUrl: './add-new-category-dialog.component.scss'
})
export class AddNewCategoryDialogComponent implements OnInit {
  addCategoryForm!: FormGroup;
  image: string = "";
  categoryId: string = "";
  isCategoryEdit: boolean = false;

  constructor(
    public _dialogRef: MatDialogRef<AddNewCategoryDialogComponent>,
    private _formBuilder: FormBuilder,
    private customImageCompressService: CustomImageCompressService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _categoryService: CategoriesService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: string }
  ) {
    this.addCategoryForm = this._formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    if (this.data.categoryId) {
      this.isCategoryEdit = true;
      this.getCategory();
    }
  }

  // get single category
  getCategory = () => {
    this._categoryService.getCategoryById(this.data.categoryId).subscribe((category: Category) => {
      this.addCategoryForm.patchValue(category);
      this.image = category.image || '';
    }, (error) => {
      console.log(error);
    });
  }

  // add category dialog close
  addCategoryDialogClose = () => {
    console.log("save category button click!!!");
    return this._dialogRef.close();
  }

  // Save category
  onSave = () => {
    const category: Category = {
      title: this.addCategoryForm.get("title")?.value,
      description: this.addCategoryForm.get("description")?.value,
      image: this.image,
    }

    // Send category data to the server
    this._categoryService.createNewCategory(category).subscribe({
      next: () => {
        this._dialogRef.close(category);
        this._changeDetectorRef.detectChanges();
        this._toastrService.success('Category added successfully!', 'Success');
      },
      error: (error: any) => {
        console.error('Error adding category:', error.message);
      }
    });
  }

  // Remove image
  removeCollectionImage = () => {
    this.image = "";
    this._changeDetectorRef.detectChanges();
  }

  // Compress image
  compressImage = () => {
    this.customImageCompressService.compressFile()
      .then((uploadResponse) => {
        this.image = uploadResponse.image;
        this._changeDetectorRef.detectChanges();
      })
      .catch(error => {
        console.error('Error compressing image:', error.message);
      });
  }

  // update category
  updateCategoryById = () => {
    const category: Category = {
      title: this.addCategoryForm.get("title")?.value,
      description: this.addCategoryForm.get("description")?.value,
      image: this.image,
    }

    this._categoryService.updateCategoryById(this.data.categoryId, category).subscribe((updatedCategory: Category) => {
      this._dialogRef.close(updatedCategory);
      this._toastrService.success('Category updated successfully!', 'Success');
    }, (error) => {
      console.error('Error updating category:', error.message);
    });
  }
}