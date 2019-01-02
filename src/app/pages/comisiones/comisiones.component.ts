import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ComisionesService, UsuarioService } from '../../services/services.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styles: []
})
export class ComisionesComponent implements OnInit {

  comisiones: any[] = [];
  asesores: any[] = [];
  datos: any[] = [];

  mes: number = 0;
  anio: number = new Date().getFullYear();

  cargando: boolean = false;

  constructor(
    private router: Router,
    private _comisionesService: ComisionesService,
    private _usuariosService: UsuarioService
  ) { }

  ngOnInit() {}

  solicitar(forma: NgForm) {
    this.datos = [];

    if ( forma.value.mes === 0 ) {
      swal('Debe ingresar el mes', 'No ha selecionado un mes para la busqueda.', 'error');
      return;
    }

    if ( forma.value.anio === 0 ) {
      swal('Debe ingresar el año', 'No ha selecionado un año para la busqueda.', 'error');
      return;
    }

    this._comisionesService.buscarMesComision(forma.value.mes, forma.value.anio)
      .subscribe( ( resp: any ) => {

        if (resp.encontrado.length > 0) {

          this.mostrar(resp.encontrado);

        } else {

          swal('Sin registro de comisiones', 'No se ha encontrado registro de comisiones en este mes.', 'error');

        }

      });
  }

  mostrar( comisiones: any ) {

    for (let i = 0; i < comisiones.length; i++) {

      this._usuariosService.buscarUsuarioEsp(comisiones[i].idFerrum).subscribe( (comUser: any) => {
        this.datos.push(
          {
            'comision': comisiones[i],
            'img': comUser.usuario[0].img,
            'nombre': comUser.usuario[0].nombre,
            'email': comUser.usuario[0].email
          }
        );

        this.datos.sort((a, b) => {
          if (a.comision.totalComisionPagar < b.comision.totalComisionPagar) {
            return 1;
          }

          if (a.comision.totalComisionPagar > b.comision.totalComisionPagar) {
            return -1;
          }

          return 0;
        });
      });

    }

    this.cargando = false;

  }

  revisar( idFerrum: any, nombre: any ) {
    this.router.navigate(['/asesor-vista/', idFerrum, nombre]);
  }

}
