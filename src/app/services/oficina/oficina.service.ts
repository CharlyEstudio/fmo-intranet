import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// COnfiguración
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO, PARAM_KEY, KEY } from '../../config/config';

// Modelos
import { MonitorFactura } from '../../models/monitorfactura.model';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class OficinaService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  token: string = '';
  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private _usuarioS: UsuarioService
  ) {
    this.token = this._usuarioS.token;
  }

  todasFacturas(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturas/estados/${fecha}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  facturasNoImpresas(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturas/sinimpresion/${fecha}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  facturasNoEnviadas(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturas/noenviadas/${fecha}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  errorFacturar(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturas/errorfacturar/${fecha}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  errorTimbrar(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturas/errortimbrar/${fecha}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  verfacturasTrab(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/monitor/monitorfactura/fecha/' + fecha;

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  verfacturasTrabEspe(factura: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/monitor/monitorfactura/' + factura;

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  verFacturasDia(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturas/${fecha}/${this._servidor.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  guardarFacturaTrab(datos: any, fechaTrab: any, horaTrab: any, id: any) {
    const factura = new MonitorFactura(
      datos.DOCID,
      datos.ORIGENID,
      datos.DESTINOID,
      datos.NUMERO,
      datos.FECHA,
      fechaTrab,
      horaTrab,
      datos.TOTAL,
      datos.XIMPRESION,
      datos.DIACREDITO,
      id
    );
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/monitor/monitorfactura';

    this.url += '?token=' + this.token;

    return this.http.post(this.url, factura);
  }

}
