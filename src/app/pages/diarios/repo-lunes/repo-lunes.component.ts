import { Component, OnInit } from '@angular/core';

import { DiariosService } from '../../../services/services.index';

@Component({
  selector: 'app-repo-lunes',
  templateUrl: './repo-lunes.component.html',
  styles: []
})
export class RepoLunesComponent implements OnInit {

  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = true;

  diasLunes: any;
  saldo: number = 0;
  actual: number = 0;
  nombre: string;

  constructor(
    private _diariosService: DiariosService
  ) { }

  ngOnInit() {
    this.solicitar();
  }

  solicitar() {

    this.esperar = true;

    this.saldo = 0;

    this._diariosService.diasLunes()
      .subscribe( ( resp: any ) => {
        if (resp != '') {
          this.diasLunes = resp;

          for(let i=0; i < this.diasLunes.length; i++){
            this.saldo += this.diasLunes[i].saldo;
          }

          this.esperar = false;
          this.respuestaGeneral = true;
          this.ventas = false;
        } else {
          this.ventas = true;
          this.esperar = false;
          this.respuestaGeneral = false;
        }
      });

  }

  obtenerPedidos(e) {
    this._diariosService.pedidosDiaLunes(e.target.id)
      .subscribe( ( resp: any ) => {
        console.log(resp);
        this.nombre = resp[0].asesor;
        this.actual = resp;
      });
  }

}
