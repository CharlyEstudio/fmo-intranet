import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { OficinaService, HerramientasService } from '../../services/services.index';
import { Subscription, Observable } from 'rxjs';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-procesofacturas',
  templateUrl: './procesofacturas.component.html',
  styles: []
})
export class ProcesofacturasComponent implements OnInit, OnDestroy {

  // RXJS
  facTotObs: Subscription;
  intFact: any;

  sinImpObs: Subscription;
  intSinImp: any;

  sinEnvObs: Subscription;
  intSinEnv: any;

  errFacObs: Subscription;
  intErrFac: any;

  errTimObs: Subscription;
  intErrTim: any;

  factTot: any[] = [];
  facturas: number = 0;

  noimpresas: any[] = [];
  sinImpresion: number = 0;

  noEnviadas: any[] = [];
  sinEnviar: number = 0;

  falloFacturar: any[] = [];
  failFacturar: number = 0;

  falloTimbrar: any[] = [];
  failTimbrar: number = 0;

  modal: any = [];
  titulo: any;
  impresionBol: boolean = false;
  facturaBol: boolean = false;

  constructor(
    private _oficina: OficinaService,
    private _herramientas: HerramientasService
  ) {
    this._oficina.todasFacturas(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.length > 0) {
        this.factTot = resp;
        this.facturas = resp.length;
      } else {
        this.factTot = [];
        this.facturas = 0;
      }
    });

    this._oficina.facturasNoImpresas(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.length > 0) {
        this.noimpresas = resp;
        this.sinImpresion = resp.length;
      } else {
        this.noimpresas = [];
        this.sinImpresion = 0;
      }
    });

    this._oficina.facturasNoEnviadas(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.length > 0) {
        this.noEnviadas = resp;
        this.sinEnviar = resp.length;
      } else {
        this.noEnviadas = [];
        this.sinEnviar = 0;
      }
    });

    this._oficina.errorFacturar(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.length > 0) {
        this.falloFacturar = resp;
        this.failFacturar = resp.length;
      } else {
        this.falloFacturar = [];
        this.failFacturar = 0;
      }
    });

    this._oficina.errorTimbrar(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.length > 0) {
        this.falloTimbrar = resp;
        this.failTimbrar = resp.length;
      } else {
        this.falloTimbrar = [];
        this.failTimbrar = 0;
      }
    });
  }

  ngOnInit() {
    this.facTotObs = this.regresaFact().subscribe(
      watch => {
        if (watch.length > 0) {
          this.factTot = watch;
          this.facturas = watch.length;
        } else {
          this.factTot = [];
          this.facturas = 0;
        }
      }
    );

    this.sinImpObs = this.regresaSinImp().subscribe(
      watch => {
        if (watch.length > 0) {
          this.noimpresas = watch;
          this.sinImpresion = watch.length;
        } else {
          this.noimpresas = [];
          this.sinImpresion = 0;
        }
      }
    );

    this.sinEnvObs = this.regresaSinEnv().subscribe(
      watch => {
        if (watch.length > 0) {
          this.noEnviadas = watch;
          this.sinEnviar = watch.length;
        } else {
          this.noEnviadas = [];
          this.sinEnviar = 0;
        }
      }
    );

    this.errFacObs = this.regresaErrFac().subscribe(
      watch => {
        if (watch.length > 0) {
          this.falloFacturar = watch;
          this.failFacturar = watch.length;
        } else {
          this.falloFacturar = [];
          this.failFacturar = 0;
        }
      }
    );

    this.errTimObs = this.regresaErrtim().subscribe(
      watch => {
        if (watch.length > 0) {
          this.falloTimbrar = watch;
          this.failTimbrar = watch.length;
        } else {
          this.falloTimbrar = [];
          this.failTimbrar = 0;
        }
      }
    );
  }

  regresaFact(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intFact = setInterval(() => {
        this._oficina.todasFacturas(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  regresaSinImp(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intSinImp = setInterval(() => {
        this._oficina.facturasNoImpresas(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  regresaSinEnv(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intSinEnv = setInterval(() => {
        this._oficina.facturasNoEnviadas(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  regresaErrFac(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intErrFac = setInterval(() => {
        this._oficina.errorFacturar(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  regresaErrtim(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intErrTim = setInterval(() => {
        this._oficina.errorTimbrar(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  ngOnDestroy() {
    this.facTotObs.unsubscribe();
    this.sinImpObs.unsubscribe();
    this.sinEnvObs.unsubscribe();
    this.errFacObs.unsubscribe();
    this.errTimObs.unsubscribe();
    clearInterval(this.intFact);
    clearInterval(this.intSinImp);
    clearInterval(this.intSinEnv);
    clearInterval(this.intErrFac);
    clearInterval(this.intErrTim);
  }

  openModal(tipo: any) {
    this.impresionBol = false;
    this.facturaBol = false;
    const opcion = Number(tipo);
    this.titulo = '';

    switch (opcion) {
      case 1:
        this.titulo = 'Facturas Sin Impresión';
        this.modal = this.noimpresas;
        this.impresionBol = true;
        break;
      case 2:
        this.titulo = 'Facturas Con Impresión';
        this.modal = this.noEnviadas;
        this.impresionBol = true;
        break;
      case 3:
        this.titulo = 'Error al Facturar';
        this.modal = this.falloFacturar;
        this.facturaBol = true;
        break;
      case 4:
        this.titulo = 'Error al Timbrar';
        this.modal = this.falloTimbrar;
        this.facturaBol = true;
        break;
    }
  }

}
