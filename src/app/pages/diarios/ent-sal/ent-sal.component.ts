import { Component, OnInit } from '@angular/core';

import { DiariosService } from '../../../services/services.index';
import { NgForm } from '@angular/forms';
import { SweetAlert } from 'sweetalert/typings/core';

@Component({
  selector: 'app-ent-sal',
  templateUrl: './ent-sal.component.html',
  styles: []
})
export class EntSalComponent implements OnInit {

  url: string;

  inicio: any;
  final: any;

  respuesta: boolean = true;
  respuestaIndividual: boolean = false;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = false;

  entSal: any;
  entrada: number = 0;
  salida: number = 0;
  general: number = 0;

  consumo: any;

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

    this.entrada = 0;
    this.salida = 0;
    this.general = 0;

    this._diariosService.entradaSalida(this.inicio, this.final)
      .subscribe( ( resp: any ) => {
        if (resp != '') {
          this.entSal = resp;

          for(let i=0; i < this.entSal.length; i++){
            this.entrada += Number(this.entSal[i].entrada);
            this.salida += Number(this.entSal[i].salida);
            this.general += Number(this.entSal[i].entrada) + Number(this.entSal[i].salida);
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

  obtenerConsumo() {
    console.log(this.inicio, this.final);
    this._diariosService.consumoInterno(this.inicio, this.final)
      .subscribe( ( resp: any ) => {
        this.consumo = resp;
      });
  }

}
