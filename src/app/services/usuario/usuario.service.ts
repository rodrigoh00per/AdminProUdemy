import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import swal from "sweetalert";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir_archivo/subir-archivo.service";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _subirArchivoService: SubirArchivoService
  ) {
    console.log("SERVICIO USUARIO ARRIBA");
    this.cargarStorage();
  }
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  estaLogueado(): boolean {
    return this.token.length > 4 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      this.menu = [];
    }
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "login/google";
    return this._http.post(url, { token }).map((resp: any) => {
      this.guardarStorage(resp._id, resp.token, resp.usuario, resp.menu);

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

    return this._http
      .post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp._id, resp.token, resp.usuario, resp.menu);
        return true;
      })
      .catch(err => {
        swal("Error", err.error.mensaje, "error");
        return Observable.throw(err); //ES PARA EL MANEJO DE LOS ERRORES
      });
  }

  logOut() {
    this.menu = [];
    this.token = "";
    this.usuario = null;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("menu");
    this._router.navigate(["/login"]);
  }
  crearUsuario(usuario: Usuario): Observable<any> {
    let url = URL_SERVICIOS + "usuario";
    return this._http
      .post(url, usuario)
      .map((resp: any) => {
        swal("Usuario Creado Correctamente", usuario.email, "success");
        return resp.usuario;
      })
      .catch(err => {
        swal(err.error.mensaje, err.error.errors.message, "error");
        return Observable.throw(err); //ES PARA EL MANEJO DE LOS ERRORES
      });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "usuario/" + usuario._id + "/?token=";
    url = url += this.token;
    return this._http
      .put(url, usuario)
      .map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(
            resp.usuario.id,
            this.token,
            resp.usuario,
            resp.menu
          );
        }
        swal("Usuario Actualizado", usuario.nombre, "success");
        return true;
      })
      .catch(err => {
        swal(err.error.mensaje, err.error.errors.message, "error");
        return Observable.throw(err); //ES PARA EL MANEJO DE LOS ERRORES
      });
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, "usuario", id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal("Imagen Actualizada", this.usuario.nombre, "success");
        this.guardarStorage(
          this.usuario._id,
          this.token,
          this.usuario,
          this.menu
        );
        /* console.log(resp); */
      })
      .catch(err => {
        console.log(err);
      });
  }
  //ESTE METODO ES PARA TRAER TODOS
  cargarUsuarios(desde: number = 0) {
    let url = `${URL_SERVICIOS}usuario/?desde=${desde}`;
    return this._http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = `${URL_SERVICIOS}busqueda/coleccion/usuarios/${termino}`;
    return this._http.get(url).map((resp: any) => {
      return resp.usuarios;
    });
  }
  borrarUsuario(id: string) {
    let url = `${URL_SERVICIOS}usuario/${id}/?token=${this.token}`;
    return this._http.delete(url).map(resp => {
      swal(
        "Usuario borrado",
        "El usuario ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
