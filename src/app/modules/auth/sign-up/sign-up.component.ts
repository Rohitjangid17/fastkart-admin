import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TitleService } from '../../../shared/services/title.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  createStoreForm!: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _titleService: TitleService
  ) {
    this.createStoreForm = this._formBuilder.group({
      storeName: ["", Validators.required],
      businessType: ["", Validators.required],
      currency: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required],
      pinCode: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // set title
    this._titleService.setTitle("Fast Kart Admin | Sign up")
  }

  // create store
  createStore = () => {
    this._router.navigate(["/dashboard"]);
  }
}
