import { Component, OnInit } from '@angular/core';

// Servicios
import { TiendaService, WebsocketService } from '../../services/services.index';

@Component({
  selector: 'app-mensajes-contacto',
  templateUrl: './mensajes-contacto.component.html',
  styles: []
})
export class MensajesContactoComponent implements OnInit {

  mensajes: any[] = [];

  constructor(
    private store: TiendaService,
    private ws: WebsocketService
  ) {
    this.obtenerMensajesContacto();
    this.ws.escuchar('registro-watch').subscribe(() => {
      this.obtenerMensajesContacto();
    });
  }

  ngOnInit() {
  }

  obtenerMensajesContacto() {
    this.store.obtenerMensajesContacto().subscribe((mensajes: any) => {
      if (mensajes.length > 0) {
        this.mensajes = mensajes;
      }
    });
  }

  confirmarVisto(id: any) {
    this.store.confirmarVisto(id).subscribe((modificado: any) => {
      if (modificado.length === 0) {
        this.obtenerMensajesContacto();
      }
    });
  }

}
