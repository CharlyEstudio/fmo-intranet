import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL } from '../../config/config';

@Injectable()
export class DiariosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesores() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=1';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=1';
    }

    return this.http.get( this.url );
  }

  proveedores() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=2';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=2';
    }

    return this.http.get( this.url );
  }

  ventas(fechaIn: any, fechaOut, asesor: any = '') {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    }

    return this.http.get( this.url );
  }

  ventasAsesor(fechaIn: any, fechaOut, asesor){
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    }

    return this.http.get( this.url );
  }

  compras(fechaIn: any, fechaOut, proveedor: any = '') {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    }

    return this.http.get( this.url );
  }

  comprasProveedor(fechaIn, fechaOut, proveedor) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    }

    return this.http.get( this.url );
  }

  utilidades(fechaIn, fechaOut) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  notasCredito(fechaIn, fechaOut) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  inventario() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=9';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=9';
    }

    return this.http.get( this.url );
  }

  entradaSalida(fechaIn, fechaOut) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  consumoInterno(fechaIn, fechaOut) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  carteraClientes() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=14';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=14';
    }

    return this.http.get( this.url );
  }

  carteraProveedores() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=16';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=16';
    }

    return this.http.get( this.url );
  }

  saldoProveedores( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=17&id=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=17&id=' + id;
    }

    return this.http.get( this.url );
  }

  diasLunes() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=18';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=18';
    }

    return this.http.get( this.url );
  }

  pedidosDiaLunes( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=19&id=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=19&id=' + id;
    }

    return this.http.get( this.url );
  }

  backOrder( fechaIn: any, fechaOut: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  obtenerBackOrder( tipo: any, fechaIn: any, fechaOut: any, orden: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/diarios.php?opcion=21&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/diarios.php?opcion=21&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    }

    return this.http.get( this.url );
  }

}
