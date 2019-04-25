import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, URL_PETICION } from '../../config/config';

@Injectable()
export class BackorderService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  backorder(perid: any, numero: any, inicio: any, final: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/backorder/' + perid + '/' + numero + '/' + inicio + '/' + final;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/backorder/' + perid + '/' + numero + '/' + inicio + '/' + final;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/backorder/' + perid + '/' + numero + '/' + inicio + '/' + final;
    }

    return this.http.get(this.url);
  }

}
