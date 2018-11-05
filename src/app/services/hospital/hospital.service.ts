import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hospital } from '../../models/hospital.model';

import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

import { URL_SERVICIO_GENERAL } from '../../config/config';

// import swal from 'sweetalert';

import { SweetAlert } from 'sweetalert/typings/core';

declare function init_plugins();

@Injectable()
export class HospitalService {

  totalHospitales: number = 0;
  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) {}

  cargarHospitales( desde: number = 0 ) {
    let url = URL_SERVICIO_GENERAL + ':3001/hospital?desde=' + desde;

    return this.http.get( url );
  }

  cargarHospitalesAll() {
    let url = URL_SERVICIO_GENERAL + ':3001/hospital';

    return this.http.get( url )
      .map( (resp: any) => resp.hospitales );
  }

  obtenerHospital( id: string ) {
    let url = URL_SERVICIO_GENERAL + ':3001/hospital/' + id;

    return this.http.get( url )
      .map( ( resp: any ) => resp.hospital );
  }

  crearHospital( nombre: string ) {
    let url = URL_SERVICIO_GENERAL + ':3001/hospital';

    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
      .map( (resp: any) => resp.hospital);
  }

  borrarHospital ( id: string ) {
    let url = URL_SERVICIO_GENERAL + ':3001/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
      .map( () => swal('¡Hospital Borrado!', 'El hospital ha sido eliminado correctamente', 'success'));
  }

  buscarHospitales( termino: string ) {
    let url = URL_SERVICIO_GENERAL + ':3001/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
      .map( ( resp: any ) => resp.hospitales );
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIO_GENERAL + ':3001/hospital/' + hospital._id;

    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
      .map( (resp: any) => {
        swal('Hospital Actualizado', hospital.nombre, 'success');
        return resp.hospital
      });
  }

}
