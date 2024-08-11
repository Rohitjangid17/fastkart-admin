import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/component/page-header/page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TitleService } from '../../../../shared/services/title.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  pageTitle: string = "Products";
  isListview: boolean = true;

  constructor(
    private _titleService: TitleService
  ) { 
    this._titleService.setTitle("Fastkart | Products");
  }

  dataViewToggle = (view: number) => {
    localStorage.setItem("view", String(view));
    return view === 1 ? this.isListview = true : this.isListview = false;
  }
}
