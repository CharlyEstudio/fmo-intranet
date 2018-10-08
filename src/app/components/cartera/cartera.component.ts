import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styles: []
})
export class CarteraComponent implements OnInit, OnDestroy {

  fecha: number = Date.now();

  // Estado Financiero
  heart: number = 1;

  /* ----- Estatus Financiero ----- */
  // General
  general: Subscription;
  gen: number = 0;
  genData: number = 0;
  intervalo: any;

  // Total Financiado
  tot: number = 0;
  totData: number = 0;

  // Total Financiado
  sal: number = 0;
  salData: number = 0;

  // Total Financiado
  ven: number = 0;
  venData: number = 0;

  constructor(
    private _phpService: PhpService
  ) {

    // Subscripción General
    this.general  = this.regresar()
      .subscribe(
        datos => console.log(datos),
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
      );

  }

  regresar(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      this.intervalo = setInterval(() => {
        // Total Financiado
        this._phpService.financiado()
        .subscribe((data) => {
          if ( data[0].importe != 0 ) {
            this.tot = data[0].importe;
          } else {
            this.tot = 0;
          }
        });

        // Total Saldo al día
        this._phpService.saldo()
        .subscribe((data) => {
          if ( data[0].importe != 0 ) {
            this.sal = data[0].importe;
          } else {
            this.sal = 0;
          }
        });

        // Total Saldo Vencido
        this._phpService.vencido()
        .subscribe((data) => {
          if ( data[0].importe != 0 ) {
            this.ven = data[0].importe;
          } else {
            this.ven = 0;
          }
        });
      }, 10000);
    })
  }

  ngOnInit() {

    // Total Financiado
    this._phpService.financiado()
      .subscribe((data) => {
        if ( data[0].importe != 0 ) {
          this.tot = data[0].importe;
        } else {
          this.tot = 0;
        }
      });

    // Total Saldo al día
    this._phpService.saldo()
    .subscribe((data) => {
      if ( data[0].importe != 0 ) {
        this.sal = data[0].importe;
      } else {
        this.sal = 0;
      }
    });

    // Total Saldo Vencido
    this._phpService.vencido()
    .subscribe((data) => {
      if ( data[0].importe != 0 ) {
        this.ven = data[0].importe;
      } else {
        this.ven = 0;
      }
    });

  }

  ngOnDestroy() {

    // Intervalo General
    this.general.unsubscribe();
    clearInterval(this.intervalo);

  }

  // Calcular Heart
  // obtenerAnterior(data) {

  //   this.antData = data;

  // }

  // obtenerActual(data) {

  //   this.actData = data;

  //   this.calcularEstado();

  // }

  // calcularEstado() {

  //   let day = new Date().getDay();

  //   let promAct = this.actData / day;

  //   let promAnt = this.antData / 20;

  //   if ( (this.actData / this.antData) === Infinity ) {

  //     this.heart = 0;

  //   } else if ( promAct < promAnt ) {

  //     this.heart = 1;

  //   } else if ( promAct === promAnt ) {

  //     this.heart = 2;

  //   } else if ( promAct > promAnt ) {

  //     this.heart = 3;

  //   }

  // }

}
