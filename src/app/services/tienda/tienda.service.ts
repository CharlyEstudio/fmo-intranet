import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER } from '../../config/config';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class TiendaService {

  url: string;
  token: string = '';

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

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
    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

}
