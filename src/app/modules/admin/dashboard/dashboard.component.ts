import { Component } from '@angular/core';
import { TitleService } from '../../../shared/services/title.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private _titleService: TitleService
  ) {
    this._titleService.setTitle("Fastkart | Dashboard");
  }
}
