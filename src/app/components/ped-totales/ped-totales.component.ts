import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';
import { URL_SERVICIO_GENERAL } from '../../config/config';

@Component({
  selector: 'app-ped-totales',
  templateUrl: './ped-totales.component.html',
  styles: []
})
export class PedTotalesComponent implements OnInit, OnDestroy {

  // Totales
  totales: Subscription;
  sub: number = 0;
  impuesto: number = 0;
  tot: number = 0;
  cantTot: number = 0;
  intTotales: any;
  panel: any;

  constructor(
    private _phpService: PhpService
  ) {

    // Subscrión a Pedidos Totales
    this.totales =  this.regresaTotales().subscribe(
      numero => {
        this.cantTot = numero.cantidad,
        this.sub = numero.subtotal;
        this.impuesto = numero.impuesto;
        this.tot = numero.total;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250' || URL_SERVICIO_GENERAL === 'http://localhost') {
      this.panel = 'http://192.168.1.250/panel/#/';
    } else {
      this.panel = 'http://177.244.55.122:8080/panel/#/';
    }

    // Total de Pedidos
    this._phpService.totalPedidos()
      .subscribe((data) => {
        if ( data[0].importe !== 0 ) {
          this.cantTot = data[0].cantidad + data[1].cantidad,
          this.sub = data[0].subtotal + data[1].subtotal;
          this.impuesto = data[0].impuesto + data[1].impuesto;
          this.tot = data[0].total + data[1].total;
        } else {
          this.cantTot = 0,
          this.sub = 0;
          this.impuesto = 0;
          this.tot = 0;
        }
      });

  }

  ngOnDestroy() {

    // Intervalo de Pedidos Totales
    this.totales.unsubscribe();
    clearInterval(this.intTotales);

  }

  // Observable de Pedidos Totales
  regresaTotales(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intTotales = setInterval( () => {

        this._phpService.totalPedidos()
          .subscribe( ( data ) => {

            if (data[0].importe !== 0) {
              const totales = {
                cantidad: data[0].cantidad + data[1].cantidad,
                subtotal: data[0].subtotal + data[1].subtotal,
                impuesto: data[0].impuesto + data[1].impuesto,
                total: data[0].total + data[1].total
              };

              observer.next(totales);
            } else {
              const totales = {
                cantidad: 0,
                subtotal: 0,
                impuesto: 0,
                total: 0
              };

              observer.next(totales);
            }

          });

      }, 4000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
