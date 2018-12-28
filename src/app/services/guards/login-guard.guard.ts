import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../service.index";

@Injectable({
  providedIn: "root"
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService
  ) {}
  canActivate(): boolean {
    if (this._usuarioService.estaLogueado()) {
      console.log("paso sin pedos todo el merequetengue");
      return true;
    } else {
      this._router.navigate(["/login"]);
    }
  }
}
