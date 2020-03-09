import { Component, OnInit } from '@angular/core';

// Servicios
import { TiendaService, WebsocketService, MensajesContactoService } from '../../services/services.index';

@Component({
  selector: 'app-mensajes-contacto',
  templateUrl: './mensajes-contacto.component.html',
  styles: []
})
export class MensajesContactoComponent implements OnInit {

  mensajes: any[] = [];

  constructor(
    private store: TiendaService,
    private mensajeService: MensajesContactoService,
    private ws: WebsocketService
  ) {
    // this.obtenerMensajesContacto();
    // this.ws.escuchar('registro-watch-send').subscribe(() => {
    //   this.obtenerMensajesContacto();
    // });
  }

  ngOnInit() {
  }

  // obtenerMensajesContacto() {
  //   this.store.obtenerMensajesContacto().subscribe((mensajes: any) => {
  //     if (mensajes.length > 0) {
  //       this.mensajes = mensajes;
  //       const enviar = {
  //         cantidad: mensajes.length,
  //         mensajes: mensajes,
  //         status: true
  //       };
  //       this.mensajeService.mensajes.emit(enviar);
  //     } else {
  //       const enviar = {
  //         cantidad: 0,
  //         mensajes: [],
  //         status: false
  //       };
  //       this.mensajeService.mensajes.emit(enviar);
  //     }
  //   });
  // }

  // confirmarVisto(id: any) {
  //   this.store.confirmarVisto(id).subscribe((modificado: any) => {
  //     if (modificado.length === 0) {
  //       this.obtenerMensajesContacto();
  //     }
  //   });
  // }

}
