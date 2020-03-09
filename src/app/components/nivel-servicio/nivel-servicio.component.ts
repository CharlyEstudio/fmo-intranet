import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

// Servicios
import { PhpService, PedFacturadosService, DiariosService } from '../../services/services.index';

@Component({
  selector: 'app-nivel-servicio',
  templateUrl: './nivel-servicio.component.html',
  styles: []
})
export class NivelServicioComponent implements OnInit, OnDestroy {

  fecha = Date.now();

  // Obtener el importe facturado
  importeFacturado: number = 0;

  graficos: any = {
    'general': {
      'labels': ['Vendido', 'BackOrder'],
      'data':  [0, 0],
      'type': 'doughnut',
      'leyenda': 'Facturado'
    }
  };

  // Nivel de Servicio General
  nivelServicio: Subscription;
  dataGenCot: number = 0;
  dataBoCot: number = 0;
  dataGenFac: number = 0;
  porcentGen: number = 0;
  ns: number = 0;
  nsImpo: number = 0;
  intNs: any;
  // grafGeneral: any;

  // Nivel de Servicio por Familia vs Tipo
  inicioTru: number = 0;
  mesasTru: number = 0;
  canceladosTru: number = 0;
  inicioFmo: number = 0;
  mesasFmo: number = 0;
  canceladosFmo: number = 0;

  // Nivel de Servicio Truper
  dataTruCot: number = 0;
  dataTruFac: number = 0;
  porcentTru: number = 0;
  porcentTruPlusCan: number = 0;
  nsT: number = 0;
  nsTImpo: number = 0;
  grafTruper: any;

  // Nivel de Servicio FMO
  dataFMOCot: number = 0;
  dataFMOFac: number = 0;
  porcentFMO: number = 0;
  porcentFMOPlusCan: number = 0;
  nsFmo: number = 0;
  nsFmoImpo: number = 0;
  grafFmo: any;

  // Nivel de Servicio Cancelados
  dataFMOCan: number = 0;
  dataTruCan: number = 0;

