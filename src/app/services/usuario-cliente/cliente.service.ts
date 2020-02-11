import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';
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
    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes?desde=' + desde;

    url += '&token=' + this.token;

    return this.http.get( url );
  }

  cargarUsuariosActivos( desde: number = 0 ) {
    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/activos?desde=' + desde;

    url += '&token=' + this.token;

    return this.http.get( url );
  }

  cargarUsuariosPendientes( desde: number = 0 ) {
    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/pendientes';

    url += '?token=' + this.token;

    return this.http.get( url );
  }

  actualizarUsusario( cliente: Cliente ) {
    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/actualizar/' + cliente._id;

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
    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/' + id;

    url += '?token=' + this.token;

    return this.http.delete( url )
      .map( resp => {
        swal('Cliente Borrado!', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      });
  }

}
