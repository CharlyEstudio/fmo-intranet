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
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/bigdata/pedidos/web/asesor/' + id + '/' + fecha;

    return this.http.get(this.url);
  }

  obtenerMensajesContacto() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=13';

    return this.http.get(this.url);
  }

  confirmarVisto(id: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=14';

    return this.http.post(this.url, {idmensaje: id}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  obtenerMejoresTen() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/bigdata/mejores';

    return this.http.get(this.url);
  }

}
