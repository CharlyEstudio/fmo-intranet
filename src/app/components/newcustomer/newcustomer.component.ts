import { Component, OnInit } from '@angular/core';

// Servicios
import { WebsocketService } from '../../services/services.index';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styles: []
})
export class NewcustomerComponent implements OnInit {

  usuarioRegistrado: boolean = false;

  constructor(
    private _webSocket: WebsocketService
  ) {
    this._webSocket.escuchar('registro-watch').subscribe((registro: any) => {
      if (registro.activo === 'NOT') {
        this.usuarioRegistrado = true;
      } else {
        this.usuarioRegistrado = false;
      }
    });
  }

  ngOnInit() {}

}
