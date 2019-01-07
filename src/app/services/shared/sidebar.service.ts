import { Injectable } from "@angular/core";
import { UsuarioService } from "../usuario/usuario.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable()
export class SidebarService {
  menu = [];

  constructor(private _usuarioService: UsuarioService) {}
  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
