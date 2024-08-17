import { Routes } from "@angular/router";
import { GeneralSettingsComponent } from "./general-settings/general-settings.component";

export const settingsRoutes: Routes = [
    {
        path: "settings", component: GeneralSettingsComponent
    }
]