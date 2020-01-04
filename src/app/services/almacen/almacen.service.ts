import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, URL_PETICION, URL_EXTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class AlmacenService {

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  obtenerReporte( area: any, inicio: string, fin: string ) {
    let url;
    url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/almacen/reporte/' + area + '/' + inicio + '/' + fin;

    return this.http.get( url ).map((reporte: any) => {
      if (reporte.status) {
        return reporte.respuesta;
      } else {
        return 0;
      }
    });
  }

}
