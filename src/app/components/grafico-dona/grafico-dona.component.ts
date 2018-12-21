import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit, OnChanges {

  // Doughnut
  @Input() ChartLabels: string [] = [];
  @Input() ChartData: number [] = [];
  @Input() ChartType: string [] = [];
  @Input() leyenda: string [] = [];

  porcentaje: number = 0;
  titulo: string = '';

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.porcentaje = this.ChartData[0] / 100;
    this.titulo = 'Vendido';
  }

  // events
  public chartClicked(e: any): void {
    if (e.active[0] !== undefined) {
      let index = e.active[0]._index;
      this.porcentaje = this.ChartData[index] / 100;

      if (index === 0) {
        this.titulo = 'Vendido';
      } else {
        this.titulo = 'BackOrder';
      }
    }
  }

}
