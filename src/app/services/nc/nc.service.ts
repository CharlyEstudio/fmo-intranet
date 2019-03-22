import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS } from '../../config/config';

@Injectable()
export class NcService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  obtenerNC() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/nc';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/nc';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc';
    }

    return this.http.get(this.url);
  }

  buscarNCFecha(fecha: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/nc/buscar/fecha/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/nc/buscar/fecha/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/buscar/fecha/' + fecha;
    }

    return this.http.get(this.url);
  }

  buscarNCTrabFecha(fecha: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/nc/trabajados/fecha/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/nc/trabajados/fecha/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/fecha/' + fecha;
    }

    return this.http.get(this.url);
  }

  obtenerNCtrabajados() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/nc/trabajados';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/nc/trabajados';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados';
    }

    return this.http.get(this.url);
  }

  guardarNCtrabajado(nc: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/nc';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/nc';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc';
    }

    return this.http.post(this.url, nc);
  }

  quitarNCtrabajado(nc: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/nc/' + nc.nc + '/' + nc.factura;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/nc/' + nc.nc + '/' + nc.factura;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/' + nc.nc + '/' + nc.factura;
    }

    return this.http.delete(this.url);
  }

  buscarNCtrabajado(nc: any, factura: string) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/' + nc + '/' + factura;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/' + nc + '/' + factura;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/' + nc + '/' + factura;
    }

    return this.http.get(this.url, nc);
  }

}
