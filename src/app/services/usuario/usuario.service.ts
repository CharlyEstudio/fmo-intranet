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

// import swal from 'sweetalert';

import { SweetAlert } from 'sweetalert/typings/core';

import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient, public router: Router,
    public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/login/renuevatoken';
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/login/renuevatoken';
    }
    
    url += '?token=' + this.token;

    return this.http.get( url )
      .map( ( resp: any ) => {

        this.token = resp.token;
        localStorage.setItem('token', this.token);

        return true;
      })
      .catch( err => {
        this.router.navigate(['/login']);
        swal('No se pudo renovar token', 'No fue posible renovar token', 'error');
        // alert('No se pudo renovar token - No fue posible renovar token');
        return Observable.throw( err );
      });
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ));
    localStorage.setItem( 'menu', JSON.stringify( menu ));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    // let url = URL_SERVICIO_GENERAL + ':3001/login/google';

    // return this.http.post( url, {token} )
    //   .map( (resp: any) => {

    //     this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

    //     return true;
    //   });
    
    console.log(token);
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/login';
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/login';
    }

    return this.http.post( url, usuario )
      .map( ( resp: any ) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

        return true;
      })
      .catch( err => {
        swal('Error en el login', err.error.errors.message, 'error');
        // alert('Error en el login ' + err.error.errors.message);
        return Observable.throw( err );
      });
  }

  crearUsuario(usuario: Usuario) {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/usuario';
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/usuario';
    }

    return this.http.post( url, usuario )
      .map( (resp: any) => {
        swal ('Usuario creado', usuario.email + '. El administrador activará su cuenta.', 'success');
        // alert('Usuario creado ' + usuario.email);
        return resp.usuario;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        // alert(err.error.mensaje + err.error.errors.message);
        return Observable.throw( err );
      });
  }

  actualizarUsusario( usuario: Usuario ) {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/usuario/' + usuario._id;
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/usuario/' + usuario._id;
    }

    url += '?token=' + this.token;

    return this.http.put( url, usuario )
      .map( (resp: any) => {
        if ( usuario._id === this.usuario._id ) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
        }

        swal('Usuario Actualizado!', usuario.nombre, 'success');
        // alert('Usuario Actualizado! ' + usuario.nombre);

        return true;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        // alert(err.error.mensaje + err.error.errors.message);
        return Observable.throw( err );
      });
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( ( resp: any ) => {
        this.usuario.img = resp.usuario.img;

        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        // alert('Imagen Actualizada ' + this.usuario.nombre);

        this.guardarStorage( id, this.token, this.usuario, this.menu );
      })
      .catch( resp => {});
  }

  cargarUsuarios( desde: number = 0 ) {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/usuario?desde=' + desde;
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/usuario?desde=' + desde;
    }

    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/busqueda/coleccion/usuarios/' + termino;
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/busqueda/coleccion/usuarios/' + termino;
    }

    return this.http.get( url )
      .map( ( resp: any ) => resp.usuarios );
  }

  borrarUsuario ( id: string ) {
    let url;

    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      url = 'http://192.168.1.250:3001/usuario/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':3001/usuario/' + id;
    }

    url += '?token=' + this.token;

    return this.http.delete( url )
      .map( resp => {
        swal('¡Usuario Borrado!', 'El usuario ha sido eliminado correctamente', 'success');
        // alert('¡Usuario Borrado!' + 'El usuario ha sido eliminado correctamente');
        return true;
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
