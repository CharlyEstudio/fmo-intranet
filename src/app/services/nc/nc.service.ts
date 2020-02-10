import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class NcService {

  url: string;
  token: string = '';

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private _usuarioS: UsuarioService
  ) {
    this.token = this._usuarioS.token;
  }

  obtenerNC() {
    this.url = URL_SERVICIO_GENERAL +  '/api/nc.php?opcion=1&servidor=' + this._servidor.db;

    return this.http.get(this.url);
  }

  buscarNCFecha(inicial: any, final: any) {
    this.url = URL_SERVICIO_GENERAL + '/api/nc.php?opcion=2&fechaIni=' + inicial + '&fechaFin=' + final + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
  }

  buscarNCRFecha(inicial: any, final: any) {
    this.url = URL_SERVICIO_GENERAL + '/api/nc.php?opcion=3&inicial=' + inicial + '&final=' + final + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
  }

  buscarNCTrabFecha(inicial: any, final: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/fecha/' + inicial + '/' + final;

    return this.http.get(this.url);
  }

  obtenerNCtrabajados() {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados';

    return this.http.get(this.url);
  }

  validarNCtrabajado(nc: any, serie: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/ncserie/' + nc + '/' + serie;

    return this.http.get(this.url, nc);
  }

  guardarNCtrabajado(nc: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc';

    return this.http.post(this.url, nc);
  }

  quitarNCtrabajado(nc: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/' + nc.nc + '/' + nc.factura;

    return this.http.delete(this.url);
  }

  buscarNCtrabajado(nc: any, serie: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/' + nc + '/' + serie;

    this.url += '?token=' + this.token;

    return this.http.get(this.url, nc);
  }

  buscarNCtrabajadoFolio(nc: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/folio/' + nc;

    return this.http.get(this.url, nc);
  }

  buscarNCRtrabajado(nc: any, factura: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/remision/' + nc + '/' + factura;

    return this.http.get(this.url);
  }

}
