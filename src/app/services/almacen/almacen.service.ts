import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class AlmacenService {

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  obtenerReporte( area: any, inicio: string, fin: string ) {
    let url;
    url = URL_SERVICIO_GENERAL + '/api/almacen.php?opcion=22&area=' + area + '&inicio=' + inicio + '&final=' + fin;

    return this.http.get( url ).map((reporte: any) => {
      if (reporte.length > 0) {
        return reporte;
      } else {
        return 0;
      }
    });
  }

}
