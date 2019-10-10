import { Component, OnInit } from '@angular/core';

import { DiariosService, ExcelService } from '../../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

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
  cantidad: number = 0;
  clientes: number = 0;
  actual: any[] = [];
  icobrables: any[] = [];
  nombre: string;

  constructor(
    private _diariosService: DiariosService,
    private _excel: ExcelService
  ) { }

  ngOnInit() {
    this.solicitar();
  }

  solicitar() {

    this.esperar = true;

    this.saldo = 0;

    let h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    let fecha = anio + '-' + mes + '-' + dia;

    this._diariosService.diasLunes(fecha)
      .subscribe( ( resp: any ) => {
        if (resp !== '') {
          this.diasLunes = resp;

          for (let i = 0; i < this.diasLunes.length; i++) {
            this.saldo += this.diasLunes[i].saldo;
            this.cantidad += this.diasLunes[i].cantidad;
            this.clientes += this.diasLunes[i].clientes;
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

    this._diariosService.diasLunesDocInc()
      .subscribe( ( inco: any ) => {
        this.icobrables = inco;
      });

  }

  obtenerPedidos(data: any) {
    this.actual = [];
    this.nombre = '';

    if (data.id !== 80000 && data.id !== 843) {
      let h = new Date();

      let dia;

      if (h.getDate() < 10) {
        dia = '0' + h.getDate();
      } else {
        dia = h.getDate();
      }

      let mes: any;

      if (h.getMonth() < 10) {
        mes = '0' + (h.getMonth() + 1);
      } else {
        mes = (h.getMonth() + 1);
      }

      let anio = h.getFullYear();

      let fecha = anio + '-' + mes + '-' + dia;
      this._diariosService.pedidosDiaLunes(fecha, data.id)
        .subscribe( ( resp: any ) => {
          this.nombre = data.asesor;
          this.actual = resp;
        });
    } else if (data.id === 80000) {
      // Obtener Cheques devueltos
      this._diariosService.pedidosDiaLunesCH()
        .subscribe( ( resp: any ) => {
          this.nombre = data.asesor;
          this.actual = resp;
        });
    } else {
      // Obtener Cheques devueltos
      this._diariosService.pedidosDiaLunesDocInc()
        .subscribe( ( resp: any ) => {
          this.nombre = data.asesor;
          this.actual = resp;
        });
    }
  }

  descargar( data: any ) {
    let filename = 'reporte_' + data[0].asesor;
    this._excel.exportAsExcelFile(data, filename);
  }

}
