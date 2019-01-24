import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS } from '../../config/config';
import { Cliente } from '../../models/clientes.model';

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

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes?desde=' + desde;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/clientes?desde=' + desde;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes?desde=' + desde;
    }

    url += '&token=' + this.token;

    return this.http.get( url );
  }

  actualizarUsusario( cliente: Cliente ) {
    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
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

}
