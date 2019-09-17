import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Modelos
import { Usuario } from '../models/usuario.model';

// Servicios
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-cambiar',
  templateUrl: './cambiar.component.html',
  styles: []
})
export class CambiarComponent implements OnInit {

  activo: boolean = false;
  alerta: boolean = false;
  token: any = '';
  mensaje: any = '';

  forma: FormGroup;

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    private _usuarioService: UsuarioService
  ) {
    init_plugins();
    activateRoute.params
      .subscribe( params => {
        if (!params['token']) {
          this.router.navigate(['/login']);
        } else {
          this.token = params['token'];
          this.validar(params['token']);
        }
      });
  }

  ngOnInit() {
    this.forma = new FormGroup({
      new_pass: new FormControl(null, Validators.required),
      repeat_pass: new FormControl(null, Validators.required)
    }, { validators: this.sonIguales('new_pass', 'repeat_pass') });
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };
    }
  }

  validar(token: any) {
    this._usuarioService.validarToken(token).subscribe((resp: any) => {
      this.activo = resp.ok;
    });
  }

  cambiar() {
    if ( this.forma.invalid ) {
      return;
    }

    this._usuarioService.realizarCambioPass(this.token, this.forma.value.new_pass).subscribe((resp: any) => {
      if (resp.ok) {
        this.mensaje = resp.mensaje;
        this.alerta = true;
        setTimeout(() => {
          this.alerta = false;
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.alerta = true;
        this.mensaje = resp.mensaje;
      }
    });
  }

}
