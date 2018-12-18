import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';


import { AsesoresService } from '../../services/services.index';

@Component({
  selector: 'app-cobranza-general',
  templateUrl: './cobranza-general.component.html',
  styles: []
})
export class CobranzaGeneralComponent implements OnInit, OnDestroy {

  observar: Subscription;
  intervalo: any;

  cobranza: any[] = [];
  cheques: number = 0;
  transferencia: number = 0;
  tarjeta: number = 0;
  efectivo: number = 0;
  notas: number = 0;
  total: number = 0;

  constructor(
    private _asesorService: AsesoresService
  ) {
    // Subscrión a Diferencias
    this.observar =  this.regresa().subscribe(
      numero => {
        this.cheques = 0;
        this.efectivo = 0;
        this.transferencia = 0;
        this.notas = 0;
        this.tarjeta = 0;
        this.total = 0;
        this.cobranza = numero;
        for (let i = 0; i < this.cobranza.length; i++) {

          if (this.cobranza[i].formapago === 'C') {
            this.cheques += this.cobranza[i].pagado;
          }

          if (this.cobranza[i].formapago === 'E') {
            this.efectivo += this.cobranza[i].pagado;
          }

          if (this.cobranza[i].formapago === 'R') {
            this.transferencia += this.cobranza[i].pagado;
          }

          if (this.cobranza[i].formapago === 'S') {
            this.notas += this.cobranza[i].pagado;
          }

          if (this.cobranza[i].formapago === 'T') {
            this.tarjeta += this.cobranza[i].pagado;
          }

          // this.total += this.cobranza[i].pagado;

        }

        this.total = this.cheques + this.efectivo + this.transferencia + this.tarjeta;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {

    this.cheques = 0;
    this.efectivo = 0;
    this.transferencia = 0;
    this.notas = 0;
    this.tarjeta = 0;
    this.total = 0;

    // Otebtener Pagos
    this._asesorService.cobranza()
      .subscribe( ( resp: any ) => {
        this.cobranza = resp;

        for (let i = 0; i < this.cobranza.length; i++) {

          if (this.cobranza[i].formapago === 'C') {
            this.cheques += this.cobranza[i].pagado;
          }

          if (this.cobranza[i].formapago === 'E') {
            this.efectivo += this.cobranza[i].pagado;
          }

          if (this.cobranza[i].formapago === 'R') {
            this.transferencia += this.cobranza[i].pagado;
          }

          if (this.cobranza[i].formapago === 'S') {
            this.notas += this.cobranza[i].pagado;
          }

          if (this.cobranza[i].formapago === 'T') {
            this.tarjeta += this.cobranza[i].pagado;
          }

        }

        this.total = this.cheques + this.efectivo + this.transferencia + this.tarjeta;

      });

  }

  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval(() => {
        this._asesorService.cobranza()
          .subscribe( ( resp: any ) => {
            observer.next(resp);
          });
      }, 1000);
    })
    .retry()
    .map((resp) => {
      return resp;
    });
  }

  ngOnDestroy() {
    // Intervalo por Surtir
    this.observar.unsubscribe();
    clearInterval(this.intervalo);
  }

}
