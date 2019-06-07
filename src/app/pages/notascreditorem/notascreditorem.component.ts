import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { NcService, UsuarioService } from '../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-notascreditorem',
  templateUrl: './notascreditorem.component.html',
  styles: []
})
export class NotascreditoremComponent implements OnInit {

  @ViewChild('buscarFecNC') buscarFecNC: ElementRef;

  nc: any[] = [];
  work: any[] = [];
  id: any;

  inNC: any = '';
  inFac: any = '';
  fechaNC: any = '';
  fechaNCFinal: any = '';

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
    this.cargando = false;

    // this.obtenerTrabajados();
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
        const elem = <HTMLElement>(document.getElementById("linea" + nc.nc + nc.factura));
        elem.classList.add("bg-primary");
        nc.trabajado = true;
        const ncAnt = this.nc;
        this.nc = [];
        this.nc = ncAnt;
        // this.obtenerTrabajados();
      }
    });

    // if (this.fechaNC !== '') {
    //   this.buscarFecNC.nativeElement.click();
    // }
  }

  quitar(nc: any) {
    this._ncService.quitarNCtrabajado(nc).subscribe((resp: any) => {
      if (resp.status) {
        const elem = <HTMLElement>(document.getElementById("linea" + nc.nc + nc.factura));
        elem.classList.remove("bg-primary");
        nc.trabajado = false;
        // this.obtenerTrabajados();
        // if (this.fechaNC !== '') {
        //   this.buscarFecNC.nativeElement.click();
        // }
      }
    });
  }

  limpiar() {
    this.total = 0;
    this.trabajadas = 0;
    this.pendientes = 0;
    this.fechaNC = '';
    this.fechaNCFinal = '';
    this.nc = [];
    this.work = [];
    this.inNC = '';

    // if (this.work.length === 0) {
    //   this.obtenerTrabajados();
    // }
  }

  obtenerTodosNC() {
    this.total = 0;
    this.trabajadas = 0;
    this.pendientes = 0;
    this.fechaNC = '';
    this._ncService.obtenerNC().subscribe((notas: any) => {
      if (notas.status) {
        let nt;
        this.nc = [];
        for (let i = 0; i < notas.respuesta.length; i ++) {
          this._ncService.buscarNCtrabajado(notas.respuesta[i].nc).subscribe((resp: any) => {
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

    this._ncService.buscarNCtrabajado(this.inNC).subscribe((resp: any) => {
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

  buscarFecha() {
    if (this.fechaNC === '') {
      swal('Sin Fecha Inicial', 'No ha ingresado una fecha valida.', 'error');
      return;
    }

    if (this.fechaNCFinal === '') {
      swal('Sin Fecha Final', 'No ha ingresado una fecha valida.', 'error');
      return;
    }
    this.trabajadas = 0;
    const f = this.fechaNC;
    const f2 = this.fechaNCFinal;
    const info = this.nc;
    let subtotal = 0;
    this.cargando = true;
    this.nc = [];
    this._ncService.buscarNCRFecha(f, f2).subscribe((resp: any) => {
      if (resp.status) {
        for (let i = 0; i < resp.respuesta.length; i ++) {
          this._ncService.buscarNCRtrabajado(resp.respuesta[i].nc, resp.respuesta[i].factura).subscribe((ncFec: any) => {
            if (ncFec.status) {
              resp.respuesta[i].trabajado = true;
            } else if (resp.respuesta[i].serie === 'NA') {
              resp.respuesta[i].trabajado = true;
            } else {
              resp.respuesta[i].trabajado = false;
            }
            subtotal ++;
            // if (resp.respuesta[i].serie !== 'NA') {
            //   subtotal ++;
            // }
          });
        }
        this.nc = resp.respuesta;
        this._ncService.buscarNCTrabFecha(f, f2).subscribe((trab: any) => {
          if (trab.status) {
            for (let i = 0; i < trab.respuesta.length; i++) {
              let esNC = (fac: any) => {
                return fac.nc === trab.respuesta[i].nc;
              }
              if (this.nc.find(esNC)) {
                this.trabajadas++;
              }
            }
          }
          this.total = subtotal;
          this.trabajadas = this.trabajadas >= this.total ? this.total : this.trabajadas;
          this.pendientes = this.trabajadas >= this.total ? 0 : this.total - this.trabajadas;
        });
        this.cargando = false;
      } else {
        this.cargando = false;
        this.nc = info;
        swal('Sin Registro', resp.msg, 'error');
      }
    });
  }

}
