import { Routes } from "@angular/router";
import { CategoryListComponent } from "./category-list/category-list.component";

export const categoryRoutes: Routes = [
    {
        path: "categories", component: CategoryListComponent
    },
]