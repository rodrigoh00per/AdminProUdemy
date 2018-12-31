import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ModalUploadService {
  public tipo: string; //SI ES UN MEDICO,UN USUARIO,UN HOSPITAL
  public id: string;

  public oculto: string = "oculto";

  public notificacion = new EventEmitter<any>(); //para saber si se subio la imagen o no
  constructor() {
    console.log("modal service arriba");
  }
  ocultarModal() {
    this.oculto = "oculto";
    this.tipo = null;
    this.id = null;
  }
  mostrarModal(tipo: string, id: string) {
    this.id = id;
    this.tipo = tipo;
    this.oculto = "";
  }
}
