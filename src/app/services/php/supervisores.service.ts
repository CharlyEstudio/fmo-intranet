import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class SupervisoresService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  pedidosGeneral( id: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/supervisores.php?opcion=1&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/supervisores.php?opcion=1&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/supervisores.php?opcion=1&perid=' + id;
    }

    return this.http.get( this.url );
  }

}
