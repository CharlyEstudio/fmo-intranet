import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Usuario } from '../../models/usuario.model';

import { Comision } from '../../models/comision.model';

import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_INTERNO, PUERTO_SERVER } from '../../config/config';

import { SweetAlert } from 'sweetalert/typings/core';

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

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/login/renuevatoken';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/login/renuevatoken';
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/login/renuevatoken';
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

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any, rol: any) {
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
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/login';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/login';
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/login';
    }

    return this.http.post( url, usuario )
      .map( ( resp: any ) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu, resp.usuario.rol);

        return true;
      })
      .catch( ( err ) => {
        swal('Error en el login', err.error.errors.message, 'error');
        // alert('Error en el login ' + err.error.errors.message);
        // return Observable.throw( err );
        return Observable.throw( err.error.ok );
      });
  }

  crearUsuario(usuario: Usuario) {
    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario';
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario';
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

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/' + usuario._id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/' + usuario._id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/' + usuario._id;
    }

    url += '?token=' + this.token;

    return this.http.put( url, usuario )
      .map( (resp: any) => {
        if ( usuario._id === this.usuario._id ) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu, usuarioDB.rol );
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

        this.guardarStorage( id, this.token, this.usuario, this.menu, resp.usuario.rol );
      })
      .catch( resp => {});
  }

  cargarUsuarios( desde: number = 0 ) {
    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario?desde=' + desde;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario?desde=' + desde;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario?desde=' + desde;
    }

    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/coleccion/usuarios/' + termino;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/coleccion/usuarios/' + termino;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/coleccion/usuarios/' + termino;
    }

    return this.http.get( url )
      .map( ( resp: any ) => resp.usuarios );
  }

  borrarUsuario ( id: string ) {
    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/' + id;
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

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/comision/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/especifico/comision/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/comision/' + id;
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

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/comisiones';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/comisiones';
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/comisiones';
    }

    url += '?token=' + this.token;

    return this.http.post( url, comision )
      .map( (resp: any) => {
        swal ('¡Guardado Correcto!', 'Reporte de comisión guardada.', 'success');
        return resp.usuario;
      })
      .catch( err => {
        swal('Erro' , err.error.error, 'error');
        return Observable.throw( err );
      });

  }

  actualizarComisionUsusario( comision: Comision, id: any ) {

    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/comisiones/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/comisiones/' + id;
    } else {
      url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/comisiones/' + id;
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

  getLoginUsuarioSocket () {
    return this.wsService.escuchar('login-usuario');
  }

  enviarPassword( usuario: Usuario ) {
    let url;
    let user = JSON.stringify(usuario);

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_SERVER + '/usuarios.php?opcion=1&usuario' + user;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/usuarios.php?opcion=1&usuario' + user;
    } else {
      url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/usuarios.php?opcion=1&usuario' + user;
    }

    return this.http.get( url );
  }

  recuperar( id: any ) {
    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/recuperar/usuario/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/recuperar/usuario/' + id;
    } else {
      url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/busqueda/recuperar/usuario/' + id;
    }

    return this.http.get( url );
  }

  buscarUsuarioEsp (idFerrum: any) {
    let url;

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/buscar/especifico/' + idFerrum;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/buscar/especifico/' + idFerrum;
    } else {
      url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/usuario/buscar/especifico/' + idFerrum;
    }

    return this.http.get( url );
  }

}
