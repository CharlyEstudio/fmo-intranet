import { Component, OnInit } from '@angular/core';

// Servicios
import { DiasvtasService, SeguimientoService, PanelasesoresService } from '../../services/services.index';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styles: []
})
export class SeguimientoComponent implements OnInit {

  reporte: any[] = [];
  asesores1: any[] = [];
  asesores2: any[] = [];

  constructor(
    private diasVtasService: DiasvtasService,
    private seguimientoService: SeguimientoService,
    private panelAsesoresService: PanelasesoresService
  ) { }

  ngOnInit() {
    this.obtenerReporte1();
    this.obtenerReporte2();
  }

  obtenerReporte1() {
    const dias = [];
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
    this.panelAsesoresService.obtenerAsesores(1).subscribe((asesores: any) => {
      if (asesores.resp !== false) {
        for (const ase of asesores.resp) {
          for (const dia of dias) {
            this.seguimientoService.obtenerFechaDias(dia.dia).subscribe((rangos: any) => {
              if (rangos.resp.length > 0) {
                for (const day of rangos.resp) {
                  this.seguimientoService.obtenerSeguimiento(rangos.resp[0].date, ase.perid).subscribe((datos: any) => {
                    const esAsesor = (asesor: any) => {
                      return asesor.idFerrum === ase.perid;
                    };
                    if (!this.asesores1.find(esAsesor)) {
                      this.asesores1.push({
                        idFerrum: ase.perid,
                        ruta: ase.ruta,
                        nombre: ase.nombre,
                        semana: [
                          {
                            id: day.d,
                            dia: dia.nombre,
                            fecha: rangos.resp[0].date,
                            datos: datos.resp.id !== undefined
                                  ? {
                                    calificacion: (parseFloat(datos.resp.trabajado_cli) + parseFloat(datos.resp.trabajado_ven) + parseFloat(datos.resp.trabajado_cob)),
                                    clientesObj: 20,
                                    clientes: datos.resp.clientes,
                                    ventasObj: 40000,
                                    ventas: parseFloat(datos.resp.ventas),
                                    cobranza: parseFloat(datos.resp.cobrado),
                                    cobranzaObj: parseFloat(datos.resp.obj_cob),
                                    sinvisita: parseFloat(datos.resp.sinvisita),
                                    outtime: parseFloat(datos.resp.outtime),
                                    penalizacion: parseFloat(datos.resp.penalizacion)
                                  }
                                  : false
                          }
                        ]
                      });
                    } else {
                      this.asesores1.find(esAsesor).semana.push({
                        id: day.d,
                        dia: dia.nombre,
                        fecha: rangos.resp[0].date,
                        datos: datos.resp.id !== undefined
                              ? {
                                calificacion: (parseFloat(datos.resp.trabajado_cli) + parseFloat(datos.resp.trabajado_ven) + parseFloat(datos.resp.trabajado_cob)),
                                clientesObj: 20,
                                clientes: datos.resp.clientes,
                                ventasObj: 40000,
                                ventas: parseFloat(datos.resp.ventas),
                                cobranza: parseFloat(datos.resp.cobrado),
                                cobranzaObj: parseFloat(datos.resp.obj_cob),
                                sinvisita: parseFloat(datos.resp.sinvisita),
                                outtime: parseFloat(datos.resp.outtime),
                                penalizacion: parseFloat(datos.resp.penalizacion)
                              }
                              : false
                      });
                    }
                    this.asesores1.find(esAsesor).semana.sort((a, b) => {
                      if (a.id > b.id) {
                        return 1;
                      }

                      if (a.id < b.id) {
                        return -1;
                      }

                      return 0;
                    });
                  });
                }
              }
            });
          }
        }
      }
    });
  }

  obtenerReporte2() {
    const dias = [];
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
    this.panelAsesoresService.obtenerAsesores(2).subscribe((asesores: any) => {
      if (asesores.resp !== false) {
        for (const ase of asesores.resp) {
          for (const dia of dias) {
            this.seguimientoService.obtenerFechaDias(dia.dia).subscribe((rangos: any) => {
              if (rangos.resp.length > 0) {
                for (const day of rangos.resp) {
                  this.seguimientoService.obtenerSeguimiento(rangos.resp[0].date, ase.perid).subscribe((datos: any) => {
                    const esAsesor = (asesor: any) => {
                      return asesor.idFerrum === ase.perid;
                    };
                    if (!this.asesores2.find(esAsesor)) {
                      this.asesores2.push({
                        idFerrum: ase.perid,
                        ruta: ase.ruta,
                        nombre: ase.nombre,
                        semana: [
                          {
                            id: day.d,
                            dia: dia.nombre,
                            fecha: rangos.resp[0].date,
                            datos: datos.resp.id !== undefined
                                  ? {
                                    calificacion: (parseFloat(datos.resp.trabajado_cli) + parseFloat(datos.resp.trabajado_ven) + parseFloat(datos.resp.trabajado_cob)),
                                    clientesObj: 20,
                                    clientes: datos.resp.clientes,
                                    ventasObj: 40000,
                                    ventas: parseFloat(datos.resp.ventas),
                                    cobranza: parseFloat(datos.resp.cobrado),
                                    cobranzaObj: parseFloat(datos.resp.obj_cob),
                                    sinvisita: parseFloat(datos.resp.sinvisita),
                                    outtime: parseFloat(datos.resp.outtime),
                                    penalizacion: parseFloat(datos.resp.penalizacion)
                                  }
                                  : false
                          }
                        ]
                      });
                    } else {
                      this.asesores2.find(esAsesor).semana.push({
                        id: day.d,
                        dia: dia.nombre,
                        fecha: rangos.resp[0].date,
                        datos: datos.resp.id !== undefined
                              ? {
                                calificacion: (parseFloat(datos.resp.trabajado_cli) + parseFloat(datos.resp.trabajado_ven) + parseFloat(datos.resp.trabajado_cob)),
                                clientesObj: 20,
                                clientes: datos.resp.clientes,
                                ventasObj: 40000,
                                ventas: parseFloat(datos.resp.ventas),
                                    cobranza: parseFloat(datos.resp.cobrado),
                                    cobranzaObj: parseFloat(datos.resp.obj_cob),
                                    sinvisita: parseFloat(datos.resp.sinvisita),
                                    outtime: parseFloat(datos.resp.outtime),
                                    penalizacion: parseFloat(datos.resp.penalizacion)
                              }
                              : false
                      });
                    }
                    this.asesores2.find(esAsesor).semana.sort((a, b) => {
                      if (a.id > b.id) {
                        return 1;
                      }

                      if (a.id < b.id) {
                        return -1;
                      }

                      return 0;
                    });
                  });
                }
              }
            });
          }
        }
      }
    });
  }

}
