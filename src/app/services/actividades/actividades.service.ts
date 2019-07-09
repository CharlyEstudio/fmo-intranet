import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuraciones
import { URL_SERVICIO_GENERAL, URL_PETICION, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, PUERTO_INTERNO_DOS, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class ActividadesService {
  url: string;
  constructor(private http: HttpClient) { }

  nuevaActividad(titulo: any, icono: any, idFerrum: number) {
    console.log(titulo, icono, idFerrum);
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=9';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=9';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=9';
    }
    return this.http.post(this.url, {title: titulo, icon: icono, id: idFerrum}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  actividades(idferrum: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=1&idferrum=' + idferrum;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=1&idferrum=' + idferrum;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=1&idferrum=' + idferrum;
    }
    return this.http.get(this.url);
  }

  guarda(id_actividad: any, comentario: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=2&id_actividad=' + id_actividad + '&comentario=' + comentario;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=2&id_actividad=' + id_actividad + '&comentario=' + comentario;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=2&id_actividad=' + id_actividad + '&comentario=' + comentario;
    }
    return this.http.get(this.url);
  }

  guardahistorial(id_actividad: any, comentario: any, id_usuario: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=3&id_actividad=' + id_actividad + '&comentario=' + comentario + '&id_usuario=' + id_usuario;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=3&id_actividad=' + id_actividad + '&comentario=' + comentario + '&id_usuario=' + id_usuario;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=3&id_actividad=' + id_actividad + '&comentario=' + comentario + '&id_usuario=' + id_usuario;
    }
    return this.http.get(this.url);
  }

  asignacion() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=4';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=4';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=4';
    }
    return this.http.get(this.url);
  }

  asignarActividad(asignacion: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=7';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=7';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=7';
    }
    return this.http.post(this.url, {asignar: asignacion}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  obtenerActividades() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=5';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=5';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=5';
    }
    return this.http.get(this.url);
  }

  buscarRepetidos(id: number, idact: number, dia: string) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=8&id_actividad=' + idact + '&id_usuario=' + id + '&dia=' + dia;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=8&id_actividad=' + idact + '&id_usuario=' + id + '&dia=' + dia;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=8&id_actividad=' + idact + '&id_usuario=' + id + '&dia=' + dia;
    }
    return this.http.get(this.url);
  }

  eliminarActividad(id: number) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=6&id_actividad=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_SERVER + '/api/actividades.php?opc=6&id_actividad=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/actividades.php?opc=6&id_actividad=' + id;
    }
    return this.http.get(this.url);
  }

  obtenerUsuariosparaAsignar() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/usuario/verificadores';
    }
    return this.http.get(this.url);
  }

}
