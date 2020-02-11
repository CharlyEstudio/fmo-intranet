import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../config/config';
import { UsuarioService } from '../services/services.index';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  token: string = '';

  constructor(
    private _usuarioS: UsuarioService
  ) {
    this.token = this._usuarioS.token;
  }

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx' + '?token=' + this.token;
    }

    if ( img.indexOf('http') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        url += '?token=' + this.token;
        break;
      case 'clientes':
        url += '/clientes/' + img;
        url += '?token=' + this.token;
        break;
      case 'chofer':
        url += '/choferes/' + img;
        url += '?token=' + this.token;
        break;
      default:
        console.log('Tipo de imagen no existe usuario');
        return url += '/usuarios/xxx';
    }

    return url;
  }

}
