import { Routes } from "@angular/router";
import { OrderListComponent } from "./order-list/order-list.component";

export const ordersRoutes: Routes = [
    {
        path: "orders", component: OrderListComponent
    },
]