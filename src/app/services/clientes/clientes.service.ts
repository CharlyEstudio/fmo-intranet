import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PARAM_KEY, KEY, PUERTO_INTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ClientesService {

  url: string;

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private usuarioS: UsuarioService
  ) { }

  infoCliente( cliente: any, perid: any = '', rol: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/asesor/${cliente}/${perid}/${rol}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  infoClienteGarantia( numero: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/guia/${numero}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  clienteCorreo(idFerrum: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/correo/${idFerrum}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  infoClienteCot( cliente: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/cotizador/${cliente}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  // TODO aqui avance con el API PHP 2020

  obtenerFacturas( cliente: any, inicio: any, fecha: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/facturas/${cliente}/${inicio}/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  // obtenerFolio( folio: any ) {
  //   this.url = `${URL_SERVICIO_GENERAL}/services/clientes/movimientos/folio/${folio}/${this._servidor.db}`;

  //   return this.http.get( this.url );
  // }

  obtenerMovimiento( docid: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/movimientos/pagos/${docid}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  obtenerMovimientoNumero( numero: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/movimientos/pago/numero/${numero}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  enviarEdoCtaEmail( email: any, info: any, cliente: any, asesor: any, telAsesor: any ) {
    // let data = JSON.stringify(info);
    // let cli = JSON.stringify(cliente);

    // this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/clientes.php?opcion=4&email=' + email + '&info=' + data + '&cliente=' + cli + '&asesor=' + asesor + '&telAsesor=' + telAsesor;

    // return this.http.get( this.url );
  }

  // Crea todo el correo pero no envía por cuestiones de certificados SSL en el correo.
  enviarEdoCtaPDFEmail( email: any, cliente: any, asesor: any, telAsesor: any, tipo: any, datos: any[] ) {
    this.url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/mail/estado/cuenta?token=${this.usuarioS.token}`;

    return this.http.post( this.url, {email, cliente, asesor, telAsesor, tipo, datos}).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  obtenerPedidosMonitor() {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/pedidos/monitor/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  pedidosPorBajarWeb(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/bajarweb/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

}
