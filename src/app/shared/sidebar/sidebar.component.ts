import { Component, OnInit } from "@angular/core";
import { SidebarService, UsuarioService } from "src/app/services/service.index";
import { Usuario } from "src/app/models/usuario.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario;
  constructor(
    public  _sidebarService: SidebarService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._sidebarService.cargarMenu();
  }
  cerrarSesion() {
    this._usuarioService.logOut();
  }
}
