import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../../shared/interfaces/common.type';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  // create new category
  createNewCategory = (category: Category): Observable<Category> => {
    return this._httpClient.post<Category>(environment.apiUrl + "/api/categories", category);
  }

  // get category list
  getAllCategories = () => {
    return this._httpClient.get<Category[]>(environment.apiUrl + "/api/categories");
  }

  // delete category
  deleteCategoryById = (categoryId: string | undefined) => {
    return this._httpClient.delete<Category>(environment.apiUrl + "/api/categories/" + categoryId);
  }

  // get category by id
  getCategoryById = (categoryId: string) => {
    return this._httpClient.get<Category>(environment.apiUrl + "/api/categories/" + categoryId);
  }

  // update category by id
  updateCategoryById = (categoryId: string, category: Category) => {
    return this._httpClient.put<Category>(environment.apiUrl + "/api/categories/" + categoryId, category)
  }
}
