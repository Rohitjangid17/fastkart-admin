import { Component } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';
import { PageHeaderComponent } from '../../../../shared/component/page-header/page-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  pageTitle: string = "Add Product";
  isHeaderAction: boolean = false;

  constructor(
    private _titleService: TitleService
  ) {
    this._titleService.setTitle("Fastkart | Add Product");
  }
}
