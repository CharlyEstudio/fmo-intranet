import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';

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
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer?desde=' + desde;

    return this.http.get(this.url);
  }

  obtenerChofer(id: string) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/id/' + id;

    return this.http.get(this.url);
  }

  obtenerChoferesAll() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/all';

    return this.http.get(this.url);
  }

  obtenerVerificadores() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/verificadores';

    return this.http.get(this.url);
  }

  crearChofer(chofer: Chofer, usuario: Usuario) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/new';

    return this.http.post(this.url, {chofer: chofer, usuario: usuario});
  }

  borrarUsuario ( id: string ) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/delete/' + id;

    url += '?token=' + this.token;

    return this.http.delete( url );
  }

  actualizarUsusario( chofer: Chofer ) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/chofer/update/' + chofer._id;

    url += '?token=' + this.token;

    return this.http.put( url, chofer );
  }

  mostrarGuias( id: any ) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/guias/pordia/chofer/' + id;

    url += '?token=' + this.token;

    return this.http.get( url );
  }

}
