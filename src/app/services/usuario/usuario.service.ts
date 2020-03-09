import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

import { Usuario } from '../../models/usuario.model';

import { Comision } from '../../models/comision.model';

import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER } from '../../config/config';

import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { WebsocketService } from '../sockets/websocket.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];
  rol: any;

  constructor(
    public http: HttpClient, public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public wsService: WebsocketService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url;

    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/login/renuevatoken';

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
      this.rol = localStorage.getItem('rol');
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
      this.rol = '';
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any, rol: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');
    localStorage.removeItem('rol');
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ));
    localStorage.setItem( 'menu', JSON.stringify( menu ));
    localStorage.setItem( 'rol', rol);

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
    localStorage.removeItem('id');
    localStorage.removeItem('socketUsuario');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email);
    } else {
      localStorage.removeItem( 'email' );
    }

    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/login';

    return this.http.post( url, usuario )
      .map( ( resp: any ) => {
        if (resp.ok) {
          this.usuario = null;
          this.token = '';
          this.menu = [];

          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          localStorage.removeItem('menu');
          localStorage.removeItem('id');
          localStorage.removeItem('rol');
          localStorage.removeItem('socketUsuario');
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu, resp.usuario.rol);
          return resp;
        } else {
          return resp;
        }
      });
  }

  crearUsuario(usuario: Usuario) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario';

    return this.http.post( url, usuario )
      .map( (resp: any) => {
        swal ('Usuario creado', usuario.email + '. El administrador activará su cuenta.', 'success');
        return resp.usuario;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        return Observable.throw( err );
      });
  }

  actualizarUsusario( usuario: Usuario ) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/' + usuario._id;

    url += '?token=' + this.token;

    return this.http.put( url, usuario )
      .map( (resp: any) => {
        if ( usuario._id === this.usuario._id ) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu, usuarioDB.rol );
        }

        swal('Usuario Actualizado!', usuario.nombre, 'success');

        return true;
      })
      .catch( err => {
        swal(err.error.mensaje , err.error.errors.message, 'error');
        return Observable.throw( err );
      });
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( ( resp: any ) => {
        this.usuario.img = resp.usuario.img;

        swal('Imagen Actualizada', this.usuario.nombre, 'success');

        this.guardarStorage( id, this.token, this.usuario, this.menu, resp.usuario.rol );
      })
      .catch( resp => {});
  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario?desde=' + desde;

    url += '&token=' + this.token;

    return this.http.get( url );
  }

  cargarUsuariosAll() {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/all/users';
    url += '?token=' + this.token;

    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/buscar/termino/' + termino;

    url += '?token=' + this.token;

    return this.http.get( url )
      .map( ( resp: any ) => resp.usuarios );
  }

  borrarUsuario ( id: string ) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/' + id;

    url += '?token=' + this.token;

    return this.http.delete( url )
      .map( resp => {
        swal('¡Usuario Borrado!', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      });
  }

  getLoginUsuarioSocket () {
    return this.wsService.escuchar('usuarios-lista');
  }

  // enviarPassword( usuario: Usuario ) {
  //   let url;
  //   let user = JSON.stringify(usuario);
  //   url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/usuarios.php?opcion=1&usuario' + user;

  //   return this.http.get( url );
  // }

  // Cambiar Password por Email
  cambiarPassEmail( email: any ) {
    const url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/login/cambiar/' + email + '/intranet';

    return this.http.get( url );
  }

  // Cambiar Password por ID
  cambiarPassId( usuario: Usuario ) {
    let url;
    url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/login/cambiar/id/' + usuario._id + '/intranet/' + usuario.email;

    url += '?token=' + this.token;

    return this.http.get( url );
  }

  buscarUsuarioEsp (idFerrum: any) {
    let url;
    url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/usuario/especifico/' + idFerrum;

    url += '?token=' + this.token;

    return this.http.get( url );
  }

  enviarEmailCambioPass(usuario: Usuario, token: any, email: any) {
    const enviar = {
      usuario: usuario.nombre,
      token,
      email
    };
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/mail/cambiar/intranet?token=' + token;
    return this.http.post(url, enviar)
      .map((resp: any) => {
        if (resp.resp === 'ok') {
          return true;
        } else {
          return false;
        }
      });
  }

  validarToken(token: any) {
    const url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/login/verificar/activotoken?token=' + token;
    return this.http.get(url);
  }

  realizarCambioPass(token: any, pass: any) {
    const url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/login?token=' + token + '&pass=' + pass;
    return this.http.put(url, {});
  }

}
