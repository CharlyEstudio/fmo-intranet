import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class MesaGuard implements CanActivate {
  constructor(
    private _usuarioService: UsuarioService
  ) {}

  canActivate() {
    if ( this._usuarioService.usuario.rol === 'ADMIN_ROLE'
    || this._usuarioService.usuario.rol === 'DIR_ROLE'
    || this._usuarioService.usuario.rol === 'GER_ROLE'
    || this._usuarioService.usuario.rol === 'SUP_ROLE'
    || this._usuarioService.usuario.rol === 'AUD_ROLE'
    || this._usuarioService.usuario.rol === 'OF_ROLE'
    || this._usuarioService.usuario.rol === 'MESA_ROLE' ) {
      return true;
    } else {
      console.log('Bolqueado por MESA GUARD');
      swal('Sin acceso' , 'No tiene autorizado ingresar en esta sección.', 'error');
      return false;
    }
  }
}
