import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { UsuarioService, AsesoresService } from '../services/services.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
import { Router } from '@angular/router';
const swal: SweetAlert = _swal as any;

declare function init_plugins();

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./login.component.css']
})
export class RecuperarComponent implements OnInit {

  email: string;

  constructor(
    public _usuarioService: UsuarioService,
    public _asesoresService: AsesoresService,
    public router: Router
  ) { }

  ngOnInit() {

    init_plugins();

  }

  recuperarCuenta( forma: NgForm ) {
    console.log(forma.value.email);
    this._usuarioService.buscarUsuarios(forma.value.email).subscribe( ( resp: any ) => {
      console.log(resp[0]);
      this._usuarioService.recuperar(resp[0]._id).subscribe(( asesor: any ) => {
        console.log(asesor);
      });
    });
  }

}
