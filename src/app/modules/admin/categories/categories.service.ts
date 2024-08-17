import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Category } from '../../../shared/interfaces/common.type';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  // get category list
  getAllCategories = () => {
    return this._httpClient.get<Category[]>(environment.apiUrl + "/api/categories");
  }
}
