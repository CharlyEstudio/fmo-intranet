import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService, ServidorService } from '../../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-vencido91',
  templateUrl: './vencido91.component.html',
  styles: []
})
export class Vencido91Component implements OnInit, OnDestroy {

  dia: string;

  // Morisidad más de 90 días
  morosidad: Subscription;
  mor: number = 0;
  intMor: any;

  constructor(
    private _phpService: PhpService,
    private _servidor: ServidorService
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

    // Morosidad
    this.iniciar();

    this._servidor.notificacion.subscribe((aviso: any) => {
      this.iniciar();
    });

    // Subscrión a Morosidad
    this.morosidad =  this.regresaMorosidad().subscribe(
      numero => {
        this.mor = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  iniciar() {
    // Morosidad
    this._phpService.mor(this.dia, '91')
      .subscribe((data) => {
        if ( data[0].importe !== 0 ) {
          this.mor = data[0].importe;
        } else {
          this.mor = 0;
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {

    // Intervalo de Total Financiado
    this.morosidad.unsubscribe();
    clearInterval(this.intMor);

  }

  // Observable de Morosidad
  regresaMorosidad(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intMor = setInterval( () => {

        this._phpService.mor(this.dia, '91')
          .subscribe( ( data ) => {

            if (data[0].importe !== 0) {

              const morosidad = {
                importe: data[0].importe
              };

              observer.next(morosidad);

            } else {

              const morosidad = {
                importe: 0
              };

              observer.next(morosidad);

            }

          });

      }, 1800000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
