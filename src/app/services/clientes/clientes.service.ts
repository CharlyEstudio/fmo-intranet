import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_SERVER } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class ClientesService {

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  infoCliente( cliente: any, perid: any = '', rol: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=1&perid=' + perid + '&numero=' + cliente + '&rol=' + rol + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  infoClienteGarantia( numero: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=15&numero=' + numero + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  clienteCorreo(idFerrum: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=10&clienteid=' + idFerrum + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  infoClienteCot( cliente: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=9&numero=' + cliente + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  obtenerFacturas( cliente: any, inicio: any, fecha: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER +
    '/api/clientes.php?opcion=2&clienteid=' + cliente + '&inicio=' + inicio + '&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  obtenerFolio( folio: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=5&folio=' + folio + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  obtenerMovimiento( docid: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=3&docid=' + docid + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  obtenerMovimientoNumero( numero: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=6&numero=' + numero + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  enviarEdoCtaEmail( email: any, info: any, cliente: any, asesor: any, telAsesor: any ) {
    let data = JSON.stringify(info);
    let cli = JSON.stringify(cliente);

    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=4&email=' + email + '&info=' + data + '&cliente=' + cli + '&asesor=' + asesor + '&telAsesor=' + telAsesor;

    return this.http.get( this.url );
  }

  enviarEdoCtaPDFEmail( email: any, cliente: any, asesor: any, telAsesor: any, tipo: any ) {
    let cli = JSON.stringify(cliente);

    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=11';

    return this.http.post( this.url, {email, cliente, asesor, telAsesor, tipo}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  obtenerPedidosMonitor() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=8&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  pedidosPorBajarWeb(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=33&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
  }

}
