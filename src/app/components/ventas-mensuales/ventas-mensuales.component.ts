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
  date = new Date(this.fecha);
  dia = this.date.getDay();
  mes = this.date.getMonth() - 1;
  anio = this.date.getFullYear();

  anterior = Date.UTC(this.anio, this.mes, this.dia);
  // dia: number = new Date().getDay();
  
  // Estado de la Empresa
  heart: number = 0;

  // General
  general: Subscription;
  intervalo: any;
  
  /* ----- Ventas Mensuales ----- */
  // Ventas Actuales
  act: number = 0;
  actData: number = 0;

  // Venta Anterior
  ant: number = 0;
  antData: number = 0;

  // Venta Zona 1
  zon1: number = 0;

  // Venta Zona 2
  zon2: number = 0;

  // Venta Especiales
  espe: number = 0;

  constructor(
    private _phpService: PhpService
  ) {
    
    // Subscripción Total
    this.general = this.regresar()
      .subscribe(
        error => console.log('Error en el obs ', error),
        () => console.log('El observador termino!')
      );

  }

  regresar(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intervalo = setInterval( () => {
        
        // Venta Actual
        this._phpService.ventaActual()
          .subscribe( ( data ) => {
            if (data[0].actual != 0) {
              this.act = data[0].actual;
              this.obtenerActual(data[0].actual);
            } else {
              this.act = 0;
              this.obtenerActual(0);
            }
          });

        // Venta Zona 1
        this._phpService.zona1()
          .subscribe((data) => {
            if (data[0].zona1 != 0) {
              this.zon1 = data[0].zona1;
            } else {
              this.zon1 = 0;
            }
          });

        // Venta Zona 2
        this._phpService.zona2()
          .subscribe((data) => {
            if (data[0].zona2 != 0) {
              this.zon2 = data[0].zona2;
            } else {
              this.zon2 = 0;
            }
          });

        // Venta Especiales
        this._phpService.especial()
          .subscribe((data) => {
            if (data[0].especial != '') {
              this.espe = data[0].especial;
            } else {
              this.espe = 0;
            }
          });

      }, 10000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

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
      if ( data[0].zona1 != 0 ) {
        this.zon1 = data[0].zona1;
      } else {
        this.zon1 = 0;
      }
    });

    // Venta Zona 2
    this._phpService.zona2()
    .subscribe((data) => {
      if ( data[0].zona2 != 0 ) {
        this.zon2 = data[0].zona2;
      } else {
        this.zon2 = 0;
      }
    });

    // Venta Especial
    this._phpService.especial()
    .subscribe((data) => {
      if ( data[0].especial != 0 ) {
        this.espe = data[0].especial;
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

    // Intervalo General
    this.general.unsubscribe();
    clearInterval(this.intervalo);

  }

}
