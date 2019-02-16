import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/guias.php?opcion=1&folio=' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/guias.php?opcion=1&folio=' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/guias.php?opcion=1&folio=' + folio;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/folio/ferrum/' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/folio/ferrum/' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/folio/ferrum/' + folio;
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

  obtenerGuiasDia(fecha: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/dia/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/dia/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/dia/' + fecha;
    }

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

    return this.http.get( this.url );
  }

  buscarFolioHistorial(folio: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/historial/' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/historial/' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/historial/' + folio;
    }

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  buscarGuiaPrin(folio: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/obtener/' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/obtener/' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/obtener/' + folio;
    }

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
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

  buscarPartidasFolio(folio: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    }

    this.url += '?token=' + this.token;

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  buscarEspeciales(folio: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/guias.php?opcion=2&folio=' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/guias.php?opcion=2&folio=' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/guias.php?opcion=2&folio=' + folio;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/folio/ferrum/especiales/' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/folio/ferrum/especiales/' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/folio/ferrum/especiales/' + folio;
    }

    return this.http.get( this.url );
  }

  enviarPDFguia(guiaPar: any, guia: any, especiales: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL +
    //                       '/api/guias.php?opcion=3&guiaPar=' +
    //                       JSON.stringify(guiaPar) +
    //                       '&guia=' + JSON.stringify(guia) +
    //                       '&especiales=' + JSON.stringify(especiales);
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/guias.php?opcion=3&guiaPar=' +
    //             JSON.stringify(guiaPar) +
    //             '&guia=' + JSON.stringify(guia) +
    //             '&especiales=' + JSON.stringify(especiales);
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' +
    //               PUERTO_SERVER + '/api/guias.php?opcion=3&guiaPar=' +
    //               JSON.stringify(guiaPar) +
    //               '&guia=' + JSON.stringify(guia) +
    //               '&especiales=' + JSON.stringify(especiales);
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL +
                          '/api/guias.php?opcion=3';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/guias.php?opcion=3';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' +
                  PUERTO_SERVER + '/api/guias.php?opcion=3';
    }

    // return this.http.get(this.url);
    return this.http.post(
      this.url,
      { guiaPar: guiaPar, guia: guia, especiales: especiales },
      { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  reasignarFolio(folio: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/reasignar/' + folio._id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/reasignar/' + folio._id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/reasignar/' + folio._id;
    }

    return this.http.put(this.url, folio);
  }

  enviarEmail(folio: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL +
                          '/api/email.php?folio=' + JSON.stringify(folio);
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/email.php?folio=' + JSON.stringify(folio);
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' +
                  PUERTO_SERVER + '/api/email.php?folio=' + JSON.stringify(folio);
    }

    return this.http.get(this.url);
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

  buscarGuiasRango(inicial: any, final: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/rango/' + inicial + '/' + final;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/rango/' + inicial + '/' + final;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/rango/' + inicial + '/' + final;
    }

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  coordenadasCliente(numero: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/coordenadas/numero/' + numero;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/coordenadas/numero/' + numero;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/coordenadas/numero/' + numero;
    }

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

}
