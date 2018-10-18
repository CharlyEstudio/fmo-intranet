import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-ped-cancelados',
  templateUrl: './ped-cancelados.component.html',
  styles: []
})
export class PedCanceladosComponent implements OnInit, OnDestroy {

  // Cancelados
  cancelados: Subscription;
  cance: number = 0;
  canceImpo: number = 0;
  intCance: any;

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
    // Subscrión a Pedidos Cancelados
    this.cancelados =  this.regresaCancelados().subscribe(
      numero => {
        this.cance = numero.cantidad;
        this.canceImpo = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {

    // Pedidos Cancelados
    this._phpService.cancelados()
      .subscribe((data) => {
        if ( data[0].importe != 0 ) {
          this.cance = data[0].cantidad;
          this.canceImpo = data[0].importe;
        } else {
          this.cance =0;
          this.canceImpo = 0;
        }
      });

    // Cancelados Zona 1
    this._phpService.canceladoZona('2')
      .subscribe( ( data ) => {
        this.zona1 = data[0].cantidad;
        this.zona1Impo = data[0].importe;
      });

    // Cancelados Zona 2
    this._phpService.canceladoZona('1')
      .subscribe( ( data ) => {
        this.zona2 = data[0].cantidad;
        this.zona2Impo = data[0].importe;
      });

    // Cancelados Especiales
    this._phpService.canceladoEspecial()
      .subscribe( ( data ) => {
        this.especiales = data[0].cantidad;
        this.especialesImpo = data[0].importe;
      });
  }

  ngOnDestroy() {
    // Intervalo de Cancelados
    this.cancelados.unsubscribe();
    clearInterval(this.intCance);
  }

  // Observable de Pedidos Cancelados
  regresaCancelados(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intCance = setInterval( () => {
        
        // Cancelados Totales
        this._phpService.cancelados()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {
              const cancelados = {
                cantidad: data[0].cantidad,
                importe: data[0].importe
              };

              observer.next(cancelados);
            } else {
              const cancelados = {
                cantidad: 0,
                importe: 0
              };

              observer.next(cancelados);
            }

          });

        // Cancelados Zona 1
        this._phpService.canceladoZona('2')
        .subscribe( ( data ) => {
          this.zona1 = data[0].cantidad;
          this.zona1Impo = data[0].importe;
        });

        // Cancelados Zona 2
        this._phpService.canceladoZona('1')
          .subscribe( ( data ) => {
            this.zona2 = data[0].cantidad;
            this.zona2Impo = data[0].importe;
          });

        // Cancelados Especiales
        this._phpService.canceladoEspecial()
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
