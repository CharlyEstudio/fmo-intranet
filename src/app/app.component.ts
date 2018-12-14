import { Component, OnInit } from '@angular/core';
import { SettingsService, WebsocketService, UsuarioService } from './services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  observar: Subscription;
  mostrar: boolean = false;

  private scripts: any = {};

  constructor(
    public _ajustes: SettingsService,
    private _wsService: WebsocketService,
    private _usuariosService: UsuarioService
  ) {
    if (_usuariosService.usuario !== null) {

      if (_usuariosService.usuario.rol !== 'ASE_ROLE' && _usuariosService.usuario.rol !== 'USER_ROLE') {
        this.observar = this.regresar().subscribe(
          escuchando => {
            // upNotification(escuchando.numero, escuchando.nombre, escuchando.comentario, escuchando.remitente);
            this.mostrar = true;
          },
          error => console.error(error),
          () => console.log('Fin del Observador Comentarios')
        );
      }

    }
  }

  regresar(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this._wsService.escuchar('mensaje-folio').subscribe( ( escuchando ) => {
        observer.next(escuchando);
      });
    });
  }

  ngOnInit() {
  }
}
