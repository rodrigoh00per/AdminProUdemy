import {
  Component,
  OnInit,
  Input,
  Output,
  ɵConsole,
  ViewChild,
  ElementRef
} from "@angular/core";
import { EventEmitter } from "@angular/core";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styleUrls: ["./incrementador.component.css"]
})
export class IncrementadorComponent implements OnInit {
  //lo del progress

  @Input() leyenda: string = "Leyenda";
  @Input() porcentaje: number = 50;
  @Output() PasaleIncrementador: EventEmitter<number> = new EventEmitter(); //esto nos ayuda A PASAR LOS DATOS AL PADRE

  @ViewChild("txtProgress") txtProgress: ElementRef;
  constructor() {}

  cambiarValor(valor) {
    let resultado = this.porcentaje + valor;
    if (resultado >= 101) {
      return;
    }
    if (resultado <= 4) {
      return;
    }
    this.porcentaje = this.porcentaje + valor;

    this.PasaleIncrementador.emit(this.porcentaje); //VAMOS A EMITIR ESTE VLOR
  }

  ngOnInit() {
    // console.log("LEYENDA", this.leyenda);
    // console.log("PORCENTAJE", this.porcentaje);
  }
  //ESTE METODO NOS SRIVE PARA DETECTAR LOS CAMBIOS QUE ESTEMOS REALIZANDO A NUESTRO INPUT
  onChanges(valornuevo: number) {
    // let elementohtml: any = document.getElementsByName("porcentaje")[0];
    // console.log(elementohtml.value);
    // console.log(valornuevo);

    if (valornuevo >= 100) {
      valornuevo = 100;
    }
    if (valornuevo <= 5) {
      valornuevo = 5;
    }
    console.log(this.txtProgress);
    this.txtProgress.nativeElement.value = valornuevo; //esto nos sirve para hacer referencia a ese elemento

    this.txtProgress.nativeElement.focus();

    this.PasaleIncrementador.emit(valornuevo);
  }
}
