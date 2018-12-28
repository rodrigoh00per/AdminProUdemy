import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "src/app/config/config";

@Injectable()
export class SubirArchivoService {
  constructor() {}

  //ESTA ES LA PARTE DE LA SUBIDA DE LA IMAGEN
  subirArchivo(archivo: File, tipo_img: string, id: string) {
    //el tipo puede ser un medico,un hospital
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append("imagen", archivo, archivo.name); //nombreparametrorecibir,el archivo y el nombre que tiene
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          //cuando ya termino

          if (xhr.status === 200) {
            console.log("Imagen Subida");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("Fallo la subida de la imagen");
            reject(xhr.response);
          }
        }
      };
      let url = `${URL_SERVICIOS}upload/${tipo_img}/${id}`;
      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}
