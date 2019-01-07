import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

import { LoginGuardGuard, AdminGuard } from "../services/service.index";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { HospitalesComponent } from "./hospitales/hospitales/hospitales.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { MedicoComponent } from "./medicos/medico.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { titulo: "Dashboard" }
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Progress" }
      },
      {
        path: "graficas1",
        component: Graficas1Component,
        data: { titulo: "Graficas" }
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" }
      },
      {
        path: "rxjs",
        component: RxjsComponent,
        data: { titulo: "Rxjs(Observables)" }
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes(Cambiar Tema)" }
      },
      {
        path: "perfil",
        component: ProfileComponent,
        data: { titulo: "Perfil del Usuario" }
      },

      {
        path: "busqueda/:termino",
        component: BusquedaComponent,
        data: { titulo: "Buscador" }
      },

      //MANTENIMIENTOS

      {
        path: "usuarios",
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: "Mantenimiento de Usuarios" }
      },
      {
        path: "hospitales",
        component: HospitalesComponent,
        data: { titulo: "Mantenimiento de Hospitales" }
      },
      {
        path: "medicos",
        component: MedicosComponent,
        data: { titulo: "Mantenimiento de Medicos" }
      },
      {
        path: "medico/:id",
        component: MedicoComponent,
        data: { titulo: "Medico Datos" }
      },
      { path: "", pathMatch: "full", redirectTo: "/dashboard" }
    ]
  }
];

export const pagesRoutes = RouterModule.forChild(routes);
