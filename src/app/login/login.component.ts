import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
// import { URL_SERVICIOS2 } from '../config/config';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) {
    // console.log(URL_SERVICIOS2);
  }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame)
      .subscribe( correcto => {

        if (this._usuarioService.usuario.rol === "ADMIN_ROLE"
            || this._usuarioService.usuario.rol === "DIR_ROLE"
            || this._usuarioService.usuario.rol === "GER_ROLE") {
          this.router.navigate(['/dashboardDir']);
        } else if (this._usuarioService.usuario.rol === "ASE_ROLE") {
          this.router.navigate(['/dashboardAse']);
        } else if (this._usuarioService.usuario.rol === "SUP_ROLE") {
          this.router.navigate(['/dashBoardSup']);
        }  else if (this._usuarioService.usuario.rol === "AUD_ROLE") {
          this.router.navigate(['/dashBoardAuditoria']);
        } else {
          this.router.navigate(['/dashboard']);
        }

      });
  }

}
