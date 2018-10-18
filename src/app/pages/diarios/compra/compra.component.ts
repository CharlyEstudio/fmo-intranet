import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { DiariosService } from '../../../services/services.index';
import { SweetAlert } from 'sweetalert/typings/core';
import { URL_SERVICE } from '../../../config/config';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styles: []
})
export class CompraComponent implements OnInit {

  url: string;

  hoy:  number = Date.now();

  proveedores: any[] = [];

  inicio: any;
  final: any;
  proveedor: any = 0;

  respuesta: boolean = true;
  respuestaIndividual: boolean = false;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;

  // Datos Proveedor
  nombre: string;
  id: number = 0;
  numero: string;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  pedidosGen: any;
  pedidosProv: any;
  totPedidosProv : number = 0;

  // Totales
  totalGeneral: number = 0;
  totalIva: number = 0;
  totalSubtotal: number = 0;

  constructor(
    private _diariosService: DiariosService
  ) {
    this.url = URL_SERVICE;
  }

  ngOnInit() {

    // Obtenemos Proveedores
    this._diariosService.proveedores()
      .subscribe( ( data: any ) => {
        this.proveedores = data;
      });

  }

  solicitar(forma: NgForm) {
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
    this.proveedor = forma.value.proveedor;

    if ( forma.value.proveedor != 0 ) {
      this._diariosService.compras(this.inicio, this.final, this.proveedor)
        .subscribe( ( resp: any ) => {

          if (resp != ''){
            this.nombre= resp[0].nombre;
            this.id = resp[0].cid;
            this.numero = resp[0].numero;
            this.subtotal = resp[0].subtotal;
            this.iva = resp[0].iva;
            this.total = resp[0].total;

            this._diariosService.comprasProveedor(this.inicio, this.final, this.id)
              .subscribe( ( data: any ) => {
                this.pedidosProv = data;
                this.totPedidosProv = data.length;
              });

            this.respuesta = false;
            this.respuestaIndividual = true;
            this.respuestaGeneral = false;
            this.ventas = false;
          } else {
            this.ventas = true;
            this.respuesta = false;
            this.respuestaIndividual = false;
            this.respuestaGeneral = false;
          }

        });
    } else {
      
      this.totalGeneral = 0;
      this.totalIva = 0;
      this.totalSubtotal = 0;

      this._diariosService.compras(this.inicio, this.final)
        .subscribe( ( resp: any ) => {

          if (resp != '') {
            this.pedidosGen = resp;
  
            for(let i=0; i < this.pedidosGen.length; i++){
              this.totalGeneral += this.pedidosGen[i].total;
              this.totalIva += this.pedidosGen[i].iva;
              this.totalSubtotal += this.pedidosGen[i].subtotal;
            }

            this.respuesta = false;
            this.respuestaIndividual = false;
            this.respuestaGeneral = true;
          } else {
            this.ventas = true;
            this.respuesta = false;
            this.respuestaIndividual = false;
            this.respuestaGeneral = false;
          }

        });

    }
  }

}
