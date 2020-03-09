import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class AlmacenService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  obtenerReporte( area: any, inicio: string, fin: string ) {
    const url = `${URL_SERVICIO_GENERAL}/services/almacen/reporte/${area}/${inicio}/${fin}/sistemas`;

    return this.http.get( url, { headers: this.headers } ).map((reporte: any) => {
      if (reporte.resp.length > 0) {
        return reporte;
      } else {
        return 0;
      }
    });
  }

}
