import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private _title: Title
  ) { }

  // get title
  getTitle() {
    this._title.getTitle();
  }

  // set title
  setTitle(pageTitle: string) {
    this._title.setTitle(pageTitle);
  }
}
