import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO_GENERAL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/img';
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/img';
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
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe, usuario, medicos, hospitales');
        return url += '/usuarios/xxx';
    }

    return url;
  }

}
