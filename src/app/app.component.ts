import { Component, OnInit } from '@angular/core';
import { SettingsService, WebsocketService, UsuarioService } from './services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

// import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  observar: Subscription;

  constructor(
    public _ajustes: SettingsService,
    private _wsService: WebsocketService,
    private _usuariosService: UsuarioService,
    // private _pushNotificationService: PushNotificationService
  ) {

    // this._pushNotificationService.requestPermission();
    this.observar = this.regresar().subscribe(
      escuchando => {
        if (
          localStorage.getItem('rol') !== 'ASE_ROLE'
          && localStorage.getItem('rol') !== 'USER_ROLE'
          && localStorage.getItem('rol') !== 'OF_ROLE'
          && localStorage.getItem('rol') !== 'MESA_ROLE'
          && localStorage.getItem('rol') !== 'CLI_ROLE') {
          swal(
            'Mensaje de ' + escuchando.remitente,
            'Cliente ' +
              '# ' + escuchando.numero + ' - ' + escuchando.nombre +
              '. Comentario: ' +
              escuchando.comentario,
            'success'
          );
          // this.pushNot(escuchando.numero, escuchando.nombre, escuchando.comentario, escuchando.remitente);
        }
      },
      error => console.error(error),
      () => console.log('Fin del Observador Comentarios')
    );

  }

  regresar(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this._wsService.escuchar('mensaje-folio').subscribe( ( escuchando ) => {
        observer.next(escuchando);
      });
    });
  }

  ngOnInit() {
    // this._pushNotificationService.requestPermission();
  }

  /*pushNot( numero: any, nombre: any, comentario: any, remitente: any ) {
    const title = 'Mensaje de ' + remitente;
    const options = new PushNotificationOptions();
    options.body = numero + ' ' + nombre +
    ', comentario: ' +
    comentario;
    options.icon = 'assets/images/users/fmo.png';

    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 10000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
  }*/
}
