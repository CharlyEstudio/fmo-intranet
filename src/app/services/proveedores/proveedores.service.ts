import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PARAM_KEY, KEY, PUERTO_INTERNO } from '../../config/config';

// Servicios
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class ProveedoresService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  token: string = '';

  constructor(
    private http: HttpClient,
    private _usuarioS: UsuarioService,
    private _servidorS: ServidorService
  ) {
    this.token = this._usuarioS.token;
  }

  obtenerProveedores() {
    const url = `${URL_SERVICIO_GENERAL}/services/proveedores/${this._servidorS.db}`;

    return this.http.get( url, { headers: this.headers } ).map((proveedores: any) => {
      if (proveedores.resp.length > 0) {
        return proveedores.resp;
      } else {
        return 0;
      }
    });
  }

  obtenerProductosProveedor(clienteid: number) {
    const url = `${URL_SERVICIO_GENERAL}/services/almacen/producto/proveedor/${clienteid}/${this._servidorS.db}`;

    return this.http.get( url, { headers: this.headers } );
  }

  descargarPDF(datos: any, fecha: any, hora: any) {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/resumen/proveedores?token=${this.token}`;

    return this.http.post( url, {datos, fecha, hora} ).map((resp: any) => {
      return resp;
    });
  }

}
