import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS } from '../../config/config';

@Injectable()
export class AlmacenService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerReporte( area: any, inicio: string, fin: string ) {
    let url;

    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/url = URL_LOCAL + '/api/almacen.php?opcion=1' + '&area=' + area + '&inicio=' + inicio + '&fin=' + fin;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   url = URL_PRUEBAS + '/api/almacen.php?opcion=1' + '&area=' + area + '&inicio=' + inicio + '&fin=' + fin;
    // } else {
    //   url = URL_SERVICIO_GENERAL + '/api/almacen.php?opcion=1' + '&area=' + area + '&inicio=' + inicio + '&fin=' + fin;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/almacen/reporte/' + area + '/' + inicio + '/' + fin;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/almacen/reporte/' + area + '/' + inicio + '/' + fin;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/almacen/reporte/' + area + '/' + inicio + '/' + fin;
    }

    return this.http.get( url ).map((reporte: any) => {
      return reporte.respuesta;
    });
  }

}
