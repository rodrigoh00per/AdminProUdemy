import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";

import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  //EN CASO DE QUE PONGA LA RUTA VACIA

  //EN CASO DE QUE LA RUTA NO EXISTA
  { path: "**", component: NopagefoundComponent }
];
//FOR ROOT PORQUE SON LAS PRINCIPALES

export const appRouting = RouterModule.forRoot(routes, { useHash: true });
