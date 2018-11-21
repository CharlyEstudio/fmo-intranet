import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class DiariosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesores() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=1';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=1';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=1';
    }

    return this.http.get( this.url );
  }

  proveedores() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=2';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=2';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=2';
    }

    return this.http.get( this.url );
  }

  ventas(fechaIn: any, fechaOut, asesor: any = '') {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      // tslint:disable-next-line:max-line-length
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else {
      // tslint:disable-next-line:max-line-length
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    }

    return this.http.get( this.url );
  }

  ventasAsesor(fechaIn: any, fechaOut, asesor) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      // tslint:disable-next-line:max-line-length
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else {
      // tslint:disable-next-line:max-line-length
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    }

    return this.http.get( this.url );
  }

  compras(fechaIn: any, fechaOut, proveedor: any = '') {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      // tslint:disable-next-line:max-line-length
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else {
      // tslint:disable-next-line:max-line-length
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    }

    return this.http.get( this.url );
  }

  comprasProveedor(fechaIn, fechaOut, proveedor) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      // tslint:disable-next-line:max-line-length
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else {
      // tslint:disable-next-line:max-line-length
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    }

    return this.http.get( this.url );
  }

  utilidades(fechaIn, fechaOut) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  notasCredito(fechaIn, fechaOut) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  inventario() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=9';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=9';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=9';
    }

    return this.http.get( this.url );
  }

  entradaSalida(fechaIn, fechaOut) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  consumoInterno(fechaIn, fechaOut) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  carteraClientes() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=14';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=14';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=14';
    }

    return this.http.get( this.url );
  }

  carteraProveedores() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=16';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=16';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=16';
    }

    return this.http.get( this.url );
  }

  saldoProveedores( id: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=17&id=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=17&id=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=17&id=' + id;
    }

    return this.http.get( this.url );
  }

  diasLunes() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=18';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=18';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=18';
    }

    return this.http.get( this.url );
  }

  pedidosDiaLunes( id: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=19&id=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=19&id=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=19&id=' + id;
    }

    return this.http.get( this.url );
  }

  backOrder( fechaIn: any, fechaOut: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    return this.http.get( this.url );
  }

  obtenerBackOrder( tipo: any, fechaIn: any, fechaOut: any, orden: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/// tslint:disable-next-line:max-line-length
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      // tslint:disable-next-line:max-line-length
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=21&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    } else {
      // tslint:disable-next-line:max-line-length
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=21&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    }

    return this.http.get( this.url );
  }

}
