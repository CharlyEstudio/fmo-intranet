import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-ventas-mensuales',
  templateUrl: './ventas-mensuales.component.html',
  styles: []
})
export class VentasMensualesComponent implements OnInit, OnDestroy {

  fecha: number = Date.now();
  // fecha: number = new Date().getDay();
  
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

  // Venta Zona 1
  zona1: Subscription;
  zon1: number = 0;
  intZon1: any;

  // Venta Zona 2
  zona2: Subscription;
  zon2: number = 0;
  intZon2: any;

  // Venta Especiales
  especial: Subscription;
  espe: number = 0;
  intEspe: any;

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

    // Subscrión a Venta Zona 1
    this.zona1 =  this.regresaZona1().subscribe(
      numero => {
        this.zon1 = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

    // Subscrión a Venta Zona 2
    this.zona2 =  this.regresaZona2().subscribe(
      numero => {
        this.zon2 = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

    // Subscrión a Venta Especial
    this.especial =  this.regresaEspecial().subscribe(
      numero => {
        this.espe = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {

    // Venta Anterior
    this._phpService.ventaAnterior()
      .subscribe((data) => {
        if ( data[0].anterior != 0 ) {
          this.ant = data[0].anterior;
        } else {
          this.ant = 0;
        }

        this.obtenerAnterior(data[0].anterior);
      });

    // Venta Actual
    this._phpService.ventaActual()
      .subscribe((data) => {
        if ( data[0].actual != 0 ) {
          this.act = data[0].actual;
        } else {
          this.act = 0;
        }

        this.obtenerActual(data[0].actual);
      });

    // Venta Zona 1
    this._phpService.zona1()
    .subscribe((data) => {
      if ( data[0].importe != 0 ) {
        this.zon1 = data[0].importe;
      } else {
        this.zon1 = 0;
      }
    });

    // Venta Zona 2
    this._phpService.zona2()
    .subscribe((data) => {
      if ( data[0].importe != 0 ) {
        this.zon2 = data[0].importe;
      } else {
        this.zon2 = 0;
      }
    });

    // Venta Especial
    this._phpService.especial()
    .subscribe((data) => {
      if ( data[0].importe != 0 ) {
        this.espe = data[0].importe;
      } else {
        this.espe = 0;
      }
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

    if ( (this.actData / this.antData) === Infinity ) {

      this.heart = 0;

    } else if ( promAct < promAnt ) {

      this.heart = 1;

    } else if ( promAct === promAnt ) {

      this.heart = 2;

    } else if ( promAct > promAnt ) {

      this.heart = 3;

    }

  }

  ngOnDestroy() {

    // Intervalo de Ventas Actuales
    this.actual.unsubscribe();
    clearInterval(this.intActual);

    // Intervalo de Ventas Zona 1
    this.zona1.unsubscribe();
    clearInterval(this.intZon1);

    // Intervalo de Ventas Zona 2
    this.zona2.unsubscribe();
    clearInterval(this.intZon2);

    // Intervalo de Venta Especial
    this.especial.unsubscribe();
    clearInterval(this.intEspe);

  }

  // Observable de Ventas Actuales
  regresaTotales(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intActual = setInterval( () => {
        
        this._phpService.ventaActual()
          .subscribe( ( data ) => {

            if (data[0].actual != 0) {

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

  // Observable de Ventas Zona 1
  regresaZona1(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intZon1 = setInterval( () => {
        
        this._phpService.zona1()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {

              const zona1 = {
                importe: data[0].importe
              };

              observer.next(zona1);

            } else {

              const zona1 = {
                importe: 0
              };

              observer.next(zona1);

            }

          });

      }, 10000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

  // Observable de Ventas Zona 2
  regresaZona2(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intZon2 = setInterval( () => {
        
        this._phpService.zona2()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {

              const zona2 = {
                importe: data[0].importe
              };

              observer.next(zona2);

            } else {

              const zona2 = {
                importe: 0
              };

              observer.next(zona2);

            }

          });

      }, 10000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

  // Observable de Ventas Zona 2
  regresaEspecial(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intEspe = setInterval( () => {
        
        this._phpService.especial()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {

              const especial = {
                importe: data[0].importe
              };

              observer.next(especial);

            } else {

              const especial = {
                importe: 0
              };

              observer.next(especial);

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
