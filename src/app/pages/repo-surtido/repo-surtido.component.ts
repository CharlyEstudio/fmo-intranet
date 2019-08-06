import { Component, OnInit } from '@angular/core';
import { AlmacenService, ExcelService } from '../../services/services.index';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-repo-surtido',
  templateUrl: './repo-surtido.component.html',
  styles: []
})
export class RepoSurtidoComponent implements OnInit {

  personal: any[] = [];
  provisional: any = [];

  reporte: any = '';

  inicio: any;
  fin: any;

  filtro: any = '';

  mostrar: boolean = false;
  esperar: boolean = false;

  totalPar: number = 0;
  totalPed: number = 0;
  total: number = 0;

  area: any;

  constructor(
    private _almacenService: AlmacenService,
    public _excel: ExcelService
  ) { }

  ngOnInit() {
  }

  solicitar( forma: NgForm ) {

    this.esperar = true;
    this.mostrar = false;

    this.totalPar = 0;
    this.totalPed = 0;
    this.total = 0;

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar la fecha incial', 'No ha selecionado una fecha inicial.', 'error');
      return;
    }

    if ( forma.value.fin === undefined ) {
      swal('Debe ingresar la fecha final', 'No ha selecionado una fecha final.', 'error');
      return;
    }

    if ( forma.value.filtro === '' ) {
      swal('Debe ingresar un tipo de filtro', 'No ha selecionado un tipo de filtro.', 'error');
      return;
    }

    if (forma.value.filtro === 'vacio') {
      this.area = '0';
    } else {
      this.area = forma.value.filtro;
    }

    this._almacenService.obtenerReporte( this.area, forma.value.inicio, forma.value.fin ).subscribe( ( personal: any ) => {
      this.personal = personal;

      this.personal.sort((a, b) => {
        if (a.partidas < b.partidas) {
          return 1;
        }

        if (a.partidas > b.partidas) {
          return -1;
        }

        return 0;
      });

      this.mostrar = true;
      this.esperar = false;

      for (let i = 0; i < personal.length; i++) {
        this.totalPar += personal[i].partidas;
        this.totalPed += personal[i].pedidos;
        this.total += (this.totalPar * personal[i].comision);
      }

    });

    this.personal = [];

  }

  descargar( data: any ) {
    this._excel.exportAsExcelFile(data, this.area);
  }

}
