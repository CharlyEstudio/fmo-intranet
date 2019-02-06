import { Component, OnInit } from '@angular/core';

// Socket Service
import { WebsocketService } from '../../services/services.index';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styles: []
})
export class DashboardAdminComponent implements OnInit {

  lineChartData: Array<any> = [
    {data: [0, 0, 0, 0], label: 'Mes 1'},
    {data: [0, 0, 0, 0], label: 'Mes 2'},
    {data: [0, 0, 0, 0], label: 'Mes 3'}
  ];

  lineChartLabels: Array<any> = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
  lineChartOptions: any = {
    responsive: true
  };

  lineChartColors: Array<any> = [
    { // rojo
      backgroundColor: 'rgba(206, 52, 76,0.2)', // fondo
      borderColor: 'rgba(206, 52, 76,1)', // puntos
      pointBackgroundColor: 'rgba(206, 52, 76,1)',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(206, 52, 76,0.8)' // línea
    },
    { // azul
      backgroundColor: 'rgba(52, 136, 206,0.2)',
      borderColor: 'rgba(52, 136, 206,1)',
      pointBackgroundColor: 'rgba(52, 136, 206,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(52, 136, 206,1)'
    },
    { // grey
      backgroundColor: 'rgba(101, 106, 102,0.2)',
      borderColor: 'rgba(101, 106, 102,1)',
      pointBackgroundColor: 'rgba(101, 106, 102,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(101, 106, 102,0.8)'
    }
  ];

  producto: any;

  constructor(
    private _webSocket: WebsocketService
  ) { }

  ngOnInit() {
    this._webSocket.escuchar('producto-visto').subscribe((producto: any) => {
      console.table(producto);
      this.producto = producto.descripcion;
    });
  }

}
