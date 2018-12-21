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

        let comisiones = resp.comisiones;

        if (resp.comisiones.length > 0) {

          this.procesar(forma.value.anio, comisiones);

        } else {

          swal('Sin registro de comisiones', 'No se ha encontrado registro de comisiones en este mes.', 'error');

        }

      });
  }

  procesar( anio: any, comisiones: any ) {
    this.cargando = true;

    this._usuariosService.buscarUsuarios('ASE_ROLE')
      .subscribe( ( asesores: any ) => {

        this.mostrar( anio, comisiones, asesores );

      });
  }

  mostrar( anio: any, comisiones: any, asesores: any ) {

    for (let i = 0; i < comisiones.length; i++) {

      if (comisiones[i].anio === anio) {

        for (let j = 0; j < asesores.length; j++) {

          if (comisiones[i].idFerrum == asesores[j].idFerrum) {

            this.datos.push(
              {
                'comision': comisiones[i],
                'img': asesores[j].img,
                'nombre': asesores[j].nombre,
                'email': asesores[j].email
              }
            );

          }

        }

      }

    }

    this.cargando = false;

  }

  revisar( idFerrum: any, nombre: any ) {
    this.router.navigate(['/asesor-vista/', idFerrum, nombre]);
  }

}
