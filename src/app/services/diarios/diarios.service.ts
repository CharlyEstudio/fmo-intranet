import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PUERTO_INTERNO, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class DiariosService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private usuarioS: UsuarioService
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

  compras(fechaIn: any, fechaOut: any, proveedor: any = 10000000) {
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
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/compras/proveedor/${proveedor}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((compras: any) => {
      if (compras.resp.length > 0) {
        return compras.resp;
      } else {
        return 0;
      }
    });
  }

  utilidades(fechaIn: any, fechaOut: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/utilidades/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((utilidades: any) => {
      if (utilidades.resp.length > 0) {
        return utilidades.resp;
      } else {
        return 0;
      }
    });
  }

  utilidadesDesgloce(fechaIn: any, fechaOut: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/desgloce/utilidades/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((utilidades: any) => {
      if (utilidades.resp.length > 0) {
        return utilidades.resp;
      } else {
        return 0;
      }
    });
  }

  notasCredito(fechaIn: any, fechaOut: any, tipo: any = '1') {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/diario/notas/credito/${tipo}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((notas: any) => {
      if (notas.resp.length > 0) {
        return notas.resp;
      } else {
        return 0;
      }
    });
  }

  inventario() {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/inventario/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((inventario: any) => {
      if (inventario.resp.length > 0) {
        return inventario.resp;
      } else {
        return 0;
      }
    });
  }

  entradaSalida(fechaIn: any, fechaOut: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/entrada/salidas/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((entsal: any) => {
      if (entsal.resp.length > 0) {
        return entsal.resp;
      } else {
        return 0;
      }
    });
  }

  consumoInterno(fechaIn: any, fechaOut: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/consumo/interno/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((consumo: any) => {
      if (consumo.resp.length > 0) {
        return consumo.resp;
      } else {
        return 0;
      }
    });
  }

  carteraClientes() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/diario/cartera/clientes/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((carcli: any) => {
      if (carcli.resp.length > 0) {
        return carcli.resp;
      } else {
        return 0;
      }
    });
  }

  carteraProveedores() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/diario/cartera/proveedores/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((proveedores: any) => {
      if (proveedores.resp.length > 0) {
        return proveedores.resp;
      } else {
        return 0;
      }
    });
  }

  saldoProveedores( fecha: any, id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/pedidos/saldo/proveedores/${id}/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((proveedoresSaldo: any) => {
      if (proveedoresSaldo.resp.length > 0) {
        return proveedoresSaldo.resp;
      } else {
        return 0;
      }
    });
  }

  diasLunes(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/pedidos/saldo/especialeslunes/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((lunes: any) => {
      if (lunes.resp.length > 0) {
        return lunes.resp;
      } else {
        return 0;
      }
    });
  }

  diasLunesDocInc() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/pedidos/incobrables/especialeslunes/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((lunes: any) => {
      if (lunes.resp.length > 0) {
        return lunes.resp;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunes( fecha: any, id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/clientes/dialunes/${id}/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((lunesId: any) => {
      if (lunesId.resp.length > 0) {
        return lunesId.resp;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesCH() {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/clientes/dialunes/chequesdev/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((lunesId: any) => {
      if (lunesId.resp.length > 0) {
        return lunesId.resp;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesEspecials( ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/clientes/dialunes/especiales/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((lunesId: any) => {
      if (lunesId.resp.length > 0) {
        return lunesId.resp;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesDocInc() {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/clientes/dialunes/especiales/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((lunesId: any) => {
      if (lunesId.resp.length > 0) {
        return lunesId.resp;
      } else {
        return 0;
      }
    });
  }

  backOrder( fechaIn: any, fechaOut: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/back/order/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((back: any) => {
      if (back.resp.length > 0) {
        return back.resp;
      } else {
        return 0;
      }
    });
  }

  obtenerBackOrder( tipo: any, fechaIn: any, fechaOut: any, orden: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/desgloce/back/order/${tipo}/${orden}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((obtbc: any) => {
      if (obtbc.resp.length > 0) {
        return obtbc.resp;
      } else {
        return 0;
      }
    });
  }

  obtenerBackOrderTipo( tipo: any, fechaIn: any, fechaOut: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/desgloce/area/back/${tipo}/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((obtbc: any) => {
      if (obtbc.resp.length > 0) {
        return obtbc.resp;
      } else {
        return 0;
      }
    });
  }

  obtenerBackOrderTipoTotales( fechaIn: any, fechaOut: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/totales/back/${fechaIn}/${fechaOut}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((obtbc: any) => {
      if (obtbc.resp.length > 0) {
        return obtbc.resp;
      } else {
        return 0;
      }
    });
  }

  enviarPDF(datos: any, archivo: string) {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/resumen/diaslunes?token=${this.usuarioS.token}`;

    return this.http.post(url, {data: datos, file: archivo}).pipe(
      map((resp: any) => {
        console.log(resp);
        return resp;
      })
    );
  }

}
