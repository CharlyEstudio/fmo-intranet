import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

// Servicios
import { ClientesService, TiendaService, WebsocketService, HerramientasService } from '../../services/services.index';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnDestroy {

  fecha: number = Date.now();

  mtrPed: any[] = [];

  monitor: number = 0;
  mensajes: number = 0;
  bajar: number = 0;
  bajarImpo: number = 0;

  monitorOb: Subscription;
  intervaloMon: any;
  bajarOb: Subscription;
  intervaloBajar: any;

  constructor(
    private _clienteService: ClientesService,
    private store: TiendaService,
    private herramientas: HerramientasService,
    private ws: WebsocketService
  ) {
    // Subscrión a Monitor
    this.monitorOb =  this.regresaMon().subscribe(
      (numero: any) => {
        this.monitor = numero.length;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

    // Subscrión a Monitor
    this.bajarOb =  this.regresaBajar().subscribe(
      (numero: any) => {
        this.bajar = numero[0].cantidad;
        this.bajarImpo = numero[0].importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

    // Mensajes de Contacto
    this.obtenerMensajesContacto();
    this.ws.escuchar('registro-watch').subscribe(() => {
      this.obtenerMensajesContacto();
    });
  }

  obtenerMensajesContacto() {
    this.store.obtenerMensajesContacto().subscribe((mensajes: any) => {
      if (mensajes.length > 0) {
        this.mensajes = mensajes.length;
      }
    });
  }

  // Observable de Pedidos en Monitor
  regresaMon(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intervaloMon = setInterval( () => {

        this._clienteService.obtenerPedidosMonitor().subscribe((pedidos: any) => {
          observer.next(pedidos);
        });

      }, 1000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

  // Observable de Pedidos por Bajar
  regresaBajar(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intervaloBajar = setInterval( () => {

        this._clienteService.pedidosPorBajarWeb(this.herramientas.fechaActual()).subscribe((pedidos: any) => {
          observer.next(pedidos);
        });

      }, 1000);

    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {

    // Destruir
    this.monitorOb.unsubscribe();
    clearInterval(this.intervaloMon);
    this.bajarOb.unsubscribe();
    clearInterval(this.intervaloBajar);

  }

  obtenerPedidosMonitor() {
    this._clienteService.obtenerPedidosMonitor().subscribe((pedidos: any) => {
      this.mtrPed = pedidos;
      this.monitor = pedidos.length;
    });
  }

  obtenerPorBajarWeb() {
    this._clienteService.pedidosPorBajarWeb(this.herramientas.fechaActual()).subscribe((porBajar: any) => {
      this.bajar = porBajar[0].cantidad;
      this.bajarImpo = porBajar[0].importe;
    });
  }

}
