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
  heart: number = 0;

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

        this.obtener(this.tot, this.sal, this.ven);
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
  obtener(saldo, sana, vencido){
    let regla1 = (sana / saldo) * 100;
    let regla2 = (vencido / saldo) * 100;

    if ( regla1 >= 70 && regla2 <= 30 ) {
      this.heart = 3;
    } else if ( regla1 >= 60 && regla2 <= 35 ) {
      this.heart = 2;
    } else if ( regla1 < 60 && regla2 > 35) {
      this.heart = 1;
    }
  }

}
