import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styles: []
})
export class GraficoBarraComponent implements OnInit {

  // Barras
  @Input() barChartLabels: any [] = [];
  @Input() barChartData: any[] = [];
  @Input() barChartType: any [] = [];
  @Input() barChartLegend: any [] = [];
  @Input() barChartOptions: any [] = [];

  constructor() { }

  ngOnInit() {
  }

}
