import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/service.index";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Usuario } from "src/app/models/usuario.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }
  cerrarSesion() {
    this._usuarioService.logOut();
  }
  buscar(termino: string) {
    this._router.navigate(["/busqueda", termino]);
  }
}
