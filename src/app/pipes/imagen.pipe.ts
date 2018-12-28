import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = "usuario"): any {
    let url = URL_SERVICIOS + "img/";

    if (!img) {
      return url + "usuarios/xxx";
    }
    //SI ES DE GOOGLE LA IMAGEN
    if (img.indexOf("google") >= 0) {
      return img;
    }
    switch (tipo) {
      case "usuario":
        url += "usuario/" + img;
        break;
      case "hospital":
        url += "hospital/" + img;
        break;
      case "medico":
        url += "medico/" + img;
        break;
      default:
        console.log(
          "EL TIPO DE IMAGEN NO EXISTE DEBE DE SER MEDICO,HOSPITAL O USUARIO"
        );

        url + "usuarios/xxx";
        break;
    }
    return url;
  }
}
