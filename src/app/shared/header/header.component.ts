import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { URL_SERVICE } from '../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  url: string;

  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {
    this.url = URL_SERVICE;
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }

}
