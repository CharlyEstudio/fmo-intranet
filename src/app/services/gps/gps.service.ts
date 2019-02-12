import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class GpsService {

  token: string;

  url: string;

  constructor(
    public http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
  }

  obtenerUbicaciones() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/gps';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/gps';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/gps';
    }

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerClientesTotal() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente';
    }

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerClientes(diavis: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/mostrar/' + diavis;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/mostrar/' + diavis;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/mostrar/' + diavis;
    }

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerAsesorEspefico(id: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    }

    return this.http.get(this.url);
  }

}