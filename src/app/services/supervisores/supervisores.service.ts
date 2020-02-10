import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO } from '../../config/config';

@Injectable()
export class SupervisoresService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  pedidosGeneral( fecha: any, id: any ) {
    this.url = URL_SERVICIO_GENERAL + '/api/pedidos.php?opcion=53&perid=' + id + '&fecha=' + fecha;

    return this.http.get( this.url ).map((asesores: any) => {
      return asesores;
    });
  }

  getComentarios(perid: any) {
    this.url = URL_SERVICIO_GENERAL + '/api/visitas.php?opcion=5&perid=' + perid;

    return this.http.get(this.url);
  }

}
