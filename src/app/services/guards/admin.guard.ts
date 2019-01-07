import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}
  canActivate() {
    if (this._usuarioService.usuario.role === "ADMIN_ROLE") {
      return true;
    } else {
      console.log("BLOQUEADO POR EL ADMIN GUARD");
      this._usuarioService.logOut();
      return false;
    }
  }
}
