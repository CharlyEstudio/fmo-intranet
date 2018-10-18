import { Component, OnInit } from '@angular/core';

import { DiariosService } from '../../../services/services.index';
import { SweetAlert } from 'sweetalert/typings/core';
import { URL_SERVICE } from '../../../config/config';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styles: []
})
export class InventarioComponent implements OnInit {

  url: string;

  respuesta: boolean = true;
  respuestaGeneral: boolean = false;
  ventas: boolean = false;

  inventario: any;
  subtotal: number = 0;

  constructor(
    private _diariosService: DiariosService
  ) {
    this.url = URL_SERVICE;
  }

  ngOnInit() {
    this.solicitar();
  }

  solicitar() {

    this.subtotal = 0;

    this._diariosService.inventario()
      .subscribe( ( resp: any ) => {
        if (resp != '') {
          this.inventario = resp;

          for(let i=0; i < this.inventario.length; i++){
            this.subtotal += this.inventario[i].subtotal;
          }

          this.respuesta = false;
          this.respuestaGeneral = true;
          this.ventas = false;
        } else {
          this.ventas = true;
          this.respuesta = false;
          this.respuestaGeneral = false;
        }
      });

  }

}
