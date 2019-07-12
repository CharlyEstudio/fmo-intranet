import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

// Servicios
import { SettingsService, WebsocketService, ClientesService, PhpService } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  observar: Subscription;
  monitorOb: Subscription;
  observarNCS: Subscription;

  pedidos: number = 0;
  notas: number = 0;

  constructor(
    public _ajustes: SettingsService,
    private _wsService: WebsocketService,
    private _clienteService: ClientesService,
    private _phpService: PhpService,
    private _pushNotificationService: PushNotificationService
  ) {

    this._pushNotificationService.requestPermission();
    if (
      localStorage.getItem('rol') !== 'ASE_ROLE'
      && localStorage.getItem('rol') !== 'USER_ROLE'
      && localStorage.getItem('rol') !== 'OF_ROLE'
      && localStorage.getItem('rol') !== 'MESA_ROLE'
      && localStorage.getItem('rol') !== 'CLI_ROLE') {
      // Nuevo Comentario del Asesor
      this._wsService.escuchar('comentario-asesor').subscribe((comentar: any) => {
        const comentario = 'Estuvo con el cliente ' + comentar.respuesta.numero + ' y su acción fue ' + comentar.respuesta.accion;
        this.pushNot(comentar.respuesta.hora, comentar.asesor.nombre, comentario, 'Visitas Asesor');
      });

      // Se genera nueva guía
      this._wsService.escuchar('centinela-chofer').subscribe((chofer: any) => {
        this.pushNot('Chofer', chofer.nombre, 'Nueva Guía', 'Guías');
      });

      // Se genera un nuevo pedido en la tienda
      this._wsService.escuchar('aviso-asesor').subscribe((pedido: any) => {
        this.pushNot('Pedido de', pedido.cliente.nombre, 'Nuevo pedido de la tienda', 'Tienda On-Line');
      });

      // Nuevo Cliente registrado en la tienda
      this._wsService.escuchar('registro-watch').subscribe((registro: any) => {
        if (registro.nombre) {
          let numero;
          if (registro.numero) {
            numero = registro.numero;
          } else {
            numero = 'Sin Número';
          }
          this.pushNot(numero, registro.nombre, 'Nuevo cliente registrado desde la tienda.', 'Tienda On-Line');
        } else {
          this.pushNot('Hay', 'nuevo', 'Se registro un nuevo comentario desde la tienda.', 'Tienda On-Line');
        }
      });

      // Nuevo mensaje de la bitacora
      this._wsService.escuchar('mensaje-folio').subscribe( ( escuchando: any ) => {
        this.pushNot(escuchando.numero, escuchando.nombre, escuchando.comentario, escuchando.remitente);
      });
      // this.observar = this.regresar().subscribe(
      //   escuchando => {
      //     // swal(
      //     //   'Mensaje de ' + escuchando.remitente,
      //     //   'Cliente ' +
      //     //     '# ' + escuchando.numero + ' - ' + escuchando.nombre +
      //     //     '. Comentario: ' +
      //     //     escuchando.comentario,
      //     //   'success'
      //     // );
      //     this.pushNot(escuchando.numero, escuchando.nombre, escuchando.comentario, escuchando.remitente);
      //   },
      //   error => console.error(error),
      //   () => console.log('Fin del Observador Comentarios')
      // );

      // Actividad realizada
      this._wsService.escuchar('actividad-realizada').subscribe((ok: any) => {
        console.log(ok);
          this.pushNot(ok.nombre, ok.actividad, ok.comentario, 'Actividades Diarias');
      });

      // Subscripción a Diferencias
      this.observar =  this.regresa().subscribe(
        numero => {
          if ( numero.length > 0 ) {
            this.pushNot('Saldos', 'Diferentes', 'Se encontraron saldos diferentes en clientes, favor de revisar.', 'Diferencia de Saldos');
          }
        },
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
      );

      // Subscripción a NCS nuevos
      this.observarNCS =  this.regresaNC().subscribe(
        numero => {
          if ( numero.length > 0 ) {
            if (this.notas < numero.length) {
              this.notas = numero.length;
              this.pushNot(numero[this.notas - 1].folio, numero[this.notas - 1].tiponc, numero[this.notas - 1].comentario, 'Notas de Crédito');
            }
          }
        },
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
      );
    }

  }

  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      setInterval(() => {
        this._phpService.diferencias()
          .subscribe( ( resp: any ) => {
            observer.next(resp);
          });
      }, 10000);
    })
    .retry()
    .map((resp) => {
      return resp;
    });
  }

  regresaNC(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      setInterval(() => {
        this._phpService.nuevosNC()
          .subscribe( ( resp: any ) => {
            observer.next(resp);
          });
      }, 10000);
    })
    .retry()
    .map((resp) => {
      return resp;
    });
  }

  // regresar(): Observable<any> {
  //   return new Observable( ( observer: Subscriber<any> ) => {
  //     this._wsService.escuchar('mensaje-folio').subscribe( ( escuchando ) => {
  //       observer.next(escuchando);
  //     });
  //   });
  // }

  ngOnInit() {}

  pushNot( numero: any, nombre: any, comentario: any, remitente: any ) {
    const title = 'Mensaje de ' + remitente;
    const options = new PushNotificationOptions();
    options.body = numero + ' ' + nombre +
    ', comentario: ' +
    comentario;
    options.icon = 'assets/images/users/fmo.png';

    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        // console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 30000);
      }
      if (notif.event.type === 'click') {
        // console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        // console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
  }
}
