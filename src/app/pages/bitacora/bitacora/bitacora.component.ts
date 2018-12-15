import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreditoService, WebsocketService, UsuarioService } from '../../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styles: []
})
export class BitacoraComponent implements OnInit, OnDestroy {

  fecha: any;

  id: any;

  comentario: any = '';

  nombre: any;
  numero: any;
  clienteId: any;
  saldo: any;

  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = true;

  vencidoActual: any[] = [];
  comentarios: any[] = [];
  charla: any[] = [];

  observar: Subscription;

  charlaBol: boolean = false;

  constructor(
    private _creditoService: CreditoService,
    private _webSocket: WebsocketService,
    private _usuariosServices: UsuarioService
  ) {
    this.id = this._usuariosServices.usuario._id;
    let h = new Date();

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

  openModal( data: any ) {
    this.comentario = '';
    this.nombre = data.nombre;
    this.numero = data.numero;
    this.clienteId = data.clienteId;

    this._creditoService.clienteMorosoTotal(data.clienteId).subscribe( ( total: any ) => {
      this.saldo = total[0].importe;
    });

    this._creditoService.obtenerComentarios(data.clienteId).subscribe( ( resp: any ) => {
      this.charla = resp.charla.reverse();
      this.charlaBol = true;
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

}
