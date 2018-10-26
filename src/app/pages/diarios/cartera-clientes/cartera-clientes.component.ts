import { Component, OnInit } from '@angular/core';

import { DiariosService } from '../../../services/services.index';
import { SweetAlert } from 'sweetalert/typings/core';
import { URL_SERVICE } from '../../../config/config';

@Component({
  selector: 'app-cartera-clientes',
  templateUrl: './cartera-clientes.component.html',
  styles: []
})
export class CarteraClientesComponent implements OnInit {

  url: string;

  respuesta: boolean = true;
  esperar: boolean = false;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;

  cartera: any;
  saldo: number = 0;

  constructor(
    private _diariosService: DiariosService
  ) {
    this.url = URL_SERVICE;
  }

  ngOnInit() {
    this.solicitar();
  }

  solicitar() {

    this.esperar = true;
    this.respuesta = false;

    this.saldo = 0;

    this._diariosService.carteraClientes()
      .subscribe( ( resp: any ) => {
        if (resp != '') {
          this.cartera = resp;

          for(let i=0; i < this.cartera.length; i++){
            this.saldo += this.cartera[i].saldo;
          }

          this.respuesta = false;
          this.esperar = false;
          this.respuestaGeneral = true;
          this.ventas = false;
        } else {
          this.ventas = true;
          this.esperar = false;
          this.respuesta = false;
          this.respuestaGeneral = false;
        }
      });

  }

}
