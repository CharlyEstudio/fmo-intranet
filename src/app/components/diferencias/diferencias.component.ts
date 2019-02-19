import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

import { PhpService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-diferencias',
  templateUrl: './diferencias.component.html',
  styles: []
})
export class DiferenciasComponent implements OnInit, OnDestroy {

  observar: Subscription;
  datos: any[] = [];
  intervalo: any;

  diferencia: boolean = false;

  constructor(
    private _phpService: PhpService,
    private _usuarioService: UsuarioService
  ) {
    if (this._usuarioService.rol === 'DIR_ROLE' || this._usuarioService.rol === 'GER_ROLE' || this._usuarioService.rol === 'ADMIN_ROLE') {
      // Subscrión a Diferencias
      this.observar =  this.regresa().subscribe(
        numero => {
          this.datos = numero;
        },
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
      );
    }
  }

  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval(() => {
        this._phpService.diferencias()
          .subscribe( ( resp: any ) => {
            if ( resp !== 0 ) {
              this.diferencia = true;
            } else {
              this.diferencia = false;
            }
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
    if (this._usuarioService.rol === 'DIR_ROLE' || this._usuarioService.rol === 'GER_ROLE' || this._usuarioService.rol === 'ADMIN_ROLE') {
      // Diferencias
      this._phpService.diferencias()
        .subscribe( ( resp: any ) => {
          if ( resp !== 0 ) {
            this.diferencia = true;
            this.datos = resp;
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
