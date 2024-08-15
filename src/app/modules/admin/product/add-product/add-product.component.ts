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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    MatSlideToggleModule,
    ReactiveFormsModule,
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
  addProductForm!: FormGroup;

  constructor(
    private _titleService: TitleService,
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // Add New Product form validation
    this.addProductForm = this._formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      category: ["", Validators.required],
      price: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)]],
      discountPercentage: ["", [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0), Validators.max(100)]],
      // rating: ["", [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0), Validators.max(5)]],
      stock: ["", [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]],
      brand: ["", Validators.required],
      warrantyInformation: ["", Validators.required],
      shippingInformation: ["", Validators.required],
      availabilityStatus: ["", Validators.required],
      returnPolicy: ["", Validators.required],
      minimumOrderQuantity: ["", [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]],
      // images: ["", [Validators.required]],
      // thumbnail: ["", [Validators.required]]
    });

    // set page title
    this._titleService.setTitle("Fastkart | Add Product");

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

  // Add Product
  addProduct = () => {
    const productData = {
      title: this.addProductForm.get("title")?.value,
      description: this.addProductForm.get("description")?.value,
      category: this.addProductForm.get("category")?.value,
      price: +this.addProductForm.get("price")?.value,
      discountPercentage: +this.addProductForm.get("discountPercentage")?.value,
      rating: 5,
      stock: +this.addProductForm.get("stock")?.value,
      brand: this.addProductForm.get("brand")?.value,
      warrantyInformation: this.addProductForm.get("warrantyInformation")?.value,
      shippingInformation: this.addProductForm.get("shippingInformation")?.value,
      availabilityStatus: this.addProductForm.get("availabilityStatus")?.value,
      reviews: [
        {
          rating: 1,
          comment: "Disappointing product!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Lincoln Kelly",
          reviewerEmail: "lincoln.kelly@x.dummyjson.com",
        }
      ],
      returnPolicy: this.addProductForm.get("returnPolicy")?.value,
      minimumOrderQuantity: +this.addProductForm.get("minimumOrderQuantity")?.value,
      images: [],
      thumbnail: "",
    }

    this._productService.createProduct(productData).subscribe((product: Product) => {
      this._router.navigate(["/products"]);
    }, (error) => {
      console.log(error);
    });
  }
}