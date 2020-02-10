import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configs
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO } from '../../config/config';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class PanelasesoresService {

  token: string = '';

  constructor(
    public http: HttpClient,
    private _usuarioS: UsuarioService
  ) {
    this.token = this._usuarioS.token;
  }

  // Obtener el importe de venta diaria
  obtenerImporteVtaDiaria() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/panelasesores.php?opcion=1';

    return this.http.get(url);
  }

  // Cambiar el importe de venta diaria
  cambiarImporteVtaDiaria(importe: number, usuario: Usuario) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/panelasesores.php?opcion=2&importe=' + importe + '&idFerrum=' + usuario.idFerrum;

    return this.http.get(url);
  }

  obtenerAsesores(zona: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/seguimiento.php?opcion=1&zona=' + zona;

    return this.http.get(url);
  }

  obtenerCalificacion(perid: any, fechaIn: any, vtaMin: any, cliMin: any, rango: boolean) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/seguimiento.php?opcion=2&perid=' + perid + '&fechaIn=' + fechaIn + '&vtaMin=' + vtaMin + '&cliMin=' + cliMin + '&rango=' + rango;

    return this.http.get(url);
  }

  pedidosOutTime(perid: any, fecha: any) {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=51&perid=' + perid + '&fecha=' + fecha;

    return this.http.get(url);
  }

  visitasFalsas(perid: any, fecha: any) {
    let url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/visitas/asesor/calificacion/' + perid + '/' + fecha;

    url += '?token=' + this.token;

    return this.http.get(url);
  }

  obtenerImporteVtaMinDiaria() {
    const url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/panelasesores.php?opcion=0';

    return this.http.get(url);
  }

}
