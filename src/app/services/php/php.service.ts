import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhpService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  porBajar() {
    // this.url = 'http://localhost:80/apis/pedidos.php?opcion=1';
    // this.url = 'http://192.168.1.250/api/pedidos.php?opcion=1';
    this.url = 'http://localhost:80/apis/pedidos.php?opcion=1';

    return this.http.get( this.url );
  }

  porSurtir() {
    this.url = 'http://localhost:80/apis/pedidos.php?opcion=2';

    return this.http.get( this.url );
  }

  facturados() {
    this.url = 'http://localhost:80/apis/pedidos.php?opcion=3';

    return this.http.get( this.url );
  }

  cancelados() {
    this.url = 'http://localhost:80/apis/pedidos.php?opcion=4';

    return this.http.get( this.url );
  }

  totalPedidos() {
    this.url = 'http://localhost:80/apis/pedidos.php?opcion=5';

    return this.http.get( this.url );
  }

  nivelServicio() {
    this.url = 'http://localhost:80/apis/pedidos.php?opcion=6';

    return this.http.get( this.url );
  }

  nsTruper() {
    this.url = 'http://localhost:80/apis/pedidos.php?opcion=7';

    return this.http.get( this.url );
  }

  nsFMO() {
    this.url = 'http://localhost:80/apis/pedidos.php?opcion=8';

    return this.http.get( this.url );
  }

  ventaActual() {
    this.url = 'http://localhost:80/apis/ventas.php?opcion=1';

    return this.http.get( this.url );
  }

  ventaAnterior() {
    this.url = 'http://localhost:80/apis/ventas.php?opcion=2';

    return this.http.get( this.url );
  }

  zona1() {
    this.url = 'http://localhost:80/apis/ventas.php?opcion=3&zona=1';

    return this.http.get( this.url );
  }

  zona2() {
    this.url = 'http://localhost:80/apis/ventas.php?opcion=3&zona=2';

    return this.http.get( this.url );
  }

  especial() {
    this.url = 'http://localhost:80/apis/ventas.php?opcion=4';

    return this.http.get( this.url );
  }

  financiado() {
    this.url = 'http://localhost:80/apis/morosidad.php?opcion=1';

    return this.http.get( this.url );
  }

  saldo() {
    this.url = 'http://localhost:80/apis/morosidad.php?opcion=2';

    return this.http.get( this.url );
  }

  vencido() {
    this.url = 'http://localhost:80/apis/morosidad.php?opcion=3';

    return this.http.get( this.url );
  }

  mor015() {
    this.url = 'http://localhost:80/apis/morosidad.php?opcion=4';

    return this.http.get( this.url );
  }

  mor1530() {
    this.url = 'http://localhost:80/apis/morosidad.php?opcion=5';

    return this.http.get( this.url );
  }

  mor3060() {
    this.url = 'http://localhost:80/apis/morosidad.php?opcion=6';

    return this.http.get( this.url );
  }

  mor60() {
    this.url = 'http://localhost:80/apis/morosidad.php?opcion=7';

    return this.http.get( this.url );
  }

}
