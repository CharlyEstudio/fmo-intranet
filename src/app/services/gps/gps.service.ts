import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, PUERTO_SERVER, URL_PETICION, PUERTO_INTERNO_DOS, URL_EXTERNO } from '../../config/config';
import { Visor } from '../../models/visor.model';

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
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/gps';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/gps';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/gps';
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/usuario/gps';

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerClientesTotal() {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente';
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente';

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerClientes(diavis: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/mostrar/' + diavis;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/mostrar/' + diavis;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/mostrar/' + diavis;
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/busqueda/clientes/obtenerCliente/mostrar/' + diavis;

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerAsesorEspefico(id: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;

    return this.http.get(this.url);
  }

  obtenerIMEIAsesorAll(desde: number = 0) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/desde?desde=' + desde;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/desde?desde=' + desde;
    } else {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/desde?desde=' + desde;
    }

    return this.http.get(this.url);
  }

  actualizarUsusarioImei( usuario: Visor ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/' + usuario._id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/' + usuario._id;
    } else {
      this. url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/' + usuario._id;
    }

    return this.http.put( this.url, usuario );
  }

  borrarUsuarioImei( id: string ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/' + id;
    } else {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps/' + id;
    }

    return this.http.delete( this.url );
  }

  nuevoUsuarioIMEI(visor: Visor) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps';
    } else {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO_DOS + '/gps';
    }

    return this.http.post( this.url, visor );
  }

}
