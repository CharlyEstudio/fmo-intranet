import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class DiasvtasService {

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  obtenerFechaDias(fechaIn: any, fechaOut: any, diaSel: any) {
    const url = 'https://ferremayoristas.com.mx/api/compararvts.php?opcion=1&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&diaSel=' + diaSel;

    return this.http.get(url);
  }

  obtenerVentasDia(fecha: any, perid: any) {
    const url = 'https://ferremayoristas.com.mx/api/compararvts.php?opcion=2&fecha=' + fecha + '&perid=' + perid + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  obtenerClientesSinMov(fechaIn: any, fechaOut: any, perid: any) {
    const url = 'https://ferremayoristas.com.mx/api/compararvts.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&perid=' + perid + '&servidor=' + this._servidor.db;

    return this.http.get(url);
  }

  crearPdf(datos: any, tipo: any, asesor: any) {
    const url = 'https://ferremayoristas.com.mx/api/compararvts.php?opcion=4';

    return this.http.post(url, {datos, tipo, asesor});
  }

}
