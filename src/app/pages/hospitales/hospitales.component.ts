import { Component, OnInit } from '@angular/core';

import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  desde: number = 0;

  totalResgitro: number = 0;

  cargando: boolean = true;


  constructor(
    public _hospitalService: HospitalService,
    public _modalUpLoadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUpLoadService.notificacion
      .subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
      .subscribe( ( resp: any ) => {
        this.hospitales = resp.hospitales;
        this.totalResgitro = resp.total;
        this.cargando = false;
      });
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

    this.cargarHospitales();
  }

  crearHospital() {

    swal({
      titulo: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( ( valor: string ) => {
      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
        .subscribe( () => {
          this.cargarHospitales();
        });
    });
  }

  borrarHospital( hospital: Hospital ) {
    swal({
          title: '¿Está seguro?',
          text: 'Está a punto de borrar a ' + hospital.nombre,
          icon: 'warning',
          buttons: true,
          dangerMode: true
        }).then( borrar => {
          if ( borrar ) {
            this._hospitalService.borrarHospital( hospital._id )
              .subscribe( borrado => {
                this.desde = 0;
                this._hospitalService.cargarHospitales( this.desde );
                this.cargarHospitales();
              });
          }
        });
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospitales( termino )
      .subscribe( (hospitales ) => {
        this.hospitales = hospitales;
        this.cargando = false;
      })
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
      .subscribe();
  }

  actualizarImagen( hospital: Hospital ) {
    this._modalUpLoadService.mostrarModal( 'hospitales', hospital._id );
  }

}
