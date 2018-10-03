import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/services.index';
import { ModalUploadService } from './modal-upload.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;

  imagenTemp: any = [];

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUpLoadService: ModalUploadService) {}

  ngOnInit() {
    //
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      return;
    }

    if ( archivo.type.indexOf( 'image' )) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUpLoadService.tipo, this._modalUpLoadService.id )
    .then( resp => {
      this._modalUpLoadService.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga...');
    });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUpLoadService.ocultarModal();
  }

}
