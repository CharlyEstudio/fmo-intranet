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
  nivelTruper: Subscription;
  dataTruCot: number = 0;
  dataTruFac: number = 0;
  porcentTru: number = 0;
  nsT: number = 0;
  nsTImpo: number = 0;
  intNsT: any;
  grafTruper: any;

  // Nivel de Servicio FMO
  nivelFMO: Subscription;
  dataFMOCot: number = 0;
  dataFMOFac: number = 0;
  porcentFMO: number = 0;
  nsFmo: number = 0;
  nsFmoImpo: number = 0;
  intNsFmo: any;
  grafFmo: any;

  constructor(
    private _phpService: PhpService
  ) {

    // Subscrión a Nivel de Servicio General
    this.nivelServicio =  this.regresaNSGeneral().subscribe(
      numero => {
        this.dataGenCot = numero.cotizacion;
        this.dataGenFac = numero.facturacion;

        this.porcentGen = (this.dataGenFac / this.dataGenCot);

        this.graficos = {
          'general': {
            'labels': ['Recibido', '100%'],
            'data':  [(this.porcentGen * 100), (100 - (this.porcentGen * 100))],
            'type': 'doughnut',
            'leyenda': 'General'
          }
        };

      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

    // Subscrión a Nivel de Servicio Truper
    this.nivelTruper =  this.regresaNSTruper().subscribe(
      numero => {
        this.dataTruCot = numero.cotizacion;
        this.dataTruFac = numero.facturacion;

        this.porcentTru = (this.dataTruFac / this.dataTruCot);
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

    // Subscrión a Nivel de Servicio Ferremayoristas
    this.nivelFMO =  this.regresaNSFmo().subscribe(
      numero => {
        this.dataFMOCot = numero.cotizacion;
        this.dataFMOFac = numero.facturacion;

        this.porcentFMO = (this.dataFMOFac / this.dataFMOCot);
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
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

    // Intervalo de Nivel de Servicios General
    this.nivelServicio.unsubscribe();
    clearInterval(this.intNs);

    // Intervalo de Nivel de Servicios de Truper
    this.nivelTruper.unsubscribe();
    clearInterval(this.intNsT);

    // Intervalo de Nivel de Servicios de Ferremayoristas
    this.nivelFMO.unsubscribe();
    clearInterval(this.intNsFmo);

  }

  // Observable de Nivel de Servicio General
  regresaNSGeneral(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intNs = setInterval( () => {
        
        this._phpService.nivelServicio()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {
              const general = {
                cotizacion: data[0].cotizacion,
                facturacion: data[0].facturacion,
              };

              observer.next(general);
            } else {
              const general = {
                cotizacion: 0,
                facturacion: 0,
              };

              observer.next(general);
            }

          });

      }, 5000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

  // Observable de Nivel de Servicio Truper
  regresaNSTruper(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intNsT = setInterval( () => {
        
        this._phpService.nsTruper()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {
              const truper = {
                cotizacion: data[0].cotizacion,
                facturacion: data[0].facturacion,
              };

              observer.next(truper);
            } else {
              const truper = {
                cotizacion: 0,
                facturacion: 0,
              };

              observer.next(truper);
            }

          });

      }, 5000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

  // Observable de Nivel de Servicio FMO
  regresaNSFmo(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intNsFmo = setInterval( () => {
        
        this._phpService.nsFMO()
          .subscribe( ( data ) => {

            if (data[0].importe != 0) {
              const fmo = {
                cotizacion: data[0].cotizacion,
                facturacion: data[0].facturacion,
              };

              observer.next(fmo);
            } else {
              const fmo = {
                cotizacion: 0,
                facturacion: 0,
              };

              observer.next(fmo);
            }

          });

      }, 5000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
