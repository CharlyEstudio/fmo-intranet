import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Servicios
import { UsuarioService } from '../services.index';

@Injectable()
export class ChoferService {

  token: string = '';

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {
    this.token = this.usuarioService.token;
  }

  obtenerGuias(fechaIn: any, fechaOut: any) {
    const url = `https://ferremayoristas.com.mx:3001/chofer/comisiones/${fechaIn}/${fechaOut}?token=${this.token}`;

    return this.http.get(url);
  }

}
