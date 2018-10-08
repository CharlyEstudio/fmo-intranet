import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-nivel-servicio',
  templateUrl: './nivel-servicio.component.html',
  styles: []
})
export class NivelServicioComponent implements OnInit, OnDestroy {

  graficos: any = {
    'general': {
      'labels': ['General'],
      'data':  [0],
      'type': 'doughnut',
      'leyenda': 'General'
    }
  };

  // Nivel de Servicio General
  nivelServicio: Subscription;
  dataGenCot: number = 0;
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
    private _phpService: PhpService
  ) {

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
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {
              this.dataGenCot = data[0].cotizacion;
              this.dataGenFac = data[0].facturacion;
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
                'leyenda': 'General'
              }
            };

          });

        // Truper
        this._phpService.nsTruper()
          .subscribe((data) => {

            if ( data[0].importe != 0 ) {
              this.dataTruCot = data[0].cotizacion;
              this.dataTruFac = data[0].facturacion;

              this.porcentTru = (this.dataTruFac / this.dataTruCot);
            } else {
              this.dataTruCot = 0;
              this.dataTruFac = 0;

              this.porcentTru = 0;
            }

          });

        // Ferremayoristas
        this._phpService.nsFMO()
          .subscribe((data) => {

            if ( data[0].importe != 0 ) {
              this.dataFMOCot = data[0].cotizacion;
              this.dataFMOFac = data[0].facturacion;

              this.porcentFMO = (this.dataFMOFac / this.dataFMOCot);
            } else {
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
      .subscribe((data) => {

        if ( data[0].importe != 0 ) {
          this.dataGenCot = data[0].cotizacion;
          this.dataGenFac = data[0].facturacion;

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
            'leyenda': 'otro'
          }
        };

      });

    //Nivel de Servicio Truper
    this._phpService.nsTruper()
      .subscribe((data) => {

        if ( data[0].importe != 0 ) {
          this.dataTruCot = data[0].cotizacion;
          this.dataTruFac = data[0].facturacion;

          this.porcentTru = (this.dataTruFac / this.dataTruCot);
        } else {
          this.dataTruCot = 0;
          this.dataTruFac = 0;

          this.porcentTru = 0;
        }

      });

    // NIvel de Servicio FMO
    this._phpService.nsFMO()
      .subscribe((data) => {

        if ( data[0].importe != 0 ) {
          this.dataFMOCot = data[0].cotizacion;
          this.dataFMOFac = data[0].facturacion;

          this.porcentFMO = (this.dataFMOFac / this.dataFMOCot);
        } else {
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

}
