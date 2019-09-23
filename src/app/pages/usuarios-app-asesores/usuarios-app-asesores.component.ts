import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Visor } from '../../models/visor.model';

// Servicios
import { GpsService, ExcelService } from '../../services/services.index';

@Component({
  selector: 'app-usuarios-app-asesores',
  templateUrl: './usuarios-app-asesores.component.html',
  styles: []
})
export class UsuariosAppAsesoresComponent implements OnInit {

  visores: Visor;
  cargando: boolean = false;
  nuevo: boolean = false;
  desde: number = 0;
  totalResgitro: number = 0;

  constructor(
    private gps: GpsService,
    private excelService: ExcelService
  ) {
    this.obtenerTodos();
  }

  ngOnInit() {
  }

  obtenerTodos() {
    this.cargando = true;
    this.visores = null;
    this.totalResgitro = 0;
    this.gps.obtenerIMEIAsesorAll(this.desde).subscribe((visores: any) => {
      if (visores.ok) {
        this.visores = visores.usuarios;
        this.totalResgitro = visores.total;
        this.cargando = false;
      }
    });
  }

  actualizarVisor( visor: Visor ) {
    this.gps.actualizarUsusarioImei(visor).subscribe((actualizado: any) => {
      if (actualizado.ok) {
        swal('Usuario Actualizado', `El Usuario ${visor.nombre} se actualizo correctamente.`, 'success');
      } else {
        swal('Error de Actualización', `El Usuario ${actualizado.mensaje} no se actualizo correctamente.`, 'error');
      }
    });
  }

  borrarVisor( visor: Visor ) {
    this.gps.borrarUsuarioImei(visor._id).subscribe((eliminado: any) => {
      if (eliminado.ok) {
        swal('Usuario Eliminado', `Se elimino correctamente el usuario ${visor.nombre}.`, 'success');
      } else {
        swal('Error al Eliminar', eliminado.mensaje, 'error');
      }
    });
    this.desde = 0;
    this.obtenerTodos();
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if ( desde >= this.totalResgitro ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.obtenerTodos();
  }

  verMapa( visor: any ) {
    console.log(visor);
    swal('FUERA DE LINEA', 'ESTE SERVICIO AUN NO ESTA DISPONIBLE', 'warning');
  }

  nuevoVisor() {
    this.nuevo = true;
  }

  agregar(forma: NgForm) {
    if (forma.invalid) {
      swal('Sin Datos', 'Se necesita llenar todos los campos.', 'error');
      return;
    }
    this.nuevo = false;
    const enviar = new Visor(
      forma.value.idFerrum,
      forma.value.nombre,
      forma.value.imei,
      forma.value.email
    );
    this.gps.nuevoUsuarioIMEI(enviar).subscribe((guardado: any) => {
      if (guardado.status) {
        this.desde = 0;
        this.obtenerTodos();
        swal('Usuario Guardado', 'El usuario se guardo correctamente.', 'success');
      } else {
        swal('Error de Guardado', guardado.msg, 'error');
      }
    });
  }

  cancelar() {
    this.nuevo = false;
  }

  descargar() {
    this.gps.obtenerIMEIAsesorAllDonwload().subscribe((visores: any) => {
      if (visores.status) {
        this.excelService.exportAsExcelFile(visores.data, 'visores');
      }
    });
  }

}
