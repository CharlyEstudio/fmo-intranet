import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { MensajesContactoService, HerramientasService } from '../../services/services.index';

@Component({
  selector: 'app-dashborar-dir',
  templateUrl: './dashborar-dir.component.html',
  styles: []
})
export class DashborarDirComponent implements OnInit, OnDestroy {

  fecha: number = Date.now();
  mensajes: boolean = false;
  aparecer: boolean = false;
  tiempo: any;

  constructor(
    private mensajeService: MensajesContactoService,
    private herramientas: HerramientasService
  ) {
    this.mensajeService.mensajes.subscribe((mensaje: any) => {
      this.mensajes = mensaje.status;
    });

    const hora = this.herramientas.horaActual();

    if (hora >= '18:02:00') {
      this.aparecer = true;
    } else {
      this.aparecer = false;
    }

    this.verTiempo();
  }

  ngOnInit() {}

  ngOnDestroy() {
    clearInterval(this.tiempo);
  }

  verTiempo() {
    this.tiempo = setInterval(() => {
      const hora = this.herramientas.horaActual();

      if (hora >= '18:02:00') {
        this.aparecer = true;
      } else {
        this.aparecer = false;
      }
    }, 1000);
  }

}
