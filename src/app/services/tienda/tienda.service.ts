import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, URL_LOCAL, URL_PRUEBAS, URL_PETICION, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class TiendaService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  obtenerPedidosWeb(id: any, fecha: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/bigdata/pedidos/web/asesor/' + id + '/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/bigdata/pedidos/web/asesor/' + id + '/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/bigdata/pedidos/web/asesor/' + id + '/' + fecha;
    }

    return this.http.get(this.url);
  }

  obtenerMensajesContacto() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=13';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=13';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=13';
    }

    return this.http.get(this.url);
  }

  confirmarVisto(id: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=14';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=14';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=14';
    }

    return this.http.post(this.url, {idmensaje: id}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  obtenerMejoresTen() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/bigdata/mejores';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/bigdata/mejores';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/bigdata/mejores';
    }

    return this.http.get(this.url);
  }

}
