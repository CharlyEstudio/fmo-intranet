import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_PETICION, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class CobradorService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerCobradores() {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=1';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=1';
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=1';
    }

    return this.http.get(url);
  }

  obtenerCobros(perid: number, fechaIni: string, fechaFin: string) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=2&perid=' + perid + '&fechaIni=' + fechaIni + '&fechaFin=' + fechaFin;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=2&perid=' + perid + '&fechaIni=' + fechaIni + '&fechaFin=' + fechaFin;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=2&perid=' + perid + '&fechaIni=' + fechaIni + '&fechaFin=' + fechaFin;
    }

    return this.http.get(url);
  }

  hacerPDF(file: string, tabla: any, total: any, pagado: any, comision: any, impocom: any, fecIni: string, fecFin: string) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=3';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=3';
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/cobrador.php?opcion=3';
    }

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
