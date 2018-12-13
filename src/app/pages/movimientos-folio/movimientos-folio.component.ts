import { Component, OnInit } from '@angular/core';

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

    this._clientesService.obtenerFolio(this.numero).subscribe( ( folios: any ) => {

      if (folios.length > 0) {

        this.cargando = false;

        this.localizado = true;

        this.folios = folios;

      } else {

        this.cargando = false;

        this.localizado = false;

      }

    });

  }

}
