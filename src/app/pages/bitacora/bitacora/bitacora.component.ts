import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

import { CreditoService, WebsocketService, UsuarioService } from '../../../services/services.index';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styles: []
})
export class BitacoraComponent implements OnInit, OnDestroy {

  dias: any[] = [];
  data: any[] = [];

  fecha: any;

  id: any;

  rol: any;

  comentario: any = '';

  nombre: any;
  numero: any;
  clienteId: any;
  saldo: any;
  rango: any;

  respuestaGeneral: boolean = false;
  esperar: boolean = true;
  busquedaComentarios: boolean = false;

  vencidoActual: any[] = [];
  comentarios: any[] = [];
  charla: any[] = [];
  busqueda: any[] = [];

  observar: Subscription;

  charlaBol: boolean = false;
  sinsaldo: boolean = false;
  buscarBol: boolean = false;

  constructor(
    private router: Router,
    private _creditoService: CreditoService,
    private _webSocket: WebsocketService,
    private _usuariosServices: UsuarioService
  ) {
    this.id = this._usuariosServices.usuario._id;
    this.rol = this._usuariosServices.usuario.rol;
    let h = new Date();

    for (let i = 1; i <= new Date().getDate(); i++) {
      this.dias.push(i);
    }

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    this.fecha = anio + '-' + mes + '-' + dia;

    this._creditoService.obtenerComentariosDia(this.fecha).subscribe( ( comentarios: any ) => {
      if (comentarios.charla.length !== 0) {
        this.comentarios = comentarios.charla.reverse();
        this.esperar = false;
        this.respuestaGeneral = true;
        this.busquedaComentarios = false;
      } else {
        this.esperar = false;
        this.respuestaGeneral = false;
        this.busquedaComentarios = true;
      }
    });

    this.observar = this.regresar().subscribe(
      comentarios => {
        if (comentarios.clienteId !== 0) {
          this._creditoService.obtenerComentariosDia(this.fecha).subscribe( ( nuevoComentario: any ) => {
            this.comentarios = nuevoComentario.charla.reverse();
          });
          this._creditoService.obtenerComentarios(comentarios.clienteId).subscribe( ( resp: any ) => {
            this.charla = resp.charla.reverse();
            this.charlaBol = true;
          });
        }
      },
      error => console.error(error),
      () => console.log('Fin del Observador Comentarios')
    );
  }

  cambiarComentarios( dia: number ) {
    let h = new Date();

    let day;

    if (dia < 10) {
      day = '0' + dia;
    } else {
      day = dia;
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    this.fecha = anio + '-' + mes + '-' + day;

    this._creditoService.obtenerComentariosDia(this.fecha).subscribe( ( nuevoComentario: any ) => {
      if (nuevoComentario.charla.length !== 0) {
        this.busquedaComentarios = false;
        this.respuestaGeneral = true;
        this.comentarios = nuevoComentario.charla.reverse();
      } else {
        this.busquedaComentarios = true;
        this.respuestaGeneral = false;
      }
    });

    document.getElementById("principal").click();
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

  openModal( data: any, tipo: any = '' ) {
    this.comentario = '';
    this.data = [];
    this.data.push(data);
    console.log(this.data);
    this.charlaBol = false;
    this.nombre = data.nombre;
    this.numero = data.numero;
    this.clienteId = data.clienteId;
    this.rango = data.rango;

    if (tipo !== '') {

      this._creditoService.clienteMorosoTotal(data.clienteId).subscribe( ( total: any ) => {
        this.saldo = total[0].importe;
      });

    } else {
      this.saldo = data.saldo;
    }

    this._creditoService.obtenerComentarios(data.clienteId).subscribe( ( resp: any ) => {
      if (resp.ok && resp.charla.length > 0) {
        this.charla = resp.charla.reverse();
        this.charlaBol = true;
      }
    });
  }

  enviarComentario( forma: NgForm, id: any ) {
    if (forma.value.comentario === '') {
      swal('Debe ingresar un comentario', 'No ha ingresado un comentario a este folio.', 'error');
      return;
    }

    let h = new Date();

    let hor;

    if (h.getHours() < 10) {
      hor = '0' + h.getHours();
    } else {
      hor = h.getHours();
    }

    let min;

    if (h.getMinutes() < 10) {
      min = '0' + h.getMinutes();
    } else {
      min = h.getMinutes();
    }

    let sec;

    if (h.getSeconds() < 10) {
      sec = '0' + h.getSeconds();
    } else {
      sec = h.getSeconds();
    }

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    let hora = hor + ':' + min + ':' + sec;

    let fecha = anio + '-' + mes + '-' + dia;

    let venHist = {
      clienteId: this.clienteId,
      numero: this.numero,
      nombre: this.nombre,
      comentario: forma.value.comentario,
      fecha: fecha,
      hora: hora,
      rango: this.rango,
      remitente: this._usuariosServices.usuario.nombre
    };

    this._creditoService.guardarComentario(venHist).subscribe( ( resp: any ) => {
      if (resp.ok) {
        this.charlaBol = true;
        this._webSocket.acciones('mensaje-folio', venHist, respuesta => {
          console.log(respuesta)
        });

        this.comentario = '';
        forma.value.comentario = '';
      }
    });
  }

  buscar(termino: any) {
    this.sinsaldo = false;
    this.buscarBol = true;
    this.busqueda = [];
    this._creditoService.morosidadRelacionCliente(termino).subscribe((cuentas: any) => {
      if (cuentas.length > 0) {
        this.busqueda = cuentas;
        this.buscarBol = false;
      } else {
        this.buscarBol = false;
        this.sinsaldo = true;
      }
    }, err => {
      console.log(err);
    });
  }

  irInfo( data: any ) {
    document.getElementById("cerrarModalBusq").click();
    this.router.navigate(['/infoFacturas/', data.clienteId, data.nombre, data.numero, data.rango]);
  }

}
