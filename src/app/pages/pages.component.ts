import { Component, OnInit } from "@angular/core";
declare function init_plugins();//de esta manera podemos llamar cualquier script que no este accesible de manera rapida con angular 

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html"
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    init_plugins();
  }
}
