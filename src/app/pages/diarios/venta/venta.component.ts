import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiariosService, AsesoresService } from '../../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

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

    const fecha1 = forma.value.inicio.split('-');
    const fecha2 = forma.value.final.split('-');

    if (fecha1[1] === '09' && fecha1[0] === '2019' && fecha2[1] === '09' && fecha2[0] === '2019') {
      swal({
        title: "Mes Especial",
        text: 'Este mes se realizarón cambios en sistema y se estará buscando de forma especial',
        icon: "warning",
        buttons: {
          cancel: true,
          confirm: true
        },
      })
      .then(( correct ) => {
        if (!correct) { return null };

        this.inicio = forma.value.inicio;
        this.final = forma.value.final;
        this.asesor = forma.value.asesor;

        if ( Number(forma.value.asesor) !== 0 ) {

          this._diariosService.ventasSept(this.inicio, this.final, this.asesor)
            .subscribe( ( resp: any ) => {
              console.log(resp);

              this._asesorService.asesor(this.asesor)
                .subscribe( ( ase: any ) => {
                  this.nombreAse = ase.usuarios[0].nombre;
                  this.imagen = ase.usuarios[0].img;
                  this.email = ase.usuarios[0].email;
                  this.tel = ase.usuarios[0].tel;
                  this.rol = ase.usuarios[0].rol;
                });

              if (resp.length !== 0) {
                this.nombre = resp[0].NOMBRE;
                this.id = resp[0].PERID;
                this.catalogo = resp[0].CATALOGO;
                this.serie = resp[0].SERIE;
                this.caja = resp[0].CAJA;
                this.zona = resp[0].ZONA;
                this.subtotal = resp[0].SUBTOTAL;
                this.total = resp[0].TOTAL;

                // Cambiar este servicio
                this._diariosService.ventasAsesor(this.inicio, this.final, this.asesor)
                  .subscribe( ( ventAse: any ) => {
                    console.log(ventAse);
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

          this._diariosService.ventasSept(this.inicio, this.final)
            .subscribe( ( resp: any ) => {

              if (resp.length !== 0) {
                this.pedidosGen = resp;

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

        swal.stopLoading();
      });
    } else if (fecha2[1] !== '09' && fecha2[0] === '2019' && (fecha1[1] === '09' && fecha1[0] === '2019')) {
      this.ventas = false;
      this.esperar = false;
      this.respuesta = true;
      this.respuestaIndividual = false;
      this.respuestaGeneral = false;
      swal('Mes Especial', 'Este mes se realizarón cambios en sistema y no puede combinarse con otros meses, favor de seleccionar solo el mes de septiembre.', 'warning');
    } else if (fecha2[1] === '09' && fecha2[0] === '2019' && (fecha1[1] !== '09' && fecha1[0] === '2019')) {
      this.ventas = false;
      this.esperar = false;
      this.respuesta = true;
      this.respuestaIndividual = false;
      this.respuestaGeneral = false;
      swal('Mes Especial', 'Este mes se realizarón cambios en sistema y no puede combinarse con otros meses, favor de seleccionar solo el mes de septiembre.', 'warning');
    } else {
      this.inicio = forma.value.inicio;
      this.final = forma.value.final;
      this.asesor = forma.value.asesor;

      if ( Number(forma.value.asesor) !== 0 ) {

        this._diariosService.ventas(this.inicio, this.final, this.asesor)
          .subscribe( ( resp: any ) => {
            console.log(resp);

            this._asesorService.asesor(this.asesor)
              .subscribe( ( ase: any ) => {
                // this.vendedor = ase.usuarios[0];
                this.nombreAse = ase.usuarios[0].nombre;
                this.imagen = ase.usuarios[0].img;
                this.email = ase.usuarios[0].email;
                this.tel = ase.usuarios[0].tel;
                this.rol = ase.usuarios[0].rol;
              });

            if (resp.length !== 0) {
              this.nombre = resp[0].NOMBRE;
              this.id = resp[0].PERID;
              this.catalogo = resp[0].CATALOGO;
              this.serie = resp[0].SERIE;
              this.caja = resp[0].CAJA;
              this.zona = resp[0].ZONA;
              this.subtotal = resp[0].SUBTOTAL;
              this.total = resp[0].TOTAL;

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
          .subscribe( ( resp: any ) => {

            if (resp.length !== 0) {
              this.pedidosGen = resp;

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

}
