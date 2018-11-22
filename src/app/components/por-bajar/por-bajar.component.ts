import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

import { PhpService } from '../../services/services.index';

@Component({
  selector: 'app-por-bajar',
  templateUrl: './por-bajar.component.html',
  styles: []
})
export class PorBajarComponent implements OnInit, OnDestroy {

  // Por Bajar
  porBajar: number = 0;
  porBajarImpo: number = 0;
  bajar: Subscription;
  intBajar: any;

  // Por Zona o Lugar
  zona1: number = 0;
  zona1Impo: number = 0;
  zona2: number = 0;
  zona2Impo: number = 0;
  especiales: number = 0;
  especialesImpo: number = 0;

  constructor(
    private _phpService: PhpService
  ) {
    // Subscrión a Pedidos por Bajar
    this.bajar =  this.regresaBajar().subscribe(
      numero => {
        this.porBajar = numero.cantidad;
        this.porBajarImpo = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {

    // Pedidos por Bajar
    this._phpService.porBajar()
      .subscribe((data) => {
        if ( data[0].importe !== 0 ) {
          this.porBajar = data[0].cantidad;
          this.porBajarImpo = data[0].importe;
        } else {
          this.porBajar = 0;
          this.porBajarImpo = 0;
        }
      });

    // Por Bajar Zona 1
    this._phpService.porBajarZona('2')
      .subscribe( ( data ) => {
        this.zona1 = data[0].cantidad;
        this.zona1Impo = data[0].importe;
      });

    // Por Bajar Zona 2
    this._phpService.porBajarZona('1')
      .subscribe( ( data ) => {
        this.zona2 = data[0].cantidad;
        this.zona2Impo = data[0].importe;
      });

    // Por Bajar Especiales
    this._phpService.porBajarEspecial()
      .subscribe( ( data ) => {
        this.especiales = data[0].cantidad;
        this.especialesImpo = data[0].importe;
      });

  }

  ngOnDestroy() {

    // Intervalo por Bajar
    this.bajar.unsubscribe();
    clearInterval(this.intBajar);

  }

  // Observable de Pedidos por Bajar
  regresaBajar(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intBajar = setInterval( () => {

        // Por Bajar Total
        this._phpService.porBajar()
          .subscribe( ( data ) => {

            if (data[0].importe !== 0) {
              const bajar = {
                cantidad: data[0].cantidad,
                importe: data[0].importe
              };

              observer.next(bajar);
            } else {
              const bajar = {
                cantidad: 0,
                importe: 0
              };

              observer.next(bajar);
            }

          });

        // Por Bajar Zona 1
        this._phpService.porBajarZona('2')
        .subscribe( ( data ) => {
          this.zona1 = data[0].cantidad;
          this.zona1Impo = data[0].importe;
        });

        // Por Bajar Zona 2
        this._phpService.porBajarZona('1')
          .subscribe( ( data ) => {
            this.zona2 = data[0].cantidad;
            this.zona2Impo = data[0].importe;
          });

        // Por Bajar Especiales
        this._phpService.porBajarEspecial()
          .subscribe( ( data ) => {
            this.especiales = data[0].cantidad;
            this.especialesImpo = data[0].importe;
          });

      }, 3000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
