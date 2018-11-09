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

    this._comisionesService.buscarMesComision(forma.value.mes)
      .subscribe( ( resp: any ) => {
        if(resp.comisiones.length > 0) {
          this.procesar(forma.value.anio);
        } else {
          swal('Sin registro de comisiones', 'No se ha encontrado registro de comisiones en este mes.', 'error');
        }
      });
  }

  procesar( anio: any ) {
    this.cargando = true;

    this._usuariosService.buscarUsuarios('ASE_ROLE')
      .subscribe( ( resp: any ) => {
        this.asesores = resp;

        this._comisionesService.cargarComisiones()
          .subscribe( ( resp: any ) => {
            this.comisiones = resp;
            this.mostrar( anio );
          });

      });
  }

  mostrar( anio: any ) {
    for(let i = 0; i < this.comisiones.length; i++){
      if(this.comisiones[i].anio === anio) {
        for(let j = 0; j < this.asesores.length; j++) {
          if(this.comisiones[i].idFerrum == this.asesores[j].idFerrum){
            this.datos.push({'comision': this.comisiones[i], 'img': this.asesores[j].img, 'nombre': this.asesores[j].nombre, 'email': this.asesores[j].email});
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
