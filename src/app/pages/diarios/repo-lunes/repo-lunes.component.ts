import { Component, OnInit } from '@angular/core';

import { DiariosService, ExcelService, UsuarioService } from '../../../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../../../config/config';
import { DomSanitizer } from '@angular/platform-browser';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-repo-lunes',
  templateUrl: './repo-lunes.component.html',
  styles: []
})
export class RepoLunesComponent implements OnInit {

  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = true;
  creandoPDF: boolean = false;
  aviso: string = '';

  diasLunes: any;
  saldo: number = 0;
  cantidad: number = 0;
  clientes: number = 0;
  actual: any[] = [];
  icobrables: any[] = [];
  nombre: string;

  constructor(
    private _diariosService: DiariosService,
    private usuarioS: UsuarioService,
    public sanitizer: DomSanitizer,
    private _excel: ExcelService
  ) { }

  ngOnInit() {
    this.solicitar();
  }

  solicitar() {

    this.esperar = true;

    this.saldo = 0;

    let h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    let fecha = anio + '-' + mes + '-' + dia;

    this._diariosService.diasLunes(fecha)
      .subscribe( ( resp: any ) => {
        if (resp !== '') {
          this.diasLunes = resp;

          for (let i = 0; i < this.diasLunes.length; i++) {
            this.saldo += parseFloat(this.diasLunes[i].saldo);
            this.cantidad += parseFloat(this.diasLunes[i].cantidad);
            this.clientes += parseFloat(this.diasLunes[i].clientes);
          }

          this.esperar = false;
          this.respuestaGeneral = true;
          this.ventas = false;
        } else {
          this.ventas = true;
          this.esperar = false;
          this.respuestaGeneral = false;
        }
      });

    this._diariosService.diasLunesDocInc()
      .subscribe( ( inco: any ) => {
        this.icobrables = inco;
      });

  }

  obtenerPedidos(data: any) {
    this.actual = [];
    this.nombre = '';

    if (Number(data.id) !== 80000 && Number(data.id) !== 843 && Number(data.id) !== 80001) {
      let h = new Date();

      let dia;

      if (h.getDate() < 10) {
        dia = '0' + h.getDate();
      } else {
        dia = h.getDate();
      }

      let mes: any;

      if (h.getMonth() < 10) {
        mes = '0' + (h.getMonth() + 1);
      } else {
        mes = (h.getMonth() + 1);
      }

      let anio = h.getFullYear();

      let fecha = anio + '-' + mes + '-' + dia;
      this._diariosService.pedidosDiaLunes(fecha, data.id)
        .subscribe( ( resp: any ) => {
          this.nombre = data.asesor;
          this.actual = resp;
        });
    } else if (Number(data.id) === 80000) {
      // Obtener Cheques devueltos
      this._diariosService.pedidosDiaLunesCH()
        .subscribe( ( resp: any ) => {
          this.nombre = data.asesor;
          this.actual = resp;
        });
    } else if (Number(data.id) === 80001) {
      // Obtener Victor Especiales
      this._diariosService.pedidosDiaLunesEspecials()
        .subscribe( ( resp: any ) => {
          this.nombre = data.asesor;
          this.actual = resp;
        });
    } else {
      // documentos incobrables
      this._diariosService.pedidosDiaLunesDocInc()
        .subscribe( ( resp: any ) => {
          this.nombre = data.asesor;
          this.actual = resp;
        });
    }
  }

  descargar( data: any ) {
    let filename = 'reporte_' + data[0].asesor;
    this._excel.exportAsExcelFile(data, filename);
  }

  descargarPDF(data: any, seccion: string = 'Nombredeseccion') {
    this.creandoPDF = true;
    this.aviso = 'Creando PDF';
    const f = seccion.split(' ');
    let file: any = '';
    for (const d of f) {
      file += d;
    }
    this._diariosService.enviarPDF(data, file).subscribe((msg: any) => {
      if (msg.status) {
        this.aviso = 'Cargando PDF';
        const url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/resumen/dias/lunes/pdf/${msg.file}?token=${this.usuarioS.token}`;
        this.aviso = 'PDF Creado';
        window.open(url);
        this.creandoPDF = false;
        this.aviso = '';
      }
    });
  }

}
