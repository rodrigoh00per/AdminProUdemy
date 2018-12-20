import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";
import { pagesRoutes } from "./pages.routing";
import { FormsModule } from "@angular/forms";
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";

import { ChartsModule } from "ng2-charts";
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent
  ],

  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent, //temporal,
    ChartsModule
  ],
  imports: [SharedModule, pagesRoutes, FormsModule, ChartsModule,CommonModule]
})
export class PageModule {}
