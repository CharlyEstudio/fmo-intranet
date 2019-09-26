import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// config
import { URL_SERVICIO_GENERAL, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class GarantiasService {

  constructor(
    public http: HttpClient
  ) { }

  obtenerGarantiasAll(desde: number = 0) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=1&desde=' + desde;

    return this.http.get(url);
  }

}
