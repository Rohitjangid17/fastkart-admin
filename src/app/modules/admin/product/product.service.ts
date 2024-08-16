import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Product } from '../../../shared/interfaces/common.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  // get product list
  getProductList = () => {
    return this._httpClient.get<Product[]>(environment.apiUrl + "/api/products");
  }

  // create product
  createProduct = (product: Product) => {
    return this._httpClient.post<Product>(environment.apiUrl + "/api/products", product);
  }

  // delete product by id
  deleteProductById = (productId: string | undefined) => {
    return this._httpClient.delete<Product>(environment.apiUrl + "/api/products/" + productId);
  }

  // get single product by id
  getProductById(productId: string) {
    return this._httpClient.get<Product>(environment.apiUrl + "/api/products/" + productId);
  }

  // update product by id
  updateProductById(productId: string, product: Product) {
    return this._httpClient.put<Product>(environment.apiUrl + "/api/products/" + productId, product);
  }
}
