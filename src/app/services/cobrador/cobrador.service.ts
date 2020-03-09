import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class CobradorService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  obtenerCobradores() {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/${this._servidor.db}`;

    return this.http.get( url, { headers: this.headers } );
  }

  obtenerCobros(perid: number, fechaIni: string, fechaFin: string) {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/asesor/${perid}/${fechaIni}/${fechaFin}/${this._servidor.db}`;

    return this.http.get( url, { headers: this.headers } );
  }

  // Ver en donde se hace el PDF
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
