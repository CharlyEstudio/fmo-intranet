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

  mor1a28: number = 0;
  mor29a48: number = 0;
  mor46: number = 0;

  constructor(
    private router: Router,
    private _creditoService: CreditoService
  ) { }

  ngOnInit() {
    this._creditoService.mor1a28().subscribe( ( resp: any ) => {
      this.mor1a28 = resp[0].importe;
    });

    this._creditoService.mor29a45().subscribe( ( resp: any ) => {
      this.mor29a48 = resp[0].importe;
    });

    this._creditoService.mor46().subscribe( ( resp: any ) => {
      this.mor46 = resp[0].importe;
    });

    this.esperar = false;
    this.respuestaGeneral = true;
  }

  enviarDatos( data: any ) {
    this.router.navigate(['/infoBitacora/', data]);
  }

}
