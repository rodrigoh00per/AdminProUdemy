import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
declare function init_plugins();
import swal from "sweetalert";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  public forma: FormGroup;
  //ES IMPORTANTE IMPORTAR LOS REACTIVE FORMS
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales("password", "password2") }
    );
    this.forma.setValue({
      nombre: "Test",
      correo: "test@test.com",
      password: "123456",
      password2: "123456",
      condiciones: true
    });
  }
  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      swal("Importante", "Debe de Aceptar las condiciones", "warning");
      return;
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(resp => {
      console.log(resp);
      this._router.navigate(["/login"]);
    });
    console.log(this.forma.value);
    console.log(this.forma.valid);
  }

  sonIguales(campo1: string, campo2: string) {
    //SE NECESITA RETORNAR UNA FUNCION Y QUE REGRESE UN FORM GROUP
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      } else {
        return { sonIguales: true }; //AQUI REGRESAS UN TRUE SI NO ES VALIDO
      }
    };
  }
}
