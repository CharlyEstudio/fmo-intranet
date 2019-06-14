import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { CobradorService } from '../../services/services.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-corte-tarjetas',
  templateUrl: './corte-tarjetas.component.html',
  styles: []
})
export class CorteTarjetasComponent implements OnInit {

  @ViewChild('cobrador') cob: ElementRef;
  @ViewChild('fechaIni') fini: ElementRef;
  @ViewChild('fechaFin') ffin: ElementRef;

  cobradores: any[] = [];
  cobrado: any[] = [];

  // Totales
  total: number = 0;
  pagado: number = 0;
  comision: number = 0;
  impocom: number = 0;

  // PDF
  pdf: any = '';

  constructor(
    public sanitizer: DomSanitizer,
    private cobrador: CobradorService
  ) {
    this.cobrador.obtenerCobradores().subscribe((cobradores: any) => {
      if (cobradores.length > 0) {
        this.cobradores = cobradores;
      }
    });
  }

  ngOnInit() {
    this.cob.nativeElement.value = '0';
  }

  obtener() {
    this.pdf = '';
    if (this.fini.nativeElement.value === '') {
      swal('Sin fecha Inicial', 'Debe de colocar una fecha inicial.', 'error');
      this.cob.nativeElement.value = '0';
      return;
    }

    if (this.ffin.nativeElement.value === '') {
      swal('Sin fecha Inicial', 'Debe de colocar una fecha final.', 'error');
      this.cob.nativeElement.value = '0';
      return;
    }

    if (this.cob.nativeElement.value === '0') {
      this.cobrado = [];
      this.cob.nativeElement.value = '0';
      return;
    }

    this.cobrador.obtenerCobros(Number(this.cob.nativeElement.value), this.fini.nativeElement.value, this.ffin.nativeElement.value).subscribe((cobrado: any) => {
      if (cobrado.length > 0) {
        this.total = 0;
        this.pagado = 0;
        this.comision = 0;
        this.impocom = 0;
        this.cobrado = cobrado;
        for (const cob of this.cobrado) {
          this.total += cob.TOTAL;
          this.pagado += cob.PAGADO;
          this.comision += cob.COMISION;
          this.impocom += cob.IMPOCOM;
        }
      } else {
        this.cobrado = [];
      }
    });
  }

  descargar(cobrado: any) {
    this.pdf = '';
    const file = `${this.cob.nativeElement.value}-${Date.now()}.pdf`;
    this.cobrador.hacerPDF(file, cobrado, this.total, this.pagado, this.comision, this.impocom, this.fini.nativeElement.value, this.ffin.nativeElement.value).subscribe((pdf: any) => {
      console.log(pdf);
      if (pdf[0].status) {
        swal('CREADO', 'Archivo PDF creado.', 'success');
        setTimeout(() => {
          this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.ferremayoristas.com.mx/api/' + pdf[0].file);
        }, 1000);
      } else {
      this.pdf = '';
        swal('ERROR', 'Revisar con el administrador.', 'error');
      }
    });
  }

}
