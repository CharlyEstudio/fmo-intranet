import { Component, OnInit, ɵConsole } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UsuarioService, ClientesService } from '../../services/services.index';

@Component({
  selector: 'app-movimientos-folio',
  templateUrl: './movimientos-folio.component.html',
  styles: []
})
export class MovimientosFolioComponent implements OnInit {

  // Importes
  numero: any = '';

  // Booleanos
  localizado: boolean = false;
  cargando: boolean = false;

  // Data
  folios: any[] = [];
  nombre: any;
  num: any;

  constructor(
    private _usuariosService: UsuarioService,
    private _clientesService: ClientesService
  ) { }

  ngOnInit() {
  }

  obtenerFolio( forma: NgForm ) {

    this.cargando = true;
    this.localizado = false;

    if ( forma.value.numero === '' ) {
      swal('Debe ingresar el número de folio', 'No ha ingresado el número de folio para la busqueda.', 'error');
      this.cargando = false;
      return;
    }

    this.numero = forma.value.numero;

    this._clientesService.obtenerMovimientoNumero(this.numero).subscribe( ( mov: any ) => {
      if (mov.length > 0) {

        this._clientesService.obtenerMovimiento(mov[0].DOCID).subscribe( ( pagos: any ) => {

          this.folios = mov;
          this.nombre = mov[0].NOMBRE;
          this.num = mov[0].NUMERO;

          if (pagos.length > 0) {

            this.cargando = false;

            this.localizado = true;

            for (let i = 0; i < pagos.length; i++) {
              let nuevo;
              if (pagos[i].FORMAPAGO !== 'NC' || pagos[i].PAGADO > 0) {
                nuevo = [
                  {
                    "CLIENTEID": mov[0].CLIENTEID,
                    "DOCID": pagos[i].DOCID,
                    "FECHAAPLICADA": pagos[i].FECHAAPLICADA,
                    "FORMAPAGO": pagos[i].FORMAPAGO,
                    "FP": pagos[i].FP,
                    "NOMBRE": "",
                    "NUMERO": "",
                    "ABONO": pagos[i].PAGADO,
                    "CARGO": "",
                    "PAGREF": pagos[i].NOTA,
                    "RECIBO": pagos[i].RECIBO
                  }
                ];
              } else {
                nuevo = {
                    "CLIENTEID": mov[0].CLIENTEID,
                    "DOCID": pagos[i].DOCID,
                    "FECHAAPLICADA": pagos[i].FECHAAPLICADA,
                    "FORMAPAGO": pagos[i].FORMAPAGO,
                    "FP": pagos[i].FP,
                    "NOMBRE": "",
                    "NUMERO": "",
                    "ABONO": "",
                    "CARGO": pagos[i].PAGADO,
                    "PAGREF": pagos[i].NOTA,
                    "RECIBO": pagos[i].RECIBO
                };
              }

              this.folios.push(nuevo[0]);
            }

          } else {

            this.cargando = false;

            this.localizado = true;

          }

        });

      } else {

        this.cargando = false;

        this.localizado = false;

      }
    });

  }

}
