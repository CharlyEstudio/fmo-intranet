import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-por-surtir',
  templateUrl: './por-surtir.component.html',
  styles: []
})
export class PorSurtirComponent implements OnInit, OnDestroy {

  // Por Surtir
  surtir: Subscription;
  porSurtir: number = 0;
  porSurtirImpo: number = 0;
  intSurtir: any;

  // Por Zona o Lugar
  zona1: number = 0;
  zona1Impo: number = 0;
  zona2: number = 0;
  zona2Impo: number = 0;
  especiales: number = 0;
  especialesImpo: number = 0;

  constructor(
    private _phpService: PhpService
  ) {
    // Subscrión a Pedidos por Surtir
    this.surtir =  this.regresaSurtir().subscribe(
      numero => {
        this.porSurtir = numero.cantidad;
        this.porSurtirImpo = numero.importe;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {

    let h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    let fecha = anio + '-' + mes + '-' + dia;

    // Pedidos por Surtir
    this._phpService.porSurtir(fecha)
      .subscribe((data) => {
        if ( data !== 0 ) {
          this.porSurtir = data.cantidad;
          this.porSurtirImpo = data.importe;
        } else {
          this.porSurtir = 0;
          this.porSurtirImpo = 0;
        }
      });

    // Por Surtir Zona 1
    this._phpService.porSurtirZona('2', fecha)
      .subscribe( ( data ) => {
        this.zona1 = data.cantidad;
        this.zona1Impo = data.importe;
      });

    // Por Surtir Zona 2
    this._phpService.porSurtirZona('1', fecha)
      .subscribe( ( data ) => {
        this.zona2 = data.cantidad;
        this.zona2Impo = data.importe;
      });

    // Por Surtir Especiales
    this._phpService.porSurtirEspecial(fecha)
      .subscribe( ( data ) => {
        this.especiales = data.cantidad;
        this.especialesImpo = data.importe;
      });

  }

  ngOnDestroy() {

    // Intervalo por Surtir
    this.surtir.unsubscribe();
    clearInterval(this.intSurtir);

  }

  // Observable de Pedidos por Surtir
  regresaSurtir(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intSurtir = setInterval( () => {

        let h = new Date();

        let dia;

        if (h.getDate() < 10) {
          dia = '0' + h.getDate();
        } else {
          dia = h.getDate();
        }

        let mes;

        if (h.getMonth() < 10) {
          mes = '0' + (h.getMonth() + 1);
        } else {
          mes = (h.getMonth() + 1);
        }

        let anio = h.getFullYear();

        let fecha = anio + '-' + mes + '-' + dia;

        // Por Surtir Total
        this._phpService.porSurtir(fecha)
          .subscribe( ( data ) => {

            if (data !== 0) {
              const surtir = {
                cantidad: data.cantidad,
                importe: data.importe
              };

              observer.next(surtir);
            } else {
              const surtir = {
                cantidad: 0,
                importe: 0
              };

              observer.next(surtir);
            }

          });

        // Por Surtir Zona 1
        this._phpService.porSurtirZona('2', fecha)
        .subscribe( ( data ) => {
          this.zona1 = data.cantidad;
          this.zona1Impo = data.importe;
        });

        // Por Surtir Zona 2
        this._phpService.porSurtirZona('1', fecha)
          .subscribe( ( data ) => {
            this.zona2 = data.cantidad;
            this.zona2Impo = data.importe;
          });

        // Por Surtir Especiales
        this._phpService.porSurtirEspecial(fecha)
          .subscribe( ( data ) => {
            this.especiales = data.cantidad;
            this.especialesImpo = data.importe;
          });

      }, 3000);
    })
    .retry()
    .map((resp) => {
        return resp;
    });

  }

}
