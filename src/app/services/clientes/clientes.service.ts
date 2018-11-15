import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL } from '../../config/config';

@Injectable()
export class ClientesService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  infoCliente( cliente: any, perid: any = '' ) {
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/clientes.php?opcion=1&perid=' + perid + '&numero=' + cliente;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/clientes.php?opcion=1&perid=' + perid + '&numero=' + cliente;
    }

    return this.http.get( this.url );
  }

  obtenerFacturas( cliente: any, inicio: any ) {
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/clientes.php?opcion=2&clienteid=' + cliente + '&inicio=' + inicio;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/clientes.php?opcion=2&clienteid=' + cliente + '&inicio=' + inicio;
    }

    return this.http.get( this.url );
  }

  obtenerMovimiento( docid: any ) {
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/clientes.php?opcion=3&docid=' + docid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/clientes.php?opcion=3&docid=' + docid;
    }

    return this.http.get( this.url );
  }

}
