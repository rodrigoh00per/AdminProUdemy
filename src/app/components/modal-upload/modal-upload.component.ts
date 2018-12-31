import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  SubirArchivoService,
  ModalUploadService
} from "src/app/services/service.index";
import swal from "sweetalert";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  private imagenCargar: File;
  private imagenTemp;
  @ViewChild("inputdelmodal") inputdelmodal: ElementRef;

  constructor(
    private _subirArchivoService: SubirArchivoService,
    private _modalUploadService: ModalUploadService //ESTO NOS DEJA HAER LA COMUNICACION CON OTROS COMPONENTES SI NO SERIA UN DESMADRE
  ) {
    console.log("modal listo");
  }

  ngOnInit() {}

  subirImagen() {
    this._subirArchivoService
      .subirArchivo(
        this.imagenCargar,
        this._modalUploadService.tipo,
        this._modalUploadService.id
      )
      .then(resp => {
        //aqui es donde tenemos que emitir el evento
        console.log(resp);
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
        swal(
          "Actualización Correcta",
          "Se cambio la imagen correctamente",
          "success"
        );
      })
      .catch(error => {
        console.log("error en la carga");
      });
  }
  cerrarModal() {
    this.imagenTemp = null;
    this.imagenCargar = null;
    this.inputdelmodal.nativeElement.value = null;

    this._modalUploadService.ocultarModal();
  }

  imagenEscucharCambios(archivo) {
    if (!archivo) {
      this.imagenCargar = null;

      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      swal(
        "Solo Imagenes",
        "El archivo seleccionado no es una imagen",
        "error"
      );
      this.imagenCargar = null;
      return;
    }
    this.imagenCargar = archivo;
    let reader = new FileReader(); //ESTE ES PARA SACAR EL URL TEMP DE LA IMAGEN
    reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
    console.log(this.imagenCargar);
  }
}
