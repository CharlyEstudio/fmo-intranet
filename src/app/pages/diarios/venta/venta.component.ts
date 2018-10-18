import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiariosService } from '../../../services/services.index';
import { SweetAlert } from 'sweetalert/typings/core';
import { URL_SERVICE } from '../../../config/config';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styles: []
})
export class VentaComponent implements OnInit {

  url: string;

  hoy:  number = Date.now();

  usuarios: any[] = [];

  inicio: any;
  final: any;
  asesor: any = 0;

  respuesta: boolean = true;
  respuestaIndividual: boolean = false;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;

  // Datos Asesor
  nombre: string;
  id: number = 0;
  catalogo: string;
  serie: string;
  caja: number = 0;
  zona: number = 0;
  subtotal: number = 0;
  total: number = 0;
  pedidosGen: any;
  pedidosAse: any;
  totPedidosAse : number = 0;

  // Totales
  totalGeneral: number = 0;
  totalIva: number = 0;
  totalSubtotal: number = 0;

  constructor(
    private _diariosService: DiariosService
  ) {
    this.url = URL_SERVICE;
    console.log(this.url);
  }

  ngOnInit() {
    
    // Obtenemos los Asesores
    this._diariosService.asesores()
      .subscribe( ( resp: any ) => {
        this.usuarios = resp;
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
    this.asesor = forma.value.asesor;

    if ( forma.value.asesor != 0 ) {

      this._diariosService.ventas(this.inicio, this.final, this.asesor)
        .subscribe( ( resp ) => {

          if (resp != ''){
            this.nombre= resp[0].NOMBRE;
            this.id = resp[0].PERID;
            this.catalogo = resp[0].CATALOGO;
            this.serie = resp[0].SERIE;
            this.caja = resp[0].CAJA;
            this.zona = resp[0].ZONA;
            this.subtotal = resp[0].SUBTOTAL;
            this.total = resp[0].TOTAL;

            this._diariosService.ventasAsesor(this.inicio, this.final, this.asesor)
              .subscribe( ( resp: any ) => {
                this.pedidosAse = resp;
                this.totPedidosAse = resp.length;
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

      this._diariosService.ventas(this.inicio, this.final)
        .subscribe( ( resp ) => {

          if (resp != '') {
            this.pedidosGen = resp;
  
            for(let i=0; i < this.pedidosGen.length; i++){
              this.totalGeneral += this.pedidosGen[i].TOTAL;
              this.totalIva += this.pedidosGen[i].IVA;
              this.totalSubtotal += this.pedidosGen[i].SUBTOTAL;
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
