import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { UsuarioService } from "../usuario/usuario.service";
import { Medico } from "src/app/models/medico.model";

@Injectable({
  providedIn: "root"
})
export class MedicoService {
  todalmedicos = 0;
  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {}

  cargarMedicos() {
    let url = URL_SERVICIOS + "medico";
    return this._http.get(url).map((resp: any) => {
      this.todalmedicos = resp.total;
      return resp.medicos;
    });
  }

  cargarMedico(id: string) {
    let url = URL_SERVICIOS + "medico/" + id;
    return this._http.get(url).map((resp: any) => {
      return resp.medico;
    });
  }
  buscarMedicos(termino: string) {
    let url = `${URL_SERVICIOS}busqueda/coleccion/medicos/${termino}`;
    return this._http.get(url).map((resp: any) => {
      return resp.medicos;
    });
  }
  eliminarMedico(id: string) {
    let url = `${URL_SERVICIOS}medico/${id}/?token=${
      this._usuarioService.token
    }`;
    return this._http.delete(url).map(resp => {
      swal(
        "Medico borrado",
        "El Medico ha sido eliminado correctamente",
        "success"
      );
      return resp;
    });
  }
  guardarMedico(medico: Medico) {
    if (medico._id) {
      let url = `http://localhost:3000/medico/${medico._id}/?token=${
        this._usuarioService.token
      }`;

      return this._http.put(url, medico).map((resp: any) => {
        swal(
          "Medico Actualizado",
          "Los datos del medico se han actualizado de manera correcta",
          "success"
        );
        return resp.medico;
      });
    } else {
      let url = `http://localhost:3000/medico/?token=${
        this._usuarioService.token
      }`;
      return this._http.post(url, medico).map((resp: any) => {
        swal(
          "Medico Guardado",
          "Los datos del medico se han guardado de manera correcta",
          "success"
        );

        return resp.medico;
      });
    }
  }
}
