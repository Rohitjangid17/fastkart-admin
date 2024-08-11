import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { productRoutes } from './modules/admin/product/product.routes';

export const routes: Routes = [
    {
        path: "", redirectTo: "/dashboard", pathMatch: "full"
    },
    {
        path: "dashboard", component: DashboardComponent
    },
    {
        path: "", children: productRoutes
    }
];
