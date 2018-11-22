import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlmacenService {

  constructor(
    private http: HttpClient
  ) { }

  personal( area: any ) {
    let url = 'http://192.168.1.250/api/almacen.php?opcion=1&area=' + area;

    return this.http.get( url );
  }

  obtenerReporte( id_almacenista: any, inicio: string, fin: string ) {
    let url = 'http://192.168.1.250/api/almacen.php?opcion=2&idAlmacenista=' + id_almacenista + '&inicio=' + inicio + '&fin=' + fin;

    return this.http.get( url );
  }

}
