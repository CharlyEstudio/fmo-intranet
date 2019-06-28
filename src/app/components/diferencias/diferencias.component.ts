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

  numero: any = '';
  nombre: string = '';
  saldoCliente: number = 0;
  saldoDoc: number = 0;
  dif: number = 0;
  tipo: string = '';

  constructor(
    private _phpService: PhpService,
    private _usuarioService: UsuarioService
  ) {
    if (this._usuarioService.rol === 'DIR_ROLE' || this._usuarioService.rol === 'GER_ROLE' || this._usuarioService.rol === 'ADMIN_ROLE') {
      // Subscrión a Diferencias
      this.observar =  this.regresa().subscribe(
        numero => {
          if ( numero.numero !== undefined ) {
            this.diferencia = true;
            this.numero = numero.numero;
            this.nombre = numero.nombre;
            this.saldoCliente = numero.saldoCliente;
            this.saldoDoc = numero.saldoDoc;
            this.dif = numero.diferencia;
            this.tipo = numero.tipo;
            this.datos = numero;
          } else {
            this.diferencia = false;
            this.numero = 0;
            this.nombre = '';
            this.saldoCliente = 0;
            this.saldoDoc = 0;
            this.dif = 0;
            this.tipo = '';
            this.datos = [];
          }
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
          if ( resp.numero !== undefined ) {
            this.diferencia = true;
            this.numero = resp.numero;
            this.nombre = resp.nombre;
            this.saldoCliente = resp.saldoCliente;
            this.saldoDoc = resp.saldoDoc;
            this.dif = resp.diferencia;
            this.tipo = resp.tipo;
            this.datos = resp;
          } else {
            this.diferencia = false;
            this.numero = 0;
            this.nombre = '';
            this.saldoCliente = 0;
            this.saldoDoc = 0;
            this.dif = 0;
            this.tipo = '';
            this.datos = [];
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
