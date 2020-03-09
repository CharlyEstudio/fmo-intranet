import { Component, OnInit } from '@angular/core';
import { AsesoresService } from '../../services/services.index';

@Component({
  selector: 'app-cobranza',
  templateUrl: './cobranza.component.html',
  styles: []
})
export class CobranzaComponent implements OnInit {

  datos: any[] = [];
  asesor: string;
  id: any;
  idFerrum: any;

  cobranza: any[] = [];
  cheques: number = 0;
  transferencia: number = 0;
  efectivo: number = 0;
  total: number = 0;

  constructor(
    private _asesorService: AsesoresService
  ) { }

  ngOnInit() {

    this.datos = JSON.parse(localStorage.getItem('usuario'));

    this.asesor = this.datos["nombre"];
    this.id = this.datos["_id"];
    this.idFerrum = this.datos["idFerrum"];

    this.cheques = 0;
    this.efectivo = 0;
    this.transferencia = 0;
    this.total = 0;

    // Otebtener Pagos
    this._asesorService.cobranza(this.idFerrum)
      .subscribe( ( resp: any ) => {
        if (resp.resp !== false) {
          this.cobranza = resp.resp;

          for (let i = 0; i < this.cobranza.length; i++) {

            if (this.cobranza[i].formapago === 'C') {
              this.cheques += this.cobranza[i].pagado;
            }

            if (this.cobranza[i].formapago === 'E') {
              this.efectivo += this.cobranza[i].pagado;
            }

            if (this.cobranza[i].formapago === 'R') {
              this.transferencia += this.cobranza[i].pagado;
            }

            this.total += this.cobranza[i].pagado;

          }
        }

      });

  }

}
