import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class BackorderService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  backorder(perid: any, numero: any, inicio: any, final: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/backorder/asesor/cliente/numero/${perid}/${numero}/${inicio}/${final}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers } );
  }

}
