import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { DiasvtasService } from '../../services/services.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-diasvtas',
  templateUrl: './diasvtas.component.html',
  styles: []
})
export class DiasvtasComponent implements OnInit {

  @ViewChild('fechaIn') fechaIn: ElementRef;
  @ViewChild('fechaOut') fechaOut: ElementRef;
  // Días para seleccionar
  @ViewChild('lunes') lunes: ElementRef;
  @ViewChild('martes') martes: ElementRef;
  @ViewChild('miercoles') miercoles: ElementRef;
  @ViewChild('jueves') jueves: ElementRef;
  @ViewChild('viernes') viernes: ElementRef;

  asesores: any[] = [];
  comparar: any[] = [];
  asesor: any = '0';

  varios: boolean = false;

  constructor(
    private diasVtasService: DiasvtasService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this._usuarioService.buscarUsuarios('ASE_ROLE').subscribe((asesores: any) => {
      if (asesores.length > 0) {
        this.asesores = asesores;
      }
    });
  }

  solicitar() {
    if (this.asesor.idFerrum === undefined || this.asesor.idFerrum === '0') {
      swal('Sin Asesor', 'Se requiere seleccionar un asesor.', 'error');
      return;
    }

    if (this.fechaIn.nativeElement.value === '') {
      swal('Sin Fecha Inicial', 'Se requiere seleccionar fecha inicial.', 'error');
      return;
    }

    if (this.fechaOut.nativeElement.value === '') {
      swal('Sin Fecha Final', 'Se requiere seleccionar fecha final.', 'error');
      return;
    }

    const dias = [];
    this.comparar = [];
    dias.push(
      {dia: '2', activo: this.lunes.nativeElement.checked, nombre: 'Lunes'}
    );
    dias.push(
      {dia: '3', activo: this.martes.nativeElement.checked, nombre: 'Martes'}
    );
    dias.push(
      {dia: '4', activo: this.miercoles.nativeElement.checked, nombre: 'Miércoles'}
    );
    dias.push(
      {dia: '5', activo: this.jueves.nativeElement.checked, nombre: 'Jueves'}
    );
    dias.push(
      {dia: '6', activo: this.viernes.nativeElement.checked, nombre: 'Viernes'}
    );
    let contar = 0;
    for (let dia of dias) {
      if (dia.activo) {
        this.diasVtasService.obtenerFechaDias(this.fechaIn.nativeElement.value, this.fechaOut.nativeElement.value, dia.dia).subscribe((rangos: any) => {
          if (rangos.length > 0) {
            for (const fecha of rangos) {
              this.diasVtasService.obtenerVentasDia(fecha.date, this.asesor.idFerrum).subscribe((vtas: any) => {
                if (vtas[0].d === Number(dia.dia)) {
                  const esFecha = (dato: any) => {
                    return dato.d === vtas[0].d;
                  };

                  if (!this.comparar.find(esFecha)) {
                    const day = {
                      d: Number(dia.dia),
                      dia: dia.nombre,
                      dato: vtas
                    };
                    this.comparar.push(day);
                    this.comparar.sort((a, b) => {
                      if (a.d > b.d) {
                        return 1;
                      }

                      if (a.d < b.d) {
                        return -1;
                      }

                      return 0;
                    });
                  } else {
                    this.comparar.find(esFecha).dato.push(vtas[0]);
                    for (const arr of this.comparar.find(esFecha).dato) {
                      this.comparar.find(esFecha).dato.sort((a, b) => {
                        if (a.dia > b.dia) {
                          return 1;
                        }

                        if (a.dia < b.dia) {
                          return -1;
                        }

                        return 0;
                      });
                    }
                  }
                }
              });
            }
          }
        });
      } else {
        contar++;
        if (contar === 5) {
          swal('Sin Día', 'No ah seleccionado un día de visita.', 'error');
        }
      }
    }
  }

}
