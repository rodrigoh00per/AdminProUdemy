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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent

    // IncrementadorComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    PageModule,
    ServiceModule,
    ReactiveFormsModule,
    FormsModule //temporal
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
