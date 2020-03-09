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
    this.panelAsesores.obtenerImporteVtaDiaria().subscribe((impoMin: any) => {
      console.log(impoMin);
      if (impoMin.resp !== false) {
        this.vtaMin = impoMin.resp.data;
      }
    });
    this.obtenerAsesores1(this.herramientas.fechaActual(), false);
    this.obtenerAsesores2(this.herramientas.fechaActual(), false);
  }

  obtenerAsesores1(fecha: any, rango: boolean) {
    this.panelAsesores.obtenerAsesores(1).subscribe((aseZ1: any) => {
      if (aseZ1.resp !== false) {
        this.cantidadZona1 = 0;
        this.cantidadZona1 = aseZ1.resp.length;
        this.trabajandoZona1 = 0;
        this.zona1 = [];
        const zonaPush = [];
        for (const ase of aseZ1.resp) {
          this.panelAsesores.obtenerCalificacion(ase.perid, fecha, this.vtaMin, this.cliMin, rango).subscribe((calificacion: any) => {
            if (calificacion.resp !== false) {
              calificacion.resp.TRABAJADO_CLI = parseFloat(calificacion.resp.TRABAJADO_CLI);
              calificacion.resp.TRABAJADO_VEN = parseFloat(calificacion.resp.TRABAJADO_VEN);
              calificacion.resp.TRABAJADO_COB = parseFloat(calificacion.resp.TRABAJADO_COB);
              calificacion.resp.SINVISITA = parseFloat(calificacion.resp.SINVISITA);
              calificacion.resp.TIMEOUT = parseFloat(calificacion.resp.TIMEOUT);
              this.panelAsesores.pedidosOutTime(ase.perid, fecha).subscribe((pedout: any) => {
                this.panelAsesores.visitasFalsas(ase.perid, fecha).subscribe((visfal: any) => {
                  calificacion.resp.SINVISITA = visfal.status ? (visfal.visitados.length * 0.1) : 0;
                  calificacion.resp.TIMEOUT = pedout.resp !== false ? (pedout.resp.cantidad * 0.1) : 0;
                  zonaPush.push(calificacion.resp);
                  zonaPush.sort((a, b) => {
                    const datoA = (parseFloat(a.TRABAJADO_CLI) + parseFloat(a.TRABAJADO_VEN) + parseFloat(a.TRABAJADO_COB));
                    const datoB = (parseFloat(b.TRABAJADO_CLI) + parseFloat(b.TRABAJADO_VEN) + parseFloat(b.TRABAJADO_COB));
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
      if (aseZ2.resp !== false) {
        this.cantidadZona2 = 0;
        this.cantidadZona2 = aseZ2.resp.length;
        this.trabajandoZona2 = 0;
        this.zona2 = [];
        const zonaPush = [];
        for (const ase of aseZ2.resp) {
          this.panelAsesores.obtenerCalificacion(ase.perid, fecha, this.vtaMin, this.cliMin, rango).subscribe((calificacion: any) => {
            if (calificacion.resp !== false) {
              calificacion.resp.TRABAJADO_CLI = parseFloat(calificacion.resp.TRABAJADO_CLI);
              calificacion.resp.TRABAJADO_VEN = parseFloat(calificacion.resp.TRABAJADO_VEN);
              calificacion.resp.TRABAJADO_COB = parseFloat(calificacion.resp.TRABAJADO_COB);
              calificacion.resp.SINVISITA = parseFloat(calificacion.resp.SINVISITA);
              calificacion.resp.TIMEOUT = parseFloat(calificacion.resp.TIMEOUT);
              this.panelAsesores.pedidosOutTime(ase.perid, fecha).subscribe((pedout: any) => {
                this.panelAsesores.visitasFalsas(ase.perid, fecha).subscribe((visfal: any) => {
                  calificacion.resp.SINVISITA = visfal.status ? (visfal.visitados.length * 0.1) : 0;
                  calificacion.resp.TIMEOUT = pedout.resp !== false ? (pedout.resp.cantidad * 0.1) : 0;
                  zonaPush.push(calificacion.resp);
                  zonaPush.sort((a, b) => {
                    const datoA = (parseFloat(a.TRABAJADO_CLI) + parseFloat(a.TRABAJADO_VEN) + parseFloat(a.TRABAJADO_COB));
                    const datoB = (parseFloat(b.TRABAJADO_CLI) + parseFloat(b.TRABAJADO_VEN) + parseFloat(b.TRABAJADO_COB));
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
