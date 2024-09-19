import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StoreLogin } from '../../shared/interfaces/common.type';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  // store register
  storeRegister = (storeDetails: any) => {
    return this._httpClient.post(environment.apiUrl + "/api/register-store", storeDetails);
  }

  // login store
  storeLogin = (storeLogin: StoreLogin) => {
    return this._httpClient.post(environment.apiUrl + "/api/signin", storeLogin);
  }
}
