import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// config
import { URL_SERVICIO_GENERAL, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class GarantiasService {

  constructor(
    public http: HttpClient
  ) { }

  totalregistros() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=0';

    return this.http.get(url);
  }

  obtenerGarantiasDesde(desde: number = 0) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=1&desde=' + desde;

    return this.http.get(url);
  }

  obtenerGarantias() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=17';

    return this.http.get(url);
  }

  obtenerGarantiasNuevos() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=11';

    return this.http.get(url);
  }

  obtenerGarantiasProceso() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=12';

    return this.http.get(url);
  }

  obtenerGarantiasEnviando() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=13';

    return this.http.get(url);
  }

  obtenerGarantiasAutorizacion() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=14';

    return this.http.get(url);
  }

  obtenerGarantiasEntregar() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=15';

    return this.http.get(url);
  }

  obtenerGarantiasTerminado() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=16';

    return this.http.get(url);
  }

  buscarGara(text: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=2&texto=' + text;

    return this.http.get(url);
  }

  validarFolio(folio: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=4&folio=' + folio;

    return this.http.get(url);
  }

  obtenerFactura(folio: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=9&folio=' + folio;

    return this.http.get(url);
  }

  obtenerProductosFacturas(docid: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=10&docid=' + docid;

    return this.http.get(url);
  }

  nuevaGarantia(garantia: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=3';

    return this.http.post(url, {data: garantia}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  actualizarGarantia(garantia: any, estado: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=5';

    return this.http.post(url, {data: garantia, estate: estado}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  anexarNCGarantia(garantia: any, estado: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=7';

    return this.http.post(url, {data: garantia, estate: estado}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  cambiarEstado(garantia: any, estado: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=6';

    return this.http.post(url, {data: garantia, estate: estado}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  terminarGarantia(garantia: any, estado: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=8';

    return this.http.post(url, {data: garantia, estate: estado}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

}
