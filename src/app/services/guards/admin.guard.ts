import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ) {}

  canActivate() {
    if ( this._usuarioService.usuario.rol === 'ADMIN_ROLE' || this._usuarioService.usuario.rol === 'DIR_ROLE' ) {
      return true;
    } else {
      console.log('Bolqueado por el ADMIN GUARD');
      this._usuarioService.logout();
      return false;
    }
  }
}
