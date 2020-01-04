import { Component, OnInit } from '@angular/core';
import { WebsocketService, PedidosrescatadosService } from '../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-rescatados',
  templateUrl: './rescatados.component.html',
  styles: []
})
export class RescatadosComponent implements OnInit {

  rescatados: any[] = [];

  constructor(
    private _rescatados: PedidosrescatadosService,
    private ws: WebsocketService
  ) {
    this.obtenerRescatados();
    // Error al levantar pedido
    this.ws.escuchar('aviso-error-envio').subscribe((error: any) => {
      this.obtenerRescatados();
    });
  }

  ngOnInit() {
  }

  obtenerRescatados() {
    this._rescatados.obtenerRescatado().subscribe((resc: any) => {
      if (resc.status) {
        this.rescatados = resc.pedidos;
      }
    });
  }

  surtir(pedido: any) {
    this._rescatados.surtido(pedido._id).subscribe((resp: any) => {
      if (resp.status) {
        this.obtenerRescatados();
        swal('Correcto', 'Se guardo el cambio', 'success');
      } else {
        swal('Error', 'No se pudo guardar el cambio', 'error');
      }
    });
  }

}
