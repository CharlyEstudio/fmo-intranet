import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class BackorderService {

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  backorder(perid: any, numero: any, inicio: any, final: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/backorder/' + perid + '/' + numero + '/' + inicio + '/' + final + '/' + this._servidor.db;

    return this.http.get(this.url);
  }

}
