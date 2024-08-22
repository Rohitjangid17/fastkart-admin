import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
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
    private _activatedRoute: ActivatedRoute
  ) {
    this.addCategoryForm = this._formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this.getCategory();
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

  // get single category
  getCategory = () => {
    this.categoryId = this._activatedRoute.snapshot.params["id"];

    if (this.categoryId) {
      this.isCategoryEdit = true;
      this._categoryService.getCategoryById(this.categoryId).subscribe((category: Category) => {
        console.log(category);
        this.addCategoryForm.patchValue(category);
      }, (error) => {
        console.log(error);
      });
    }
  }

  // update category
  updateCategoryById = () => {
    const category: Category = {
      title: this.addCategoryForm.get("title")?.value,
      description: this.addCategoryForm.get("description")?.value,
      image: this.image,
    }

    this._categoryService.updateCategoryById("2", category).subscribe(category => {
      this._dialogRef.close(category);
      this._changeDetectorRef.detectChanges();
      this._toastrService.success("Category updated successfully");
    })
  }
}