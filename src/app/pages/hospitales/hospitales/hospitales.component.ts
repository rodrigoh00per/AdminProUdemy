import { Component, OnInit, Input } from "@angular/core";
import {
  HospitalService,
  ModalUploadService
} from "src/app/services/service.index";
import { Hospital } from "src/app/models/hospital.model";

declare var swal: any;
@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styleUrls: ["./hospitales.component.css"]
})
export class HospitalesComponent implements OnInit {
  public cargando: boolean;
  private hospitales: Hospital[];
  private totalRegistro: number = 0; //aqui se saa el total de registro de la bd
  constructor(
    private _hospitalService: HospitalService,
    private _modalUploadService: ModalUploadService
  ) {
    this.cargando = true;
    this.hospitales = [];
  }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(() => {
      this.cargarHospitales();
    });
  }
  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.totalRegistro = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService
      .buscarHospital(termino)
      .subscribe((hospitales: any) => {
        this.hospitales = hospitales;
      });
  }
  eliminarHospital(hospital: Hospital) {
    swal({
      title: "¿Estas seguro?",
      text: "Estas a punto de borrar a " + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerModel: true
    }).then(borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(resp => {
          console.log(resp);
          this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }
  crearHospital() {
    swal({
      title: "Crear Hospital",
      text: "Ingrese el nombre del hospital",
      content: "input",
      icon: "info",
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital(valor).subscribe(resp => {
        this.cargarHospitales();
      });
    });
  }
  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal("hospital", hospital._id);
  }
}
