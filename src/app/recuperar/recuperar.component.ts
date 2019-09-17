import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioService, WebsocketService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RecuperarComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  error: boolean = false;
  iniciar: boolean = false;
  iniciando: boolean = false;
  mensaje: any = '';

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) {
    init_plugins();
  }

  ngOnInit() {
  }

  recuperar(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }

    this.mensaje = '';

    this._usuarioService.cambiarPassEmail(forma.value.email).subscribe((resp: any) => {
      if (resp.ok) {
        console.log(`https://ferremayoristas.com.mx/intranet/#/campass/${resp.token}`);
        this._usuarioService.enviarEmailCambioPass(resp.usuarios, resp.token, resp.email).subscribe((envio: any) => {
          // console.log(`${envio}`);
          if (envio) {
            this.router.navigate(['/login']);
          } else {
            this.mensaje = 'Error al enviar el email, favor de reportar al administrador.';
          }
        });
      } else {
        this.mensaje = 'Este email no existe';
      }
    });
  }

}
