import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/observable";
import { retry, map, filter } from "rxjs/operators";
import { Subscriber } from "rxjs/Subscriber";
import { Subscription } from "rxjs/Subscription";
@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styleUrls: ["./rxjs.component.css"]
})
export class RxjsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      numero => {
        console.log("Los numeros impares son");
        console.log("Subs", numero);
      },
      error => {
        console.error("Hubo un problema al suscribirme");
      },
      () => {
        console.log("El observable se completo de manera exitosa");
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    //este nos sirve para saber cuando una persona se esta iendo de ese componente
console.log("CERRASTE EL RXJS");
    this.subscription.unsubscribe();  //con esto eliminamos la subscripcion de ese observable
  }
  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador = contador + 1;
        const salida = {
          valor: contador
        };

        observer.next(salida); //cada vez  queremos notificar algo
        /* if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */
      }, 1000);
    }).pipe(
      map(resp => resp.valor), //para poner otro operador
      filter((valor, index) => valor % 2 === 1) //afuerzas tiene que regresar un true o un  false el filter
      //aqui tambien podemos meter un bonito  if usando un callback
    );
  }
}
