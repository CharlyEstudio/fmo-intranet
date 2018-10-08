import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DiariosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesores() {
    // this.url = 'http://192.168.1.250/api/diarios.php?opcion=1';
    this.url = 'http://localhost:80/apis/diarios.php?opcion=1';

    return this.http.get( this.url );
  }

  ventas(fechaIn: any, fechaOut, asesor: any = '') {
    this.url = 'http://localhost:80/apis/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;

    return this.http.get( this.url );
  }

  ventasAsesor(fechaIn: any, fechaOut, asesor){
    this.url = 'http://localhost:80/apis/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;

    return this.http.get( this.url );
  }

}
