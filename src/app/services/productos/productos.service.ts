import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PARAM_KEY, KEY } from '../../config/config';

// Servicios
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class ProductosService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  constructor(
    private http: HttpClient,
    private _servidorS: ServidorService
  ) { }

  obtenerProducto(codigo: number) {
    // const url = `${URL_SERVICIO_GENERAL}/services/almacen/producto/codigo/${codigo}/${this._servidorS.db}`;

    // return this.http.get( url, { headers: this.headers } );
  }

}
