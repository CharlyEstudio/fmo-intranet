import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Usuario } from '../../models/usuario.model';

import { Comision } from '../../models/comision.model';

import { URL_SERVICIO_GENERAL } from '../../config/config';

import { SweetAlert } from 'sweetalert/typings/core';

@Injectable()
export class ComisionesService {

  datos: any[] = [];
  token: any;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  cargarComisiones() {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/comisiones/';
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/comisiones/';
    }

    url += '?token=' + this.token;

    return this.http.get( url )
      .map( (resp: any) => {
        return resp.comisiones;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        return Observable.throw( err );
      });
  }

  buscarAsesorComision( id: any ) {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/busqueda/especifico/comision/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/busqueda/especifico/comision/' + id;
    }

    return this.http.get( url )
      .map( (resp: any) => {
        return resp;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        return Observable.throw( err );
      });
  }

  buscarMesComision( mes: any ) {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/busqueda/especifico/comision/mes/' + mes;
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/busqueda/especifico/comision/mes/' + mes;
    }

    return this.http.get( url )
      .map( (resp: any) => {
        return resp;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        return Observable.throw( err );
      });
  }

  guardarComision(comision: Comision) {

    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/comisiones';
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/comisiones';
    }
    
    url += '?token=' + this.token;

    return this.http.post( url, comision )
      .map( (resp: any) => {
        swal ('¡Guardado Correcto!', 'Reporte de comisión guardada.', 'success');
        return resp.usuario;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        return Observable.throw( err );
      });

  }

  actualizarComisionUsusario( comision: Comision, id: any ) {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/comisiones/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/comisiones/' + id;
    }

    url += '?token=' + this.token;

    return this.http.put( url, comision )
      .map( (resp: any) => {
        swal('Comision Actualizado!', 'Realizado correctamente', 'success');
        return true;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        return Observable.throw( err );
      });
  }

}
