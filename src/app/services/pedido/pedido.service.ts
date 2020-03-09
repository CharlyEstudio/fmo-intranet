import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// CONFIGURACION
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PARAM_KEY, KEY } from '../../config/config';

// Servicios
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class PedidoService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) {  }

  personalAlmacen() {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/all/personal/sistemas`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  buscarAlmacenista(texto: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/especifico/personal/nombre/${texto}/sistemas`;

    return this.http.get(this.url, { headers: this.headers });
  }

  eliminarPersonal(id: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/inactivo/personal/${id}/sistemas`;

    return this.http.delete(this.url, { headers: this.headers }).map((resp: any) => {
      return resp;
    });
  }

  verPersonal(id: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/especifico/personal/id/${id}/sistemas`;

    return this.http.get(this.url, { headers: this.headers });
  }

  editarPersonal(enviar: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/editar/personal/sistemas`;

    this.headers.append('content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(this.url, {data: enviar}, { headers: this.headers }).map((resp: any) => {
      return resp.resp;
    });
  }

  guardarRegistro(enviar: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/guardar/personal/sistemas`;

    this.headers.append('content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url, {data: enviar}, { headers: this.headers }).map((resp: any) => {
      return resp.resp;
    });
  }

}
