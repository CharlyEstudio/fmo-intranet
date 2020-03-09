import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Config URL
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO, PARAM_KEY, KEY } from '../../config/config';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VisitasClientesService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  token: any;

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  obtenerVisitas() {
    const url = `${URL_SERVICIO_GENERAL}/services/visitas/clientes/sistemas`;

    return this.http.get( url, { headers: this.headers } );
  }

  obtenerVisitasDia(fecha: any) {
    const url = `${URL_SERVICIO_GENERAL}/services/visitas/clientes/fecha/${fecha}/sistemas`;

    return this.http.get( url, { headers: this.headers } );
  }

  asegurarFolio(folio: number, fecha: string, cliente: number) {
    const url = `${URL_SERVICIO_GENERAL}/services/visitas/validar/folio/${folio}/${fecha}/${cliente}/sistemas`;

    return this.http.get( url, { headers: this.headers } );
  }

  guardarVisita(data: any) { // <= TODO guardar visita
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/visitas.php?opcion=31';

    return this.http.post( url, {dato: data}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } } );
  }

  obtenerInfoFolio(folio: number, fecha: string, cliente: number) {
    const url = `${URL_SERVICIO_GENERAL}/services/visitas/folio/${folio}/${fecha}/${cliente}/sistemas`;

    return this.http.get( url, { headers: this.headers } );
  }

  resumenVisitaAsesorFecha(perid: any, fecha: any) {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/visitas/asesor/${perid}/${fecha}?token=${this.token}`;

    return this.http.get(url);
  }

  cambiarVisitaAsesorFecha(clienteid: any, perid: any, fecha: any, destino: any, origen: any) {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/visitas/asesor?token=${this.token}`;

    return this.http.put(url, {clienteid, perid, fecha, destino, origen});
  }

}
