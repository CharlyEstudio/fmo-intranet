import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL } from '../../config/config';

@Injectable()
export class SupervisoresService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  pedidosGeneral( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/supervisores.php?opcion=1&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/supervisores.php?opcion=1&perid=' + id;
    }

    return this.http.get( this.url );
  }

}
