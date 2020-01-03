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
  dia: string;

  // Estado Financiero
  heart: number = 0;

  /* ----- Estatus Financiero ----- */
  // General
  general: Subscription;
  gen: number = 0;
  genData: number = 0;
  intervalo: any;

  // Total Financiado
  tot2019: number = 0;
  tot2020: number = 0;
  totData: number = 0;

  // Total Financiado
  sal2019: number = 0;
  sal2020: number = 0;
  salData: number = 0;

  // Total Financiado
  ven2019: number = 0;
  ven2020: number = 0;
  venData: number = 0;

  constructor(
    private _phpService: PhpService
  ) {
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

    this.dia = anio + '-' + mes + '-' + dia;

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
        // Total Financiado 2019
        this._phpService.financiado2019()
        .subscribe((data) => {
          if ( data[0].importe !== 0 ) {
            this.tot2019 = data[0].importe;
          } else {
            this.tot2019 = 0;
          }
        });

        // Total Financiado 2020
        this._phpService.financiado2020()
        .subscribe((data) => {
          if ( data[0].importe !== 0 ) {
            this.tot2020 = data[0].importe;
          } else {
            this.tot2020 = 0;
          }
        });

        // Total Saldo al día 2019
        this._phpService.saldo2019(this.dia)
        .subscribe((data) => {
          if ( data[0].importe !== 0 ) {
            this.sal2019 = data[0].importe;
          } else {
            this.sal2019 = 0;
          }
        });

        // Total Saldo al día 2019
        this._phpService.saldo2020(this.dia)
        .subscribe((data) => {
          if ( data[0].importe !== 0 ) {
            this.sal2020 = data[0].importe;
          } else {
            this.sal2020 = 0;
          }
        });

        // Total Saldo Vencido 2020
        this._phpService.vencido2020(this.dia)
        .subscribe((data) => {
          if ( data[0].importe !== 0 ) {
            this.ven2020 = data[0].importe;
          } else {
            this.ven2020 = 0;
          }
        });

        // Total Saldo Vencido 2019
        this._phpService.vencido2019(this.dia)
        .subscribe((data) => {
          if ( data[0].importe !== 0 ) {
            this.ven2019 = data[0].importe;
          } else {
            this.ven2019 = 0;
          }
        });

        this.obtener(this.tot2020, this.sal2020, this.ven2020);
      }, 10000);
    })
  }

  ngOnInit() {

    // Total Financiado 2019
    this._phpService.financiado2019()
      .subscribe((data) => {
        if ( data[0].importe !== 0 ) {
          this.tot2019 = data[0].importe;
        } else {
          this.tot2019 = 0;
        }
      });

    // Total Financiado 2020
    this._phpService.financiado2020()
      .subscribe((data) => {
        if ( data[0].importe !== 0 ) {
          this.tot2020 = data[0].importe;
        } else {
          this.tot2020 = 0;
        }
      });

    // Total Saldo al día 2019
    this._phpService.saldo2019(this.dia)
    .subscribe((data) => {
      if ( data[0].importe !== 0 ) {
        this.sal2019 = data[0].importe;
      } else {
        this.sal2019 = 0;
      }
    });

    // Total Saldo al día 2020
    this._phpService.saldo2020(this.dia)
    .subscribe((data) => {
      if ( data[0].importe !== 0 ) {
        this.sal2020 = data[0].importe;
      } else {
        this.sal2020 = 0;
      }
    });

    // Total Saldo Vencido 2020
    this._phpService.vencido2020(this.dia)
    .subscribe((data) => {
      if ( data[0].importe !== 0 ) {
        this.ven2020 = data[0].importe;
      } else {
        this.ven2020 = 0;
      }
    });

    // Total Saldo Vencido 2019
    this._phpService.vencido2019(this.dia)
    .subscribe((data) => {
      if ( data[0].importe !== 0 ) {
        this.ven2019 = data[0].importe;
      } else {
        this.ven2019 = 0;
      }
    });

  }

  ngOnDestroy() {

    // Intervalo General
    this.general.unsubscribe();
    clearInterval(this.intervalo);

  }

  // Calcular Heart
  obtener(saldo: any, sana: any, vencido: any) {
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
