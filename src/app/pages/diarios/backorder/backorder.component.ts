import { Component, OnInit } from '@angular/core';

import { DiariosService, ExcelService } from '../../../services/services.index';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-backorder',
  templateUrl: './backorder.component.html',
  styles: []
})
export class BackorderComponent implements OnInit {

  inicio: any;
  final: any;
  orden: any = 0;

  respuesta: boolean = true;
  respuestaIndividual: boolean = false;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = false;
  mostrar: boolean = false;

  backorder: any;
  cantidad: number = 0;
  costo: number = 0;
  venta: number = 0;

  // Totales de cada tipo
  descargar: any[] = [];
  bajan: number = 0;
  mesas: number = 0;
  cancel: number = 0;

  backs: any;
  backsTipo: any[] = [];

  nombre: string;

  constructor(
    private _diariosService: DiariosService,
    private _excelService: ExcelService
  ) { }

  ngOnInit() {
  }

  solicitar(forma: NgForm) {

    this.esperar = true;
    this.respuesta = false;
    this.mostrar = false;

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar las fechas', 'No ha selecionado un rango de fechas.', 'error');
      return;
    }

    if ( forma.value.final === undefined ) {
      swal('Debe ingresar las fechas', 'No ha selecionado un rango de fechas.', 'error');
      return;
    }

    if ( forma.value.orden === 0 ) {
      swal('Debe ingresar el orden', 'No ha selecionado un tipo de orden.', 'error');
      return;
    }

    this.inicio = forma.value.inicio;
    this.final = forma.value.final;
    this.orden = forma.value.orden;

    this.cantidad = 0;
    this.costo = 0;
    this.venta = 0;

    this._diariosService.backOrder(this.inicio, this.final)
      .subscribe( ( resp: any ) => {
        if (resp.length !== 0) {
          this.backorder = resp;

          for (let i = 0; i < this.backorder.length; i++) {
            this.cantidad += Number(this.backorder[i].cantidad);
            this.costo += Number(this.backorder[i].costo);
            this.venta += Number(this.backorder[i].venta);
          }
          this.datosBackOrder();

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

  obtenerBackOrder(e: any) {
    this.nombre = e.target.id;

    this._diariosService.obtenerBackOrder(e.target.id, this.inicio, this.final, this.orden)
      .subscribe( ( resp: any ) => {
        if (resp.length > 0) {
          this.mostrar = true;
          this.backs = resp;
          this._diariosService.obtenerBackOrderTipo(e.target.id, this.inicio, this.final)
            .subscribe( ( porTipo: any ) => {
              if (porTipo.length > 0) {
                this.backsTipo = porTipo;
              }
            });
        } else {
          this.mostrar = false;
        }
      });
  }

  datosBackOrder() {
    this.bajan = 0;
    this.mesas = 0;
    this.cancel = 0;
    this._diariosService.obtenerBackOrderTipoTotales(this.inicio, this.final)
      .subscribe( ( porTipo: any ) => {
        if (porTipo.length > 0) {
          this.descargar = porTipo;
          for (const tp of porTipo) {
            if (tp.nivel === 'R') {
              this.bajan += tp.venta;
            }

            if (tp.nivel === 'F') {
              this.mesas += tp.venta;
            }

            if (tp.nivel === 'C') {
              this.cancel += tp.venta;
            }
          }
        }
      });
  }

  descargarFile() {
    for (const des of this.descargar) {
      des.codigo = "'" + des.codigo;
    }
    this._excelService.exportAsExcelFile(this.descargar, 'BackOrder-Detalle');
  }

}
