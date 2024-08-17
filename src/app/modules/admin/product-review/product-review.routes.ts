import { Routes } from "@angular/router";
import { ProductReviewListComponent } from "./product-review-list/product-review-list.component";

export const productReviewRoutes: Routes = [
    {
        path: "product-review", component: ProductReviewListComponent
    }
]