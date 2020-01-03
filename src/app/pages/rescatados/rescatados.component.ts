import { Component, OnInit } from '@angular/core';
import { PedidosrescatadosService } from '../../services/services.index';

@Component({
  selector: 'app-rescatados',
  templateUrl: './rescatados.component.html',
  styles: []
})
export class RescatadosComponent implements OnInit {

  rescatados: any[] = [];

  constructor(
    private _rescatados: PedidosrescatadosService
  ) {
    this.obtenerRescatados();
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

}
