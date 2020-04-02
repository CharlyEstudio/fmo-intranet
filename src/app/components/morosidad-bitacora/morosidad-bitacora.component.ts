import { Component, OnInit } from '@angular/core';
import { CreditoService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-morosidad-bitacora',
  templateUrl: './morosidad-bitacora.component.html',
  styles: []
})
export class MorosidadBitacoraComponent implements OnInit {

  fecha: number = Date.now();

  respuestaGeneral: boolean = false;
  esperar: boolean = true;

  mor1a30: number = 0;
  mor31a45: number = 0;
  mor46a60: number = 0;
  mor61a90: number = 0;
  mor91a120: number = 0;
  mor120: number = 0;

  constructor(
    private router: Router,
    private _creditoService: CreditoService
  ) { }

  ngOnInit() {
    this._creditoService.mor1a30().subscribe( ( resp: any ) => {
      this.mor1a30 = resp.resp.importe;
    });

    this._creditoService.mor31a45().subscribe( ( resp: any ) => {
      this.mor31a45 = resp.resp.importe;
    });

    this._creditoService.mor46a60().subscribe( ( resp: any ) => {
      this.mor46a60 = resp.resp.importe;
    });

    this._creditoService.mor61a90().subscribe( ( resp: any ) => {
      this.mor61a90 = resp.resp.importe;
    });

    this._creditoService.mor91a120().subscribe( ( resp: any ) => {
      this.mor91a120 = resp.resp.importe;
    });

    this._creditoService.mor120().subscribe( ( resp: any ) => {
      this.mor120 = resp.resp.importe;
    });

    this.esperar = false;
    this.respuestaGeneral = true;
  }

  enviarDatos( data: any ) {
    this.router.navigate(['/infoBitacora/', data]);
  }

  cheques() {
    this.router.navigate(['/chequesDevueltos/']);
  }

}
