import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER, PARAM_KEY, KEY } from '../../config/config';

import { VencidoHistorial } from '../../models/vencidoHistorial.model';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CreditoService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  token: string;

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private usuarioS: UsuarioService
  ) {
    this.token = this.usuarioS.token;
  }

  obtenerCarteraVencida() {
    // this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=12&servidor=' + this._servidor.db;

    // return this.http.get( this.url );
  }

  mor1a30() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/morosidad/130/dias/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  mor31a45() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/morosidad/3145/dias/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  mor46a60() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/morosidad/4660/dias/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  mor61a90() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/morosidad/6190/dias/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  mor91a120() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/morosidad/91120/dias/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  mor120() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/morosidad/120/dias/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  morosidadRelacion( tipo: string ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/morosidad/buscar/relacion/${tipo}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).pipe(
      map((resp: any) => {
        return resp.resp;
      })
    );
  }

  morosidadRelacionAsesor( perid: string ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/facturas/vencidas/asesor/${perid}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).pipe(
      map((resp: any) => {
        return resp.resp;
      })
    );
  }

  morosidadRelacionCliente( numero: string, perid: any = 1000000 ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/facturas/vencidas/cliente/${perid}/${numero}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).pipe(
      map((resp: any) => {
        return resp.resp;
      })
    );
  }

  morosidadRelacionVirtual( tipo: string ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/virtual/tipo/${tipo}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  clienteMoroso( clienteid: any, tipo: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/morosidad/cliente/${clienteid}/${tipo}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).pipe(
      map((resp: any) => {
        return resp.resp;
      })
    );
  }

  clienteMorosoTotal( clienteid: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/importe/total/cliente/${clienteid}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).pipe(
      map((resp: any) => {
        return resp.resp;
      })
    );
  }

  clienteSaldo( numero: any, fecha: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/saldos/edocta/cliente/${numero}/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).pipe(
      map((resp: any) => {
        return resp.resp;
      })
    );
  }

  guardarComentario( comentario: VencidoHistorial ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';

    this.url += '?token=' + this.token;

    return this.http.post( this.url, comentario )
      .map((resp: any) => {
        return resp;
      });
  }

  obtenerComentarios( clienteId: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/cobranza/clientes/vencido/historial/' + clienteId;

    this.url += '?token=' + this.token;

    return new Promise(resolve => {
      this.http.get( this.url ).subscribe((resp: any) => {
        resolve(resp);
      });
    });

    // return this.http.get( this.url );
  }

  obtenerComentariosDia( fecha: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/cobranza/clientes/vencido/historial/fecha/' + fecha;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  ultimosPagos( clienteid: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=20&clienteid=' + clienteid + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  pagosRango(inicio: any, final: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=24&inicio=' + inicio + '&final=' + final + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  pagosMes( clienteid: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=21&clienteid=' + clienteid + '&servidor=' + this._servidor.db;
    return new Promise(resolve => {
      this.http.get( this.url ).subscribe((resp: any) => {
        resolve(resp[0]);
      });
    });

    // return this.http.get( this.url );
  }

  chequesDevueltos() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=23&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  exportarPDFphp(data: any, file: any, cliente: any, asesor: any, tel: any, tipo: any, cargos: any, abonos: any, saldo: any) {
    // this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/credito.php?opcion=2';
    this.url = 'https://ferremayoristas.com.mx' +  ':' + PUERTO_SERVER + '/api/credito.php?opcion=2';

    return this.http.post(
      this.url,
      {
        cliente: cliente,
        file: file,
        datos: data,
        asesor: asesor,
        tel: tel,
        tipo: tipo,
        cargos: cargos,
        abonos: abonos,
        saldos: saldo
       },
      { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

}
