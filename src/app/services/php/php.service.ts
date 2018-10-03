import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class PhpService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  porBajar() {
    // this.url = 'http://localhost:80/apis/pedidos.php?opcion=1';
    this.url = 'http://192.168.1.250/api/pedidos.php?opcion=1';

    return this.http.get( this.url );
  }

  porSurtir() {
    this.url = 'http://192.168.1.250/api/pedidos.php?opcion=2';

    return this.http.get( this.url );
  }

  facturados() {
    this.url = 'http://192.168.1.250/api/pedidos.php?opcion=3';

    return this.http.get( this.url );
  }

  cancelados() {
    this.url = 'http://192.168.1.250/api/pedidos.php?opcion=4';

    return this.http.get( this.url );
  }

  totalPedidos() {
    this.url = 'http://192.168.1.250/api/pedidos.php?opcion=5';

    return this.http.get( this.url );
  }

  nivelServicio() {
    this.url = 'http://192.168.1.250/api/pedidos.php?opcion=6';

    return this.http.get( this.url );
  }

  nsTruper() {
    this.url = 'http://192.168.1.250/api/pedidos.php?opcion=7';

    return this.http.get( this.url );
  }

  nsFMO() {
    this.url = 'http://192.168.1.250/api/pedidos.php?opcion=8';

    return this.http.get( this.url );
  }
}
