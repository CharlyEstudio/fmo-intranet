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
  total: number = 0;

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
      {dia: '4', activo: this.miercoles.nativeElement.checked, nombre: 'Miercoles'}
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
                  for (const cli of vtas) {
                    const esCliente = (cl: any) => {
                      return cl.cliente === cli.numero;
                    };

                    if (!this.comparar.find(esCliente)) {
                      const day = {
                        cliente: cli.numero,
                        nombre: cli.cliente,
                        saldo: cli.saldo,
                        zona: cli.zona,
                        ultcom: cli.ultcom,
                        fecultcom: cli.fecultcom,
                        impoultcom: cli.impoultcom,
                        diaultcom: cli.diaultcom,
                        limite: cli.limite,
                        asesor: cli.asesor,
                        fecultpag: cli.fecultpag,
                        ultpag: cli.ultpag,
                        diaultpag: cli.diaultpag,
                        d: cli.d,
                        day: [
                          {
                            d: cli.d,
                            nombre: cli.nombre,
                            dato: [
                              {
                                fecha: fecha.date,
                                datos: cli
                              }
                            ]
                          }
                        ]
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
                      for (const d of this.comparar.find(esCliente).day) {
                        if (d.d === cli.d) {
                          d.dato.push({
                            fecha: cli.dia,
                            datos: cli
                          });
                          d.dato.sort((a, b) => {
                            if (a.fecha > b.fecha) {
                              return 1;
                            }

                            if (a.fecha < b.fecha) {
                              return -1;
                            }

                            return 0;
                          });
                        } else {
                          this.comparar.find(esCliente).day.push({
                            d: cli.d,
                            nombre: cli.nombre,
                            dato: [
                              {
                                fecha: fecha.date,
                                datos: cli
                              }
                            ]
                          });
                        }
                      }
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
