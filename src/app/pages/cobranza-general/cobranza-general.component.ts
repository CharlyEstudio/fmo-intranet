import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;


import { AsesoresService } from '../../services/services.index';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cobranza-general',
  templateUrl: './cobranza-general.component.html',
  styles: []
})
export class CobranzaGeneralComponent implements OnInit, OnDestroy {

  observar1: Subscription;
  intervalo1: any;

  // Esto es provisional, mientras se coloca los sockets
  observar2: Subscription;
  intervalo2: any;

  cobranza: any[] = [];
  impTPV: number = 0;
  tpv: any[] = [];
  cheques: number = 0;
  transferencia: number = 0;
  tarjeta: number = 0;
  efectivo: number = 0;
  notas: number = 0;
  total: number = 0;
  verPDF: any = 'vacio';

  constructor(
    public sanitizer: DomSanitizer,
    private _asesorService: AsesoresService
  ) {
    // Subscrión a Cobranza
    this.observar1 =  this.regresa1().subscribe(
      numero => {
        this.cheques = 0;
        this.efectivo = 0;
        this.transferencia = 0;
        this.notas = 0;
        this.tarjeta = 0;
        this.total = 0;
        this.cobranza = numero;
        for (let i = 0; i < this.cobranza.length; i++) {

          if (this.cobranza[i].formapago === 'C') {
            this.cheques += parseFloat(this.cobranza[i].pagado);
          }

          if (this.cobranza[i].formapago === 'E') {
            this.efectivo += parseFloat(this.cobranza[i].pagado);
          }

          if (this.cobranza[i].formapago === 'R') {
            this.transferencia += parseFloat(this.cobranza[i].pagado);
          }

          if (this.cobranza[i].formapago === 'S') {
            this.notas += parseFloat(this.cobranza[i].pagado);
          }

          if (this.cobranza[i].formapago === 'T') {
            this.tarjeta += parseFloat(this.cobranza[i].pagado);
          }

          // this.total += parseFloat(this.cobranza[i].pagado);

        }

        this.total = this.cheques + this.efectivo + this.transferencia + this.tarjeta;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

    // Subscrión a Cobranza
    this.observar2 =  this.regresa2().subscribe(
      numero => {
        this.impTPV = 0;
        this.tpv = numero;
        for (let i = 0; i < numero.length; i ++) {
          this.impTPV += numero[i].imporInicial;
        }
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {

    this.cheques = 0;
    this.efectivo = 0;
    this.transferencia = 0;
    this.notas = 0;
    this.tarjeta = 0;
    this.total = 0;
    this.impTPV = 0;

    // Otebtener Pagos
    this._asesorService.cobranza()
      .subscribe( ( resp: any ) => {
        this.cobranza = resp.resp;

        for (let i = 0; i < this.cobranza.length; i++) {

          if (this.cobranza[i].formapago === 'C') {
            this.cheques += parseFloat(this.cobranza[i].pagado);
          }

          if (this.cobranza[i].formapago === 'E') {
            this.efectivo += parseFloat(this.cobranza[i].pagado);
          }

          if (this.cobranza[i].formapago === 'R') {
            this.transferencia += parseFloat(this.cobranza[i].pagado);
          }

          if (this.cobranza[i].formapago === 'S') {
            this.notas += parseFloat(this.cobranza[i].pagado);
          }

          if (this.cobranza[i].formapago === 'T') {
            this.tarjeta += parseFloat(this.cobranza[i].pagado);
          }

        }

        this.total = this.cheques + this.efectivo + this.transferencia + this.tarjeta;

      });

    // Obtener pagos de TPV
    this._asesorService.cobranzaTPV()
      .subscribe( ( resp: any ) => {
        this.tpv = resp.resp;
        for (let i = 0; i < resp.resp.length; i ++) {
          this.impTPV += parseFloat(resp.resp[i].imporInicial);
        }
      });

  }

  regresa1(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo1 = setInterval(() => {
        this._asesorService.cobranza()
          .subscribe( ( resp: any ) => {
            observer.next(resp.resp);
          });
      }, 1000);
    })
    .retry()
    .map((resp) => {
      return resp;
    });
  }

  regresa2(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo2 = setInterval(() => {
        this._asesorService.cobranzaTPV()
          .subscribe( ( resp: any ) => {
            observer.next(resp.resp);
          });
      }, 1000);
    })
    .retry()
    .map((resp) => {
      return resp;
    });
  }

  ngOnDestroy() {
    // Intervalo por Surtir
    this.observar1.unsubscribe();
    clearInterval(this.intervalo1);
    this.observar2.unsubscribe();
    clearInterval(this.intervalo2);
  }

  pdf(datos: any) {
    swal({
      text: 'Generar el PDF',
      buttons: {
        confirm: {
          text: 'Generar',
          closeModal: false
        }
      }
    })
    .then((value) => {
      if (!value) {return}
      return fetch(`https://ferremayoristas.com.mx/api/visitas.php?opcion=50`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'content-Type': 'application/x-www-form-urlencoded' }
      });
    })
    .then(results => {
      return results.json();
    })
    .then(json => {
      const resp = json[0].msg;

      if (!resp) {
        return swal({
          title: 'Error',
          text: resp.msg,
          icon: 'danger'
        });
      }

      this.verPDF = 'https://ferremayoristas.com.mx/api/' + resp.file;

      swal({
        title: "PDF",
        text: resp.msg,
        icon: 'success',
        buttons: {
          confirm: {
            text: 'Ver'
          }
        }
      })
      .then((value) => {
        if (!value) {return}
        let a = document.createElement('a');
        a.setAttribute('href', this.verPDF);
        a.setAttribute('target', '_blank');
        a.click();
      });
    })
    .catch(err => {
      console.log(err);
      if (err) {
        swal("Oh noes!", err, "error");
      } else {
        swal.stopLoading();
        swal.close('true');
      }
    });
  }

}
