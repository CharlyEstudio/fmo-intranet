import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, PUERTO_SERVER } from '../../config/config';

import { VencidoHistorial } from '../../models/vencidoHistorial.model';

@Injectable()
export class CreditoService {

  token: string;

  url: string;

  constructor(
    private http: HttpClient,
  ) {
    this.token = localStorage.getItem('token');
  }

  obtenerCarteraVencida() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=12';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=12';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=12';
    }

    return this.http.get( this.url );
  }

  mor1a28() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=13';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=13';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=13';
    }

    return this.http.get( this.url );
  }

  mor29a45() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=14';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=14';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=14';
    }

    return this.http.get( this.url );
  }

  mor46a60() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=15';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=15';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=15';
    }

    return this.http.get( this.url );
  }

  mor60() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=18';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=18';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=18';
    }

    return this.http.get( this.url );
  }

  morosidadRelacion( tipo: string ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=16&tipo=' + tipo;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=16&tipo=' + tipo;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=16&tipo=' + tipo;
    }

    return this.http.get( this.url );
  }

  morosidadRelacionVirtual( tipo: string ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=22&tipo=' + tipo;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=22&tipo=' + tipo;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=22&tipo=' + tipo;
    }

    return this.http.get( this.url );
  }

  clienteMoroso( clienteid: any, tipo: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=17&tipo=' + tipo + '&clienteid=' + clienteid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=17&tipo=' + tipo + '&clienteid=' + clienteid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=17&tipo=' + tipo + '&clienteid=' + clienteid;
    }

    return this.http.get( this.url );
  }

  clienteMorosoTotal( clienteid: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=19&clienteid=' + clienteid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=19&clienteid=' + clienteid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=19&clienteid=' + clienteid;
    }

    return this.http.get( this.url );
  }

  guardarComentario( comentario: VencidoHistorial ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';
    }

    this.url += '?token=' + this.token;

    return this.http.post( this.url, comentario )
      .map((resp: any) => {
        return resp;
      });
  }

  obtenerComentarios( clienteId: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/' + clienteId;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/' + clienteId;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/' + clienteId;
    }

    return this.http.get( this.url );
  }

  obtenerComentariosDia( fecha: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/fecha/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/fecha/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/fecha/' + fecha;
    }

    return this.http.get( this.url );
  }

  ultimosPagos( clienteid: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=20&clienteid=' + clienteid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=20&clienteid=' + clienteid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=20&clienteid=' + clienteid;
    }

    return this.http.get( this.url );
  }

  pagosRango(inicio: any, final: any) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=24&inicio=' + inicio + '&final=' + final;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=24&inicio=' + inicio + '&final=' + final;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=24&inicio=' + inicio + '&final=' + final;
    }

    return this.http.get( this.url );
  }

  pagosMes( clienteid: any ) {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=21&clienteid=' + clienteid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=21&clienteid=' + clienteid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=21&clienteid=' + clienteid;
    }

    return this.http.get( this.url );
  }

  chequesDevueltos() {
    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=23';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=23';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=23';
    }

    return this.http.get( this.url );
  }

}
