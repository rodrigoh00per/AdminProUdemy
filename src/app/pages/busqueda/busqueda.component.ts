import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { Usuario } from "src/app/models/usuario.model";
import { Medico } from "src/app/models/medico.model";
import { Hospital } from "src/app/models/hospital.model";

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styles: []
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[];
  public medicos: Medico[];
  public hospitales: Hospital[];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _http: HttpClient
  ) {
    this._activatedRoute.params.subscribe(params => {
      let termino = params.termino;
      console.log(termino);
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  buscar(termino: String) {
    let url = URL_SERVICIOS + "busqueda/todo/" + termino;
    this._http.get(url).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
      console.log(this.usuarios);
      this.medicos = resp.medicos;
    });
  }
}
