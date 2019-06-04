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
      this.panel = 'http://ferremayoristas.com.mx/panel/#/';
    }

    let h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    let fecha = anio + '-' + mes + '-' + dia;

    // Total de Pedidos
    this._phpService.totalPedidos(fecha)
      .subscribe((data) => {
        if ( data.length > 0 ) {
          this.cantTot = data[0].cantidad;
          this.sub = data[0].subtotal;
          this.impuesto = data[0].impuesto;
          this.tot = data[0].total;
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

        let h = new Date();

        let dia;

        if (h.getDate() < 10) {
          dia = '0' + h.getDate();
        } else {
          dia = h.getDate();
        }

        let mes;

        if (h.getMonth() < 10) {
          mes = '0' + (h.getMonth() + 1);
        } else {
          mes = (h.getMonth() + 1);
        }

        let anio = h.getFullYear();

        let fecha = anio + '-' + mes + '-' + dia;

        this._phpService.totalPedidos(fecha)
          .subscribe( ( data ) => {

            if (data.length > 0) {
              const totales = {
                cantidad: data[0].cantidad,
                subtotal: data[0].subtotal,
                impuesto: data[0].impuesto,
                total: data[0].total
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
