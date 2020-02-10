import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class ScrumService {

  url: string;
  token: string  = '';

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  obtenerDesarrolladores() {

    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum/developers';

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  enviarSprint(sprint: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum';

    return this.http.post(this.url, {data: sprint});
  }

  actualizarSprint(sprint: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum/actualiza';

    return this.http.put(this.url, {data: sprint});
  }

  completarSprint(id: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum';

    return this.http.put(this.url, {data: id});
  }

  obtenerSprints() {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum';

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  deleteSprint(id: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum/' + id;

    return this.http.delete(this.url);
  }

}
