import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TitleService } from '../../../shared/services/title.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  loginToken: string = "";

  constructor(
    private _titleService: TitleService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) {
    this.signinForm = this._formBuilder.group({
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    // set title
    this._titleService.setTitle("Fast Kart Admin | Sign in");
  }

  // signin store 
  signin = () => {
    const storeData: any = {
      mobileNumber: this.signinForm.get("mobileNumber")?.value,
      password: this.signinForm.get("password")?.value,
    }
    console.log(storeData);

    this._authService.storeLogin(storeData).subscribe((response: any) => {
      if (response) {
        this.loginToken = response.token;
        localStorage.setItem("token", this.loginToken);
        this._router.navigate(["/dashboard"]);
      }
    }, (error) => {
      this._toastrService.error(error.message);
      console.log(error);
    });
  }
}
