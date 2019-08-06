import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, URL_PETICION } from '../../config/config';
import { Cliente } from '../../models/clientes.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Injectable()
export class ClienteService {

  token: string;

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
  }

  cargarUsuarios( desde: number = 0 ) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes?desde=' + desde;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/clientes?desde=' + desde;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes?desde=' + desde;
    }

    url += '&token=' + this.token;

    return this.http.get( url );
  }

  cargarUsuariosActivos( desde: number = 0 ) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/activos?desde=' + desde;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/clientes/activos?desde=' + desde;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/activos?desde=' + desde;
    }

    url += '&token=' + this.token;

    return this.http.get( url );
  }

  cargarUsuariosPendientes( desde: number = 0 ) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/pendientes?desde=' + desde;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/clientes/pendientes?desde=' + desde;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/pendientes?desde=' + desde;
    }

    url += '&token=' + this.token;

    return this.http.get( url );
  }

  actualizarUsusario( cliente: Cliente ) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/actualizar/' + cliente._id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/clientes/actualizar/' + cliente._id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/actualizar/' + cliente._id;
    }

    url += '?token=' + this.token;

    return this.http.put( url, cliente )
      .map( (resp: any) => {

        swal('Cliente Actualizado!', cliente.nombre, 'success');

        return true;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        return Observable.throw( err );
      });
  }

  borrarUsuario ( id: string ) {
    let url;

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/clientes/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/' + id;
    }

    url += '?token=' + this.token;

    return this.http.delete( url )
      .map( resp => {
        swal('Cliente Borrado!', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      });
  }

}
