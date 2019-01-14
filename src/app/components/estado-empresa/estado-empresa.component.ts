import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-estado-empresa',
  templateUrl: './estado-empresa.component.html',
  styles: []
})
export class EstadoEmpresaComponent implements OnInit, OnDestroy {

  // Estado de la Empresa
  heart: number = 0;

  /* ----- Ventas Mensuales ----- */
  // Ventas Actuales
  actual: Subscription;
  act: number = 0;
  actData: number = 0;
  intActual: any;

  // Venta Anterior
  ant: number = 0;
  antData: number = 0;

  constructor(
    private _phpService: PhpService
  ) {

    // Subscrión a Venta Actual
    this.actual =  this.regresaTotales().subscribe(
      numero => {
        this.act = numero.actual;
        this.obtenerActual(numero.actual);
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {
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

    let final = anio + '-' + mes + '-' + dia;
    let inicio = anio + '-' + mes + '-' + '01';

    // Venta Anterior
    this._phpService.ventaAnterior()
      .subscribe((data) => {
        if ( data[0].anterior !== 0 ) {
          this.ant = data[0].anterior;
        } else {
          this.ant = 0;
        }

        this.obtenerAnterior(data[0].anterior);
      });

    // Venta Actual
    this._phpService.ventaActual(inicio, final)
      .subscribe((data) => {
        if ( data[0].actual !== 0 ) {
          this.act = data[0].actual;
        } else {
          this.act = 0;
        }

        this.obtenerActual(data[0].actual);
      });

  }

  obtenerAnterior(data) {

    this.antData = data;

  }

  obtenerActual(data) {

    this.actData = data;

    this.calcularEstado();

  }

  calcularEstado() {

    let day = new Date().getDay();

    let promAct = this.actData / day;

    let promAnt = this.antData / 20;

    if ( promAct < promAnt ) {
      this.heart = 1;
    } else if ( promAct === promAnt ) {
      this.heart = 2;
    } else if ( promAct > promAnt ) {
      this.heart = 3;
    }

    // let obtenerEstado = (this.actData / this.antData) * 100;

    // if ( obtenerEstado === Infinity ) {

    //   this.heart = 0;

    // } else if ( obtenerEstado < 50 ) {

    //   if ( day <= 10 ) {

    //     this.heart = 2;

    //   }

    //   if ( day >= 7) {

    //     this.heart = 1;

    //   }

    // } else if ( obtenerEstado < 70 ) {

    //   this.heart = 2;

    // } else {

    //   this.heart = 3;

    // }

  }

  ngOnDestroy() {

    // Intervalo de Ventas Actuales
    this.actual.unsubscribe();
    clearInterval(this.intActual);

  }

  // Observable de Ventas Actuales
  regresaTotales(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intActual = setInterval( () => {

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

        let final = anio + '-' + mes + '-' + dia;
        let inicio = anio + '-' + mes + '-' + '01';

        this._phpService.ventaActual(inicio, final)
          .subscribe( ( data ) => {

            if (data[0].actual !== 0) {

              const actual = {
                actual: data[0].actual
              };

              observer.next(actual);

            } else {

              const actual = {
                actual: 0
              };

              observer.next(actual);

            }

          });

      }, 10000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
