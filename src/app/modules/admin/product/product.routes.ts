import { Routes } from "@angular/router";
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductListComponent } from "./product-list/product-list.component";

export const productRoutes: Routes = [
    {
        path: "products", component: ProductListComponent
    },
    {
        path: "add-product", component: AddProductComponent
    },
    {
        path: "update-product/:id", component: AddProductComponent
    }
]