import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages/pages.component";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { Graficas1Component } from "./pages/graficas1/graficas1.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { RegisterComponent } from "./login/register.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,

    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "progress", component: ProgressComponent },
      { path: "graficas1", component: Graficas1Component },
      { path: "", pathMatch: "full", redirectTo: "/dashboard" }
    ]
  },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  //EN CASO DE QUE PONGA LA RUTA VACIA

  //EN CASO DE QUE LA RUTA NO EXISTA
  { path: "**", component: NopagefoundComponent }
];
//FOR ROOT PORQUE SON LAS PRINCIPALES

export const appRouting = RouterModule.forRoot(routes, { useHash: true });
