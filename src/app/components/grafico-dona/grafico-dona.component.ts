import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-grafico-dona",
  templateUrl: "./grafico-dona.component.html",
  styleUrls: ["./grafico-dona.component.css"]
})
export class GraficoDonaComponent implements OnInit {
  @Input() ChartLabels: string[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail-Order Sales"
  ];
  @Input()  ChartData: number[] = [350, 450, 100];
  @Input() ChartType: string = "doughnut";
  constructor() {}

  ngOnInit() {}
}
