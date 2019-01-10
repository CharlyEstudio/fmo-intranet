import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { DiariosService } from '../../../services/services.index';
import { SweetAlert } from 'sweetalert/typings/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styles: []
})
export class NotasComponent implements OnInit {

  url: string;

  respuesta: boolean = true;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = false;

  inicio: any;
  final: any;

  notas: any;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor(
    private _diariosService: DiariosService
  ) {}

  ngOnInit() {
  }

  solicitar(forma: NgForm) {

    this.esperar = true;
    this.respuesta = false;

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar las fechas', 'No ha selecionado un rango de fechas.', 'error');
      return;
    }

    if ( forma.value.final === undefined ) {
      swal('Debe ingresar las fechas', 'No ha selecionado un rango de fechas.', 'error');
      return;
    }

    this.inicio = forma.value.inicio;
    this.final = forma.value.final;

    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;

    this._diariosService.notasCredito(this.inicio, this.final)
      .subscribe( ( resp: any ) => {
        if (resp !== '') {
          this.notas = resp;

          for (let i = 0; i < this.notas.length; i++) {
            this.subtotal += this.notas[i].subtotal;
            this.iva += this.notas[i].iva;
            this.total += this.notas[i].total;
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
