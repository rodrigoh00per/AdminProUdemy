import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import {
  UsuarioService,
  ModalUploadService
} from "src/app/services/service.index";
import { Validators } from "@angular/forms";

declare var swal: any;
@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  private usuarios: Usuario[];
  private desde: number = 0;
  private totalRegistro: number = 0;
  public cargando: boolean;

  constructor(
    private _usuariosService: UsuarioService,
    private _modalUploadService: ModalUploadService
  ) {
    this.usuarios = [];
    this.cargando = true;

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.cargando = true;
    this._usuariosService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistro = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  cambiarDesde(valor: any) {
    let temp = 0;
    temp = this.desde;
    this.desde = this.desde + valor;

    if (this.desde <= 0) {
      this.desde = 0;
    }
    if (this.desde >= this.totalRegistro) {
      this.desde = temp;
    }

    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    console.log(termino);
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuariosService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
        this.totalRegistro = this.usuarios.length;
      });
  }
  borrarUsuario(usuario: Usuario) {
    console.log(usuario);

    if (usuario._id === this._usuariosService.usuario._id) {
      swal(
        "No esta permitido borrar este usuario",
        "El usuario que intentas borrar es  el mismo que estas logueado",
        "error"
      );
      return;
    }
    swal({
      title: "¿Estas seguro?",
      text: "Estas a punto de borrar a " + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerModel: true
    }).then(borrar => {
      console.log(borrar);
      if (borrar) {
        this._usuariosService.borrarUsuario(usuario._id).subscribe(resp => {
          console.log(resp);
          this.cargarUsuarios();
        });
      }
    });
  }
  //ESTA FUNCION ME PERMITE GUARDAR CAMBIOS
  guardarUsuario(usuario) {
    this._usuariosService.actualizarUsuario(usuario).subscribe(resp => {
      console.log(resp);
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("usuario", id);
  }
}
