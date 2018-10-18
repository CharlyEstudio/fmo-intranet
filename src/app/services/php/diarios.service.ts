import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';

@Injectable()
export class DiariosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesores() {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=1';
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=1';

    return this.http.get( this.url );
  }

  proveedores() {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=2';
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=2';

    return this.http.get( this.url );
  }

  ventas(fechaIn: any, fechaOut, asesor: any = '') {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;

    return this.http.get( this.url );
  }

  ventasAsesor(fechaIn: any, fechaOut, asesor){
    this.url = URL_SERVICE + '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;

    return this.http.get( this.url );
  }

  compras(fechaIn: any, fechaOut, proveedor: any = '') {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;

    return this.http.get( this.url );
  }

  comprasProveedor(fechaIn, fechaOut, proveedor) {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;

    return this.http.get( this.url );
  }

  utilidades(fechaIn, fechaOut) {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;

    return this.http.get( this.url );
  }

  notasCredito(fechaIn, fechaOut) {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;

    return this.http.get( this.url );
  }

  inventario() {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=9';
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=9';

    return this.http.get( this.url );
  }

  entradaSalida(fechaIn, fechaOut) {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;

    return this.http.get( this.url );
  }

  consumoInterno(fechaIn, fechaOut) {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;

    return this.http.get( this.url );
  }

  carteraClientes() {
    this.url = URL_SERVICE + '/api/diarios.php?opcion=14';
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=14';

    return this.http.get( this.url );
  }

}
