import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_SERVER } from '../../config/config';

@Injectable()
export class PaneldiariosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

}
