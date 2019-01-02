import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ComisionesService, UsuarioService } from '../../services/services.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-total-comisiones',
  templateUrl: './total-comisiones.component.html',
  styles: []
})
export class TotalComisionesComponent implements OnInit {

  datos: any[] = [];

  // Para que el valor del select muestre los datos iniciales
  mes: number = 0;
  anio: number = new Date().getFullYear();

  cargando: boolean = false;
  presentar: boolean = false;

  constructor(
    private router: Router,
    private _comisionesService: ComisionesService,
    private _usuariosService: UsuarioService
  ) { }

  ngOnInit() {
  }

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

    if (comisiones.length > 0) {

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

      this.presentar = true;

    } else {

      this.cargando = false;

      this.presentar = false;

    }

  }

  revisar( idFerrum: any, nombre: any ) {
    this.router.navigate(['/asesor-vista/', idFerrum, nombre]);
  }

}
