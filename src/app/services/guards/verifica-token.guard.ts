import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class VerificaTokenGuard implements CanActivate {
  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) {}
  canActivate(): Promise<boolean> | boolean {
    let token = this._usuarioService.token;
    //payload es el contenido del token
    //atob nos permite decodificar uan cadena que ha sido condificada en base 64

    let payload = JSON.parse(atob(token.split(".")[1])); //LO SEPARO POR COMA Y QUIERO LA PRIMER PARTE

    let expirado = this.expirado(payload.exp);
    if (expirado) {
      this.router.navigate(["/login"]);
      return false;
    }
    this.VerificaRenueva(payload.exp);
    return true;
  }

  VerificaRenueva(fechaexp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaexp * 1000); //se necesita en milisegundos

      let ahora = new Date();

      ahora.setTime(ahora.getTime() + 4 * 60 * 60 * 1000); //aumentamos 4 horas

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.router.navigate["/login"];
            reject(false);
          }
        );
      }
      /* 
      console.log(tokenExp);
      console.log(ahora); */
    });
  }
  expirado(fechaexp: number) {
    let ahora = new Date().getTime() / 1000; //EN SEGUNDOS

    if (fechaexp < ahora) {
      return true;
    } else {
      return false; //no ha expirado
    }
  }
}
