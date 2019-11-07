import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChequesdevService {

  constructor(
    private http: HttpClient
  ) { }

  obtenemosCHFerrum() {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=0`;

    return this.http.get(url);
  }

  obtenemosChquesDev() {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=1`;

    return this.http.get(url);
  }

  obtenerPendientes() {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=4`;

    return this.http.get(url);
  }

  obtenerCobrados() {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=8`;

    return this.http.get(url);
  }

  obtenerTerninados() {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=9`;

    return this.http.get(url);
  }

  guardarNuevoCheque(fecha: any, importe: any) {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=2&fechacheque=${fecha}&importe=${importe}`;

    return this.http.get(url);
  }

  guardarChequeFerrum(datos: any) {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=10`;

    return this.http.post(url, {guardar: datos}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  actualizarDato(datos: any) {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=3`;

    return this.http.post(url, {actualizar: datos}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

  cobrado(id: any) {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=7&id=${id}`;

    return this.http.get(url);
  }

  terminar(id: any) {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=5&id=${id}`;

    return this.http.get(url);
  }

  recuperar(id: any) {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=6&id=${id}`;

    return this.http.get(url);
  }

  obtenemosFolioFerrum(folio: number) {
    const url = `https://ferremayoristas.com.mx/api/chequesdev.php?opcion=11&folio=${folio}`;

    return this.http.get(url);
  }

}
