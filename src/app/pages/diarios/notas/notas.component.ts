import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { DiariosService } from '../../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

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
  tipo: any = '0';

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

    this.respuesta = false;

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar las fechas', 'No ha selecionado un rango de fechas.', 'error');
      return;
    }

    if ( forma.value.final === undefined ) {
      swal('Debe ingresar las fechas', 'No ha selecionado un rango de fechas.', 'error');
      return;
    }

    if ( forma.value.tipo === '0' ) {
      swal('Debe seleccionar un tipo', 'No ha selecionado un tipo de nota de crédito.', 'error');
      return;
    }
    this.esperar = true;

    this.inicio = forma.value.inicio;
    this.final = forma.value.final;
    this.tipo = forma.value.tipo;

    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;

    this._diariosService.notasCredito(this.inicio, this.final, this.tipo)
      .subscribe( ( resp: any ) => {
        if (resp !== '') {
          this.notas = resp;

          for (let i = 0; i < this.notas.length; i++) {
            this.subtotal += parseFloat(this.notas[i].subtotal);
            this.iva += parseFloat(this.notas[i].iva);
            this.total += parseFloat(this.notas[i].total);
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
