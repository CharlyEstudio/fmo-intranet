import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIO_GENERAL } from '../../config/config';

import { Medico } from '../../models/medico.model';

import { UsuarioService } from '../usuario/usuario.service';

// import swal from 'sweetalert';

import { SweetAlert } from 'sweetalert/typings/core';

@Injectable()
export class MedicoService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde: number = 0 ) {
    let url = URL_SERVICIO_GENERAL + ':3001/medico?desde=' + desde;

    return this.http.get( url );
  }

  buscarMedico( termino: string ) {
    let url = URL_SERVICIO_GENERAL + ':3001/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url )
      .map( ( resp: any ) => resp.medicos );
  }

  borrarMedico( id: string ) {
    let url = URL_SERVICIO_GENERAL + ':3001/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
      .map( ( resp: any ) => swal('¡Medico Borrado!', resp.medico.nombre + ' ha sido eliminado correctamente', 'success') );
  }

  guardarMedico( medico: Medico ) {
    let url = URL_SERVICIO_GENERAL + ':3001/medico';

    if ( medico._id ) {
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico )
        .map( ( resp: any ) => {
          swal('¡Médico Actualizado!', medico.nombre, 'success');
          return resp.medico;
        });
    } else {
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, medico )
        .map( ( resp: any ) => {
          swal('¡Médico Creado!', medico.nombre, 'success');
          return resp.medico;
        });
    }
  }

  cargarMedico( id: string ) {
    let url = URL_SERVICIO_GENERAL + ':3001/medico/' + id;

    return this.http.get( url )
      .map( ( resp: any ) => resp.medico );
  }

}
