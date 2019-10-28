import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { DiasvtasService, DiariosService } from '../../services/services.index';
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
  sinmovimientos: any[] = [];
  asesor: any = '0';
  vendedor: any = '';
  tipo: any = '0';
  total: number = 0;

  varios: boolean = false;
  porDia: boolean = false;
  sinMovimiento: boolean = false;

  constructor(
    private diasVtasService: DiasvtasService,
    private _diariosService: DiariosService
  ) { }

  ngOnInit() {
    this._diariosService.asesores()
      .subscribe( ( resp: any ) => {
        this.asesores = resp;
      });
  }

  selecionar() {
    if (this.tipo === '1') {
      this.sinMovimiento = false;
      this.porDia = true;
    } else if (this.tipo === '2') {
      this.sinMovimiento = true;
      this.porDia = false;
    } else {
      this.sinMovimiento = false;
      this.porDia = false;
    }
  }

  solicitar() {
    if (this.asesor.PERID === undefined || this.asesor.PERID === '0') {
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
              this.diasVtasService.obtenerVentasDia(fecha.date, this.asesor.PERID).subscribe((vtas: any) => {
                if (vtas[0].d === Number(dia.dia)) {
                  for (const cli of vtas) {
                    const esCliente = (cl: any) => {
                      return cl.cliente === cli.numero;
                    };

                    if (!this.comparar.find(esCliente)) {
                      let pedidos: number;
                      if (cli.pedidos === 0)  {
                        pedidos = 1;
                      } else {
                        pedidos = 0;
                      }
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
                        pedidos: pedidos,
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
                        if (cli.pedidos === 0) {
                          this.comparar.find(esCliente).pedidos++;
                        }
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
        console.log(this.comparar);
      } else {
        contar++;
        if (contar === 5) {
          swal('Sin Día', 'No ah seleccionado un día de visita.', 'error');
        }
      }
    }
  }

  /*solicitarSinMov() {
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
      {dia: 2, nombre: 'Lunes'}
    );
    dias.push(
      {dia: 3, nombre: 'Martes'}
    );
    dias.push(
      {dia: 4, nombre: 'Miercoles'}
    );
    dias.push(
      {dia: 5, nombre: 'Jueves'}
    );
    dias.push(
      {dia: 6, nombre: 'Viernes'}
    );
    const reporte = [];
    for (const dia of dias) {
      this.diasVtasService.obtenerFechaDias(this.fechaIn.nativeElement.value, this.fechaOut.nativeElement.value, dia.dia).subscribe((rangos: any) => {
        for (const ran of rangos) {
          if (ran.d === dia.dia) {
            this.diasVtasService.obtenerClientesSinMov(ran.date, this.asesor.idFerrum).subscribe((sinmov: any) => {
              if (this.vendedor === '') {
                this.vendedor = sinmov[0].asesor;
              }
              const esDia = (d: any) => {
                return d.d === ran.d
              };

              if (!reporte.find(esDia)) {
                reporte.push(
                  {
                    d: ran.d,
                    dia: dia.nombre,
                    ultcom: dia.ultcom,
                    ultpag: dia.ultpag,
                    datos: [{
                      fecha: ran.date,
                      clientes: sinmov
                    }]
                  }
                );
                reporte.sort((a, b) => {
                  if (a.d > b.d) {
                    return 1;
                  }

                  if (a.d < b.d) {
                    return -1;
                  }

                  return 0;
                });
              } else {
                for (const ver of reporte) {
                  if (ran.d === ver.d) {
                    ver.datos.push({
                      fecha: ran.date,
                      clientes: sinmov
                    });
                    ver.datos.sort((a, b) => {
                      if (a.fecha > b.fecha) {
                        return 1;
                      }

                      if (a.fecha < b.fecha) {
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
    }
    this.sinmovimientos = reporte;
  }*/

  solicitarSinMov() {
    if (this.asesor.PERID === undefined || this.asesor.PERID === '0') {
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
      {dia: 2, nombre: 'Lunes'}
    );
    dias.push(
      {dia: 3, nombre: 'Martes'}
    );
    dias.push(
      {dia: 4, nombre: 'Miercoles'}
    );
    dias.push(
      {dia: 5, nombre: 'Jueves'}
    );
    dias.push(
      {dia: 6, nombre: 'Viernes'}
    );
    const reporte = [];
    this.diasVtasService.obtenerClientesSinMov(this.fechaIn.nativeElement.value, this.fechaOut.nativeElement.value, this.asesor.PERID).subscribe((sinmov: any) => {
      this.vendedor = sinmov[0].asesor;
      for (const dia of dias) {
        reporte.push(
          {
            d: dia.dia,
            dia: dia.nombre,
            clientes: []
          }
        );
      }
      for (const cli of sinmov) {
        const esDia = (data: any) => {
          return data.d === cli.d;
        };
        if (reporte.find(esDia)) {
          reporte.find(esDia).clientes.push(cli);
        }
      }
      this.sinmovimientos = reporte;
    });
  }

}
