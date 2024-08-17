import { Routes } from "@angular/router";
import { CustomerListComponent } from "./customer-list/customer-list.component";

export const customersRoutes: Routes = [
    {
        path: "customers", component: CustomerListComponent
    }
]