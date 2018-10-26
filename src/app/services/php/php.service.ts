import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';

@Injectable()
export class PhpService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  porBajar() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=1';

    return this.http.get( this.url );
  }

  porBajarZona( zona: any ) {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=12&zona=' + zona;

    return this.http.get( this.url );
  }

  porBajarEspecial() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=14';

    return this.http.get( this.url );
  }

  porSurtir() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=2';

    return this.http.get( this.url );
  }

  porSurtirZona( zona: any ) {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=13&zona=' + zona;

    return this.http.get( this.url );
  }

  porSurtirEspecial() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=15';

    return this.http.get( this.url );
  }

  facturados() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=3';

    return this.http.get( this.url );
  }

  facturadoZona( zona: any ) {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=16&zona=' + zona;

    return this.http.get( this.url );
  }

  facturadoEspecial() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=17';

    return this.http.get( this.url );
  }

  cancelados() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=4';

    return this.http.get( this.url );
  }

  canceladoZona( zona: any ) {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=18&zona=' + zona;

    return this.http.get( this.url );
  }

  canceladoEspecial() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=19';

    return this.http.get( this.url );
  }

  totalPedidos() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=5';

    return this.http.get( this.url );
  }

  nivelServicio() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=6';

    return this.http.get( this.url );
  }

  nsTruper() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=7';

    return this.http.get( this.url );
  }

  nsFMO() {
    this.url = URL_SERVICE + '/api/pedidos.php?opcion=8';

    return this.http.get( this.url );
  }

  ventaActual() {
    this.url = URL_SERVICE + '/api/ventas.php?opcion=1';

    return this.http.get( this.url );
  }

  ventaAnterior() {
    this.url = URL_SERVICE + '/api/ventas.php?opcion=2';

    return this.http.get( this.url );
  }

  zona1() {
    this.url = URL_SERVICE + '/api/ventas.php?opcion=3&zona=1';

    return this.http.get( this.url );
  }

  zona2() {
    this.url = URL_SERVICE + '/api/ventas.php?opcion=3&zona=2';

    return this.http.get( this.url );
  }

  especial() {
    this.url = URL_SERVICE + '/api/ventas.php?opcion=4';

    return this.http.get( this.url );
  }

  financiado() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=1';

    return this.http.get( this.url );
  }

  saldo() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=2';

    return this.http.get( this.url );
  }

  vencido() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=3';

    return this.http.get( this.url );
  }

  mor18() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=4';

    return this.http.get( this.url );
  }

  mor916() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=5';

    return this.http.get( this.url );
  }

  mor1730() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=6';

    return this.http.get( this.url );
  }

  mor3160() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=7';

    return this.http.get( this.url );
  }

  mor6190() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=8';

    return this.http.get( this.url );
  }

  mor91() {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=9';

    return this.http.get( this.url );
  }

  listaMorosidad( id: any, inicio: any, fin: any ) {
    this.url = URL_SERVICE + '/api/morosidad.php?opcion=10&perid=' + id + '&inicio=' + inicio + '&fin=' + fin;

    return this.http.get( this.url );
  }

  diferencias() {
    this.url = URL_SERVICE + '/api/ventas.php?opcion=5';

    return this.http.get( this.url );
  }

}
