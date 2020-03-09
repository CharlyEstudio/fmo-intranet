import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class SupervisoresService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  url: string;

  constructor(
    private http: HttpClient,
    private _servidorS: ServidorService
  ) { }

  pedidosGeneral( fecha: any, id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/estados/${id}/${fecha}/${this._servidorS.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((asesores: any) => {
      return asesores;
    });
  }

  getComentarios(perid: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/visitas/comentario/asesor/${perid}/${this._servidorS.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

}
