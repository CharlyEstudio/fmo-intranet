import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE, URL_SERVICIOS } from '../../config/config';

@Injectable()
export class AsesoresService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesor( id: any ) {
    this.url = URL_SERVICIOS + '/busqueda/especifico/usuario/' + id;

    return this.http.get( this.url );
  }

  zonaAsesor( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=0&perid=' + id;

    return this.http.get( this.url );
  }

  porBajar( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=1&perid=' + id;

    return this.http.get( this.url );
  }

  porSurtir( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=2&perid=' + id;

    return this.http.get( this.url );
  }

  facturado( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=3&perid=' + id;

    return this.http.get( this.url );
  }

  cancelados( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=4&perid=' + id;

    return this.http.get( this.url );
  }

  pedidosTotales( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=5&perid=' + id;

    return this.http.get( this.url );
  }

  diaVisita( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=6&perid=' + id;

    return this.http.get( this.url );
  }

  ventaMensual( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=7&perid=' + id;

    return this.http.get( this.url );
  }

  carteraTotal( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=22&perid=' + id;

    return this.http.get( this.url );
  }

  carteraVencida( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=8&perid=' + id;

    return this.http.get( this.url );
  }

  carteraVencidaSana( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=23&perid=' + id;

    return this.http.get( this.url );
  }

  carteraDia( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=9&perid=' + id;

    return this.http.get( this.url );
  }

  cobroDia( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=10&perid=' + id;

    return this.http.get( this.url );
  }

  pedidosDiaDiferente( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=11&perid=' + id;

    return this.http.get( this.url );
  }

  pedidosDia( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=12&perid=' + id;

    return this.http.get( this.url );
  }

  ventaMesAnterior( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=13&perid=' + id;

    return this.http.get( this.url );
  }

  morosidad18( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=14&perid=' + id;

    return this.http.get( this.url );
  }

  morosidad916( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=15&perid=' + id;

    return this.http.get( this.url );
  }

  morosidad1730( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=16&perid=' + id;

    return this.http.get( this.url );
  }

  morosidad3160( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=17&perid=' + id;

    return this.http.get( this.url );
  }

  morosidad6190( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=18&perid=' + id;

    return this.http.get( this.url );
  }

  morosidad91( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=19&perid=' + id;

    return this.http.get( this.url );
  }

  cobranza( id: any = '' ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=20&perid=' + id;

    return this.http.get( this.url );
  }

  relacionPedidos( id: any ) {
    this.url = URL_SERVICE + '/api/asesores.php?opcion=21&perid=' + id;

    return this.http.get( this.url );
  }

  cobroMes( id: any, tipo: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=1&perid=' + id + '&tipo=' + tipo;

    return this.http.get( this.url );
  }

  porVencer( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=2&perid=' + id;

    return this.http.get( this.url );
  }

  vencidoComision1a8( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=3&perid=' + id;

    return this.http.get( this.url );
  }

  vencidoComision9a16( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=4&perid=' + id;

    return this.http.get( this.url );
  }

  vencidoComision17( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=5&perid=' + id;

    return this.http.get( this.url );
  }

  totalClientesAsesor( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=6&perid=' + id;

    return this.http.get( this.url );
  }

  coberturaVentas( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=7&perid=' + id;

    return this.http.get( this.url );
  }

  reglonaje( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=8&perid=' + id;

    return this.http.get( this.url );
  }

  ventaBruta( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=13&perid=' + id;

    return this.http.get( this.url );
  }

  devoluciones( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=9&perid=' + id;

    return this.http.get( this.url );
  }

  notasCredito( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=10&perid=' + id;

    return this.http.get( this.url );
  }

  bonificacion( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=11&perid=' + id;

    return this.http.get( this.url );
  }

  penalizacionPedidos( id: any ) {
    this.url = URL_SERVICE + '/api/comisiones.php?opcion=12&perid=' + id;

    return this.http.get( this.url );
  }

}
