import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsesoresService } from '../../services/services.index';

@Component({
  selector: 'app-cobro-vista',
  templateUrl: './cobro-vista.component.html',
  styles: []
})
export class CobroVistaComponent implements OnInit {

  idFerrum: any;
  nombre: any;

  cobranza: any[] = [];
  cheques: number = 0;
  transferencia: number = 0;
  efectivo: number = 0;
  total: number = 0;

  constructor(
    private router: ActivatedRoute,
    private _asesorService: AsesoresService
  ) { }

  ngOnInit() {
    this.idFerrum = this.router.snapshot.paramMap.get('id');
    this.nombre = this.router.snapshot.paramMap.get('nombre');

    this.cheques = 0;
    this.efectivo = 0;
    this.transferencia = 0;
    this.total = 0;

    // Otebtener Pagos
    this._asesorService.cobranza(this.idFerrum)
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

          this.total += parseFloat(this.cobranza[i].pagado);

        }

      });

  }

}
