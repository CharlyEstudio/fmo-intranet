import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// COnfiguración
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO } from '../../config/config';

// Modelos
import { MonitorFactura } from '../../models/monitorfactura.model';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class OficinaService {

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
    this.url = URL_SERVICIO_GENERAL + '/api/facturas.php?opcion=1&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
  }

  facturasNoImpresas(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + '/api/facturas.php?opcion=2&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
  }

  facturasNoEnviadas(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + '/api/facturas.php?opcion=3&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
  }

  errorFacturar(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + '/api/facturas.php?opcion=4&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
  }

  errorTimbrar(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + '/api/facturas.php?opcion=5&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
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
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/oficina.php?opcion=1&fecha=' + fecha + '&servidor=' + this._servidor.db;

    return this.http.get(this.url);
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
