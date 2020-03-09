import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { ChequesdevService } from '../../services/services.index';
import { TablachdevService } from './tablachdev.service';

@Component({
  selector: 'app-tablachdev',
  templateUrl: './tablachdev.component.html',
  styles: []
})
export class TablachdevComponent implements OnInit {

  @Input() chequesDev: any[] = [];
  @Input() temp: any[] = [];
  @Input() rol: any = '';
  @Output() regresa = new EventEmitter();
  @Output() cobrado = new EventEmitter();
  @Output() termina = new EventEmitter();
  @Output() recupera = new EventEmitter();

  documento: any;
  importe: any;
  cheque: any;
  folios: any[] = [];
  cliente: any = '';
  clienteid: number = 0;
  msg: any = '';
  msgCli: any = '';
  msgFol: string = '';
  seleccionarFiltro: any = '0';

  constructor(
    private chequesDevService: ChequesdevService,
    private tablachdevService: TablachdevService
  ) {
    this.tablachdevService.actualizar.subscribe((resp: any) => {
      if (resp) {
        this.seleccionarFiltro = '0';
      }
    });
  }

  ngOnInit() {
    const limpiarNoCh = <HTMLInputElement>(document.getElementById('nocheque'));
    limpiarNoCh.focus();
  }

  abrirModal(ch: any) {
    this.cheque = ch;
    this.importe = ch.importe;
    this.limpiar();
  }

  agregarfactura(fac: any) {
    if (fac === '' || fac === '0') {
      swal('Sin Factura', 'El folio de la factura no puede ser vacío o cero.', 'error');
      return;
    }
    this.msg = '';
    const esFolio = (folio: any) => {
      return folio.numero === fac;
    };

    if (!this.folios.find(esFolio)) {
      this.msg = '';
      this.folios.push({
        numero: fac
      });
      const limpiar = <HTMLInputElement>(document.getElementById('factura'));
      limpiar.value = '';
      limpiar.focus();
    } else {
      this.msg = `El folio ${fac} está repetido, favor de revisar.`;
    }
  }

  buscarFolio(folio: any) {
    this.msgFol = '';

    if (folio === '') {
      this.msgFol = 'Debe de colocar un número de folio';
      return;
    }

    this.chequesDevService.obtenemosFolioFerrum(folio).subscribe((datos: any) => {
      if (datos.resp !== false) {
        this.documento = datos.resp;
        const nombre = datos.resp.nombre;
        this.msgFol = nombre;
      } else {
        this.msgFol = 'No existe este folio';
      }
    });
  }

  guardar(forma: NgForm) {
    const enviar = {
      id: this.cheque.id,
      fechacheque: this.documento.fecha,
      nombre: this.documento.nombre,
      importe: this.documento.total,
      saldo: (this.documento.total - this.documento.totalpagado),
      fechaaplica: this.documento.cambiado,
      folio: Number(forma.value.folio),
      facturas: this.documento.nota,
      banco: forma.value.banco,
      nocheque: forma.value.nocheque,
      clienteid: this.documento.clienteid,
      cobrado: ((this.documento.total - this.documento.totalpagado) > 0) ? 0 : 1,
      terminado: 0
    };
    this.regresa.emit({enviar: enviar, guardar: true});
    this.seleccionarFiltro = '0';
    const cerrar = <HTMLElement>(document.getElementById('cerrarModalBusq'));
    cerrar.click();
  }

  limpiar() {
    this.folios = [];
    this.cliente = '';
    this.clienteid = 0;
    // const limpiarFactura = <HTMLInputElement>(document.getElementById('factura'));
    // limpiarFactura.value = '';
    const limpiarBanco = <HTMLInputElement>(document.getElementById('banco'));
    limpiarBanco.value = '';
    const limpiarNoCh = <HTMLInputElement>(document.getElementById('nocheque'));
    limpiarNoCh.value = '';
    limpiarNoCh.focus();
  }

  cobro(ch: any) {
    this.cobrado.emit({enviar: ch, guardar: true});
  }

  terminar(ch: any) {
    this.termina.emit({enviar: ch, guardar: true});
  }

  recuperar(ch: any) {
    this.recupera.emit({enviar: ch, guardar: true});
  }

  filtrar() {
    this.chequesDev = [];
    switch (this.seleccionarFiltro) {
      case '0' || '1':
        this.chequesDev = this.temp;
      break;
      case '2':
        for (const chd of this.temp) {
          if (chd.cobrado) {
            this.chequesDev.push(chd);
          }
        }
      break;
      case '3':
        for (const chd of this.temp) {
          if (!chd.terminado) {
            this.chequesDev.push(chd);
          }
        }
      break;
      case '4':
        for (const chd of this.temp) {
          if (chd.terminado) {
            this.chequesDev.push(chd);
          }
        }
      break;
      default:
        this.chequesDev = this.temp;
    }
  }

}
