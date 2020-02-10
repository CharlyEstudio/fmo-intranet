import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER } from '../../config/config';

import { VencidoHistorial } from '../../models/vencidoHistorial.model';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class CreditoService {

  token: string;

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) {
    this.token = localStorage.getItem('token');
  }

  obtenerCarteraVencida() {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=12&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  mor1a30() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=13&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  mor31a45() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=14&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  mor46a60() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=15&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  mor61a90() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=18&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  mor91a120() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=27&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  mor120() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=28&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidadRelacion( tipo: string ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=16&tipo=' + tipo + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidadRelacionAsesor( perid: string ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=25&perid=' + perid + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidadRelacionCliente( numero: string, perid: any = '' ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=26&numero=' + numero + '&perid=' + perid + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidadRelacionVirtual( tipo: string ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=22&tipo=' + tipo + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  clienteMoroso( clienteid: any, tipo: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=17&tipo=' + tipo + '&clienteid=' + clienteid + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  clienteMorosoTotal( clienteid: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=19&clienteid=' + clienteid + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  clienteSaldo( numero: any, fecha: any ) {
    this.url = URL_SERVICIO_GENERAL + '/api/clientes.php?opcion=22&numero=' + numero + '&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  guardarComentario( comentario: VencidoHistorial ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';

    this.url += '?token=' + this.token;

    return this.http.post( this.url, comentario )
      .map((resp: any) => {
        return resp;
      });
  }

  obtenerComentarios( clienteId: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/cobranza/clientes/vencido/historial/' + clienteId;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  obtenerComentariosDia( fecha: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/cobranza/clientes/vencido/historial/fecha/' + fecha;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  ultimosPagos( clienteid: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=20&clienteid=' + clienteid + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  pagosRango(inicio: any, final: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=24&inicio=' + inicio + '&final=' + final + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  pagosMes( clienteid: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=21&clienteid=' + clienteid + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  chequesDevueltos() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=23&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  exportarPDFphp(data: any, file: any, cliente: any, asesor: any, tel: any, tipo: any, cargos: any, abonos: any, saldo: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/credito.php?opcion=2';

    return this.http.post(
      this.url,
      {
        cliente: cliente,
        file: file,
        datos: data,
        asesor: asesor,
        tel: tel,
        tipo: tipo,
        cargos: cargos,
        abonos: abonos,
        saldos: saldo
       },
      { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

}
