import { Component, OnInit } from "@angular/core";
import { SettingsService } from "./services/service.index";
declare function init_plugins();
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [SettingsService]
})
export class AppComponent implements OnInit {
  title = "AdminPro";
  constructor(private _settings: SettingsService) {}
  ngOnInit() {
    init_plugins();
  }
}
