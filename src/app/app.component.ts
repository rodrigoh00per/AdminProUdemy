import { Component } from "@angular/core";
import { SettingsService } from "./services/service.index";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [SettingsService]
})
export class AppComponent {
  title = "AdminPro";
  constructor(private _settings: SettingsService) {
    
  }
}
