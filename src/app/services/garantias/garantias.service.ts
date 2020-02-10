import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// config
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class GarantiasService {

  url: string;
  token: string = '';

  constructor(
    public http: HttpClient,
    private _servidor: ServidorService,
    private _usuarioS: UsuarioService
  ) {
    this.token = this._usuarioS.token;
  }

  totalregistros() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=0';

    return this.http.get(url);
  }

  obtenerGarantiasDesde(desde: number = 0) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=1&desde=' + desde + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerGarantiasDesdeFmo() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=25';

    return this.http.get(url);
  }

  obtenerGarantias() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=17&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerGarantiasNuevos() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=11&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerGarantiasProceso() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=12&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerGarantiasEnviando() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=13&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerGarantiasAutorizacion() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=14&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerGarantiasEntregar() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=15&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerGarantiasTerminado() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=16&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  buscarGara(text: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=2&texto=' + text + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  validarFolio(folio: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=4&folio=' + folio;

    return this.http.get(url);
  }

  obtenerFactura(folio: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=9&folio=' + folio + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }
  buscarCodigo(codigo: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=20&codigo=' + codigo + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }
  obtenerProductosFacturas(docid: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=10&docid=' + docid + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  enviarEmail(estado: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=26&estado=' + estado;

    return this.http.get(url);
  }

  nuevaGarantia(garantia: any, marca: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=3';

    return this.http.post(url, {data: garantia, marca: marca}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  nuevaGarantiaNofact(idFerrum: any, garantia: any, clvprov: any, clave: any, descr: any, costo: any, marca: any, clienteFmo: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=21';

    return this.http.post(url, {id: idFerrum, data: garantia, clvprov: clvprov, clave: clave, descr: descr, costo: costo, marca: marca, clienteFmo: clienteFmo}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }


  actualizarGarantia(garantia: any, estado: any,  marca: string, folio: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=5';

    return this.http.post(url, {data: garantia, estate: estado, marca: marca, folio: folio}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
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

  devolucionGarantia(idgar: number, estado: any, folterm: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=19&idgar=' + idgar + '&estado=' + estado + '&folterm=' + folterm;

    return this.http.get(url);
  }

  cancelarGarantia(idgar: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=18&idgar=' + idgar;

    return this.http.get(url);
  }

  buscarFolioHistorial(folio: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guia/buscar/historial/' + folio;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  buscarDatos(idgar: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=22&idgar=' + idgar + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  buscarDomicilio(domid: number) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=24&domid=' + domid + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }


  hacerPDF(folioGenerado: number, file: string, folioPdf: number, numfolpdf: number, cantidadPdf: number, clvprovPdf: number, clavePdf: any ,
    nombrePdf: any, descrPdf: any, diavisPdf: any, diaentrega: any, vendedorPdf: any, direccion: any, numerodir: any, interior: any, colonia: any, ciudad: any) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/garantias.php?opcion=23';
    return this.http.post(url, {
      folGen: folioGenerado,
      file: file,
      folioPdf: folioPdf,
      numfolpdf: numfolpdf,
      cantidadPdf: cantidadPdf,
      clvprovPdf: clvprovPdf,
      clavePdf: clavePdf,
      nombrePdf: nombrePdf,
      descrPdf: descrPdf,
      diavisPdf: diavisPdf,
      diaentrega: diaentrega,
      vendedorPdf: vendedorPdf,
      direccion: direccion,
      numerodir: numerodir,
      interior: interior,
      colonia: colonia,
      ciudad: ciudad

     },
    { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }


}
