import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhpService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-dashborar-dir',
  templateUrl: './dashborar-dir.component.html',
  styles: []
})
export class DashborarDirComponent implements OnInit, OnDestroy {

  fecha: number = Date.now();

  observar: Subscription;
  datos: any[] = [];
  intervalo: any;

  diferencia: boolean = false;

  constructor(
    private _phpService: PhpService
  ) {
    // Subscrión a Diferencias
    this.observar =  this.regresa().subscribe(
      numero => {
        this.datos = numero;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval(() => {
        this._phpService.diferencias()
          .subscribe( ( resp: any ) => {
            if ( resp !== '' ) {
              this.diferencia = true;
            } else {
              this.diferencia = false;
            }
            observer.next(resp);
          });
      }, 1000);
    })
    .retry()
    .map((resp) => {
      return resp;
    });
  }

  ngOnInit() {

    // Diferencias
    this._phpService.diferencias()
      .subscribe( ( resp: any ) => {
        if ( resp !== '' ) {
          this.diferencia = true;
          this.datos = resp;
        } else {
          this.datos = resp;
        }
      });

  }

  ngOnDestroy() {

    // Intervalo por Surtir
    this.observar.unsubscribe();
    clearInterval(this.intervalo);

  }

}
