import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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
}
