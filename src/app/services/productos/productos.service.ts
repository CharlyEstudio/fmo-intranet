import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';

@Injectable()
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerProducto(codigo: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/productos/buscar/codigo/' + codigo + '/3';

    return this.http.get(url);
  }

}
