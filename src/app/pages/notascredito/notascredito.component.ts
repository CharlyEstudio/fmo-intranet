import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Servicios
import { NcService, UsuarioService } from '../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-notascredito',
  templateUrl: './notascredito.component.html',
  styles: []
})
export class NotascreditoComponent implements OnInit {

  nc: any[] = [];
  work: any[] = [];
  id: any;

  inNC: any = '';
  inFac: any = '';
  fechaNC: any = '';

  // Resumen NC Totales - NC Trabajadas
  total: number = 0;
  trabajadas: number = 0;
  pendientes: number = 0;

  cargando: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _ncService: NcService
  ) {
    this.id = this._usuarioService.usuario._id;
    this.obtenerTodosNC();

    this.obtenerTrabajados();
  }

  ngOnInit() { }

  trabajado(nc: any) {
    const nota = {
      fecha: nc.fecha.substr(0, 10),
      tiponc: nc.tiponc,
      serie: nc.serie,
      nc: nc.nc,
      factura: nc.factura,
      nombre: nc.nombre,
      subtotal: nc.subtotal,
      iva: nc.iva,
      total: nc.total,
      saldo: nc.saldo,
      perid: nc.perid,
      vendedor: nc.vendedor,
      usuario: this.id
    };
    this._ncService.guardarNCtrabajado(nota).subscribe((resp: any) => {
      if (resp.status) {
        document.getElementById("linea" + nc.nc + nc.factura).classList.add("bg-primary");
        nc.trabajado = true;
        this.obtenerTrabajados();
      }
    });
  }

  quitar(nc: any) {
    this._ncService.quitarNCtrabajado(nc).subscribe((resp: any) => {
      if (resp.status) {
        document.getElementById("linea" + nc.nc + nc.factura).classList.remove("bg-primary");
        nc.trabajado = false;
        this.obtenerTrabajados();
      }
    });
  }

  obtenerTodosNC() {
    this.total = 0;
    this.trabajadas = 0;
    this.pendientes = 0;
    this._ncService.obtenerNC().subscribe((notas: any) => {
      if (notas.status) {
        let nt;
        this.nc = [];
        for (let i = 0; i < notas.respuesta.length; i ++) {
          this._ncService.buscarNCtrabajado(notas.respuesta[i].nc, notas.respuesta[i].factura).subscribe((resp: any) => {
            if (resp.status) {
              nt = {
                fecha: notas.respuesta[i].fecha,
                tiponc: notas.respuesta[i].tiponc,
                serie: notas.respuesta[i].serie,
                nc: notas.respuesta[i].nc,
                factura: notas.respuesta[i].factura,
                nombre: notas.respuesta[i].nombre,
                subtotal: notas.respuesta[i].subtotal,
                iva: notas.respuesta[i].iva,
                total: notas.respuesta[i].total,
                saldo: notas.respuesta[i].saldo,
                perid: notas.respuesta[i].perid,
                vendedor: notas.respuesta[i].vendedor,
                trabajado: true
              };
            } else {
              nt = {
                fecha: notas.respuesta[i].fecha,
                tiponc: notas.respuesta[i].tiponc,
                serie: notas.respuesta[i].serie,
                nc: notas.respuesta[i].nc,
                factura: notas.respuesta[i].factura,
                nombre: notas.respuesta[i].nombre,
                subtotal: notas.respuesta[i].subtotal,
                iva: notas.respuesta[i].iva,
                total: notas.respuesta[i].total,
                saldo: notas.respuesta[i].saldo,
                perid: notas.respuesta[i].perid,
                vendedor: notas.respuesta[i].vendedor,
                trabajado: false
              };
            }
            this.nc.push(nt);
            this.nc.sort((a, b) => {
              if (a.serie > b.serie) {
                return 1;
              }

              if (a.serie < b.serie) {
                return -1;
              }

              return 0;
            });
          });
        }
        this.cargando = false;
      }
    });
  }

  obtenerTrabajados() {
    this._ncService.obtenerNCtrabajados().subscribe((trab: any) => {
      if (trab.status) {
        this.work = trab.respuesta;
        this.work.sort((a, b) => {
          if (a.nc > b.nc) {
            return 1;
          }

          if (a.nc < b.nc) {
            return -1;
          }

          return 0;
        });
        this.cargando = false;
        this.inNC = '';
        this.inFac = '';
      }
    });
  }

  buscarNC() {
    let nt;

    if (this.inNC === '') {
      swal('SIN NOTA', 'No se ha ingresado una nota de crédito.', 'error');
      return;
    }

    if (this.inFac === '') {
      swal('SIN FACTURA', 'No se ha ingresado una factura.', 'error');
      return;
    }

    this._ncService.buscarNCtrabajado(this.inNC, this.inFac).subscribe((resp: any) => {
      if (resp.status) {
        this.work = [];
        this.work.push(resp.respuesta);
        this.inNC = '';
        this.inFac = '';
      } else {
        swal('SIN DATOS', 'No se ha trabajado.', 'error');
        this.inNC = '';
        this.inFac = '';
      }
    });
  }

  buscarFecha(forma: NgForm) {
    if (forma.value.fechaNC === '') {
      swal('Sin Fecha', 'No ha ingresado una fecha valida.', 'error');
      return;
    }
    const f = forma.value.fechaNC;
    const info = this.nc;
    this.cargando = true;
    this.nc = [];
    this._ncService.buscarNCFecha(f).subscribe((resp: any) => {
      if (resp.status) {
        let nt;
        for (let i = 0; i < resp.respuesta.length; i ++) {
          this._ncService.buscarNCtrabajado(resp.respuesta[i].nc, resp.respuesta[i].factura).subscribe((ncFec: any) => {
            if (ncFec.status) {
              nt = {
                fecha: resp.respuesta[i].fecha,
                tiponc: resp.respuesta[i].tiponc,
                serie: resp.respuesta[i].serie,
                nc: resp.respuesta[i].nc,
                factura: resp.respuesta[i].factura,
                nombre: resp.respuesta[i].nombre,
                subtotal: resp.respuesta[i].subtotal,
                iva: resp.respuesta[i].iva,
                total: resp.respuesta[i].total,
                saldo: resp.respuesta[i].saldo,
                perid: resp.respuesta[i].perid,
                vendedor: resp.respuesta[i].vendedor,
                trabajado: true
              };
            } else {
              nt = {
                fecha: resp.respuesta[i].fecha,
                tiponc: resp.respuesta[i].tiponc,
                serie: resp.respuesta[i].serie,
                nc: resp.respuesta[i].nc,
                factura: resp.respuesta[i].factura,
                nombre: resp.respuesta[i].nombre,
                subtotal: resp.respuesta[i].subtotal,
                iva: resp.respuesta[i].iva,
                total: resp.respuesta[i].total,
                saldo: resp.respuesta[i].saldo,
                perid: resp.respuesta[i].perid,
                vendedor: resp.respuesta[i].vendedor,
                trabajado: false
              };
            }
            this.nc.push(nt);
            this.nc.sort((a, b) => {
              if (a.serie > b.serie) {
                return 1;
              }

              if (a.serie < b.serie) {
                return -1;
              }

              return 0;
            });
          });
        }
        this._ncService.buscarNCTrabFecha(f).subscribe((trab: any) => {
          if (trab.status) {
            this.trabajadas = trab.respuesta.length;
          }
          this.total = resp.respuesta.length;
          this.pendientes = this.total - this.trabajadas;
        });
        this.cargando = false;
      } else {
        this.nc = info;
        swal('Sin Registro', resp.msg, 'error');
      }
    });
  }

}
