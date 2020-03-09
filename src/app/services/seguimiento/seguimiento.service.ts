import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class SeguimientoService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  constructor(
    private http: HttpClient,
    private _servidorS: ServidorService
  ) { }

  obtenerFechaDias(diaSel: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/seguimiento/versemanas/${diaSel}`;

    return this.http.get( url, { headers: this.headers } );
  }

  obtenerSeguimiento(fecha: any, idFerrum: number) {
    const url = `${URL_SERVICIO_GENERAL}/services/seguimiento/asesores/dia/${idFerrum}/${fecha}/${this._servidorS.db}`;

    return this.http.get( url, { headers: this.headers } );
  }

}
