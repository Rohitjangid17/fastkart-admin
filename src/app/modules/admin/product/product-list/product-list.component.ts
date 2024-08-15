import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/component/page-header/page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TitleService } from '../../../../shared/services/title.service';
import { ProductService } from '../product.service';
import { Product } from '../../../../shared/interfaces/common.type';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    NgIf,
    NgClass,
    RouterLink,
    NgFor,
    MatCardModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Products";
  isHeaderAction: boolean = true;
  isListview: boolean = false;
  productList: Product[] = [];

  constructor(
    private _titleService: TitleService,
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._titleService.setTitle("Fastkart | Products");
  }

  ngOnInit(): void {
    this.getProducts();
  }

  dataViewToggle = (view: number) => {
    localStorage.setItem("view", String(view));
    return view === 1 ? this.isListview = true : this.isListview = false;
  }

  // get products
  getProducts = () => {
    this._productService.getProductList().subscribe((products: Product[]) => {
      this.productList = products;
      this._changeDetectorRef.detectChanges();
      console.log(this.productList);
    }, (error) => {
      console.log(error);
    });
  }

  // delete product
  deleteProduct = (productId: string) => {
    this._productService.deleteProductById(productId).subscribe((product: Product) => {
      console.log(product);
      this.getProducts();
    }, (error) => {
      console.log(error);
    });
  }
}
