import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configs
import { URL_EXTERNO, PUERTO_SERVER, PUERTO_INTERNO } from '../../config/config';

// Modelos
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class PanelasesoresService {

  constructor(
    public http: HttpClient
  ) { }

  // Obtener el importe de venta diaria
  obtenerImporteVtaDiaria() {
    const url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/panelasesores.php?opcion=1';

    return this.http.get(url);
  }

  // Cambiar el importe de venta diaria
  cambiarImporteVtaDiaria(importe: number, usuario: Usuario) {
    const url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/panelasesores.php?opcion=2&importe=' + importe + '&idFerrum=' + usuario.idFerrum;

    return this.http.get(url);
  }

  obtenerAsesores(zona: any) {
    const url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/seguimiento.php?opcion=1&zona=' + zona;

    return this.http.get(url);
  }

  obtenerCalificacion(perid: any, fechaIn: any, fechaOut: any, vtaMin: any, cliMin: any, rango: boolean) {
    const url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/seguimiento.php?opcion=2&perid=' + perid + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&vtaMin=' + vtaMin + '&cliMin=' + cliMin + '&rango=' + rango;

    return this.http.get(url);
  }

  obtenerImporteVtaMinDiaria() {
    const url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/panelasesores.php?opcion=0';

    return this.http.get(url);
  }

}
