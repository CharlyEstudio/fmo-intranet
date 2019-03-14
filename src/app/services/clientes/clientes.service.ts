import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class ClientesService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  infoCliente( cliente: any, perid: any = '', rol: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/clientes.php?opcion=1&perid=' + perid + '&numero=' + cliente + '&rol=' + rol;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/clientes.php?opcion=1&perid=' + perid + '&numero=' + cliente + '&rol=' + rol;
    } else {
      // tslint:disable-next-line:max-line-length
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=1&perid=' + perid + '&numero=' + cliente + '&rol=' + rol;
    }

    return this.http.get( this.url );
  }

  infoClienteCot( cliente: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/clientes.php?opcion=9&numero=' + cliente;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/clientes.php?opcion=9&numero=' + cliente;
    } else {
      // tslint:disable-next-line:max-line-length
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=9&numero=' + cliente;
    }

    return this.http.get( this.url );
  }

  obtenerFacturas( cliente: any, inicio: any, fecha: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/clientes.php?opcion=2&clienteid=' + cliente + '&inicio=' + inicio + '&fecha=' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/clientes.php?opcion=2&clienteid=' + cliente + '&inicio=' + inicio + '&fecha=' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER +
      '/api/clientes.php?opcion=2&clienteid=' + cliente + '&inicio=' + inicio + '&fecha=' + fecha;
    }

    return this.http.get( this.url );
  }

  obtenerFolio( folio: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/clientes.php?opcion=5&folio=' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/clientes.php?opcion=5&folio=' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=5&folio=' + folio;
    }

    return this.http.get( this.url );
  }

  obtenerMovimiento( docid: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/clientes.php?opcion=3&docid=' + docid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/clientes.php?opcion=3&docid=' + docid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=3&docid=' + docid;
    }

    return this.http.get( this.url );
  }

  obtenerMovimientoNumero( numero: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/clientes.php?opcion=6&numero=' + numero;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/clientes.php?opcion=6&numero=' + numero;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=6&numero=' + numero;
    }

    return this.http.get( this.url );
  }

  enviarEdoCtaEmail( email: any, info: any, cliente: any, asesor: any, telAsesor: any ) {
    let data = JSON.stringify(info);
    let cli = JSON.stringify(cliente);

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/clientes.php?opcion=4&email=' + email + '&info=' + data + '&cliente=' + cli + '&asesor=' + asesor + '&telAsesor=' + telAsesor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/clientes.php?opcion=4&email=' + email + '&info=' + data + '&cliente=' + cli + '&asesor=' + asesor + '&telAsesor=' + telAsesor;
    } else {
      // tslint:disable-next-line:max-line-length
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=4&email=' + email + '&info=' + data + '&cliente=' + cli + '&asesor=' + asesor + '&telAsesor=' + telAsesor;
    }

    return this.http.get( this.url );
  }

  obtenerPedidosMonitor() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/clientes.php?opcion=8';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/clientes.php?opcion=8';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=8';
    }

    return this.http.get( this.url );
  }

}
