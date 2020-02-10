import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// CONFIGURACION
import { URL_SERVICIO_GENERAL, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class PedidoService {

  url: string;

  constructor(
    private http: HttpClient
  ) {

  }

  pedidosHora(hora: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=4&hora=' + hora;
    return this.http.get(this.url);
  }

  partidasHora(hora: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=5&hora=' + hora;
    return this.http.get(this.url);
  }

  partidasTotal(hora: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=7&hora=' + hora;
    return this.http.get(this.url);
  }

  pedidosTotal(hora: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=8&hora=' + hora;
    return this.http.get(this.url);
  }

  totalAlmacenistas() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=9';
    return this.http.get(this.url);
  }

  pedidosGlobal() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=6';
    return this.http.get(this.url);
  }

  buscarFolio(pedido: any, serie: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=10&pedido=' + pedido + '&serie=' + serie;
    return this.http.get(this.url);
  }

  buscarIdGrafica(id: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=11&id=' + id;
    return this.http.get(this.url);
  }

  obtenerPartidasPedido(folio: any, serie: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=12&folio=' + folio + '&serie=' + serie;
    return this.http.get(this.url);
  }

  obtenerInfoId(id: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=13&id=' + id;
    return this.http.get(this.url);
  }

  obtenerPedidosId(id: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=14&id=' + id;
    return this.http.get(this.url);
  }

  personalAlmacen() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=2';
    return this.http.get(this.url);
  }
  nuevoPersonal(texto: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=16&texto=' + texto;
    return this.http.get(this.url);
  }

  eliminarPersonal(id: any, idFerrum: any, actividad: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=17&id=' + id + '&idFerrum=' + idFerrum + '&actividad=' + actividad;
    return this.http.get(this.url);
  }

  verPersonal(id: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=19&id=' + id;
    return this.http.get(this.url);
  }

 editarPersonal(id: any, nombre: any, usuario: any, activo: any, tiempo: any, rotacion: any, marquesina: any, capacitacion: any, area: any, seccion: any, idFerrum: any, actividad: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=20&id=' + id + '&nombre=' + nombre + '&usuario=' + usuario + '&activo=' + activo + '&tiempo=' + tiempo
    + '&rotacion=' + rotacion + '&marquesina=' + marquesina + '&capacitacion=' + capacitacion + '&area=' + area + '&seccion=' + seccion + '&idFerrum=' + idFerrum + '&actividad=' + actividad;
    return this.http.get(this.url);
  }

  guardarRegistro(nombre: any, usuario: any, activo: any, tiempo: any, rotacion: any, marquesina: any, capacitacion: any, area: any, seccion: any, idFerrum: any, actividad: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=18&nombre=' + nombre + '&usuario=' + usuario + '&activo=' + activo + '&tiempo=' + tiempo
    + '&rotacion=' + rotacion + '&marquesina=' + marquesina + '&capacitacion=' + capacitacion + '&area=' + area + '&seccion=' + seccion + '&idFerrum=' + idFerrum + '&actividad=' + actividad;
    return this.http.get(this.url);
  }

}
