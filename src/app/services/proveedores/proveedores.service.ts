import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class ProveedoresService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerProveedores() {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_SERVER}/api/diarios.php?opcion=2`;

    return this.http.get( url ).map((proveedores: any) => {
      if (proveedores.length > 0) {
        return proveedores;
      } else {
        return 0;
      }
    });
  }

  obtenerProductos(clienteid: number) {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_SERVER}/api/proveedores.php?opcion=1&clienteid=${clienteid}`;

    return this.http.get( url );
  }

}