  constructor(
    private _phpService: PhpService,
    private _emitirFacturado: PedFacturadosService,
    private _diariosService: DiariosService
  ) {

    this._emitirFacturado.importe.subscribe((impor: any) => {
      this.importeFacturado = parseFloat(impor);
    });

    // Subscrión a Nivel de Servicio General
    this.nivelServicio =  this.regresaNSGeneral().subscribe(
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  // Observable de Nivel de Servicio General
  regresaNSGeneral(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intNs = setInterval( () => {
        // General
        this._phpService.nivelServicio()
          .subscribe( ( data: any ) => {

            if (data.resp !== false) {
              this.dataGenFac = this.importeFacturado;
              this.dataGenCot = (this.importeFacturado + parseFloat(data.resp.IMPORTE));
              this.porcentGen = (this.dataGenFac / this.dataGenCot);
            } else {
              this.dataGenCot = 0;
              this.dataGenFac = 0;
              this.porcentGen = 0;
            }

            this.graficos = {
              'general': {
                'labels': ['Vendido', 'BackOrder'],
                'data':  [(this.porcentGen * 100), (100 - (this.porcentGen * 100))],
                'type': 'doughnut',
                'leyenda': 'Facturado'
              }
            };

          });

        // Nivel de Servicio por tipo
        const f = new Date();
        let d;
        let m;
        const y = f.getFullYear();

        if ((f.getMonth() + 1) < 10) {
          m = '0' + (f.getMonth() + 1);
        } else {
          m = f.getMonth() + 1;
        }

        if (f.getDate() < 10) {
          d = '0' + f.getDate();
        } else {
          d = f.getDate();
        }

        const fecha = y + '-' + m + '-' + d;
        this._diariosService.obtenerBackOrderTipoTotales(fecha, fecha).subscribe((resp: any) => {
          if (resp.length > 0) {
            this.inicioFmo = 0;
            this.mesasFmo = 0;
            this.canceladosFmo = 0;
            this.inicioTru = 0;
            this.mesasTru = 0;
            this.canceladosTru = 0;
            for (const sit of resp) {
              if (sit.familia === 'FMO') {
                if (sit.nivel === 'R') {
                  this.inicioFmo += sit.venta;
                }
                if (sit.nivel === 'F') {
                  this.mesasFmo += sit.venta;
                }
                if (sit.nivel === 'C') {
                  this.canceladosFmo += sit.venta;
                }
              }
              if (sit.familia === 'TRUPER') {
                if (sit.nivel === 'R') {
                  this.inicioTru += sit.venta;
                }
                if (sit.nivel === 'F') {
                  this.mesasTru += sit.venta;
                }
                if (sit.nivel === 'C') {
                  this.canceladosTru += sit.venta;
                }
              }
            }
          }
        });

        // Por Familia
        this._phpService.nsFamilia()
          .subscribe((data: any) => {
            if (data.resp !== false) {
              this.dataTruCot = 0;
              this.dataTruFac = 0;
              this.porcentTru = 0;
              this.dataFMOCot = 0;
              this.dataFMOFac = 0;
              this.porcentFMO = 0;
              this.dataFMOCan = 0;
              this.dataTruCan = 0;

              // Desglozamos todo
              // FMO
              for (const familia of data.resp) {
                if (familia.FAMILIA === 'FMO-BO') {
                  this.dataFMOCot += parseFloat(familia.IMPORTE);
                } else {
                  this.dataFMOCot += 0;
                }
              }

              for (const familia of data.resp) {
                if (familia.FAMILIA === 'FMO-FAC') {
                  this.dataFMOCot += parseFloat(familia.IMPORTE);
                  this.dataFMOFac = parseFloat(familia.IMPORTE);
                } else {
                  this.dataFMOFac += 0;
                }
              }

              for (const familia of data.resp) {
                if (familia.FAMILIA === 'FMO-CAN') {
                  this.dataFMOCan += parseFloat(familia.IMPORTE);
                } else {
                  this.dataFMOCan += 0;
                }
              }

              // TRUPER
              for (const familia of data.resp) {
                if (familia.FAMILIA === 'TRUPER-BO') {
                  this.dataTruCot += parseFloat(familia.IMPORTE);
                } else {
                  this.dataTruCot += 0;
                }
              }

              for (const familia of data.resp) {
                if (familia.FAMILIA === 'TRUPER-FAC') {
                  this.dataTruCot += parseFloat(familia.IMPORTE);
                  this.dataTruFac = parseFloat(familia.IMPORTE);
                } else {
                  this.dataTruFac += 0;
                }
              }

              for (const familia of data.resp) {
                if (familia.FAMILIA === 'TRUPER-CAN') {
                  this.dataTruCan += parseFloat(familia.IMPORTE);
                } else {
                  this.dataTruCan += 0;
                }
              }

              this.porcentTru = (this.dataTruFac / this.dataTruCot);
              if (isNaN(this.porcentTru)) {
                this.porcentTru = 0;
              }
              this.porcentTruPlusCan = (this.dataTruFac / (this.dataTruCot + this.dataTruCan));
              if (isNaN(this.porcentTruPlusCan)) {
                this.porcentTruPlusCan = 0;
              }
              this.porcentFMO = (this.dataFMOFac / this.dataFMOCot);
              if (isNaN(this.porcentFMO)) {
                this.porcentFMO = 0;
              }
              this.porcentFMOPlusCan = (this.dataFMOFac / (this.dataFMOCot + this.dataFMOCan));
              if (isNaN(this.porcentFMOPlusCan)) {
                this.porcentFMOPlusCan = 0;
              }
            } else {
              this.dataTruCot = 0;
              this.dataTruFac = 0;
              this.porcentTru = 0;
              this.dataFMOCot = 0;
              this.dataFMOFac = 0;
              this.porcentFMO = 0;
              this.dataFMOCan = 0;
              this.dataTruCan = 0;
            }
          });

      }, 5000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

  ngOnInit() {

    // Nivel de Servicio General
    this._phpService.nivelServicio()
      .subscribe((data: any) => {

        if (data.resp !== false) {
          this.dataGenFac = this.importeFacturado;
          this.dataGenCot = (this.importeFacturado + parseFloat(data.resp.IMPORTE));
          this.porcentGen = (this.dataGenFac / this.dataGenCot);
        } else {
          this.dataGenCot = 0;
          this.dataGenFac = 0;
          this.porcentGen = 0;
        }

        this.graficos = {
          'general': {
            'labels': ['Recibido', '100%'],
            'data':  [(this.porcentGen * 100), (100 - (this.porcentGen * 100))],
            'type': 'doughnut',
            'leyenda': 'Facturado'
          }
        };

        this.mostrar((this.porcentGen * 100));

      });

    // Nivel de Servicio por tipo
    const f = new Date();
    let d;
    let m;
    const y = f.getFullYear();

    if ((f.getMonth() + 1) < 10) {
      m = '0' + (f.getMonth() + 1);
    } else {
      m = f.getMonth() + 1;
    }

    if (f.getDate() < 10) {
      d = '0' + f.getDate();
    } else {
      d = f.getDate();
    }

    const fecha = y + '-' + m + '-' + d;
    this._diariosService.obtenerBackOrderTipoTotales(fecha, fecha).subscribe((resp: any) => {
      if (resp.length > 0) {
        this.inicioFmo = 0;
        this.mesasFmo = 0;
        this.canceladosFmo = 0;
        this.inicioTru = 0;
        this.mesasTru = 0;
        this.canceladosTru = 0;
        for (const sit of resp) {
          if (sit.familia === 'FMO') {
            if (sit.nivel === 'R') {
              this.inicioFmo += sit.venta;
            }
            if (sit.nivel === 'F') {
              this.mesasFmo += sit.venta;
            }
            if (sit.nivel === 'C') {
              this.canceladosFmo += sit.venta;
            }
          }
          if (sit.familia === 'TRUPER') {
            if (sit.nivel === 'R') {
              this.inicioTru += sit.venta;
            }
            if (sit.nivel === 'F') {
              this.mesasTru += sit.venta;
            }
            if (sit.nivel === 'C') {
              this.canceladosTru += sit.venta;
            }
          }
        }
      }
    });

    // Nivel de Servicio por Familia
    this._phpService.nsFamilia()
      .subscribe((data: any) => {
        if (data.resp !== false) {
          this.dataTruCot = 0;
          this.dataTruFac = 0;
          this.porcentTru = 0;
          this.dataFMOCot = 0;
          this.dataFMOFac = 0;
          this.porcentFMO = 0;
          this.dataFMOCan = 0;
          this.dataTruCan = 0;

          // Desglozamos todo
          // FMO
          for (const familia of data.resp) {
            if (familia.FAMILIA === 'FMO-BO') {
              this.dataFMOCot += parseFloat(familia.IMPORTE);
            } else {
              this.dataFMOCot += 0;
            }
          }

          for (const familia of data.resp) {
            if (familia.FAMILIA === 'FMO-FAC') {
              this.dataFMOCot += parseFloat(familia.IMPORTE);
              this.dataFMOFac = parseFloat(familia.IMPORTE);
            } else {
              this.dataFMOCot += 0;
            }
          }

          for (const familia of data.resp) {
            if (familia.FAMILIA === 'FMO-CAN') {
              this.dataFMOCan += parseFloat(familia.IMPORTE);
            } else {
              this.dataFMOCan += 0;
            }
          }

          // TRUPER
          for (const familia of data.resp) {
            if (familia.FAMILIA === 'TRUPER-BO') {
              this.dataTruCot += parseFloat(familia.IMPORTE);
            } else {
              this.dataTruCot += 0;
            }
          }

          for (const familia of data.resp) {
            if (familia.FAMILIA === 'TRUPER-FAC') {
              this.dataTruCot += parseFloat(familia.IMPORTE);
              this.dataTruFac = parseFloat(familia.IMPORTE);
            } else {
              this.dataTruCot += 0;
            }
          }

          for (const familia of data.resp) {
            if (familia.FAMILIA === 'TRUPER-CAN') {
              this.dataTruCan += parseFloat(familia.IMPORTE);
            } else {
              this.dataTruCan += 0;
            }
          }

          this.porcentTru = (this.dataTruFac / this.dataTruCot);
          if (isNaN(this.porcentTru)) {
            this.porcentTru = 0;
          }
          this.porcentTruPlusCan = (this.dataTruFac / (this.dataTruCot + this.dataTruCan));
          if (isNaN(this.porcentTruPlusCan)) {
            this.porcentTruPlusCan = 0;
          }
          this.porcentFMO = (this.dataFMOFac / this.dataFMOCot);
          if (isNaN(this.porcentFMO)) {
            this.porcentFMO = 0;
          }
          this.porcentFMOPlusCan = (this.dataFMOFac / (this.dataFMOCot + this.dataFMOCan));
          if (isNaN(this.porcentFMOPlusCan)) {
            this.porcentFMOPlusCan = 0;
          }
        }  else {
          this.dataTruCot = 0;
          this.dataTruFac = 0;
          this.porcentTru = 0;
          this.dataFMOCot = 0;
          this.dataFMOFac = 0;
          this.porcentFMO = 0;
          this.dataFMOCan = 0;
          this.dataTruCan = 0;
        }

      });

  }

  ngOnDestroy() {

    // Intervalo de Nivel de Servicios
    this.nivelServicio.unsubscribe();
    clearInterval(this.intNs);

  }

  public mostrar( leyenda: any ): void {}

}
