import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS } from '../../config/config';

@Injectable()
export class ChoferesService {

  url: string;

  constructor(
    public http: HttpClient
  ) {}

  obtenerChoferes() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/choferes';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/choferes';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/choferes';
    }

    return this.http.get(this.url);
  }

  obtenerVerificadores() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    }

    return this.http.get(this.url);
  }

}
