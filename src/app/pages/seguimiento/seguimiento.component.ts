import { Component, OnInit } from '@angular/core';

// Servicios
import { PanelasesoresService } from '../../services/services.index';

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

  asesor: any = '';

  constructor(
    private panelAsesores: PanelasesoresService
  ) { }

  ngOnInit() {
    this.obtenerAsesores1(1);
    this.obtenerAsesores2(2);
  }

  obtenerAsesores1(zona: any) {
    this.panelAsesores.obtenerAsesores(zona).subscribe((aseZ1: any) => {
      if (aseZ1.length > 0) {
        this.cantidadZona1 = 0;
        this.cantidadZona1 = aseZ1.length;
        this.trabajandoZona1 = 0;
        this.zona1 = [];
        for (const ase of aseZ1) {
          this.panelAsesores.obtenerCalificacion(ase.perid).subscribe((calificacion: any) => {
            this.zona1.push(calificacion[0]);
            this.trabajandoZona1++;
          });
        }
      }
    });
  }

  obtenerAsesores2(zona: any) {
    this.panelAsesores.obtenerAsesores(zona).subscribe((aseZ2: any) => {
      if (aseZ2.length > 0) {
        this.cantidadZona2 = 0;
        this.cantidadZona2 = aseZ2.length;
        this.trabajandoZona2 = 0;
        this.zona2 = [];
        for (const ase of aseZ2) {
          this.panelAsesores.obtenerCalificacion(ase.perid).subscribe((calificacion: any) => {
            this.zona2.push(calificacion[0]);
            this.trabajandoZona2++;
          });
        }
      }
    });
  }

  verAsesor(seccion: any) {
    this.asesor = seccion;
  }

}
