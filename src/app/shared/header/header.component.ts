import { Component, OnInit } from '@angular/core';
import { UsuarioService, WebsocketService } from '../../services/services.index';
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

  usuario: Usuario;

  userConnected: boolean = false;

  usuariosConectados: any[] = [];

  constructor(
    public _usuarioService: UsuarioService,
    public ws: WebsocketService,
    public router: Router,
  ) {
    this.url = URL_SERVICIO_GENERAL;
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;

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

}
