import { Component, OnInit } from '@angular/core';

// Servicios
import { MensajesContactoService } from '../../services/services.index';

@Component({
  selector: 'app-dashborar-dir',
  templateUrl: './dashborar-dir.component.html',
  styles: []
})
export class DashborarDirComponent implements OnInit {

  fecha: number = Date.now();
  mensajes: boolean = false;

  constructor(
    private mensajeService: MensajesContactoService
  ) {
    this.mensajeService.mensajes.subscribe((mensaje: any) => {
      this.mensajes = mensaje.status;
    });
  }

  ngOnInit() {}

}
