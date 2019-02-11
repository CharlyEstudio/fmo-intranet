import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhpService } from '../../services/services.index';

@Component({
  selector: 'app-lista-morosidad',
  templateUrl: './lista-morosidad.component.html',
  styles: []
})
export class ListaMorosidadComponent implements OnInit {

  id: any;
  nombre: any;
  inicio: any;
  fin: any;

  datos: any[] = [];

  total: number = 0;

  constructor(
    private router: ActivatedRoute,
    private ruta: Router,
    private _phpService: PhpService
  ) { }

  ngOnInit() {

    this.id = this.router.snapshot.paramMap.get('id');

    this.nombre = this.router.snapshot.paramMap.get('nombre');

    this.inicio = this.router.snapshot.paramMap.get('inicio');

    this.fin = this.router.snapshot.paramMap.get('fin');

    this.solicitarLista(this.id, this.inicio, this.fin);

  }

  solicitarLista( id: any, inicio: any, fin: any ) {
    this._phpService.listaMorosidad(id, inicio, fin)
      .subscribe( ( resp: any ) => {
        this.datos = resp;

        for ( let i = 0; i < resp.length; i++) {
          this.total += resp[i].total;
        }
      });
  }

  solicitarComentarios( datos: any ) {
    this.ruta.navigate(['/comentarios/', datos.clienteid, datos.numero, datos.nombre, this.id, this.nombre, this.inicio, this.fin]);
  }

  regresar() {
    this.ruta.navigate(['/dashboardAse']);
  }

}
