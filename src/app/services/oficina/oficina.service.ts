import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// COnfiguración
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO, URL_PETICION, URL_EXTERNO } from '../../config/config';

// Modelos
import { MonitorFactura } from '../../models/monitorfactura.model';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class OficinaService {

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  todasFacturas(fecha: any) {
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/oficina/facturas/' + fecha + '/' + this._servidor.db;

    return this.http.get(this.url);
  }

  facturasNoImpresas(fecha: any) {
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/oficina/facturas/noimpresas/' + fecha + '/' + this._servidor.db;

    return this.http.get(this.url);
  }

  facturasNoEnviadas(fecha: any) {
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/oficina/facturas/noenviadas/' + fecha + '/' + this._servidor.db;

    return this.http.get(this.url);
  }

  errorFacturar(fecha: any) {
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/oficina/facturas/error/facturar/' + fecha + '/' + this._servidor.db;

    return this.http.get(this.url);
  }

  errorTimbrar(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/oficina/facturas/error/timbrar/' + fecha + '/' + this._servidor.db;

    return this.http.get(this.url);
  }

  verfacturasTrab(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/monitorfactura/fecha/' + fecha;

    return this.http.get(this.url);
  }

  verfacturasTrabEspe(factura: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/monitorfactura/' + factura;

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
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/monitorfactura';

    return this.http.post(this.url, factura);
  }

}
