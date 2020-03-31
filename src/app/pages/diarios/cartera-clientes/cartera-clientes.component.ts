import { Component, OnInit } from '@angular/core';

import { DiariosService } from '../../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

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
  ) {}

  ngOnInit() {
    this.solicitar();
  }

  solicitar() {

    this.esperar = true;
    this.respuesta = false;

    this.saldo = 0;

    this._diariosService.carteraClientes()
      .subscribe( ( resp: any ) => {
        if (resp.length !== 0) {
          this.cartera = resp;

          for (let i = 0; i < this.cartera.length; i++) {
            this.saldo += parseFloat(this.cartera[i].saldo);
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
