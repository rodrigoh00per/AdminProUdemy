import { Component, OnInit } from "@angular/core";
import { Medico } from "src/app/models/medico.model";
import { MedicoService } from "src/app/services/service.index";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: []
})
export class MedicosComponent implements OnInit {
  public cargando;
  private medicos: Medico[];
  constructor(private _medicoService: MedicoService) {
    this.cargando = false;
    this.medicos = [];
  }

  ngOnInit() {
    this.cargarMedicos();
  }
  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe((medicos: any) => {
      this.medicos = medicos;
    });
  }
  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos(termino).subscribe(medicos => {
      this.medicos = medicos;
    });
  }
  eliminarMedico(medico: Medico) {
    this._medicoService.eliminarMedico(medico._id).subscribe(resp => {
      this.cargarMedicos();
    });
  }
}
