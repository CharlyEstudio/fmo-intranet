import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { PanelasesoresService } from '../../services/services.index';
import { HerramientasService } from '../../services/herramientas/herramientas.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styles: []
})
export class CalificacionComponent implements OnInit {

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
    this.obtenerAsesores1(this.herramientas.fechaActual(), false);
    this.obtenerAsesores2(this.herramientas.fechaActual(), false);
  }

  obtenerAsesores1(fecha: any, rango: boolean) {
    this.panelAsesores.obtenerAsesores(1).subscribe((aseZ1: any) => {
      if (aseZ1.length > 0) {
        this.cantidadZona1 = 0;
        this.cantidadZona1 = aseZ1.length;
        this.trabajandoZona1 = 0;
        this.zona1 = [];
        const zonaPush = [];
        for (const ase of aseZ1) {
          this.panelAsesores.obtenerCalificacion(ase.perid, fecha, this.vtaMin, this.cliMin, rango).subscribe((calificacion: any) => {
            if (calificacion.length > 0) {
              this.panelAsesores.pedidosOutTime(ase.perid, fecha).subscribe((pedout: any) => {
                this.panelAsesores.visitasFalsas(ase.perid, fecha).subscribe((visfal: any) => {
                  calificacion[0].SINVISITA = visfal.status ? (visfal.visitados.length * 0.1) : 0;
                  calificacion[0].TIMEOUT = pedout.length > 0 ? (pedout[0].cantidad * 0.1) : 0;
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
              });
            }
          });
        }
        this.zona1 = zonaPush;
      }
    });
  }

  obtenerAsesores2(fecha: any, rango: boolean = false) {
    this.panelAsesores.obtenerAsesores(2).subscribe((aseZ2: any) => {
      if (aseZ2.length > 0) {
        this.cantidadZona2 = 0;
        this.cantidadZona2 = aseZ2.length;
        this.trabajandoZona2 = 0;
        this.zona2 = [];
        const zonaPush = [];
        for (const ase of aseZ2) {
          this.panelAsesores.obtenerCalificacion(ase.perid, fecha, this.vtaMin, this.cliMin, rango).subscribe((calificacion: any) => {
            if (calificacion.length > 0) {
              this.panelAsesores.pedidosOutTime(ase.perid, fecha).subscribe((pedout: any) => {
                this.panelAsesores.visitasFalsas(ase.perid, fecha).subscribe((visfal: any) => {
                  calificacion[0].SINVISITA = visfal.status ? (visfal.visitados.length * 0.1) : 0;
                  calificacion[0].TIMEOUT = pedout.length > 0 ? (pedout[0].cantidad * 0.1) : 0;
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
              });
            }
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
