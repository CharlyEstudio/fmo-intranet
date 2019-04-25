import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_INTERNO, PUERTO_SERVER, URL_PETICION } from '../../config/config';

@Injectable()
export class AsesoresService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesor( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/busqueda/especifico/usuario/' + id;
    }

    return this.http.get( this.url );
  }

  zonaAsesor( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=0&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=0&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=0&perid=' + id;
    }

    return this.http.get( this.url );
  }

  porBajar( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=1&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=1&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=1&perid=' + id;
    }

    return this.http.get( this.url );
  }

  porSurtir( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=2&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=2&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=2&perid=' + id;
    }

    return this.http.get( this.url );
  }

  facturado( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=3&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=3&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=3&perid=' + id;
    }

    return this.http.get( this.url );
  }

  cancelados( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=4&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=4&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=4&perid=' + id;
    }

    return this.http.get( this.url );
  }

  pedidosTotales( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=5&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=5&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=5&perid=' + id;
    }

    return this.http.get( this.url );
  }

  diaVisita( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=6&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=6&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=6&perid=' + id;
    }

    return this.http.get( this.url );
  }

  ventaMensual( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=7&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=7&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=7&perid=' + id;
    }

    return this.http.get( this.url );
  }

  carteraTotal( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=22&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=22&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=22&perid=' + id;
    }

    return this.http.get( this.url );
  }

  carteraVencida( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=8&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=8&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=8&perid=' + id;
    }

    return this.http.get( this.url );
  }

  carteraVencidaSana( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=23&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=23&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=23&perid=' + id;
    }

    return this.http.get( this.url );
  }

  carteraDia( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=9&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=9&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=9&perid=' + id;
    }

    return this.http.get( this.url );
  }

  cobroDia( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=10&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=10&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=10&perid=' + id;
    }

    return this.http.get( this.url );
  }

  pedidosDiaDiferente( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=11&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=11&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=11&perid=' + id;
    }

    return this.http.get( this.url );
  }

  pedidosDia( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=12&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=12&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=12&perid=' + id;
    }

    return this.http.get( this.url );
  }

  ventaMesAnterior( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=13&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=13&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=13&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad130( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=14&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=14&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=14&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad3145( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=15&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=15&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=15&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad4660( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=16&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=16&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=16&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad6190( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=17&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=17&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=17&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad91120( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=18&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=18&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=18&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad121( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=19&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=19&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=19&perid=' + id;
    }

    return this.http.get( this.url );
  }

  cobranza( id: any = '' ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=20&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=20&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=20&perid=' + id;
    }

    return this.http.get( this.url );
  }

  relacionPedidos( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/asesores.php?opcion=21&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/asesores.php?opcion=21&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/asesores.php?opcion=21&perid=' + id;
    }

    return this.http.get( this.url );
  }

  partidas(folio: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=41&folio=' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/pedidos.php?opcion=41&folio=' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=41&folio=' + folio;
    }

    return this.http.get( this.url );
  }

  cobroMes( id: any, tipo: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=1&perid=' + id + '&tipo=' + tipo;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=1&perid=' + id + '&tipo=' + tipo;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=1&perid=' + id + '&tipo=' + tipo;
    }

    return this.http.get( this.url );
  }

  porVencer( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=2&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=2&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=2&perid=' + id;
    }

    return this.http.get( this.url );
  }

  vencidoComision1a8( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=3&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=3&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=3&perid=' + id;
    }

    return this.http.get( this.url );
  }

  vencidoComision9a16( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=4&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=4&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=4&perid=' + id;
    }

    return this.http.get( this.url );
  }

  vencidoComision17( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=5&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=5&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=5&perid=' + id;
    }

    return this.http.get( this.url );
  }

  totalClientesAsesor( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=6&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=6&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=6&perid=' + id;
    }

    return this.http.get( this.url );
  }

  coberturaVentas( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=7&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=7&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=7&perid=' + id;
    }

    return this.http.get( this.url );
  }

  reglonaje( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=8&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=8&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=8&perid=' + id;
    }

    return this.http.get( this.url );
  }

  ventaBruta( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=13&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=13&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=13&perid=' + id;
    }

    return this.http.get( this.url );
  }

  devoluciones( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=9&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=9&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=9&perid=' + id;
    }

    return this.http.get( this.url );
  }

  notasCredito( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=10&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=10&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=10&perid=' + id;
    }

    return this.http.get( this.url );
  }

  bonificacion( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=11&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=11&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=11&perid=' + id;
    }

    return this.http.get( this.url );
  }

  penalizacionPedidos( id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/comisiones.php?opcion=12&perid=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/comisiones.php?opcion=12&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=12&perid=' + id;
    }

    return this.http.get( this.url );
  }

}
