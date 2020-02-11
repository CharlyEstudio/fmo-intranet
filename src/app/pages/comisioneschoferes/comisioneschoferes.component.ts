import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { ChoferService, ExcelService } from '../../services/services.index';

@Component({
  selector: 'app-comisioneschoferes',
  templateUrl: './comisioneschoferes.component.html',
  styles: []
})
export class ComisioneschoferesComponent implements OnInit {

  data: any[] = [];
  fecIn: any;
  fecOut: any;

  constructor(
    private choferService: ChoferService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
  }

  obtener(forma: NgForm) {
    if (forma.value.fechaIn === '') {
      swal('Sin Fecha', 'Favor de ingresar una fecha inicial', 'warning');
      return;
    }

    if (forma.value.fechaOut === '') {
      swal('Sin Fecha', 'Favor de ingresar una fecha final', 'warning');
      return;
    }

    this.fecIn = forma.value.fechaIn;
    this.fecOut = forma.value.fechaOut;

    this.choferService.obtenerGuias(forma.value.fechaIn, forma.value.fechaOut).subscribe((guias: any) => {
      if (guias.status) {
        this.data = [];
        for (const guia of guias.encontrados) {
          if (guia.chofer !== null) {
            const esChofer = (g: any) => {
              return g._id === guia.chofer._id;
            };
            if (!this.data.find(esChofer)) {
              const info = {
                _id: guia.chofer !== null ? guia.chofer._id : 0,
              chofer: guia.chofer !== null ? guia.chofer.nombre : 'Sin Chófer',
                pedidos: guia.cantidad,
                clientes: guia.clientes,
                comision: (guia.clientes * 2.5)
              };
              this.data.push(info);
            } else {
              this.data.find(esChofer).clientes += guia.clientes;
              this.data.find(esChofer).pedidos += guia.cantidad;
              this.data.find(esChofer).comision += (guia.clientes * 2.5);
            }
          }
        }
      }
    });
  }

  descargar() {
    if (this.data.length !== 0) {
      this.excelService.exportAsExcelFile(this.data, `comision-${this.fecIn}-${this.fecOut}`);
    } else {
      swal('Sin Datos', 'No se tiene datos a exportar', 'warning');
    }
  }

}
