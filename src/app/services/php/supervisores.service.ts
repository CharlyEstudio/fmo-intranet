import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE, URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SupervisoresService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  pedidosGeneral( id: any ) {
    this.url = URL_SERVICE + '/api/supervisores.php?opcion=1&perid=' + id;

    return this.http.get( this.url );
  }

}
