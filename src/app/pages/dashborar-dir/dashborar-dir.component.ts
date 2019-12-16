import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { MensajesContactoService, HerramientasService, TiendaService, WebsocketService, ChequesdevService } from '../../services/services.index';

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
  importeFacturado: number = 0;

  todos: number = 0;
  pendientes: number = 0;
  cobrados: number = 0;
  terminados: number = 0;

  constructor(
    private mensajeService: MensajesContactoService,
    private herramientas: HerramientasService,
    private store: TiendaService,
    private ws: WebsocketService,
    private chequesDevService: ChequesdevService
  ) {
    // this.mensajeService.mensajes.subscribe((mensaje: any) => {
    //   this.mensajes = mensaje.status;
    // });

    this.obtenemosChquesDev();

    // this.store.obtenerMensajesContacto().subscribe((mensajes: any) => {
    //   if (mensajes.length > 0) {
    //     this.mensajes = true;
    //   } else {
    //     this.mensajes = false;
    //   }
    // });

    this.ws.escuchar('nuevo-cheque-devuelto').subscribe((nuevo: any) => {
      this.obtenemosChquesDev();
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

  chequesPendientes() {
    this.chequesDevService.obtenerPendientes().subscribe((pend: any) => {
      if (pend.length > 0) {
        this.pendientes = pend.length;
      } else {
        this.pendientes = 0;
      }
    });
  }

  obtenemosChquesDev() {
    this.chequesDevService.obtenemosChquesDev().subscribe((cheques: any) => {
      if (cheques.length > 0) {
        this.todos = cheques.length;
      }
    });

    this.chequesDevService.obtenerPendientes().subscribe((pend: any) => {
      if (pend.length > 0) {
        this.pendientes = pend.length;
      } else {
        this.pendientes = 0;
      }
    });

    this.chequesDevService.obtenerCobrados().subscribe((cob: any) => {
      if (cob.length > 0) {
        this.cobrados = cob.length;
      }
    });

    this.chequesDevService.obtenerTerninados().subscribe((term: any) => {
      if (term.length > 0) {
        this.terminados = term.length;
      }
    });
  }

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
