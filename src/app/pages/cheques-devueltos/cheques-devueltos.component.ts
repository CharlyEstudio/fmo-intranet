import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditoService } from '../../services/services.index';

@Component({
  selector: 'app-cheques-devueltos',
  templateUrl: './cheques-devueltos.component.html',
  styles: []
})
export class ChequesDevueltosComponent implements OnInit {

  cheques: any[] = [];

  esperar: boolean = true;
  sinResultado: boolean = false;

  constructor(
    private router: Router,
    private _creditoService: CreditoService
  ) {
    this._creditoService.chequesDevueltos().subscribe( ( cheques: any ) => {
      if (cheques.length !== 0) {

        this.cheques = cheques;
        this.esperar = false;

      } else {
        this.sinResultado = true;
        this.esperar = false;
      }
    });
  }

  ngOnInit() {
  }

  regresar() {
    this.router.navigate(['/direccionCuentas/']);
  }

}
