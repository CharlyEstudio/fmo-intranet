import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditoService, UsuarioService, WebsocketService } from '../../services/services.index';

import { NgForm } from '@angular/forms';

// import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-mostrar-info-bitacora',
  templateUrl: './mostrar-info-bitacora.component.html',
  styles: []
})
export class MostrarInfoBitacoraComponent implements OnInit {

  id: any;
  rol: any;

  morosidad: any[] = [];
  charla: any[] = [];
  pagos: any[] = [];

  comentario: any = '';
  tipo: any;

  total: number = 0;

  nombre: any;
  numero: any;

  clienteId: any;
  saldo: any;

  charlaBol: boolean = false;

  constructor(
    private router: Router,
    private get: ActivatedRoute,
    private _creditoService: CreditoService,
    private _sockets: WebsocketService,
    private _usuariosServices: UsuarioService,
  ) {
    this.id = this._usuariosServices.usuario._id;
    this.rol = this._usuariosServices.usuario.rol;
    this.tipo = this.get.snapshot.paramMap.get("data");
    this.obtener(this.tipo);
  }

  ngOnInit() {
    this._sockets.escuchar('mensaje-folio-send').subscribe( ( ( escuchando: any ) => {
      if (escuchando.comentario !== '') {
        swal(
          'Mensaje de ' + escuchando.remitente,
          'Cliente ' +
            escuchando.numero + escuchando.nombre +
            '. Comentario: ' +
            escuchando.comentario,
          'success'
        );
        this._creditoService.obtenerComentarios(escuchando.clienteId).subscribe( ( resp: any ) => {
          this.charla = resp.charla.reverse();
          this.charlaBol = true;
        });
      }
    }));
  }

  obtener( morosidad: any ) {

    this._creditoService.morosidadRelacion(morosidad).subscribe( ( relacion: any ) => {
      for (let i = 0; i < relacion.length; i++) {
        this._creditoService.pagosMes( relacion[i].clienteid ).subscribe( ( pagosMes: any ) => {
          this._creditoService.obtenerComentarios(relacion[i].clienteid).subscribe( ( comentarios: any ) => {
            let mor = {
              clienteid: relacion[i].clienteid,
              nombre: relacion[i].nombre,
              numero: relacion[i].numero,
              td: relacion[i].td,
              asesor: relacion[i].asesor,
              saldo: relacion[i].saldo,
              pagosMes: pagosMes[0].cantidad,
              mensajes: comentarios.charla.length
            };

            this.morosidad.push(mor);

            this.morosidad.sort((a, b) => {
              if (a.saldo < b.saldo) {
                return 1;
              }

              if (a.saldo > b.saldo) {
                return -1;
              }

              return 0;
            });

          });
        });
      }

    });

    this._creditoService.morosidadRelacionVirtual(morosidad).subscribe( ( totalMor: any ) => {
      this.total = totalMor[0].saldo;
    });

  }

  irInfo( data: any ) {
    this.router.navigate(['/infoFacturas/', data.clienteid, data.nombre, data.numero, this.tipo]);
  }

  regresar() {
    this.router.navigate(['/direccionCuentas/']);
  }

  openModalPagos( data: any ) {
    this._creditoService.ultimosPagos(data.clienteid).subscribe( ( pagos: any ) => {
      this.pagos = pagos;
    });
  }

  openModal( data: any ) {
    this.charla = [];
    this.charlaBol = false;
    this.clienteId = data.clienteid;
    this.nombre = data.nombre;
    this.numero = data.numero;
    this.saldo = data.saldo;

    this._creditoService.obtenerComentarios(this.clienteId).subscribe( ( resp: any ) => {
      if (resp.charla.length !== 0) {
        this.charla = resp.charla.reverse();
        this.charlaBol = true;
      }
    });
  }

  enviarComentario( forma: NgForm ) {
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
      rango: this.tipo,
      remitente: this._usuariosServices.usuario.nombre,
      img: this._usuariosServices.usuario.img
    };


    this._creditoService.guardarComentario(venHist).subscribe( ( resp: any ) => {
      if (resp.ok) {
        this.charlaBol = true;
        this._sockets.acciones('mensaje-folio', venHist, respuesta => {
          console.log(respuesta)
        });

        this.comentario = '';
        forma.value.comentario = '';
      }
    });
  }

}
