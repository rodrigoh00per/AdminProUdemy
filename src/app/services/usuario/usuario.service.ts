import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import swal from "sweetalert";
import "rxjs/add/operator/map";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(private _http: HttpClient, private _router: Router) {
    console.log("SERVICIO USUARIO ARRIBA");
    this.cargarStorage();
  }
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  estaLogueado(): boolean {
    return this.token.length > 4 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "login/google";
    return this._http.post(url, { token }).map((resp: any) => {
      this.guardarStorage(resp._id, resp.token, resp.usuario);

      return true;
    });
  }

  login(usuario: Usuario, recordar: boolean = false): Observable<any> {
    if (recordar === true) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "login";

    return this._http.post(url, usuario).map((resp: any) => {
      this.guardarStorage(resp._id, resp.token, resp.usuario);
      return true;
    });
  }

  logOut() {
    this.token = "";
    this.usuario = null;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this._router.navigate(["/login"]);
  }
  crearUsuario(usuario: Usuario): Observable<any> {
    let url = URL_SERVICIOS + "usuario";
    return this._http.post(url, usuario).map((resp: any) => {
      swal("Usuario Creado Correctamente", usuario.email, "success");
      return resp.usuario;
    });
  }
}
