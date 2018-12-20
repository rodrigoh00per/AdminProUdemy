import { Component, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { SettingsService } from "../../services/service.index";
/* import { DOCUMENT } from "@angular/common";/*  */

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: [],
  providers: [SettingsService]
})
export class AccountSettingsComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT)
    private _document,
    private _settings: SettingsService
  ) {}

  ngOnInit() {
    this.colocarCheck();
  }
  cambiarColor(tema: string, link: any) {
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById("tema").setAttribute("href", url);
    console.log(tema);

    this.aplicarcheck(link); /* NOS SIRVE PARA QUE SALGA LA SUPUESTA PALOMITA */

    this._settings.ajustes.tema = tema;
    this._settings.ajustes.temaurl = url;

    this._settings.guardarAjustes();
  }

  //ESTE METODO NOS SIRVE PARA QUE LE SALGA LA PALOMITA YA QUE ESCOGIO EL JODIDO COLOR
  aplicarcheck(link: any) {
    let selectores: any = document.getElementsByClassName("selector");
    console.log(selectores);

    for (const selector of selectores) {
      selector.classList.remove("working");
    }
    link.classList.add("working");
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName("selector");
    let tema = this._settings.ajustes.tema;
    for (const selector of selectores) {
      if (selector.getAttribute("data-theme") === tema) {
        selector.classList.add("working");
        break;
      }
    }
  }
}
