import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, URL_LOCAL, URL_PRUEBAS } from '../../config/config';

@Injectable()
export class TiendaService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  obtenerPedidosWeb(id: any, fecha: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/bigdata/pedidos/web/asesor/' + id + '/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/bigdata/pedidos/web/asesor/' + id + '/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/bigdata/pedidos/web/asesor/' + id + '/' + fecha;
    }

    return this.http.get(this.url);
  }

}
