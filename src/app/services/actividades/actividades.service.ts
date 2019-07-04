import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ActividadesService {
  url: string;
  constructor(private http: HttpClient) { }

  actividades(idferrum: any){
    this.url = 'http://192.168.1.250/test/check.php?opc=1&idferrum=' + idferrum;
    return this.http.get(this.url);
  }

  guarda(id_actividad: any, comentario: any){
    this.url = 'http://192.168.1.250/test/check.php?opc=2&id_actividad='+ id_actividad + '&comentario=' + comentario;
    return this.http.get(this.url);
  }

  guardahistorial(id_actividad: any, comentario: any, id_usuario: any){
    this.url = 'http://192.168.1.250/test/check.php?opc=3&id_actividad='+ id_actividad + '&comentario=' + comentario + '&id_usuario=' + id_usuario;
    return this.http.get(this.url);
  }
}