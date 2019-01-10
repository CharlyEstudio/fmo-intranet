import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiariosService, AsesoresService } from '../../../services/services.index';
import { SweetAlert } from 'sweetalert/typings/core';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styles: []
})
export class VentaComponent implements OnInit {

  url: string;

  hoy:  number = Date.now();

  usuarios: any[] = [];
  // vendedor: any[] = [];
  nombreAse: any;
  imagen: any;
  email: any;
  tel: any;
  rol: any;

  inicio: any;
  final: any;
  asesor: any = 0;

  respuesta: boolean = true;
  respuestaIndividual: boolean = false;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = false;

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
  totPedidosAse: number = 0;

  // Totales
  totalGeneral: number = 0;
  totalIva: number = 0;
  totalSubtotal: number = 0;

  constructor(
    private _diariosService: DiariosService,
    private _asesorService: AsesoresService
  ) {}

  ngOnInit() {

    // Obtenemos los Asesores
    this._diariosService.asesores()
      .subscribe( ( resp: any ) => {
        this.usuarios = resp;
      });

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
    this.asesor = forma.value.asesor;

    if ( Number(forma.value.asesor) !== 0 ) {

      this._diariosService.ventas(this.inicio, this.final, this.asesor)
        .subscribe( ( resp ) => {

          this._asesorService.asesor(this.asesor)
            .subscribe( ( ase: any ) => {
              // this.vendedor = ase.usuarios[0];
              this.nombreAse = ase.usuarios[0].nombre;
              this.imagen = ase.usuarios[0].img;
              this.email = ase.usuarios[0].email;
              this.tel = ase.usuarios[0].tel;
              this.rol = ase.usuarios[0].rol;
            });

          if (resp.respuesta.lenth !== 0) {
            this.nombre = resp.respuesta[0].NOMBRE;
            this.id = resp.respuesta[0].PERID;
            this.catalogo = resp.respuesta[0].CATALOGO;
            this.serie = resp.respuesta[0].SERIE;
            this.caja = resp.respuesta[0].CAJA;
            this.zona = resp.respuesta[0].ZONA;
            this.subtotal = resp.respuesta[0].SUBTOTAL;
            this.total = resp.respuesta[0].TOTAL;

            this._diariosService.ventasAsesor(this.inicio, this.final, this.asesor)
              .subscribe( ( ventAse: any ) => {
                this.pedidosAse = ventAse;
                this.totPedidosAse = ventAse.length;
              });

            this.respuesta = false;
            this.esperar = false;
            this.respuestaIndividual = true;
            this.respuestaGeneral = false;
            this.ventas = false;

          } else {
            this.ventas = true;
            this.esperar = false;
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

          if (resp.respuesta.length !== 0) {
            this.pedidosGen = resp.respuesta;

            for (let i = 0; i < this.pedidosGen.length; i++) {
              this.totalGeneral += this.pedidosGen[i].TOTAL;
              this.totalIva += this.pedidosGen[i].IVA;
              this.totalSubtotal += this.pedidosGen[i].SUBTOTAL;
            }

            this.respuesta = false;
            this.esperar = false;
            this.respuestaIndividual = false;
            this.respuestaGeneral = true;
          } else {
            this.ventas = true;
            this.esperar = false;
            this.respuesta = false;
            this.respuestaIndividual = false;
            this.respuestaGeneral = false;
          }
        });
    }

  }

}
