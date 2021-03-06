import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService, HerramientasService } from '../../services/services.index';

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
  fec: any = new Date(this.fecha);
  mesAnt: any;
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
    private _phpService: PhpService,
    private _herramientas: HerramientasService
  ) {

    this.mesAnt = this._herramientas.fechaAnterior();

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

        let h = new Date();

        let dia;

        if (h.getDate() < 10) {
          dia = '0' + h.getDate();
        } else {
          dia = h.getDate();
        }

        let mes;

        if ((h.getMonth() + 1) < 10) {
          mes = '0' + (h.getMonth() + 1);
        } else {
          mes = (h.getMonth() + 1);
        }

        let anio = h.getFullYear();

        let final = anio + '-' + mes + '-' + dia;
        let inicio = anio + '-' + mes + '-' + '01';

        // Venta Actual
        this._phpService.ventaActual(inicio, final)
          .subscribe( ( data ) => {
            if (data !== 0) {
              this.act = data.actual;
              this.obtenerActual(data.actual);
            } else {
              this.act = 0;
              this.obtenerActual(0);
            }
          });

        // Venta Zona 1
        this._phpService.zona(inicio, final, '1')
          .subscribe((data) => {
            if (data !== 0) {
              this.zon1 = data.zona1;
            } else {
              this.zon1 = 0;
            }
          });

        // Venta Zona 2
        this._phpService.zona(inicio, final, '2')
          .subscribe((data) => {
            if (data !== 0) {
              this.zon2 = data.zona2;
            } else {
              this.zon2 = 0;
            }
          });

        // Venta Especiales
        this._phpService.especial(inicio, final)
          .subscribe((data) => {
            if (data !== '') {
              this.espe = data.especial;
            } else {
              this.espe = 0;
            }
          });

      }, 10000);

    });

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

    if ((h.getMonth() + 1) < 10) {
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
        if ( data !== 0 ) {
          this.act = data.actual;
        } else {
          this.act = 0;
        }

        this.obtenerActual(data.actual);
      });

    // Venta Zona 1
    this._phpService.zona(inicio, final, '1')
    .subscribe((data) => {
      if ( data !== 0 ) {
        this.zon1 = data.zona1;
      } else {
        this.zon1 = 0;
      }
    });

    // Venta Zona 2
    this._phpService.zona(inicio, final, '2')
    .subscribe((data) => {
      if ( data !== 0 ) {
        this.zon2 = data.zona2;
      } else {
        this.zon2 = 0;
      }
    });

    // Venta Especial
    this._phpService.especial(inicio, final)
    .subscribe((data) => {
      if ( data !== 0 ) {
        this.espe = data.especial;
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
