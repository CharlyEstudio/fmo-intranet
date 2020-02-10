import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER } from '../../config/config';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AsesoresService {

  url: string;
  token: string = '';

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private _usuarioS: UsuarioService
  ) {
    this.token = this._usuarioS.token;
  }

  asesor( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/usuario/especifico/' + id;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  zonaAsesor( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=0&perid=' + id;

    return this.http.get( this.url );
  }

  porBajar( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=1&perid=' + id;

    return this.http.get( this.url );
  }

  porSurtir( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=2&perid=' + id;

    return this.http.get( this.url );
  }

  facturado( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=3&perid=' + id;

    return this.http.get( this.url );
  }

  cancelados( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=4&perid=' + id;

    return this.http.get( this.url );
  }

  pedidosTotales( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=5&perid=' + id;

    return this.http.get( this.url );
  }

  diaVisita( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=6&perid=' + id;

    return this.http.get( this.url );
  }

  ventaMensual( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=7&perid=' + id;

    return this.http.get( this.url );
  }

  carteraTotal( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=22&perid=' + id;

    return this.http.get( this.url );
  }

  carteraVencida( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=8&perid=' + id;

    return this.http.get( this.url );
  }

  carteraVencidaSana( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=23&perid=' + id;

    return this.http.get( this.url );
  }

  carteraDia( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=9&perid=' + id;

    return this.http.get( this.url );
  }

  cobroDia( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=10&perid=' + id;

    return this.http.get( this.url );
  }

  pedidosDiaDiferente( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=11&perid=' + id;

    return this.http.get( this.url );
  }

  pedidosDia( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=12&perid=' + id;

    return this.http.get( this.url );
  }

  ventaMesAnterior( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=13&perid=' + id;

    return this.http.get( this.url );
  }

  morosidad130( id: any ) { // TODO empezar cambio de servidor
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=14&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidad3145( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=15&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidad4660( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=16&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidad6190( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=17&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidad91120( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=18&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  morosidad121( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=19&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  cobranza( id: any = '' ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=20&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  cobranzaTPV( id: any = '' ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=25&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  pdfTPV( data: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/visitas.php?opcion=50';

    return this.http.post( this.url, { datos: data }, {
      headers: { 'content-Type': 'application/x-www-form-urlencoded' }
    } );
  }

  relacionPedidos( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=21&perid=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  partidas(folio: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=41&folio=' + folio;

    return this.http.get( this.url );
  }

  cobroMes( id: any, tipo: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=1&perid=' + id + '&tipo=' + tipo;

    return this.http.get( this.url );
  }

  porVencer( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=2&perid=' + id;

    return this.http.get( this.url );
  }

  vencidoComision1a8( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=3&perid=' + id;

    return this.http.get( this.url );
  }

  vencidoComision9a16( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=4&perid=' + id;

    return this.http.get( this.url );
  }

  vencidoComision17( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=5&perid=' + id;

    return this.http.get( this.url );
  }

  totalClientesAsesor( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=6&perid=' + id;

    return this.http.get( this.url );
  }

  coberturaVentas( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=7&perid=' + id;

    return this.http.get( this.url );
  }

  reglonaje( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=8&perid=' + id;

    return this.http.get( this.url );
  }

  ventaBruta( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=13&perid=' + id;

    return this.http.get( this.url );
  }

  devoluciones( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=9&perid=' + id;

    return this.http.get( this.url );
  }

  notasCredito( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=10&perid=' + id;

    return this.http.get( this.url );
  }

  bonificacion( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=11&perid=' + id;

    return this.http.get( this.url );
  }

  penalizacionPedidos( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=12&perid=' + id;

    return this.http.get( this.url );
  }

}
