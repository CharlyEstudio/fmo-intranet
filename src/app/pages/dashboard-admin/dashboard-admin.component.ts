import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

// Socket Service
import { WebsocketService, ClientesService } from '../../services/services.index';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styles: []
})
export class DashboardAdminComponent implements OnInit, OnDestroy {

  monitor: Subscription;
  intervalo: any;
  pedidosWeb: number = 0;

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
    private _webSocket: WebsocketService,
    private _clienteService: ClientesService
  ) {
    this._webSocket.escuchar('producto-visto').subscribe((producto: any) => {
      console.table(producto);
      this.producto = producto.descripcion;
    });

    // Subscrión a Monitor
    this.monitor =  this.regresa().subscribe(
      (numero: any) => this.pedidosWeb = numero.length,
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  // Observable de Pedidos por Bajar
  regresa(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intervalo = setInterval( () => {

        this._clienteService.obtenerPedidosMonitor().subscribe((pedidos: any) => {
          observer.next(pedidos);
        });

      }, 1000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

  ngOnDestroy() {

    // Intervalo por Bajar
    this.monitor.unsubscribe();
    clearInterval(this.intervalo);

  }

  ngOnInit() {}

}
