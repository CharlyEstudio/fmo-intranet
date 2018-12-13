import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreditoService } from '../../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styles: []
})
export class BitacoraComponent implements OnInit, OnDestroy {

  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = true;

  vencidoActual: any[] = [];

  observar: Subscription;
  intervalo: any;

  constructor(
    private _creditoService: CreditoService
  ) {
    this.observar = this.regresar().subscribe(
      vencido => {
        console.log(vencido);
        if (vencido.length > 0) {
          this.vencidoActual = vencido;
          this.esperar = false;
          this.ventas = false;
          this.respuestaGeneral = true;
        } else {
          this.esperar = false;
          this.ventas = true;
          this.respuestaGeneral = false;
        }
      },
      error => console.error(error),
      () => console.log('Fin del Observador Vencido')
    );
  }

  ngOnInit() {
    /*this._creditoService.obtenerCarteraVencida().subscribe( ( vencido: any ) => {
      this.vencidoActual = vencido;

      console.log(vencido);

      if (this.vencidoActual.length > 0) {
        this.esperar = false;
        this.ventas = false;
        this.respuestaGeneral = true;
      } else {
        this.esperar = false;
        this.ventas = true;
        this.respuestaGeneral = false;
      }

    });*/
  }

  ngOnDestroy() {
    this.observar.unsubscribe();
    clearInterval(this.intervalo);
  }

  regresar(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intervalo = setInterval( () => {
        this._creditoService.obtenerCarteraVencida().subscribe( ( vencido: any ) => {
          observer.next(vencido);
        });
      }, 1000);
    });
  }

}
