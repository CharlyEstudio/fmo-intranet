import { Component, OnInit } from '@angular/core';
import { AlmacenService } from '../../services/services.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-repo-surtido',
  templateUrl: './repo-surtido.component.html',
  styles: []
})
export class RepoSurtidoComponent implements OnInit {

  personal: any[] = [];
  provisional: any = [];

  reporte: any = '';

  inicio: any;
  fin: any;

  filtro: any = '';

  mostrar: boolean = false;
  esperar: boolean = false;

  totalPar: number = 0;
  totalPed: number = 0;

  area: any;

  constructor(
    private _almacenService: AlmacenService
  ) { }

  ngOnInit() {
  }

  solicitar( forma: NgForm ) {

    this.esperar = true;
    this.mostrar = false;

    this.totalPar = 0;
    this.totalPed = 0;

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar la fecha incial', 'No ha selecionado una fecha inicial.', 'error');
      return;
    }

    if ( forma.value.fin === undefined ) {
      swal('Debe ingresar la fecha final', 'No ha selecionado una fecha final.', 'error');
      return;
    }

    if ( forma.value.filtro === '' ) {
      swal('Debe ingresar un tipo de filtro', 'No ha selecionado un tipo de filtro.', 'error');
      return;
    }

    if (forma.value.filtro === 'vacio') {
      this.area = '';
    } else {
      this.area = forma.value.filtro;
    }

    this._almacenService.personal( this.area ).subscribe( ( personal: any ) => {
      this.personal = personal;

      this.mostrar = true;
      this.esperar = false;

      for (let i = 0; i < personal.length; i++) {
        this.totalPar += personal[i].partidas;
        this.totalPed += personal[i].pedidos;
      }

    });

    this.personal = [];
  }

}
