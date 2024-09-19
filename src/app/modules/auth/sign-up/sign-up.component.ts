import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TitleService } from '../../../shared/services/title.service';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { BUSINESSES, COUNTRIES, CURRENCY_LIST } from '../../../shared/constants/constants';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgFor
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  createStoreForm!: FormGroup;
  currencyList: any[] = CURRENCY_LIST;
  businesses: any[] = BUSINESSES;
  countries: any[] = COUNTRIES;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _titleService: TitleService,
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) {
    this.createStoreForm = this._formBuilder.group({
      storeName: ["", Validators.required],
      businessType: ["", Validators.required],
      currency: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      country: ["", Validators.required],
      state: ["", Validators.required],
      pinCode: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^\d{6}$/)]],
      city: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // set title
    this._titleService.setTitle("Fast Kart Admin | Sign up");
  }

  // create store
  createStore = () => {
    const storeData: any = {
      storeName: this.createStoreForm.get("storeName")?.value,
      businessType: this.createStoreForm.get("businessType")?.value,
      currency: this.createStoreForm.get("currency")?.value,
      address: this.createStoreForm.get("address")?.value,
      email: this.createStoreForm.get("email")?.value,
      mobileNumber: this.createStoreForm.get("mobileNumber")?.value,
      password: this.createStoreForm.get("password")?.value,
      country: this.createStoreForm.get("country")?.value,
      state: this.createStoreForm.get("state")?.value,
      pinCode: this.createStoreForm.get("pinCode")?.value,
      city: this.createStoreForm.get("city")?.value,
    }
    console.log(storeData);

    this._authService.storeRegister(storeData).subscribe((storeRegister: any) => {
      console.log(storeRegister);
      if (storeRegister) {
        this._toastrService.success("Store created successfully");
        localStorage.setItem("user", storeRegister)
        this._router.navigate(["/sign-in"]);
      }
    }, (error) => {
      this._toastrService.error(error.message);
      console.log(error);
    });
  }
}
