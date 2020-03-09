import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class NcService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

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
    // this.url = URL_SERVICIO_GENERAL +  '/api/nc.php?opcion=1&servidor=' + this._servidor.db;

    // return this.http.get(this.url);
  }

  buscarNCFecha(inicial: any, final: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/notascredito/rango/${inicial}/${final}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  buscarNCRFecha(inicial: any, final: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/notascredito/rango/${inicial}/${final}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  buscarNCTrabFecha(inicial: any, final: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/fecha/' + inicial + '/' + final;

    return this.http.get(this.url);
  }

  obtenerNCtrabajados() {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados';

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  validarNCtrabajado(nc: any, serie: any) {
    // this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/ncserie/' + nc + '/' + serie;

    // this.url += '?token=' + this.token;

    // return this.http.get(this.url);
  }

  guardarNCtrabajado(nc: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc';

    this.url += '?token=' + this.token;

    return this.http.post(this.url, nc);
  }

  quitarNCtrabajado(nc: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/' + nc.nc + '/' + nc.factura;

    this.url += '?token=' + this.token;

    return this.http.delete(this.url);
  }

  buscarNCtrabajado(nc: any, serie: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/' + nc + '/' + serie;

    this.url += '?token=' + this.token;

    return this.http.get(this.url, nc);
  }

  buscarNCtrabajadoFolio(nc: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/folio/' + nc;

    this.url += '?token=' + this.token;

    return this.http.get(this.url, nc);
  }

  buscarNCRtrabajado(nc: any, factura: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/nc/trabajados/buscar/remision/' + nc + '/' + factura;

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

}
