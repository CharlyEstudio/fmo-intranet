import { Component, OnInit } from '@angular/core';

import { DiariosService } from '../../../services/services.index';

@Component({
  selector: 'app-cartera-proveedores',
  templateUrl: './cartera-proveedores.component.html',
  styles: []
})
export class CarteraProveedoresComponent implements OnInit {

  respuestaGeneral: boolean = false;
  ventas: boolean = false;
  esperar: boolean = true;

  cartera: any;
  saldo: number = 0;
  actual: number = 0;
  nombre: string;

  constructor(
    private _diariosService: DiariosService
  ) { }

  ngOnInit() {
    this.solicitar();
  }

  solicitar() {

    this.saldo = 0;

    this._diariosService.carteraProveedores()
      .subscribe( ( resp: any ) => {
        if (resp !== '') {
          this.cartera = resp;

          for (let i = 0; i < this.cartera.length; i++) {
            this.saldo += this.cartera[i].saldo;
          }

          this.esperar = false;
          this.respuestaGeneral = true;
          this.ventas = false;
        } else {
          this.ventas = true;
          this.esperar = false;
          this.respuestaGeneral = false;
        }
      });

  }

  obtenerCartera(e) {
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
    this._diariosService.saldoProveedores(fecha, e.target.id)
      .subscribe( ( resp: any ) => {
        this.nombre = resp[0].nombre;
        this.actual = resp;
      });
  }

}
