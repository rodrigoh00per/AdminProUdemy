import { Component, OnInit, ɵConsole } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";
declare function init_plugins();
declare const gapi: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;
  password: string;

  constructor(public _router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
    init_plugins();
    this.googleInit();
  }
  //TODO LO DEL SIGIIN
  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "911836702799-lpf48l5br7hvt6kicg5amc3g4uurpej3.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });
      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token; //EL TOKEN DE USUARIO QUE SE ESTA AUTENTICANDO
      console.log(token);
      this._usuarioService.loginGoogle(token).subscribe(resp => {
        window.location.href = "#/dashboard";
      });
    });
  }
  ingresar(forma: NgForm) {
    console.log("ingresando....");
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    console.log(forma.value);
    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe(correcto => {
        this._router.navigate(["/dashboard"]);
      });
    /*  this._router.navigate(['/dashboard']); */
  }
}
