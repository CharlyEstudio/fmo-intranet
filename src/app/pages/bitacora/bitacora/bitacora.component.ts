import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreditoService, WebsocketService } from '../../../services/services.index';

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
  comentarios: any[] = [];

  observar: Subscription;

  constructor(
    private _creditoService: CreditoService,
    private _webSocket: WebsocketService
  ) {
    this._creditoService.obtenerComentariosDia('2018-12-13').subscribe( ( comentarios: any ) => {
      if (comentarios.charla.length) {
        this.comentarios = comentarios.charla.reverse();
        this.esperar = false;
        this.ventas = false;
        this.respuestaGeneral = true;
      } else {
        this.esperar = false;
        this.ventas = true;
        this.respuestaGeneral = false;
      }
    });

    this.observar = this.regresar().subscribe(
      comentarios => {
        if (comentarios.clienteId !== 0) {
          this._creditoService.obtenerComentariosDia('2018-12-13').subscribe( ( nuevoComentario: any ) => {
            this.comentarios = nuevoComentario.charla.reverse();
          });
        }
      },
      error => console.error(error),
      () => console.log('Fin del Observador Comentarios')
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.observar.unsubscribe();
  }

  regresar(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this._webSocket.escuchar('mensaje-folio').subscribe( ( escuchando ) => {
        observer.next(escuchando);
      });
    });
  }

}
