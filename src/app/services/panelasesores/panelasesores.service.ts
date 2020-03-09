import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Configs
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO, PARAM_KEY, KEY } from '../../config/config';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class PanelasesoresService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  token: string = '';

  constructor(
    public http: HttpClient,
    private _usuarioS: UsuarioService,
    private _servidor: ServidorService
  ) {
    this.token = this._usuarioS.token;
  }

  // Obtener el importe de venta diaria
  obtenerImporteVtaDiaria() {
    const url = `${URL_SERVICIO_GENERAL}/services/pedidos/importeventadiaria/panel/sistemas`;

    return this.http.get(url, { headers: this.headers });
  }

  // Cambiar el importe de venta diaria
  cambiarImporteVtaDiaria(importe: any, usuario: Usuario) {
    const url = `${URL_SERVICIO_GENERAL}/services/pedidos/importe/venta/diaria/panel/sistemas`;

    const enviar = {
      importe: importe,
      idFerrum: parseInt(usuario.idFerrum)
    };

    this.headers.append('content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(url, {data: enviar}, { headers: this.headers }).map((resp: any) => {
      console.log(resp);
      return resp.resp;
    });
  }

  obtenerAsesores(zona: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/asesores/porzona/${zona}/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  obtenerCalificacion(perid: any, fechaIn: any, vtaMin: any, cliMin: any, rango: boolean) {
    const url = `${URL_SERVICIO_GENERAL}/services/seguimiento/asesores/calificacion/dia/${perid}/${fechaIn}/${vtaMin}/${cliMin}/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  pedidosOutTime(perid: any, fecha: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/pedidos/outtime/asesor/${perid}/${fecha}/${this._servidor.db}`;

    return this.http.get(url, { headers: this.headers });
  }

  visitasFalsas(perid: any, fecha: any) {
    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/visitas/asesor/calificacion/' + perid + '/' + fecha;

    url += '?token=' + this.token;

    return this.http.get(url);
  }

  // obtenerImporteVtaMinDiaria() {
  //   const url = `${URL_SERVICIO_GENERAL}/services/pedidos/importeventadiaria/panel/sistemas`;

  //   return this.http.get(url, { headers: this.headers });
  // }

}
