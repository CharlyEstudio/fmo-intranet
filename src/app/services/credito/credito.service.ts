import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, PUERTO_SERVER, URL_PETICION, URL_EXTERNO } from '../../config/config';

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
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=12';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=12';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=12';
    }

    return this.http.get( this.url );
  }

  mor1a30() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=13';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=13';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=13';
    }

    return this.http.get( this.url );
  }

  mor31a45() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=14';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=14';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=14';
    }

    return this.http.get( this.url );
  }

  mor46a60() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=15';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=15';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=15';
    }

    return this.http.get( this.url );
  }

  mor61a90() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=18';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=18';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=18';
    }

    return this.http.get( this.url );
  }

  mor91a120() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=27';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=27';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=27';
    }

    return this.http.get( this.url );
  }

  mor120() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=28';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=28';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=28';
    }

    return this.http.get( this.url );
  }

  morosidadRelacion( tipo: string ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=16&tipo=' + tipo;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=16&tipo=' + tipo;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=16&tipo=' + tipo;
    }

    return this.http.get( this.url );
  }

  morosidadRelacionAsesor( perid: string ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=25&perid=' + perid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=25&perid=' + perid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=25&perid=' + perid;
    }

    return this.http.get( this.url );
  }

  morosidadRelacionCliente( numero: string, perid: any = '' ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=26&numero=' + numero + '&perid=' + perid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=26&numero=' + numero + '&perid=' + perid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=26&numero=' + numero + '&perid=' + perid;
    }

    return this.http.get( this.url );
  }

  morosidadRelacionVirtual( tipo: string ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=22&tipo=' + tipo;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=22&tipo=' + tipo;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=22&tipo=' + tipo;
    }

    return this.http.get( this.url );
  }

  clienteMoroso( clienteid: any, tipo: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=17&tipo=' + tipo + '&clienteid=' + clienteid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=17&tipo=' + tipo + '&clienteid=' + clienteid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=17&tipo=' + tipo + '&clienteid=' + clienteid;
    }

    return this.http.get( this.url );
  }

  clienteMorosoTotal( clienteid: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=19&clienteid=' + clienteid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=19&clienteid=' + clienteid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=19&clienteid=' + clienteid;
    }

    return this.http.get( this.url );
  }

  clienteSaldo( numero: any, fecha: any ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/obtener/saldo/' + numero + '/' + fecha;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/obtener/saldo/' + numero + '/' + fecha;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/obtener/saldo/' + numero + '/' + fecha;
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/clientes/obtener/saldo/' + numero + '/' + fecha;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  guardarComentario( comentario: VencidoHistorial ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/clientes/vencido/historial';

    this.url += '?token=' + this.token;

    return this.http.post( this.url, comentario )
      .map((resp: any) => {
        return resp;
      });
  }

  obtenerComentarios( clienteId: any ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/' + clienteId;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/' + clienteId;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/' + clienteId;
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/' + clienteId;

    return this.http.get( this.url );
  }

  obtenerComentariosDia( fecha: any ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/fecha/' + fecha;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/fecha/' + fecha;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/fecha/' + fecha;
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/busqueda/clientes/vencido/historial/fecha/' + fecha;

    return this.http.get( this.url );
  }

  ultimosPagos( clienteid: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=20&clienteid=' + clienteid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=20&clienteid=' + clienteid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=20&clienteid=' + clienteid;
    }

    return this.http.get( this.url );
  }

  pagosRango(inicio: any, final: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=24&inicio=' + inicio + '&final=' + final;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=24&inicio=' + inicio + '&final=' + final;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=24&inicio=' + inicio + '&final=' + final;
    }

    return this.http.get( this.url );
  }

  pagosMes( clienteid: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=21&clienteid=' + clienteid;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=21&clienteid=' + clienteid;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=21&clienteid=' + clienteid;
    }

    return this.http.get( this.url );
  }

  chequesDevueltos() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=23';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=23';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=23';
    }

    return this.http.get( this.url );
  }

  exportarPDFphp(data: any, file: any, cliente: any, asesor: any, tel: any, tipo: any, cargos: any, abonos: any, saldo: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/credito.php?opcion=2';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/credito.php?opcion=2';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/credito.php?opcion=2';
    }

    return this.http.post(
      this.url,
      {
        cliente: cliente,
        file: file,
        datos: data,
        asesor: asesor,
        tel: tel,
        tipo: tipo,
        cargos: cargos,
        abonos: abonos,
        saldos: saldo
       },
      { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

}
