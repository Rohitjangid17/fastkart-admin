import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "dashboard", pathMatch: "full"
    },
    {
        path: "dashboard", component: DashboardComponent
    },
    {
        path: "products", component: ProductComponent
    }
];
