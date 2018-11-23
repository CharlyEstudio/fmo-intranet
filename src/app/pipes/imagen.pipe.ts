import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, URL_LOCAL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      url = URL_LOCAL + ':' + PUERTO_INTERNO + '/img';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = 'http://192.168.1.250:' + PUERTO_INTERNO + '/img';
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/img';
    }

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe, usuario, medicos, hospitales');
        return url += '/usuarios/xxx';
    }

    return url;
  }

}
