import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-por-surtir',
  templateUrl: './por-surtir.component.html',
  styles: []
})
export class PorSurtirComponent implements OnInit, OnDestroy {

  // Por Surtir
  surtir: Subscription;
  porSurtir: number = 0;
  porSurtirImpo: number = 0;
  intSurtir: any;

  constructor(
    private _phpService: PhpService
  ) {
    // Subscrión a Pedidos por Surtir
    this.surtir =  this.regresaSurtir().subscribe(
      numero => {
        this.porSurtir = numero.cantidad;
        this.porSurtirImpo = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {

    // Pedidos por Surtir
    this._phpService.porSurtir()
      .subscribe((data) => {
        if ( data[0].importe != 0 ) {
          this.porSurtir = data[0].cantidad;
          this.porSurtirImpo = data[0].importe;
        } else {
          this.porSurtir = 0;
          this.porSurtirImpo = 0;
        }
      });

  }

  ngOnDestroy() {

    // Intervalo por Surtir
    this.surtir.unsubscribe();
    clearInterval(this.intSurtir);

  }

  // Observable de Pedidos por Surtir
  regresaSurtir(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intSurtir = setInterval( () => {
        
        this._phpService.porSurtir()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {
              const surtir = {
                cantidad: data[0].cantidad,
                importe: data[0].importe
              };

              observer.next(surtir);
            } else {
              const surtir = {
                cantidad: 0,
                importe: 0
              };

              observer.next(surtir);
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
