import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuraciones
import { URL_SERVICIO_GENERAL, URL_PETICION, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, PUERTO_INTERNO_DOS, PUERTO_SERVER, URL_EXTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class ActividadesService {
  url: string;
  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  nuevaActividad(titulo: any, icono: any, idFerrum: number) {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=9';
    return this.http.post(this.url, {title: titulo, icon: icono, id: idFerrum}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  actividades(idferrum: any) {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=1&idferrum=' + idferrum;
    return this.http.get(this.url);
  }

  guarda(id_actividad: any, comentario: any) {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=2&id_actividad=' + id_actividad + '&comentario=' + comentario;
    return this.http.get(this.url);
  }

  guardahistorial(id_actividad: any, comentario: any, id_usuario: any) {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=3&id_actividad=' + id_actividad + '&comentario=' + comentario + '&id_usuario=' + id_usuario;
    return this.http.get(this.url);
  }

  asignacion() {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=4';
    return this.http.get(this.url);
  }

  asignarActividad(asignacion: any) {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=7';
    return this.http.post(this.url, {asignar: asignacion}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  obtenerActividades() {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=5';
    return this.http.get(this.url);
  }

  buscarRepetidos(id: number, idact: number, dia: string) {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=8&id_actividad=' + idact + '&id_usuario=' + id + '&dia=' + dia;
    return this.http.get(this.url);
  }

  eliminarActividad(id: number) {
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/actividades.php?opc=6&id_actividad=' + id;
    return this.http.get(this.url);
  }

  obtenerUsuariosparaAsignar() {
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    return this.http.get(this.url);
  }

}
