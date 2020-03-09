import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PARAM_KEY, KEY, PUERTO_INTERNO } from '../../config/config';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class DiasvtasService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  token: string = '';

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private _usuarioS: UsuarioService
  ) {
    this.token = this._usuarioS.token;
  }

  obtenerFechaDias(fechaIn: any, fechaOut: any, diaSel: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/seguimiento/versemanas/${fechaIn}/${fechaOut}/${diaSel}`;

    return this.http.get(url, { headers: this.headers });
  }

  obtenerVentasDia(fecha: any, perid: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/clientes/dia/trabajados/${perid}/${fecha}/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  obtenerClientesSinMov(fechaIn: any, fechaOut: any, perid: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/clientes/sin/movimientos/${perid}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  crearPdf(datos: any, tipo: any, asesor: any) {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/resumen/diasvtas?token=${this.token}`;

    return this.http.post( url, {datos, tipo, asesor} ).map((resp: any) => {
      return resp;
    });
  }

}
