import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PedidosrescatadosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerRescatado() {
    const url = 'https://ferremayoristas.com.mx:3001/ferrum/permanencia/pedidos/sinsurtir';
    return this.http.get(url);
  }

}
