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
        if ( data[0].importe != 0 ) {
          this.porBajar = data[0].cantidad;
          this.porBajarImpo = data[0].importe;
        } else {
          this.porBajar = 0;
          this.porBajarImpo = 0;
        }
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

        this._phpService.porBajar()
          .subscribe( ( data ) => {

            if(data[0].importe != 0) {
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

      }, 3000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
