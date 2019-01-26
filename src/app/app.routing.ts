import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";

import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { PagesComponent } from "./pages/pages.component";
import { LoginGuardGuard } from "./services/service.index";

const routes: Routes = [
  //el pages routes ahora se va a cargar por aqui

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: "./pages/pages.module#PageModule" //SE QUIERE QUE TODAS LAS RUTAS SE CARGUEN DE FORMA DINAMICA
    //EL STRING SE DIVIDE EN 2
    //1.- EL PATH QUE SAE QUEIRE CARGAR DE FORMA DINAMICA
    //2.- NOMBRE DEL MODULO TAL CUAL
  },
  //EN CASO DE QUE PONGA LA RUTA VACIA

  //EN CASO DE QUE LA RUTA NO EXISTA
  { path: "**", component: NopagefoundComponent }
];
//FOR ROOT PORQUE SON LAS PRINCIPALES

export const appRouting = RouterModule.forRoot(routes, { useHash: true });
