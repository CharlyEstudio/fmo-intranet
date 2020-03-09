import { Component, OnInit, Input } from '@angular/core';

import { ClientesService } from '../../services/services.index';

@Component({
  selector: 'app-mov-fol',
  templateUrl: './mov-fol.component.html',
  styles: []
})
export class MovFolComponent implements OnInit {

  @Input() folio: any;

  // Booleanos
  localizado: boolean = false;
  cargando: boolean = false;

  // Data
  folios: any[] = [];
  fol: any;
  nombre: any;
  num: any;

  constructor(
    private _clientesService: ClientesService
  ) { }

  ngOnInit() { }

  obtenerFolio( folio: any ) {

    this.cargando = true;
    this.localizado = false;

    this.fol = folio;

    this._clientesService.obtenerMovimientoNumero(this.fol).subscribe( ( mov: any ) => {
      if (mov.status) {

        this._clientesService.obtenerMovimiento(mov.resp[0].DOCID).subscribe( ( pagos: any ) => {

          this.folios = mov.resp;
          this.nombre = mov.resp[0].NOMBRE;
          this.num = mov.resp[0].NUMERO;

          if (pagos.status) {

            this.cargando = false;

            this.localizado = true;

            for (let i = 0; i < pagos.resp.length; i++) {
              let nuevo;
              if (pagos[i].FORMAPAGO !== 'NC' || pagos[i].PAGADO > 0) {
                nuevo = [
                  {
                    "CLIENTEID": mov.resp[0].CLIENTEID,
                    "DOCID": pagos.resp[i].DOCID,
                    "FECHAAPLICADA": pagos.resp[i].FECHAAPLICADA,
                    "FORMAPAGO": pagos.resp[i].FORMAPAGO,
                    "FP": pagos.resp[i].FP,
                    "NOMBRE": "",
                    "NUMERO": "",
                    "ABONO": pagos.resp[i].PAGADO,
                    "CARGO": "",
                    "PAGREF": pagos.resp[i].NOTA,
                    "RECIBO": pagos.resp[i].RECIBO
                  }
                ];
              } else {
                nuevo = {
                    "CLIENTEID": mov.resp[0].CLIENTEID,
                    "DOCID": pagos.resp[i].DOCID,
                    "FECHAAPLICADA": pagos.resp[i].FECHAAPLICADA,
                    "FORMAPAGO": pagos.resp[i].FORMAPAGO,
                    "FP": pagos.resp[i].FP,
                    "NOMBRE": "",
                    "NUMERO": "",
                    "ABONO": "",
                    "CARGO": pagos.resp[i].PAGADO,
                    "PAGREF": pagos.resp[i].NOTA,
                    "RECIBO": pagos.resp[i].RECIBO
                };
              }

              this.folios.push(nuevo[0]);
            }

          } else {

            this.cargando = false;

            this.localizado = false;

          }

        });

      } else {

        this.cargando = false;

        this.localizado = false;

      }
    });

  }

}
