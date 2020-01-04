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

  surtido(id: any) {
    const url = 'https://ferremayoristas.com.mx:3001/ferrum/permanencia/pedidos/surtir/' + id;
    return this.http.put(url, {});
  }

}
