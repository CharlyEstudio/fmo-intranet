import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class PedidosrescatadosService {

  token = '';

  constructor(
    private http: HttpClient,
    private usuarioS: UsuarioService
  ) {
    this.token = this.usuarioS.token;
  }

  obtenerRescatado() {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/pedidosStore/sinsurtir?token=${this.token}`;
    return this.http.get(url);
  }

  surtido(id: any) {
    const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/pedidosStore/surtir/${id}?token=${this.token}`;
    return this.http.put(url, {});
  }

}
