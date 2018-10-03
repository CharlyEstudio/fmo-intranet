import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-ped-facturados',
  templateUrl: './ped-facturados.component.html',
  styles: []
})
export class PedFacturadosComponent implements OnInit, OnDestroy {

  // facturados
  facturados: Subscription;
  factu: number = 0;
  factuImpo: number = 0;
  intFactu: any;

  constructor(
    private _phpService: PhpService
  ) {
    // Subscrión a Pedidos Facturados
    this.facturados =  this.regresaFacturados().subscribe(
      numero => {
        this.factu = numero.cantidad;
        this.factuImpo = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {

    // Pedidos Facturados
    this._phpService.facturados()
      .subscribe((data) => {
        if ( data[0].importe != 0 ) {
          this.factu = data[0].cantidad;
          this.factuImpo = data[0].importe;
        } else {
          this.factu = 0;
          this.factuImpo = 0;
        }
      });

  }

  ngOnDestroy() {
    // Intervalo de Facturados
    this.facturados.unsubscribe();
    clearInterval(this.intFactu);
  }

  // Observable de Pedidos Facturados
  regresaFacturados(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intFactu = setInterval( () => {
        
        this._phpService.facturados()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {
              const facturados = {
                cantidad: data[0].cantidad,
                importe: data[0].importe
              };

              observer.next(facturados);
            } else {
              const facturados = {
                cantidad: 0,
                importe: 0
              };

              observer.next(facturados);
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
