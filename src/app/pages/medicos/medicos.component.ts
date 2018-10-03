import { Component, OnInit } from '@angular/core';

import { MedicoService } from '../../services/services.index';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  cargando: boolean = true;

  desde: number = 0;

  totalResgitro: number = 0;

  constructor(
    public _medicoService: MedicoService,
    public _modalUpLoadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
    this._modalUpLoadService.notificacion
      .subscribe( () => this.cargarMedicos());
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this.totalResgitro ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;

    this._medicoService.cargarMedicos( this.desde )
      .subscribe( ( resp: any ) => {
        this.medicos = resp.medicos;
        this.totalResgitro = resp.total;
        this.cargando = false;
      });
  }

  buscarMedico( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.buscarMedico( termino )
      .subscribe( (medicos ) => {
        this.medicos = medicos;
        this.cargando = false;
      });
  }

  borrarMedico( medico: Medico ) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if ( borrar ) {
        this._medicoService.borrarMedico( medico._id )
          .subscribe( () => {
            this.desde = 0;
            this._medicoService.cargarMedicos( this.desde );
            this.cargarMedicos();
          });
      }
    });
  }

}
