import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {

    this.contar3Seg()
      .then(contador => {
        console.log("el valor del contador es ", contador);
        console.log("el contador llego a 3 ");
      })
      .catch(error => {
        console.error(error);
        console.error("es diferente a 3 ");
      });
      
  }

  ngOnInit() {}

  contar3Seg(): Promise<any> {
    let promesa = new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador = contador + 1;
        console.log(contador);
        if (contador === 3) {
          resolve(contador);
          clearInterval(intervalo);
        }
        if (contador === 4) {
          reject("error en la promesa");
        }
      }, 1000);
    });
    return promesa;
  }
}
