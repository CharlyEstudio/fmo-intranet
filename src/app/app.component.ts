import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

// Servicios
import { SettingsService, WebsocketService, PhpService, UsuarioService, ChoferesService } from './services/services.index';

// Configuración
import { PUERTO_INTERNO } from './config/config';

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
    private _usuarioService: UsuarioService,
    private _choferService: ChoferesService,
    private _phpService: PhpService,
    private _pushNotificationService: PushNotificationService
  ) {
    if (
      localStorage.getItem('rol') !== 'ASE_ROLE'
      && localStorage.getItem('rol') !== 'USER_ROLE'
      && localStorage.getItem('rol') !== 'OF_ROLE'
      && localStorage.getItem('rol') !== 'MESA_ROLE'
      && localStorage.getItem('rol') !== 'CONTA_ROLE'
      && localStorage.getItem('rol') !== 'CLI_ROLE') {
      // Nueva garantía realizada
      this._wsService.escuchar('nuevo-cheque-devuelto').subscribe((chd: any) => {
        const remitente = 'Cheque Devuelto';
        let comentario: any;
        switch (chd.opcion) {
          case 1:
            comentario = `${chd.msg} por $ ${chd.data}`;
            break;
          case 2:
            comentario = `${chd.msg} del Folio: ${chd.folio} Cliente: ${chd.cliente} Importe: ${chd.importe}`;
            break;
          case 3:
            comentario = `${chd.msg} del Folio: ${chd.folio} Cliente: ${chd.cliente} Importe: ${chd.importe}`;
            break;
          case 4:
            comentario = `${chd.msg} del Folio: ${chd.folio} Cliente: ${chd.cliente} Importe: ${chd.importe}`;
            break;
        }
        this.pushNotCHD(comentario, remitente);
      });

      // Nueva garantía realizada
      this._wsService.escuchar('nueva-garantia').subscribe((garantia: any) => {
        const remitente = 'Nueva Garantia';
        const comentario = 'Se realizó una nueva garantía.';
        this.pushNotGarantia(garantia.datos.numcli, garantia.datos.nomcli, comentario, remitente, garantia.usuario.img);
      });

      // Seguimientos de garantías realizada
      this._wsService.escuchar('seguimiento-garantia').subscribe((garantia: any) => {
        const remitente = 'Seguimiento de Garantia';
        const comentario = 'cambio de estado a ==' + garantia.estado + '== en la garantía ' + garantia.folio;
        this.pushNotGarantia(garantia.numeroCli, garantia.nombreCli, comentario, remitente, garantia.usuario.img);
      });

      // Nuevo Comentario del Asesor
      this._wsService.escuchar('comentario-asesor').subscribe((comentar: any) => {
        const comentario = 'Estuvo con el cliente ' + comentar.respuesta.numero + ' y su acción fue ' + comentar.respuesta.accion;
        this.pushNot(comentar.respuesta.hora, comentar.asesor.nombre, comentario, 'Visitas Asesor', comentar.asesor.img);
      });

      // Aviso de Ir con el Cliente por el chófer
      this._wsService.escuchar('aviso-ir-cliente').subscribe((ir: any) => {
        if (ir.status) {
          let numero;
          if (ir.respuesta.guia.facturas.length > 0) {
            numero = ir.respuesta.guia.facturas.length;
          } else {
            numero = 1;
          }
          this._choferService.obtenerChofer(ir.respuesta.chofer._id).subscribe((chof: any) => {
            const comentario = 'Realizando viaje a ' + ir.respuesta.guia.nombre + ', con ' + numero + ' pedidos';
            this.pushNot(ir.respuesta.chofer.nombre, 'Viajando', comentario, 'Entrega de Pedido', chof.chofer.img, false, 'choferes');
          });
        }
      });

      // Se genera nueva guía
      this._wsService.escuchar('centinela-chofer').subscribe((chofer: any) => {
        this.pushNot('Chofer', chofer.nombre, 'Nueva Guía', 'Guías', chofer.img, false, 'choferes');
      });

      // Pedido entregado por el chófer
      this._wsService.escuchar('pedido-entregado').subscribe((chofer: any) => {
        this._choferService.obtenerChofer(chofer.respuesta.chofer).subscribe((chof: any) => {
          const mesage = `Entrega pedido a ${chofer.respuesta.nomcli}`;
          this.pushNot('Chofer', chofer.respuesta.nomchofer, mesage, 'Guías', chof.chofer.img, false, 'choferes');
        });
      });

      // Se genera un nuevo pedido en la tienda
      this._wsService.escuchar('aviso-asesor').subscribe((pedido: any) => {
        this.pushNot('Pedido de', pedido.cliente.nombre, 'Nuevo pedido de la tienda', 'Tienda On-Line', pedido.cliente.numero, true);
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
        this.pushNot(escuchando.numero, escuchando.nombre, escuchando.comentario, escuchando.remitente, escuchando.img);
      });

      // Actividad realizada
      // TODO
      this._wsService.escuchar('actividad-realizada').subscribe((ok: any) => {
        console.log(ok);
        this.pushNot(ok.nombre, ok.actividad, ok.comentario, 'Actividades Diarias');
      });

      // Subscripción a NCS nuevos
      this.observarNCS =  this.regresaNC().subscribe(
        numero => {
          if ( numero.length > 0 ) {
            if (this.notas < numero.length) {
              if (numero[this.notas - 1] !== undefined) {
                this._usuarioService.buscarUsuarioEsp(numero[this.notas - 1].emisorid).subscribe((user: any) => {
                  this.notas = numero.length;
                  this.pushNot(numero[this.notas - 1].folio, numero[this.notas - 1].tiponc, numero[this.notas - 1].comentario, 'Notas de Crédito', user.usuario.img);
                });
              }
            }
          }
        },
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
      );
    } else if (localStorage.getItem('rol') === 'OF_ROLE') {
      // Nueva garantía realizada
      this._wsService.escuchar('nueva-garantia').subscribe((garantia: any) => {
        const remitente = 'Nueva Garantia';
        const comentario = 'Se realizó una nueva garantía.';
        this.pushNotGarantia(garantia.datos.numcli, garantia.datos.nomcli, comentario, remitente, garantia.usuario.img);
      });

      // Seguimientos de garantías realizada
      this._wsService.escuchar('seguimiento-garantia').subscribe((garantia: any) => {
        const remitente = 'Seguimiento de Garantia';
        const comentario = 'cambio de estado a ==' + garantia.estado + '== en la garantía ' + garantia.folio;
        this.pushNotGarantia(garantia.numeroCli, garantia.nombreCli, comentario, remitente, garantia.usuario.img);
      });
    }

    if (localStorage.getItem('rol') === 'ADMIN_ROLE') {
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
    // .retry()
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
    // .retry()
    .map((resp) => {
      return resp;
    });
  }

  ngOnInit() {
    this._pushNotificationService.requestPermission();
  }

  pushNot( numero: any, nombre: any, comentario: any, remitente: any, img: any = '', cliente: boolean = false, tipo: any = 'usuarios' ) {
    const title = 'Mensaje de ' + remitente;
    const options = new PushNotificationOptions();
    options.body = numero + ' ' + nombre +
    ', comentario: ' +
    comentario;

    if (img === '') {
      options.icon = 'assets/images/users/fmo.png';
    } else if (cliente) {
      const imgCli = 'https://ferremayoristas.com.mx/assets/clientes/' + img + '.jpg';
      if (imgCli) {
        options.icon = imgCli;
      } else {
        options.icon = 'assets/images/users/fmo.png';
      }
    } else {
      if (tipo !== 'choferes') {
        options.icon = 'https://ferremayoristas.com.mx:' + PUERTO_INTERNO + '/img' + '/usuarios/' + img;
      } else {
        options.icon = 'https://ferremayoristas.com.mx:' + PUERTO_INTERNO + '/img' + '/choferes/' + img;
      }
    }

    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        // console.log('onshow');
        // setTimeout(() => {
        //   notif.notification.close();
        // }, 30000);
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

  pushNotGarantia( numero: any, nombre: any, comentario: any, remitente: any, img: any = '', cliente: boolean = false, tipo: any = 'usuarios' ) {
    const title = remitente;
    const options = new PushNotificationOptions();
    options.body = numero + ' ' + nombre +
    ', ' +
    comentario;

    if (img === '') {
      options.icon = 'assets/images/users/fmo.png';
    } else if (cliente) {
      const imgCli = 'https://ferremayoristas.com.mx/assets/clientes/' + img + '.jpg';
      if (imgCli) {
        options.icon = imgCli;
      } else {
        options.icon = 'assets/images/users/fmo.png';
      }
    } else {
      if (tipo !== 'choferes') {
        options.icon = 'https://ferremayoristas.com.mx:' + PUERTO_INTERNO + '/img' + '/usuarios/' + img;
      } else {
        options.icon = 'https://ferremayoristas.com.mx:' + PUERTO_INTERNO + '/img' + '/choferes/' + img;
      }
    }

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

  pushNotCHD( comentario: any, remitente: any ) {
    const title = remitente;
    const options = new PushNotificationOptions();
    options.body = comentario;

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
