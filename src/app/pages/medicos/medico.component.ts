import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Hospital } from "src/app/models/hospital.model";
import {
  HospitalService,
  MedicoService,
  ModalUploadService
} from "src/app/services/service.index";
import { Medico } from "src/app/models/medico.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: []
})
export class MedicoComponent implements OnInit {
  private hospitales: Hospital[];
  private medico: Medico;
  private hospital: Hospital;
  constructor(
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _modalUploadService: ModalUploadService
  ) {
    this.hospitales = [];
    this.medico = new Medico("", "", "", "", "");
    this.hospital = new Hospital("");

    this._activatedRoute.params.subscribe(value => {
      let id = value["id"];

      if (id !== "nuevo") {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((hospitales: any) => {
      this.hospitales = hospitales.hospitales;
      console.log(hospitales);
    });
    this._modalUploadService.notificacion.subscribe(resp => {
      console.log(resp);
      this.medico.img= resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;

      this.medico.hospital = medico.hospital._id;
      console.log(this.medico);
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe((medico: any) => {
      this.medico._id = medico._id;
      this._router.navigate(["/medico", medico._id]);
    });
  }
  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id).subscribe(hospital => {
      this.hospital = hospital;
      console.log(this.hospital);
    });
  }
  cambiarFoto() {
    this._modalUploadService.mostrarModal("medico", this.medico._id);
  }
}
