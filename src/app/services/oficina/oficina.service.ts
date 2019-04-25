import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// COnfiguración
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO, URL_PETICION } from '../../config/config';

@Injectable()
export class OficinaService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  todasFacturas(fecha: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/oficina/facturas/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/oficina/facturas/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/oficina/facturas/' + fecha;
    }

    return this.http.get(this.url);
  }

  facturasNoImpresas(fecha: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/oficina/facturas/noimpresas/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/oficina/facturas/noimpresas/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/oficina/facturas/noimpresas/' + fecha;
    }

    return this.http.get(this.url);
  }

  facturasNoEnviadas(fecha: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/oficina/facturas/noenviadas/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/oficina/facturas/noenviadas/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/oficina/facturas/noenviadas/' + fecha;
    }

    return this.http.get(this.url);
  }

  errorFacturar(fecha: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/oficina/facturas/error/facturar/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/oficina/facturas/error/facturar/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/oficina/facturas/error/facturar/' + fecha;
    }

    return this.http.get(this.url);
  }

  errorTimbrar(fecha: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/oficina/facturas/error/timbrar/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/oficina/facturas/error/timbrar/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/oficina/facturas/error/timbrar/' + fecha;
    }

    return this.http.get(this.url);
  }

}
