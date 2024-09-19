import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { productRoutes } from './modules/admin/product/product.routes';
import { categoryRoutes } from './modules/admin/categories/categories.routes';
import { ordersRoutes } from './modules/admin/orders/orders.routes';
import { settingsRoutes } from './modules/admin/settings/settings.routes';
import { customersRoutes } from './modules/admin/customers/customers.routes';
import { productReviewRoutes } from './modules/admin/product-review/product-review.routes';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { SigninComponent } from './modules/auth/signin/signin.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: "", redirectTo: "/sign-up", pathMatch: "full"
    },
    {
        path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: "", children: productRoutes
    },
    {
        path: "", children: categoryRoutes
    },
    {
        path: "", children: ordersRoutes
    },
    {
        path: "", children: settingsRoutes
    },
    {
        path: "", children: customersRoutes
    },
    {
        path: "", children: productReviewRoutes
    },
    {
        path: "sign-up", component: SignUpComponent
    },
    {
        path: "sign-in", component: SigninComponent
    },
];
