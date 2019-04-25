import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO, URL_PETICION } from '../../config/config';

@Injectable()
export class SupervisoresService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  pedidosGeneral( fecha: any, id: any ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_PETICION + '/api/supervisores.php?opcion=1&perid=' + id;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/supervisores.php?opcion=1&perid=' + id;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/supervisores.php?opcion=1&perid=' + id;
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/supervisores/pedidos/general/' + fecha + '/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/supervisores/pedidos/general/' + fecha + '/' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/supervisores/pedidos/general/' + fecha + '/' + id;
    }

    return this.http.get( this.url ).map((asesores: any) => {
      return asesores.respuesta;
    });
  }

}
