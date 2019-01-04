import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "src/app/config/config";
import { HttpClient } from "@angular/common/http";
import { Hospital } from "src/app/models/hospital.model";
import { UsuarioService } from "../usuario/usuario.service";
declare var swal: any;

@Injectable({
  providedIn: "root"
})
export class HospitalService {
  private token: string;
  private hospital: Hospital;
  private totalHospitales;
  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    /*  console.log("Hospital Service Cargado"); */
    this.cargarStorage();
  }
  cargarHospitales() {
    let url = URL_SERVICIOS + "hospital";
    return this._http.get(url).map((resp: any) => {
      this.totalHospitales = resp.total;
      return resp; //esta linea la debes de modificar
    });
  }
  eliminarHospitales() {
    let url = URL_SERVICIOS + "hospital";
  }
  //ESTE METODO ES PARA REGRESAR EL TOKEN
  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.hospital = JSON.parse(localStorage.getItem("hospital"));
    } else {
      this.token = "";
      this.hospital = null;
    }
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + "hospital/" + id;
    return this._http.get(url).map((resp: any) => resp.hospital);
  }
  borrarHospital(id: String) {
    let url = `${URL_SERVICIOS}hospital/${id}/?token=${
      this._usuarioService.token
    }`;
    console.log(url);
    return this._http.delete(url).map(resp => {
      swal(
        "Hospital borrado",
        "El Hospital ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }

  crearHospital(nombre: string) {
    let url = `${URL_SERVICIOS}hospital/?token=${this._usuarioService.token}`;
    return this._http.post(url, { nombre }).map((resp: any) => resp.hospital);
  }

  buscarHospital(termino: string) {
    let url = `${URL_SERVICIOS}busqueda/coleccion/hospitales/${termino}`;
    return this._http.get(url).map((resp: any) => {
      return resp.hospitales;
    });
  }
  actualizarHospital(hospital: Hospital) {
    let url = `${URL_SERVICIOS}hospital/${hospital._id}/?token=${
      this._usuarioService.token
    }`;
    return this._http.put(url, hospital).map((resp: any) => {
      swal(
        "Los datos del ",
        resp.hospital.nombre + " han sido Actualizados",
        "success"
      );

      return resp.hospital;
    });
  }
}
