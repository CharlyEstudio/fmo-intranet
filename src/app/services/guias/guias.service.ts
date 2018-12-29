import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rutas
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO } from '../../config/config';

// Modelo
import { GuiasPartidas } from '../../models/guias.model';
import { Guia } from '../../models/guia.model';

@Injectable()
export class GuiasService {

  url: string;
  token: string;

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
  }

  obtenerFolio( folio: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/guias.php?opcion=1&folio=' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/guias.php?opcion=1&folio=' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/guias.php?opcion=1&folio=' + folio;
    }

    return this.http.get( this.url );
  }

  obtenerGuias() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/todo';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/todo';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/todo';
    }

    this.url += '?token=' + this.token;

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  buscarFolioGuia(folio: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/' + folio;
    }

    this.url += '?token=' + this.token;

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  procesarGuia(guia: GuiasPartidas) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias';
    }

    this.url += '?token=' + this.token;

    return this.http.post( this.url, guia )
      .map( (resp: any) => {
        return resp;
      });
  }

  guardarGuia(guia: Guia) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/guia';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/guia';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/guia';
    }

    this.url += '?token=' + this.token;

    return this.http.post( this.url, guia )
      .map( (resp: any) => {
        return resp;
      });
  }

  buscarEspeciales(folio: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/guias.php?opcion=2&folio=' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/guias.php?opcion=2&folio=' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/guias.php?opcion=2&folio=' + folio;
    }

    return this.http.get( this.url );
  }

  enviarPDFguia(guiaPar: any, guia: any, especiales: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL +
                          '/api/guias.php?opcion=3&guiaPar=' +
                          JSON.stringify(guiaPar) +
                          '&guia=' + JSON.stringify(guia) +
                          '&especiales=' + JSON.stringify(especiales);
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/guias.php?opcion=3&guiaPar=' +
                JSON.stringify(guiaPar) +
                '&guia=' + JSON.stringify(guia) +
                '&especiales=' + JSON.stringify(especiales);
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' +
                  PUERTO_SERVER + '/api/guias.php?opcion=3&guiaPar=' +
                  JSON.stringify(guiaPar) +
                  '&guia=' + JSON.stringify(guia) +
                  '&especiales=' + JSON.stringify(especiales);
    }

    return this.http.get( this.url)
      .map((resp: any) => {
        return resp;
      });
  }

  obtenerFacturasFolio(folio: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    }

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

}
