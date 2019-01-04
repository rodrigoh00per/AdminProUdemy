import { Component, OnInit, Output } from "@angular/core";
import { EventEmitter } from 'protractor';

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.css"]
})
export class ProgressComponent implements OnInit {
  
  porcentaje1: number=20;
  porcentaje2: number=98;

  constructor() {

  }

   actualizarvalor(event:number){
  console.log("Evento ",event);
  this.porcentaje1 = event;

} 

  ngOnInit() {}

 
}
