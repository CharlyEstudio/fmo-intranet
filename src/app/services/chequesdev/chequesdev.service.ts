import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServidorService } from '../db/servidor.service';
import { PARAM_KEY, KEY, URL_SERVICIO_GENERAL } from '../../config/config';

@Injectable()
export class ChequesdevService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
  ) { }

  obtenemosCHFerrum() {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/devueltos/all/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  obtenemosChquesDev() {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/devueltos/sistemas/sistemas/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  obtenerPendientes() {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/notrabajados/sistemas/sistemas/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  obtenerCobrados() {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/cobrados/sistemas/sistemas/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  obtenerTerninados() {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/terminados/sistemas/sistemas/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  guardarNuevoCheque(fecha: any, importe: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/guardar/sistemas/sistemas`;

    this.headers.append('content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, {fecha: fecha, importe: importe}, { headers: this.headers }).map((resp: any) => {
      return resp.resp;
    });
  }

  guardarChequeFerrum(datos: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/guardar/ferrum/sistemas/sistemas`;

    this.headers.append('content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, {guardar: datos}, { headers: this.headers });
  }

  actualizarDato(datos: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/actualizar/sistemas/sistemas`;

    this.headers.append('content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(url, {actualizar: datos}, { headers: this.headers });
  }

  // cobrado(id: any) {
  //   // const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=7&id=${id}`;
  //   const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/actualizar/cobrado/sistemas/sistemas`;

  //   this.headers.append('content-Type', 'application/x-www-form-urlencoded');

  //   return this.http.put(url, {id: id}, { headers: this.headers });
  // }

  terminar(id: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/terminar/cobrado/sistemas/sistemas`;

    this.headers.append('content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(url, {id: id}, { headers: this.headers }).map((resp: any) => {
      return resp.resp;
    });
  }

  recuperar(id: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/recuperar/terminado/cobrado/sistemas`;

    this.headers.append('content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(url, {id: id}, { headers: this.headers }).map((resp: any) => {
      return resp.resp;
    });
  }

  obtenemosFolioFerrum(folio: number) {
    const url = `${URL_SERVICIO_GENERAL}/services/cobranza/cheques/folio/${folio}/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

}
