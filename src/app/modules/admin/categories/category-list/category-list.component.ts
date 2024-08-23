import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../../../../shared/interfaces/common.type';
import { PageHeaderComponent } from '../../../../shared/component/page-header/page-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TitleService } from '../../../../shared/services/title.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddNewCategoryDialogComponent } from '../../../../shared/models/add-new-category-dialog/add-new-category-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatFormFieldModule,
    MatIconModule,
    NgClass,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    NgIf,
    NgFor,
    MatMenuModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  pageTitle: string = "Category";
  isHeaderAction: boolean = true;
  isListview: boolean = true;
  categoryList: Category[] = [];

  constructor(
    private _titleService: TitleService,
    private _categoriesService: CategoriesService,
    public dialog: MatDialog,
    public _changedetectorRef: ChangeDetectorRef,
    private _toastrService: ToastrService
  ) {
    this._titleService.setTitle("Fastkart | Categories");
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  // dataViewToggle = (view: number) => {
  //   localStorage.setItem("view", String(view));
  //   this.isListview = view === 1;
  // }

  dataViewToggle = (view: number) => {
    localStorage.setItem("view", String(view));
    return view === 1 ? this.isListview = true : this.isListview = false;
  }

  // get all category
  getCategoryList = () => {
    this._categoriesService.getAllCategories().subscribe((categories: Category[]) => {
      this.categoryList = categories;
      console.log(this.categoryList);
      this._changedetectorRef.detectChanges();
    });
  }

  // add new category
  addNewCategory = () => {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent, {
      width: "500px",
      data: ""
    });

    dialogRef.afterClosed().subscribe((category: Category) => {
      if (category) {
        this._changedetectorRef.detectChanges();
        this.getCategoryList();
      } else {
        console.log('The dialog was closed without adding a new category.');
      }
    });
  }

  // update category by id
  updateCategory = (categoryId: string | undefined) => {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent, {
      width: '500px',
      data: { categoryId }
    });

    dialogRef.afterClosed().subscribe((category: Category) => {
      if (category) {
        this._changedetectorRef.detectChanges();
        this.getCategoryList();
      } else {
        console.log('The dialog was closed without updating category.');
      }
    });
  }

  // delete category by id
  deleteCategory = (categoryId: string | undefined) => {
    this._categoriesService.deleteCategoryById(categoryId).subscribe((category: Category) => {
      this._toastrService.success("Category Deleted Succesfully");
      this._changedetectorRef.detectChanges();
      this.getCategoryList();
    }, (error) => {
      console.error(error)
    });
  }
}
