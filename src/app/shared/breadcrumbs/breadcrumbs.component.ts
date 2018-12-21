import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { map, filter } from "rxjs/operators";
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";
@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  private titulo: string;
  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) {
    this.getDataRoute().subscribe((data: any) => {
      this.titulo = data.titulo;
      this._title.setTitle(this.titulo);

      const metatag: MetaDefinition = {
        name:"description",
        content:this.titulo
      };
      this._meta.updateTag(metatag);
    });
  }

  ngOnInit() {}
  getDataRoute() {
    return this._router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento2: ActivationEnd) => evento2.snapshot.firstChild === null),
      map((eventof: ActivationEnd) => eventof.snapshot.data)
    );
  }
}
