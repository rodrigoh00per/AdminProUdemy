import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/service.index";
import swal from "sweetalert";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public usuario: Usuario;
  public imagenCargar: File;
  public imagenTemp;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {}
  //este es el metodo del actualizar un usuario
  guardar(usuario: Usuario) {
    console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) this.usuario.email = usuario.email;

    this._usuarioService.actualizarUsuario(this.usuario).subscribe(resp => {
      console.log(resp);
    });
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
  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenCargar, this.usuario._id);
  }
}
