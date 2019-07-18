import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate() {
    if ( this._usuarioService.usuario.rol === 'ADMIN_ROLE' ) {
      return true;
    } else {
      console.log('Bolqueado por el ADMIN GUARD');
      this._usuarioService.logout();
      swal('Sin acceso' , 'No tiene autorizado ingresar en esta sección.', 'error');
      return false;
    }
  }
}
