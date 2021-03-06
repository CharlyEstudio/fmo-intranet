import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, URL_LOCAL, URL_PETICION } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = 'https://ferremayoristas.com.mx:' + PUERTO_INTERNO + '/img';

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   url = URL_LOCAL + ':' + PUERTO_INTERNO + '/img';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   url = 'https://ferremayoristas.com.mx:' + PUERTO_INTERNO + '/img';
    // } else {
    //   url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/img';
    // }

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
      case 'clientes':
        url += '/clientes/' + img;
        break;
      case 'chofer':
        url += '/choferes/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe usuario');
        return url += '/usuarios/xxx';
    }

    return url;
  }

}
