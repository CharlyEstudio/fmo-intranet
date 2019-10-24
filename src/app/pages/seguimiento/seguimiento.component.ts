import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { PanelasesoresService } from '../../services/services.index';
import { HerramientasService } from '../../services/herramientas/herramientas.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styles: []
})
export class SeguimientoComponent implements OnInit {

  zona1: any[] = [];
  cantidadZona1: number = 0;
  trabajandoZona1: number = 0;
  zona2: any[] = [];
  cantidadZona2: number = 0;
  trabajandoZona2: number = 0;

  vtaMin: number = 0;
  cliMin: number = 20;

  asesor: any = '';

  constructor(
    private panelAsesores: PanelasesoresService,
    private herramientas: HerramientasService
  ) { }

  ngOnInit() {
    this.actualizar();
  }

  actualizar() {
    // Obtenemos la venta mínima diaria
    this.panelAsesores.obtenerImporteVtaMinDiaria().subscribe((impoMin: any) => {
      if (impoMin.length > 0) {
        this.vtaMin = impoMin[0].data;
      }
    });
    this.obtenerAsesores1(this.herramientas.fechaActual(), this.herramientas.fechaActual(), false);
    this.obtenerAsesores2(this.herramientas.fechaActual(), this.herramientas.fechaActual(), false);
  }

  solicitar(forma: NgForm) {
    if (forma.value.fechaIn === '') {
      swal('Sin Fecha', 'No selecciono fecha inicial', 'error');
      return;
    }

    if (forma.value.fechaOut === '') {
      swal('Sin Fecha', 'No selecciono fecha final', 'error');
      return;
    }

    // Fecha de inicio
    const d1 = Date.parse(forma.value.fechaIn);
    const diIn = new Date(d1);
    diIn.setTime(diIn.getTime() + 1 * 24 * 60 * 60 * 1000);
    const diaIn = diIn.getDate();

    // Fecha final
    const d2 = Date.parse(forma.value.fechaOut);
    const diOut = new Date(d2);
    diOut.setTime(diOut.getTime() + 1 * 24 * 60 * 60 * 1000);
    const diaOut = diOut.getDate();

    // Resta
    const dias = diaOut - diaIn + 1;

    const vtaMinDias = dias * this.vtaMin;
    const cteMin = dias * this.cliMin;
    this.cliMin = cteMin;
    this.vtaMin = vtaMinDias;
    this.obtenerAsesores1(forma.value.fechaIn, forma.value.fechaOut, true);
    this.obtenerAsesores2(forma.value.fechaIn, forma.value.fechaOut, true);
  }

  obtenerAsesores1(fechaIn: any, fechaOut: any, rango: boolean) {
    this.panelAsesores.obtenerAsesores(1).subscribe((aseZ1: any) => {
      if (aseZ1.length > 0) {
        this.cantidadZona1 = 0;
        this.cantidadZona1 = aseZ1.length;
        this.trabajandoZona1 = 0;
        this.zona1 = [];
        const zonaPush = [];
        for (const ase of aseZ1) {
          this.panelAsesores.obtenerCalificacion(ase.perid, fechaIn, fechaOut, this.vtaMin, this.cliMin, rango).subscribe((calificacion: any) => {
            zonaPush.push(calificacion[0]);
            zonaPush.sort((a, b) => {
              const datoA = (a.TRABAJADO_CLI + a.TRABAJADO_VEN + a.TRABAJADO_COB);
              const datoB = (b.TRABAJADO_CLI + b.TRABAJADO_VEN + b.TRABAJADO_COB);
              if (datoA > datoB) {
                return 1;
              }

              if (datoA < datoB) {
                return -1;
              }

              return 0;
            });
            this.trabajandoZona1++;
          });
        }
        this.zona1 = zonaPush;
      }
    });
  }

  obtenerAsesores2(fechaIn: any = this.herramientas.fechaActual(), fechaOut: any = this.herramientas.fechaActual(), rango: boolean = false) {
    this.panelAsesores.obtenerAsesores(2).subscribe((aseZ2: any) => {
      if (aseZ2.length > 0) {
        this.cantidadZona2 = 0;
        this.cantidadZona2 = aseZ2.length;
        this.trabajandoZona2 = 0;
        this.zona2 = [];
        const zonaPush = [];
        for (const ase of aseZ2) {
          this.panelAsesores.obtenerCalificacion(ase.perid, fechaIn, fechaOut, this.vtaMin, this.cliMin, rango).subscribe((calificacion: any) => {
            zonaPush.push(calificacion[0]);
            zonaPush.sort((a, b) => {
              const datoA = (a.TRABAJADO_CLI + a.TRABAJADO_VEN + a.TRABAJADO_COB);
              const datoB = (b.TRABAJADO_CLI + b.TRABAJADO_VEN + b.TRABAJADO_COB);
              if (datoA > datoB) {
                return 1;
              }

              if (datoA < datoB) {
                return -1;
              }

              return 0;
            });
            this.trabajandoZona2++;
          });
        }
        this.zona2 = zonaPush;
      }
    });
  }

  verAsesor(seccion: any) {
    this.asesor = seccion;
  }

}
