import { Component, OnInit } from '@angular/core';
import { UsuarioService, WebsocketService, ServidorService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { URL_SERVICIO_GENERAL } from '../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  url: string;

  servidor: string = '';

  usuario: Usuario;

  userConnected: boolean = false;

  usuariosConectados: any[] = [];

  constructor(
    public _usuarioService: UsuarioService,
    public ws: WebsocketService,
    private _servidor: ServidorService,
    public router: Router,
  ) {
    this.url = URL_SERVICIO_GENERAL;
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    const serv = this._servidor.db;
    if (serv === 'datosb') {
      this.servidor = 'Grupo Ferremayoristas del Bajío';
    } else {
      this.servidor = 'Ferremayoristas Olvera';
    }

    this.ws.escuchar('usuarios-lista').subscribe((resp: any) => {
      console.log(resp);
    });
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }

  showSuccess( data: any ) {
    console.log(data);
  }

  cambiarServidor(empresa: any) {
    if (empresa !== '0') {
      let server;
      if (empresa === '1') {
        server = 'datosb';
        this.servidor = 'Grupo Ferremayoristas del Bajío';
      } else {
        server = 'datosa';
        this.servidor = 'Ferremayoristas Olvera';
      }
      this._servidor.cambiarServidor(server);
      this._servidor.notificacion.emit(server);
    }
    const a = <HTMLElement>(document.getElementById('cerrarSelectEmp'));
    a.click();
  }

}
