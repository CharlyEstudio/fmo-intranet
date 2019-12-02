import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SeguimientoService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerFechaDias(diaSel: any) {
    const url = `https://ferremayoristas.com.mx/api/seguimiento.php?opcion=3&diaSel=${diaSel}`;

    return this.http.get(url);
  }

  obtenerSeguimiento(fecha: any, idFerrum: number) {
    const url = `https://ferremayoristas.com.mx/api/seguimiento.php?opcion=4&fecha=${fecha}&perid=${idFerrum}`;

    return this.http.get(url);
  }

}
