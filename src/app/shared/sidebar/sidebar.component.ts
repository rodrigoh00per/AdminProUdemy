import { Component, OnInit } from "@angular/core";
import { SidebarService, UsuarioService } from "src/app/services/service.index";
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit {
  private usuario:Usuario;
  constructor(
    private _sidebarService: SidebarService,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario=this._usuarioService.usuario;
  }
  cerrarSesion() {
    this._usuarioService.logOut();
  }
}
