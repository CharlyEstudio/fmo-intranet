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

  obtenerReporte( area: any, inicio: string, fin: string ) {
    // tslint:disable-next-line:max-line-length
    let url = 'http://192.168.1.250/api/almacen.php?opcion=1' + '&area=' + area + '&inicio=' + inicio + '&fin=' + fin;

    return this.http.get( url );
  }

}
