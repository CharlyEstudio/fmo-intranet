import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class CobradorService {

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  obtenerCobradores() {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=1' + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerCobros(perid: number, fechaIni: string, fechaFin: string) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=2&perid=' + perid + '&fechaIni=' + fechaIni + '&fechaFin=' + fechaFin + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  hacerPDF(file: string, tabla: any, total: any, pagado: any, comision: any, impocom: any, fecIni: string, fecFin: string) {
    let url;

    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=3';

    return this.http.post(url, {
      tabla: tabla,
      total: total,
      pagado: pagado,
      comision: comision,
      impocom: impocom,
      fechaIni: fecIni,
      fechaFin: fecFin,
      file: file
     },
    { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

}
