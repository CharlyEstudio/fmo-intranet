import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config URL
import { URL_SERVICIO_GENERAL, URL_PETICION, URL_LOCAL, PUERTO_INTERNO_DOS, PUERTO_SERVER, URL_PRUEBAS, PUERTO_INTERNO } from '../../config/config';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VisitasClientesService {

  token: any;

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  obtenerVisitas() {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/visitas.php?opcion=30';

    return this.http.get( url );
  }

  obtenerVisitasDia(fecha: any) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/visitas.php?opcion=52&fecha=' + fecha;

    return this.http.get( url );
  }

  asegurarFolio(folio: number, fecha: string, cliente: number) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/visitas.php?opcion=33&folio=' + folio + '&fecha=' + fecha + '&numero=' + cliente;

    return this.http.get( url );
  }

  guardarVisita(data: any) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/visitas.php?opcion=31';

    return this.http.post( url, {dato: data}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } } );
  }

  obtenerInfoFolio(folio: number, fecha: string, cliente: number) {
    let url;
    url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/visitas.php?opcion=32&folio=' + folio + '&fecha=' + fecha + '&numero=' + cliente;

    return this.http.get( url );
  }

  resumenVisitaAsesorFecha(perid: any, fecha: any) {
    const url = `https://ferremayoristas.com.mx:3001/visitas/asesor/${perid}/${fecha}?token=${this.token}`;

    return this.http.get(url);
  }

}
