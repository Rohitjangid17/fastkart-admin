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
}
