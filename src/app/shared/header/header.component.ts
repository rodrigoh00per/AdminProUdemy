import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/service.index";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: []
})
export class HeaderComponent implements OnInit {
  constructor(private _usuarioService: UsuarioService) {}

  ngOnInit() {}
  cerrarSesion() {
    this._usuarioService.logOut();
  }
}
