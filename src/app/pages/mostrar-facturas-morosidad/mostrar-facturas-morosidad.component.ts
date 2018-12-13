import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditoService, UsuarioService, WebsocketService } from '../../services/services.index';

import { NgForm } from '@angular/forms';
import { VencidoHistorial } from '../../models/vencidoHistorial.model';

@Component({
  selector: 'app-mostrar-facturas-morosidad',
  templateUrl: './mostrar-facturas-morosidad.component.html',
  styles: []
})
export class MostrarFacturasMorosidadComponent implements OnInit {

  id: any;

  comentario: any = '';
  charla: any[] = [];

  nombre: any;
  numero: any;

  clienteId: any;
  folio: any;
  saldo: any;
  diasVen: any;

  mor1a28: any[] = [];
  mor29a45: any[] = [];
  mor46: any[] = [];

  mor128Bol: boolean = false;
  mor2945Bol: boolean = false;
  mor46Bol: boolean = false;

  constructor(
    private router: Router,
    private get: ActivatedRoute,
    private _creditoService: CreditoService,
    private _sockets: WebsocketService,
    private _usuariosServices: UsuarioService
  ) {
    this.id = this._usuariosServices.usuario._id;

    this.nombre = this.get.snapshot.paramMap.get("nombre");
    this.numero = this.get.snapshot.paramMap.get("numero");

    this.obtenerMor1a28(this.get.snapshot.paramMap.get("clienteid"), 'mor1a28');
    this.obtenerMor29a48(this.get.snapshot.paramMap.get("clienteid"), 'mor29a48');
    this.obtenerMor46(this.get.snapshot.paramMap.get("clienteid"), 'mor46');
  }

  ngOnInit() {
    this._sockets.escuchar('mensaje-folio').subscribe( ( ( escuchando: any ) => {
      console.log(escuchando);
      if (escuchando.comentario !== '') {
        swal(
          'Nuevo Mensaje',
          'Se ha registrado un nuevo comentario en el Folio ' +
            escuchando.folio +
            '. Y el comentario fue: ' +
            escuchando.comentario,
          'success'
        );
        this._creditoService.obtenerComentarios(escuchando.folio, escuchando.clienteId).subscribe( ( resp: any ) => {
          this.charla = resp.charla;
        });
      }
    }));
  }

  obtenerMor1a28( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor1a28 = relacion;
      if (this.mor1a28.length === 0) {
        this.mor128Bol = false;
      } else {
        this.mor128Bol = true;
      }
    });


  }

  obtenerMor29a48( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor29a45 = relacion;
      if (this.mor29a45.length === 0) {
        this.mor2945Bol = false;
      } else {
        this.mor2945Bol = true;
      }
    });


  }

  obtenerMor46( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor46 = relacion;
      if (this.mor46.length === 0) {
        this.mor46Bol = false;
      } else {
        this.mor46Bol = true;
      }
    });


  }

  openModal( data: any ) {
    this.clienteId = data.clienteid;
    this.folio = data.folio;
    this.saldo = data.saldo;
    this.diasVen = data.dias_vencidos;

    this._creditoService.obtenerComentarios(this.folio, this.clienteId).subscribe( ( resp: any ) => {
      this.charla = resp.charla;
    });
  }

  regresar() {
    this.router.navigate(['/infoBitacora/', this.get.snapshot.paramMap.get("tipo")]);
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

    let venHist = new VencidoHistorial(
      this.clienteId,
      this.folio,
      forma.value.comentario,
      fecha,
      hora
    );

    this._creditoService.guardarComentario(venHist).subscribe( ( resp: any ) => {
      if (resp.ok) {
        this._sockets.acciones('mensaje-folio', venHist, respuesta => {
          console.log(respuesta)
        });

        this.comentario = '';
        forma.value.comentario = '';
      }
    });
  }

}
