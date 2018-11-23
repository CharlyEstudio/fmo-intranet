import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ComisionesService, UsuarioService, ExcelService } from '../../services/services.index';
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
    private _usuariosService: UsuarioService,
    public _excel: ExcelService
  ) { }

  ngOnInit() {
  }

  solicitar(forma: NgForm) {
    if ( forma.value.mes === 0 ) {
      swal('Debe ingresar el mes', 'No ha selecionado un mes para la busqueda.', 'error');
      return;
    }

    if ( forma.value.anio === 0 ) {
      swal('Debe ingresar el año', 'No ha selecionado un año para la busqueda.', 'error');
      return;
    }

    this._comisionesService.buscarMesComision(forma.value.mes)
      .subscribe( ( resp: any ) => {

        if (resp.comisiones.length > 0) {

          this.procesar(forma.value.anio, resp.comisiones);

        } else {

          swal('Sin registro de comisiones', 'No se ha encontrado registro de comisiones en este mes.', 'error');

        }
      });
  }

  procesar( anio: any, comisiones: any ) {
    this.cargando = true;
    this.presentar = false;

    this._usuariosService.buscarUsuarios('ASE_ROLE')
      .subscribe( ( asesores: any ) => {

            this.mostrar(anio, comisiones, asesores);

      });
  }

  mostrar( anio: any, comisiones: any, asesores: any ) {

    if (comisiones.length > 0) {

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

      this.presentar = true;

    } else {

      this.cargando = false;

      this.presentar = false;

    }

  }

  revisar( idFerrum: any, nombre: any ) {
    this.router.navigate(['/asesor-vista/', idFerrum, nombre]);
  }

  // descargar( data: any, forma: NgForm ) {
  //   console.log(data);
  //   let filename = 'comisiones_asesores_' + forma.value.mes + '_' + forma.value.anio;
  //   this._excel.exportAsExcelFile(data, filename);
  // }

}
