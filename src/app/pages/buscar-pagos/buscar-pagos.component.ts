import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { CreditoService } from '../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-buscar-pagos',
  templateUrl: './buscar-pagos.component.html',
  styles: []
})
export class BuscarPagosComponent implements OnInit {

  inicio: any;
  final: any;

  respuesta: boolean = true;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = false;

  pagos: any[] = [];

  constructor(
    private _creditoService: CreditoService,
  ) { }

  ngOnInit() {
  }

  solicitar(forma: NgForm) {
    this.pagos = [];

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar las fechas', 'No ha selecionado un rango de fechas.', 'error');
      return;
    }

    if ( forma.value.final === undefined ) {
      swal('Debe ingresar las fechas', 'No ha selecionado un rango de fechas.', 'error');
      return;
    }

    this.esperar = true;
    this.respuesta = false;
    this.ventas = false;

    this._creditoService.pagosRango(forma.value.inicio, forma.value.final).subscribe( ( pagos: any ) => {
      if (pagos.length > 0) {
        this.pagos = pagos;
        this.esperar = false;
        this.respuesta = false;
        this.ventas = false;
        this.respuestaGeneral = true;
      } else {
        this.esperar = false;
        this.respuesta = false;
        this.ventas = true;
        this.respuestaGeneral = false;
      }
    });
  }

}
