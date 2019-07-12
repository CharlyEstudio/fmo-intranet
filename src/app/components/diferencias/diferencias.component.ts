import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

import { PhpService, UsuarioService, DiferenciasService } from '../../services/services.index';

@Component({
  selector: 'app-diferencias',
  templateUrl: './diferencias.component.html',
  styles: []
})
export class DiferenciasComponent implements OnInit, OnDestroy {

  // @Output() enviar = new EventEmitter();

  observar: Subscription;
  intervalo: any;

  saldos: any[] = [];

  diferencia: boolean = false;

  constructor(
    private _phpService: PhpService,
    private _usuarioService: UsuarioService,
    private _diferencias: DiferenciasService
  ) {
    // Subscrión a Diferencias
    this.observar =  this.regresa().subscribe(
      numero => {
        if (this._usuarioService.usuario !== null) {
          if (this._usuarioService.usuario.rol === 'DIR_ROLE' || this._usuarioService.usuario.rol === 'GER_ROLE' || this._usuarioService.usuario.rol === 'ADMIN_ROLE') {
            if ( numero.length > 0 ) {
              this._diferencias.notificacion.emit(numero);
              this.diferencia = true;
            } else {
              this._diferencias.notificacion.emit([]);
              this.diferencia = false;
            }
          }
        }
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval(() => {
        this._phpService.diferencias()
          .subscribe( ( resp: any ) => {
            observer.next(resp);
          });
      }, 10000);
    })
    .retry()
    .map((resp) => {
      return resp;
    });
  }

  ngOnInit() {
    if (this._usuarioService.usuario.rol === 'DIR_ROLE' || this._usuarioService.usuario.rol === 'GER_ROLE' || this._usuarioService.usuario.rol === 'ADMIN_ROLE') {
      // Diferencias
      this._phpService.diferencias()
        .subscribe( ( resp: any ) => {
          if ( resp.length > 0 ) {
            console.log(resp);
            this._diferencias.notificacion.emit(resp);
            this.diferencia = true;
          } else {
            this.diferencia = false;
          }
        });
    }
  }

  ngOnDestroy() {

    if (this._usuarioService.rol === 'DIR_ROLE' || this._usuarioService.rol === 'GER_ROLE' || this._usuarioService.rol === 'ADMIN_ROLE') {
      // Intervalo por Surtir
      this.observar.unsubscribe();
      clearInterval(this.intervalo);
    }

  }

}
