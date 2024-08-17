import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Navlink } from '../../shared/interfaces/common.type';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    NgFor,
    MatTooltipModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navlinkList: Navlink[] = [];

  constructor() {
    this.navlinkList = [
      {
        id: 1,
        title: "Dashboard",
        icon: "dashboard",
        path: "/dashboard"
      },
      {
        id: 8,
        title: "Orders",
        icon: "shopping_cart",
        path: "/orders"
      },
      {
        id: 2,
        title: "Products",
        icon: "dashboard",
        path: "/products"
      },
      {
        id: 3,
        title: "Categories",
        icon: "category",
        path: "/categories"
      },
      // {
      //   id: 4,
      //   title: "Attributes",
      //   icon: "dashboard",
      //   path: "/products"
      // },
      {
        id: 5,
        title: "Customers",
        icon: "supervised_user_circle",
        path: "/customers"
      },
      // {
      //   id: 6,
      //   title: "Roles",
      //   icon: "dashboard",
      //   path: "/products"
      // },
      // {
      //   id: 7,
      //   title: "Media",
      //   icon: "dashboard",
      //   path: "/products"
      // },
      // {
      //   id: 9,
      //   title: "Localization",
      //   icon: "dashboard",
      //   path: "/products"
      // },
      // {
      //   id: 10,
      //   title: "Coupons",
      //   icon: "dashboard",
      //   path: "/products"
      // },
      // {
      //   id: 11,
      //   title: "Tax",
      //   icon: "dashboard",
      //   path: "/products"
      // },
      {
        id: 12,
        title: "Product Review",
        icon: "rate_review",
        path: "/product-review"
      },
      // {
      //   id: 13,
      //   title: "Support Tickets",
      //   icon: "call",
      //   path: "/products"
      // },
      {
        id: 14,
        title: "Settings",
        icon: "settings",
        path: "/settings"
      },
    ]
  }
}
