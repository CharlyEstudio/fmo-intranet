import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class DiariosService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  asesores() {
    this.url = `${URL_SERVICIO_GENERAL}/services/asesores/all/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((asesores: any) => {
      if (asesores.resp.length > 0) {
        return asesores.resp;
      } else {
        return 0;
      }
    });
  }

  proveedores() {
    this.url = `${URL_SERVICIO_GENERAL}/services/proveedores/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((proveedores: any) => {
      if (proveedores.resp.length > 0) {
        return proveedores.resp;
      } else {
        return 0;
      }
    });
  }

  ventas(fechaIn: any, fechaOut: any, asesor: any = 10000000) {
    this.url = `${URL_SERVICIO_GENERAL}/services/asesores/venta/rango/${asesor}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((ventas: any) => {
      if (ventas.resp.length > 0) {
        return ventas.resp;
      } else {
        return 0;
      }
    });
  }

  ventasSept(fechaIn: any, fechaOut: any, asesor: any = 10000000) {
    this.url = `${URL_SERVICIO_GENERAL}/services/asesores/venta/septiembre/${asesor}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((ventas: any) => {
      if (ventas.resp.length > 0) {
        return ventas.resp;
      } else {
        return 0;
      }
    });
  }

  ventasAsesor(fechaIn: any, fechaOut: any, asesor: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/asesores/venta/cfd/${asesor}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((datos: any) => {
      if (datos.resp.length > 0) {
        return datos.resp;
      } else {
        return 0;
      }
    });
  }

  compras(fechaIn: any, fechaOut: any, proveedor: any = 10000000) { // Hasta aqui me quede
    this.url = `${URL_SERVICIO_GENERAL}/services/proveedores/compras/${proveedor}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((compras: any) => {
      if (compras.resp.length > 0) {
        return compras.resp;
      } else {
        return 0;
      }
    });
  }

  comprasProveedor(fechaIn: any, fechaOut: any, proveedor: any) {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER + '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((compras: any) => {
      if (compras.length > 0) {
        return compras;
      } else {
        return 0;
      }
    });
  }

  utilidades(fechaIn: any, fechaOut: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((utilidades: any) => {
      if (utilidades.length > 0) {
        return utilidades;
      } else {
        return 0;
      }
    });
  }

  utilidadesDesgloce(fechaIn: any, fechaOut: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=35&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((utilidades: any) => {
      if (utilidades.length > 0) {
        return utilidades;
      } else {
        return 0;
      }
    });
  }

  notasCredito(fechaIn: any, fechaOut: any, tipo: any = '1') {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER + '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&tipo=' + tipo + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((notas: any) => {
      if (notas.length > 0) {
        return notas;
      } else {
        return 0;
      }
    });
  }

  inventario() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=9&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((inventario: any) => {
      if (inventario.length > 0) {
        return inventario;
      } else {
        return 0;
      }
    });
  }

  entradaSalida(fechaIn: any, fechaOut: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((entsal: any) => {
      if (entsal.length > 0) {
        return entsal;
      } else {
        return 0;
      }
    });
  }

  consumoInterno(fechaIn: any, fechaOut: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((consumo: any) => {
      if (consumo.length > 0) {
        return consumo;
      } else {
        return 0;
      }
    });
  }

  carteraClientes() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=14&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((carcli: any) => {
      if (carcli.length > 0) {
        return carcli;
      } else {
        return 0;
      }
    });
  }

  carteraProveedores() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=16&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((proveedores: any) => {
      if (proveedores.length > 0) {
        return proveedores;
      } else {
        return 0;
      }
    });
  }

  saldoProveedores( fecha: any, id: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=17&id=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((proveedoresSaldo: any) => {
      if (proveedoresSaldo.length > 0) {
        return proveedoresSaldo;
      } else {
        return 0;
      }
    });
  }

  diasLunes(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=18&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((lunes: any) => {
      if (lunes.length > 0) {
        return lunes;
      } else {
        return 0;
      }
    });
  }

  diasLunesDocInc() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=29&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((lunes: any) => {
      if (lunes.length > 0) {
        return lunes;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunes( fecha: any, id: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=19&id=' + id + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((lunesId: any) => {
      if (lunesId.length > 0) {
        return lunesId;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesCH( ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=28&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((lunesId: any) => {
      if (lunesId.length > 0) {
        return lunesId;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesEspecials( ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=31&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((lunesId: any) => {
      if (lunesId.length > 0) {
        return lunesId;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesDocInc( ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=30&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((lunesId: any) => {
      if (lunesId.length > 0) {
        return lunesId;
      } else {
        return 0;
      }
    });
  }

  backOrder( fechaIn: any, fechaOut: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=25&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((back: any) => {
      if (back.length > 0) {
        return back;
      } else {
        return 0;
      }
    });
  }

  obtenerBackOrder( tipo: any, fechaIn: any, fechaOut: any, orden: any ) {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER +
    '/api/diarios.php?opcion=26&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((obtbc: any) => {
      if (obtbc.length > 0) {
        return obtbc;
      } else {
        return 0;
      }
    });
  }

  obtenerBackOrderTipo( tipo: any, fechaIn: any, fechaOut: any ) {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER +
    '/api/diarios.php?opcion=33&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((obtbc: any) => {
      if (obtbc.length > 0) {
        return obtbc;
      } else {
        return 0;
      }
    });
  }

  obtenerBackOrderTipoTotales( fechaIn: any, fechaOut: any ) {
    this.url = URL_SERVICIO_GENERAL +
    ':' + PUERTO_SERVER +
    '/api/diarios.php?opcion=34&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((obtbc: any) => {
      if (obtbc.length > 0) {
        return obtbc;
      } else {
        return 0;
      }
    });
  }

  enviarPDF(datos: any, archivo: string) {
    const url = `${URL_SERVICIO_GENERAL}/api/diarios.php?opcion=32`;

    return this.http.post(url, {data: datos, file: archivo}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

}
