import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioService, WebsocketService, ServidorService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  error: boolean = false;
  iniciar: boolean = false;
  iniciando: boolean = false;
  mensaje: any;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private _servidor: ServidorService,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    this.iniciar = true;
    this.error = false;

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame)
      .subscribe( (correcto: any) => {

        if ( correcto.ok ) {
          this.iniciando = true;

          if (this._usuarioService.usuario.rol === "ADMIN_ROLE") {

            this.router.navigate(['/dashboardAdmin']);

          } else if (this._usuarioService.usuario.rol === "ADMIN_ROLE"
              || this._usuarioService.usuario.rol === "DIR_ROLE"
              || this._usuarioService.usuario.rol === "GER_ROLE") {

            this.router.navigate(['/dashboardDir']);

          } else if (this._usuarioService.usuario.rol === "ASE_ROLE") {

            this.router.navigate(['/dashboardAse']);

          } else if (this._usuarioService.usuario.rol === "CONTA_ROLE") {

            this.router.navigate(['/diasvtas']);

          } else if (this._usuarioService.usuario.rol === "SUP_ROLE") {

            this.router.navigate(['/dashBoardSup']);

          }  else if (this._usuarioService.usuario.rol === "AUD_ROLE") {

            this.router.navigate(['/dashBoardAuditoria']);

          } else if (this._usuarioService.usuario.rol === "MESA_ROLE" || this._usuarioService.usuario.rol === "OF_ROLE") {

            this.router.navigate(['/clientes-oficina']);

          } else {

            this.router.navigate(['/dashboard']);

          }

          this.error = false;
          this.iniciar = false;
          this.wsService.login( this._usuarioService.usuario );
        } else {
          this.mensaje = correcto.mensaje;
          this.iniciar = false;
          this.error = true;
        }


      }, err => console.log(err));

  }

}
