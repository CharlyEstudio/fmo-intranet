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

      }, 3000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
