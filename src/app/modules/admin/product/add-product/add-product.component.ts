import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';
import { PageHeaderComponent } from '../../../../shared/component/page-header/page-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../product.service';
import { Product } from '../../../../shared/interfaces/common.type';
import { NgFor, TitleCasePipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgFor,
    TitleCasePipe,
    MatSlideToggleModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  pageTitle: string = "Add Product";
  isHeaderAction: boolean = false;
  categoryList: string[] = [];
  brandList: string[] = [];
  stockStatusList: string[] = ["In Stock", "Out Of Stock"]
  warrantyInformationList: string[] = ["1 Month Warrunty", "2 Months Warrunty", "3 Months Warrunty", "4 Months Warrunty",]
  shippingInformationList: string[] = ["Ships in 1 month", "Ships in 1-2 business day", "Ships in 3-5 business days", "Ships in 2 weeks", "Ships overnight",]
  returnPolicyList: string[] = ["30 days return policy", "7 days return policy", "15 days return policy"];

  constructor(
    private _titleService: TitleService,
    private _productService: ProductService
  ) {
    this._titleService.setTitle("Fastkart | Add Product");
  }

  ngOnInit(): void {
    this.getProductList();
  }

  // get product list
  getProductList = () => {
    this._productService.getProductList().subscribe(products => {
      const categories = products.map(product => product.category);
      const brands = products.map(product => product.brand);
      this.categoryList = [...new Set(categories)];
      this.brandList = [...new Set(brands)];
      console.log(this.categoryList);
      console.log(this.brandList);
    }, (error) => {
      console.log(error);
    });
  }
}