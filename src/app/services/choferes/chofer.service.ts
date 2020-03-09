import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class ChoferService {

  token: string = '';

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private usuarioService: UsuarioService
  ) {
    this.token = this.usuarioService.token;
  }

  obtenerGuias(fechaIn: any, fechaOut: any) {
    // const url = `https://ferremayoristas.com.mx:3001/chofer/comisiones/${fechaIn}/${fechaOut}?token=${this.token}`;
    // const url = `https://ferremayoristas.com.mx:3001/guias/buscar/rango/comision/${fechaIn}/${fechaOut}?token=${this.token}`;
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/guia/buscar/rango/comision/${fechaIn}/${fechaOut}?token=${this.token}`;

    return this.http.get(url);
  }

}
