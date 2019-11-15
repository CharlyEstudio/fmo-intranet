import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

// Rutas
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO, URL_PETICION, URL_EXTERNO } from '../../config/config';

// Modelo
import { GuiasPartidas } from '../../models/guias.model';
import { Guia } from '../../models/guia.model';
import { Chofer } from '../../models/chofer.model';
import { Unidades } from '../../models/unidades.model';
import { Ruta } from '../../models/ruta.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class GuiasService {

  url: string;
  token: string;

  constructor(
    private http: HttpClient,
    private _usuario: UsuarioService
  ) {
    // this.token = localStorage.getItem('token');
    this.token = this._usuario.token;
  }

  obtenerFolio( folio: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/guias.php?opcion=1&folio=' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/guias.php?opcion=1&folio=' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/guias.php?opcion=1&folio=' + folio;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/folio/ferrum/' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/folio/ferrum/' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/folio/ferrum/' + folio;
    // }

    return this.http.get( this.url );
  }

  obtenerGuias() {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/todo';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/todo';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/todo';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/todo';

    this.url += '?token=' + this.token;

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  obtenerGuiasDia(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/dia/' + fecha;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/dia/' + fecha;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/dia/' + fecha;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/dia/' + fecha;

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  buscarFolioGuia(folio: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/' + folio;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/buscar/' + folio;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  buscarFolioGuiaGnl(folio: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/gnal/' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/gnal/' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/gnal/' + folio;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/buscar/gnal/' + folio;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  buscarFolioHistorial(folio: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/historial/' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/historial/' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/historial/' + folio;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/buscar/historial/' + folio;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  buscarGuiaPrin(folio: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/obtener/' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/obtener/' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/obtener/' + folio;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/obtener/' + folio;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  buscarGuiaPrinId(guia: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/obtener/factura';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/obtener/factura';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/obtener/factura';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/obtener/factura';

    this.url += '?token=' + this.token;

    return this.http.put( this.url, guia );
  }

  procesarGuia(guia: GuiasPartidas) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias';

    this.url += '?token=' + this.token;

    return this.http.post( this.url, guia )
      .map( (resp: any) => {
        return resp;
      });
  }

  guardarGuia(guia: Guia, chofer: Chofer) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/guia';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/guia';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/guia';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/guia';

    this.url += '?token=' + this.token;

    return this.http.post( this.url, {guia: guia, chofer: chofer} )
      .map( (resp: any) => {
        return resp;
      });
  }

  // Esto ver mas a delante si lo quito
  guardarRuta(ruta: any, chofer: Chofer) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/ruta';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/ruta';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/ruta';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/ruta';

    this.url += '?token=' + this.token;

    return this.http.post( this.url, {ruta: ruta, chofer: chofer} )
      .map( (resp: any) => {
        return resp;
      });
  }

  guardarRutaGuia(ruta: any, chofer: Chofer) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/rutas';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/rutas';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/rutas';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/rutas';

    this.url += '?token=' + this.token;

    return this.http.post( this.url, {ruta: ruta, chofer: chofer} )
      .map( (resp: any) => {
        return resp;
      });
  }

  buscarPartidasFolio(folio: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;

    this.url += '?token=' + this.token;

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  buscarEspeciales(folio: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/guias.php?opcion=2&folio=' + folio;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/guias.php?opcion=2&folio=' + folio;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/guias.php?opcion=2&folio=' + folio;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/folio/ferrum/especiales/' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/folio/ferrum/especiales/' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/folio/ferrum/especiales/' + folio;
    // }

    return this.http.get( this.url );
  }

  enviarPDFguia(guiaPar: any, guia: any, especiales: any, chofer: Chofer, carro: Unidades) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION +
                          '/api/guias.php?opcion=4';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/guias.php?opcion=4';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' +
                  PUERTO_SERVER + '/api/guias.php?opcion=4';
    }

    // return this.http.get(this.url);
    return this.http.post(
      this.url,
      { guiaPar: guiaPar, guia: guia, especiales: especiales, chofer: chofer, unidad: carro },
      { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  reasignarFolio(folio: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/reasignar/' + folio._id;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/reasignar/' + folio._id;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/reasignar/' + folio._id;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/buscar/reasignar/' + folio._id;

    return this.http.put(this.url, folio);
  }

  enviarEmail(folio: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION +
                          '/api/email.php?folio=' + JSON.stringify(folio);
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/email.php?folio=' + JSON.stringify(folio);
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' +
                  PUERTO_SERVER + '/api/email.php?folio=' + JSON.stringify(folio);
    }

    return this.http.get(this.url);
  }

  obtenerFacturasFolio(folio: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/buscar/partidas/' + folio;

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  buscarGuiasRango(inicial: any, final: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/buscar/rango/' + inicial + '/' + final;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/buscar/rango/' + inicial + '/' + final;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/rango/' + inicial + '/' + final;
    // }
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/buscar/rango/' + inicial + '/' + final;

    return this.http.get( this.url )
      .map( (resp: any) => {
        return resp;
      });
  }

  coordenadasCliente(numero: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/coordenadas/numero/' + numero;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/coordenadas/numero/' + numero;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/coordenadas/numero/' + numero;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/coordenadas/numero/' + numero;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  directionsGoogle(origin: any, destiny: any) {
    // console.log(origin, destiny);
    return this.http.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin.lat + ',' + origin.lng + '&region=es'
    + '&destination=' + destiny.lat + ',' + destiny.lng + '&departure_time=now&key=AIzaSyDLxUFj_KCshQNqoUG2i7WZFbkR0nigdhs');
  }

  gpsMagnitracking(id: any) {
    return this.http.get(
      'https://www.magnitracking.net/api/api.php?api=user&ver=1.0&key=3825AD92B3D1A5BA03B725D02E90EB1A&cmd=OBJECT_GET_LOCATIONS,' + id
    );
  }

  gpsMagUser() {
    return this.http.get(
      'https://www.magnitracking.net/api/api.php?api=user&ver=1.0&key=3825AD92B3D1A5BA03B725D02E90EB1A&cmd=USER_GET_OBJECTS'
    );
  }

  gpsMagUserId(id: any) {
    return this.http.get(
      'https://www.magnitracking.net/api/api.php?api=user&ver=1.0&key=3825AD92B3D1A5BA03B725D02E90EB1A&cmd=USER_GET_OBJECTS,' + id
    );
  }

  actualizarGuiaPri(id: any, chofer: Chofer) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/guias/actualizar/principal/' + id;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/guias/actualizar/principal/' + id;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/guias/actualizar/principal/' + id;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/guias/actualizar/principal/' + id;

    return this.http.put( this.url, chofer );
  }

  obtenerUnidades() {
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/unidades';

    return this.http.get(this.url);
  }

}
