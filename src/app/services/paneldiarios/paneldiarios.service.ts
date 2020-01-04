import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_PETICION, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class PaneldiariosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  mejoresAsesores(fechaIni: any, fechaFin: any) {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER + '/api/paneldiarios.php?opcion=1&fechaIni=' + fechaIni + '&fechaFin=' + fechaFin;

    return this.http.get(this.url);
  }

  mejoresCobradores(fechaIni: any, fechaFin: any) {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER + '/api/paneldiarios.php?opcion=2&fechaIni=' + fechaIni + '&fechaFin=' + fechaFin;

    return this.http.get(this.url);
  }

  mejoresComprando(fechaIni: any, fechaFin: any) {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER + '/api/paneldiarios.php?opcion=3&fechaIni=' + fechaIni + '&fechaFin=' + fechaFin;

    return this.http.get(this.url);
  }

  mejoresPagando(fechaIni: any, fechaFin: any) {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER + '/api/paneldiarios.php?opcion=4&fechaIni=' + fechaIni + '&fechaFin=' + fechaFin;

    return this.http.get(this.url);
  }

}
