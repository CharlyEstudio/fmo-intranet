import { Injectable } from '@angular/core';

import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_INTERNO, URL_PETICION } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {
    return new Promise( (resolve, reject) => {
      let formData = new FormData();

      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if (xhr.status === 200) {
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Fallo la subida');
            reject( xhr.response );
          }
        }
      };

      let url;

      if (URL_SERVICIO_GENERAL === URL_PETICION) {
        /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/upload/' + tipo + '/' + id;
      } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
        url = URL_LOCAL + ':' + PUERTO_INTERNO + '/upload/' + tipo + '/' + id;
      } else {
        url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/upload/' + tipo + '/' + id;
      }

      xhr.open('PUT' , url, true);

      xhr.send( formData );
    });
  }
}
