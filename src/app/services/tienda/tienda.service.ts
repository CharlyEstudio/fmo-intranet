import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER, PARAM_KEY, KEY } from '../../config/config';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class TiendaService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  url: string;
  token: string = '';

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService,
    private _servidorS: ServidorService
  ) {
    this.token = this._usuarioService.token;
  }

  obtenerPedidosWeb(id: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/web/asesor/${id}/${this._servidorS.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  // obtenerMensajesContacto() {
  //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=13';

  //   return this.http.get(this.url);
  // }

  // confirmarVisto(id: any) {
  //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=14';

  //   return this.http.post(this.url, {idmensaje: id}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  // }

  // obtenerMejoresTen() {
  //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/bigdata/mejores';
  //   this.url += '?token=' + this.token;

  //   return this.http.get(this.url);
  // }

}
