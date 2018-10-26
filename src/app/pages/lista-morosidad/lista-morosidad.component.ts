import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhpService } from '../../services/services.index';

@Component({
  selector: 'app-lista-morosidad',
  templateUrl: './lista-morosidad.component.html',
  styles: []
})
export class ListaMorosidadComponent implements OnInit {

  id: any;
  inicio: any;
  fin: any;

  datos: any[] = [];

  total: number = 0;

  constructor(
    private router: ActivatedRoute,
    private _phpService: PhpService
  ) { }

  ngOnInit() {

    this.id = this.router.snapshot.paramMap.get('id');

    this.inicio = this.router.snapshot.paramMap.get('inicio');

    this.fin = this.router.snapshot.paramMap.get('fin');

    this.solicitarLista(this.id, this.inicio, this.fin);

  }

  solicitarLista( id: any, inicio: any, fin: any ) {
    this._phpService.listaMorosidad(id, inicio, fin)
      .subscribe( ( resp: any ) => {
        this.datos = resp;

        for( let i = 0; i < resp.length; i++){
          this.total += resp[i].total;
        }
      });
  }

}
