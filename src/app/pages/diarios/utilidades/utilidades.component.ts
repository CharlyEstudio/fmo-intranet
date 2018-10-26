import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { DiariosService } from '../../../services/services.index';
import { SweetAlert } from 'sweetalert/typings/core';
import { URL_SERVICE } from '../../../config/config';

@Component({
  selector: 'app-utilidades',
  templateUrl: './utilidades.component.html',
  styles: []
})
export class UtilidadesComponent implements OnInit {

  url: string;

  proveedores: any[] = [];

  inicio: any;
  final: any;

  respuesta: boolean = true;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = false;
  
  // Totales
  utilidades: any;
  venta: number = 0;
  costo: number = 0;
  utilidad: number = 0;

  constructor(
    private _diariosService: DiariosService
  ) {
    this.url = URL_SERVICE;
  }

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

    this.venta = 0;
    this.costo = 0;
    this.utilidad = 0;

    this._diariosService.utilidades(this.inicio, this.final)
      .subscribe( ( resp: any ) => {
        if (resp != '') {
          this.utilidades = resp;

          for(let i=0; i < this.utilidades.length; i++){
            this.venta += this.utilidades[i].venta;
            this.costo += this.utilidades[i].costo;
            this.utilidad += this.utilidades[i].utilidad;
          }

          this.respuesta = false;
          this.respuestaGeneral = true;
          this.esperar = false;
          this.ventas = false;
        } else {
          this.ventas = true;
          this.respuesta = false;
          this.esperar = false;
          this.respuestaGeneral = false;
        }
      });

  }

}
