import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../../../../shared/interfaces/common.type';
import { PageHeaderComponent } from '../../../../shared/component/page-header/page-header.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    PageHeaderComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  pageTitle: string = "Category";
  isHeaderAction: boolean = true;
  categoryList: Category[] = [];

  constructor(
    private _categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  // get all category
  getCategoryList = () => {
    this._categoriesService.getAllCategories().subscribe((categories: Category[]) => {
      this.categoryList = categories;
      console.log(this.categoryList);
    });
  }
}
