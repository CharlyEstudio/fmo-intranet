import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

// Servicios
import { PhpService, PedFacturadosService } from '../../services/services.index';

@Component({
  selector: 'app-nivel-servicio',
  templateUrl: './nivel-servicio.component.html',
  styles: []
})
export class NivelServicioComponent implements OnInit, OnDestroy {

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

  // Nivel de Servicio Truper
  dataTruCot: number = 0;
  dataTruFac: number = 0;
  porcentTru: number = 0;
  nsT: number = 0;
  nsTImpo: number = 0;
  grafTruper: any;

  // Nivel de Servicio FMO
  dataFMOCot: number = 0;
  dataFMOFac: number = 0;
  porcentFMO: number = 0;
  nsFmo: number = 0;
  nsFmoImpo: number = 0;
  grafFmo: any;

  constructor(
    private _phpService: PhpService,
    private _emitirFacturado: PedFacturadosService
  ) {

    this._emitirFacturado.importe.subscribe((impor: any) => {
      this.importeFacturado = impor;
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

            if (data.length > 0) {
              this.dataGenFac = this.importeFacturado;
              // this.dataBoCot = (this.importeFacturado + data[0].IMPORTE);
              this.dataGenCot = (this.importeFacturado + data[0].IMPORTE);
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

        // Por Familia
        this._phpService.nsFamilia()
          .subscribe((data: any) => {
            if (data.length > 0) {
              this.dataTruCot = 0;
              this.dataTruFac = 0;
              this.porcentTru = 0;
              this.dataFMOCot = 0;
              this.dataFMOFac = 0;
              this.porcentFMO = 0;

              // Desglozamos todo
              // FMO
              for (const familia of data) {
                if (familia.FAMILIA === 'FMO-BO') {
                  this.dataFMOCot += familia.IMPORTE;
                } else {
                  this.dataFMOCot += 0;
                }
              }

              for (const familia of data) {
                if (familia.FAMILIA === 'FMO-FAC') {
                  this.dataFMOCot += familia.IMPORTE;
                  this.dataFMOFac = familia.IMPORTE;
                } else {
                  this.dataFMOFac += 0;
                }
              }

              // TRUPER
              for (const familia of data) {
                if (familia.FAMILIA === 'TRUPER-BO') {
                  this.dataTruCot += familia.IMPORTE;
                } else {
                  this.dataTruCot += 0;
                }
              }

              for (const familia of data) {
                if (familia.FAMILIA === 'TRUPER-FAC') {
                  this.dataTruCot += familia.IMPORTE;
                  this.dataTruFac = familia.IMPORTE;
                } else {
                  this.dataTruFac += 0;
                }
              }

              this.porcentTru = (this.dataTruFac / this.dataTruCot);
              this.porcentFMO = (this.dataFMOFac / this.dataFMOCot);
            } else {
              this.dataTruCot = 0;
              this.dataTruFac = 0;
              this.porcentTru = 0;
              this.dataFMOCot = 0;
              this.dataFMOFac = 0;
              this.porcentFMO = 0;
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

        if (data.length > 0) {
          this.dataGenFac = this.importeFacturado;
          // this.dataBoCot = (this.importeFacturado + data[0].IMPORTE);
          this.dataGenCot = (this.importeFacturado + data[0].IMPORTE);
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

    // Nivel de Servicio por Familia
    this._phpService.nsFamilia()
      .subscribe((data: any) => {

        if (data.length > 0) {
          this.dataTruCot = 0;
          this.dataTruFac = 0;
          this.porcentTru = 0;
          this.dataFMOCot = 0;
          this.dataFMOFac = 0;
          this.porcentFMO = 0;

          // Desglozamos todo
          // FMO
          for (const familia of data) {
            if (familia.FAMILIA === 'FMO-BO') {
              this.dataFMOCot += familia.IMPORTE;
            } else {
              this.dataFMOCot += 0;
            }
          }

          for (const familia of data) {
            if (familia.FAMILIA === 'FMO-FAC') {
              this.dataFMOCot += familia.IMPORTE;
              this.dataFMOFac = familia.IMPORTE;
            } else {
              this.dataFMOCot += 0;
            }
          }

          // TRUPER
          for (const familia of data) {
            if (familia.FAMILIA === 'TRUPER-BO') {
              this.dataTruCot += familia.IMPORTE;
            } else {
              this.dataTruCot += 0;
            }
          }

          for (const familia of data) {
            if (familia.FAMILIA === 'TRUPER-FAC') {
              this.dataTruCot += familia.IMPORTE;
              this.dataTruFac = familia.IMPORTE;
            } else {
              this.dataTruCot += 0;
            }
          }

          this.porcentTru = (this.dataTruFac / this.dataTruCot);
          this.porcentFMO = (this.dataFMOFac / this.dataFMOCot);
        }  else {
          this.dataTruCot = 0;
          this.dataTruFac = 0;
          this.porcentTru = 0;
          this.dataFMOCot = 0;
          this.dataFMOFac = 0;
          this.porcentFMO = 0;
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
