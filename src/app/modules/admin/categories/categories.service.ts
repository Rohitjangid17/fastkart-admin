import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Category } from '../../../shared/interfaces/common.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  // create new category
  createNewCategory = (category: Category) => {
    return this._httpClient.post<Category>(environment.apiUrl + "/api/categories", category);
  }

  // get category list
  getAllCategories = () => {
    return this._httpClient.get<Category[]>(environment.apiUrl + "/api/categories");
  }
}
