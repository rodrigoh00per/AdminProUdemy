import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { appRouting } from "./app.routing";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";

//MODULOS
import { PageModule } from "./pages/pages.module";
import { IncrementadorComponent } from "./components/incrementador/incrementador.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ServiceModule } from "./services/service.module";
import { PagesComponent } from "./pages/pages.component";
import { SharedModule } from "./shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    PagesComponent

    // IncrementadorComponent
  ],
  imports: [
    BrowserModule,
    appRouting, // SE QUITO DEBIDO A QUE ESTE SE CARGA DE FORMA DINAMICA NO ESTATICA
    /*  PageModule, */ ServiceModule,
    ReactiveFormsModule,
    FormsModule, //temporal,
    SharedModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
