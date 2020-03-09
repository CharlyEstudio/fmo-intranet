import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

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
        // this.cantTot = numero.cantidad,
        // this.sub = numero.subtotal;
        // this.impuesto = numero.impuesto;
        // this.tot = numero.total;
        if (numero[2] !== undefined) {
          this.cantTot = parseFloat(numero[0].cantidad) + parseFloat(numero[1].cantidad) + parseFloat(numero[2].cantidad);
          this.sub = parseFloat(numero[0].subtotal) + parseFloat(numero[1].subtotal) + parseFloat(numero[2].subtotal);
          this.impuesto = parseFloat(numero[0].impuesto) + parseFloat(numero[1].impuesto) + parseFloat(numero[2].impuesto);
          this.tot = parseFloat(numero[0].total) + parseFloat(numero[1].total) + parseFloat(numero[2].total);
        } else if (numero[1] !== undefined) {
          this.cantTot = parseFloat(numero[0].cantidad) + parseFloat(numero[1].cantidad);
          this.sub = parseFloat(numero[0].subtotal) + parseFloat(numero[1].subtotal);
          this.impuesto = parseFloat(numero[0].impuesto) + parseFloat(numero[1].impuesto);
          this.tot = parseFloat(numero[0].total) + parseFloat(numero[1].total);
        } else {
          this.cantTot = parseFloat(numero[0].cantidad);
          this.sub = parseFloat(numero[0].subtotal);
          this.impuesto = parseFloat(numero[0].impuesto);
          this.tot = parseFloat(numero[0].total);
        }
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {
    this.panel = 'https://ferremayoristas.com.mx/panel/#/';

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
          if (data[2] !== undefined) {
            this.cantTot = parseFloat(data[0].cantidad) + parseFloat(data[1].cantidad) + parseFloat(data[2].cantidad);
            this.sub = parseFloat(data[0].subtotal) + parseFloat(data[1].subtotal) + parseFloat(data[2].subtotal);
            this.impuesto = parseFloat(data[0].impuesto) + parseFloat(data[1].impuesto) + parseFloat(data[2].impuesto);
            this.tot = parseFloat(data[0].total) + parseFloat(data[1].total) + parseFloat(data[2].total);
          } else if (data[1] !== undefined) {
            this.cantTot = parseFloat(data[0].cantidad) + parseFloat(data[1].cantidad);
            this.sub = parseFloat(data[0].subtotal) + parseFloat(data[1].subtotal);
            this.impuesto = parseFloat(data[0].impuesto) + parseFloat(data[1].impuesto);
            this.tot = parseFloat(data[0].total) + parseFloat(data[1].total);
          } else {
            this.cantTot = parseFloat(data[0].cantidad);
            this.sub = parseFloat(data[0].subtotal);
            this.impuesto = parseFloat(data[0].impuesto);
            this.tot = parseFloat(data[0].total);
          }
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
            observer.next(data);
          });

      }, 4000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
