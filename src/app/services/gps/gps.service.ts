import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER, PUERTO_INTERNO_DOS } from '../../config/config';
import { Visor } from '../../models/visor.model';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class GpsService {

  token: string;

  url: string;

  constructor(
    public http: HttpClient,
    private _servidor: ServidorService
  ) {
    this.token = localStorage.getItem('token');
  }

  obtenerUbicaciones() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/gps';

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerClientesTotal() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/' + this._servidor.db;

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerClientes(diavis: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/mostrar/' + diavis;

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerAsesorEspefico(id: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;

    return this.http.get(this.url);
  }

  obtenerIMEIAsesorAll(desde: number = 0) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO_DOS + '/gps/desde?desde=' + desde;

    return this.http.get(this.url);
  }

  obtenerIMEIAsesorAllDonwload() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO_DOS + '/gps';

    return this.http.get(this.url);
  }

  actualizarUsusarioImei( usuario: Visor ) {
    this. url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO_DOS + '/gps/' + usuario._id;

    return this.http.put( this.url, usuario );
  }

  borrarUsuarioImei( id: string ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO_DOS + '/gps/' + id;

    return this.http.delete( this.url );
  }

  nuevoUsuarioIMEI(visor: Visor) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO_DOS + '/gps';

    return this.http.post( this.url, visor );
  }

}
