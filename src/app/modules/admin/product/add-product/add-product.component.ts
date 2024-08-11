import { Component } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  constructor(
    private _titleService: TitleService
  ) {
    this._titleService.setTitle("Fastkart | Add Product");
  }
}
