import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, URL_PETICION, URL_EXTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class NcService {

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  obtenerNC() {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/' + this._servidor.db;

    return this.http.get(this.url);
  }

  buscarNCFecha(inicial: any, final: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/buscar/fecha/rango/' + inicial + '/' + final + '/' + this._servidor.db;

    return this.http.get(this.url);
  }

  buscarNCRFecha(inicial: any, final: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/buscar/remision/fecha/rango/' + inicial + '/' + final + '/' + this._servidor.db;

    return this.http.get(this.url);
  }

  buscarNCTrabFecha(inicial: any, final: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/trabajados/fecha/' + inicial + '/' + final;

    return this.http.get(this.url);
  }

  obtenerNCtrabajados() {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/trabajados';

    return this.http.get(this.url);
  }

  validarNCtrabajado(nc: any, serie: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/ncserie/' + nc + '/' + serie;

    return this.http.get(this.url, nc);
  }

  guardarNCtrabajado(nc: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc';

    return this.http.post(this.url, nc);
  }

  quitarNCtrabajado(nc: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/' + nc.nc + '/' + nc.factura;

    return this.http.delete(this.url);
  }

  buscarNCtrabajado(nc: any, serie: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/' + nc + '/' + serie;

    return this.http.get(this.url, nc);
  }

  buscarNCtrabajadoFolio(nc: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/folio/' + nc;

    return this.http.get(this.url, nc);
  }

  buscarNCRtrabajado(nc: any, factura: any) {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/remision/' + nc + '/' + factura;

    return this.http.get(this.url);
  }

}
