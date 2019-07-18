import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, URL_PETICION } from '../../config/config';

// Modelo
import { Chofer } from '../../models/chofer.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class ChoferesService {

  url: string;
  token: string;

  constructor(
    public http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  obtenerChoferes(desde: number = 0) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/chofer?desde=' + desde;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/chofer?desde=' + desde;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer?desde=' + desde;
    }

    return this.http.get(this.url);
  }

  obtenerChofer(id: string) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/chofer/id/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/chofer/id/' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/id/' + id;
    }

    return this.http.get(this.url);
  }

  obtenerChoferesAll() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/chofer/all';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/chofer/all';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/all';
    }

    return this.http.get(this.url);
  }

  obtenerVerificadores() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    }

    return this.http.get(this.url);
  }

  crearChofer(chofer: Chofer, usuario: Usuario) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/chofer/new';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/chofer/new';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/new';
    }

    return this.http.post(this.url, {chofer: chofer, usuario: usuario});
  }

  borrarUsuario ( id: string ) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/chofer/delete/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/chofer/delete/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/delete/' + id;
    }

    url += '?token=' + this.token;

    return this.http.delete( url );
  }

  actualizarUsusario( chofer: Chofer ) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/chofer/update/' + chofer._id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/chofer/update/' + chofer._id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/update/' + chofer._id;
    }

    url += '?token=' + this.token;

    return this.http.put( url, chofer );
  }

  mostrarGuias( id: any ) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/pordia/chofer/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/pordia/chofer/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/guias/pordia/chofer/' + id;
    }

    url += '?token=' + this.token;

    return this.http.get( url );
  }

}
