import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TitleService } from '../../../shared/services/title.service';
import { Router } from '@angular/router';

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

  constructor(
    private _titleService: TitleService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) {
    this.signinForm = this._formBuilder.group({
      mobileNumber: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // set title
    this._titleService.setTitle("Fast Kart Admin | Sign in");
  }

  // signin store 
  signin = () => {
    console.log("signin store");
    this._router.navigate(["/dashboard"]);
  }
}
