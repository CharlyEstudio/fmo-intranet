import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_SERVICIO_GENERAL, URL_PETICION, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS } from '../../config/config';

@Injectable()
export class ScrumService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  obtenerDesarrolladores() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/scrum/developers';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/scrum/developers';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum/developers';
    }

    return this.http.get(this.url);
  }

  enviarSprint(sprint: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/scrum';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/scrum';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum';
    }

    return this.http.post(this.url, {data: sprint});
  }

  actualizarSprint(sprint: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/scrum/actualiza';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/scrum/actualiza';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum/actualiza';
    }

    return this.http.put(this.url, {data: sprint});
  }

  completarSprint(id: any) {
    console.log(id);
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/scrum';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/scrum';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum';
    }

    return this.http.put(this.url, {data: id});
  }

  obtenerSprints() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/scrum';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/scrum';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum';
    }

    return this.http.get(this.url);
  }

  deleteSprint(id: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/scrum/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/scrum/' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/scrum/' + id;
    }

    return this.http.delete(this.url);
  }

}
