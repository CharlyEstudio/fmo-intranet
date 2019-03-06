import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Modelos
import { Chofer } from '../../models/chofer.model';

// Servicios
import { UsuarioService, ChoferesService, WebsocketService } from '../../services/services.index';

// Modal
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios-choferes',
  templateUrl: './usuarios-choferes.component.html',
  styles: []
})
export class UsuariosChoferesComponent implements OnInit {

  choferes: Chofer;
  cargando: boolean = false;
  nuevo: boolean = false;
  totalResgitro: number = 0;
  desde: number = 0;

  constructor(
    private _usuarioService: UsuarioService,
    private _choferService: ChoferesService,
    private _webSocket: WebsocketService,
    public _modalUpLoadService: ModalUploadService
  ) {
    this.cargarChoferes();
  }

  cargarChoferes() {
    this.cargando = true;
    this.choferes = null;
    this.totalResgitro = 0;
    this._choferService.obtenerChoferes(this.desde).subscribe((conductores: any) => {
      if (conductores.ok) {
        this.choferes = conductores.choferes;
        this.totalResgitro = conductores.total;
        this.cargando = false;
      }
    });
  }

  ngOnInit() {
    this._modalUpLoadService.notificacion
      .subscribe( resp => this.cargarChoferes());
  }

  mostraModal(id: string) {
    this._modalUpLoadService.mostrarModal( 'choferes', id);
  }

  borrarChofer(chofer: Chofer) {
    this._choferService.borrarUsuario(chofer._id).subscribe((resp: any) => {
      if (resp.ok) {
        swal('¡Usuario Borrado!', 'El usuario ha sido eliminado correctamente', 'success');
      } else {
        swal(resp.mensaje, resp.errors.mensaje, 'success');
      }
      this.cargarChoferes();
    });
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

    this.cargarChoferes();
  }

  nuevoChofer() {
    this.nuevo = true;
  }

  agregar(forma: NgForm) {
    if (forma.invalid) {
      swal('Sin Datos', 'Se necesita llenar todos los campos.', 'error');
      return;
    }
    this.nuevo = false;
    const enviar = new Chofer(
      forma.value.nombre,
      forma.value.zona,
      forma.value.imei
    );
    this._choferService.crearChofer(enviar, this._usuarioService.usuario).subscribe((resp: any) => {
      if (resp.ok) {
        swal ('Chofer creado', resp.chofer.nombre + '.', 'success');
        this.cargarChoferes();
      } else {
        swal(resp.mensaje , resp.errors.err, 'error');
      }
    });
  }

  actualizarUsuario( chofer: Chofer ) {
    this._choferService.actualizarUsusario( chofer )
      .subscribe((resp: any) => {
        if (resp.ok) {
          this._webSocket.acciones('centinela-chofer', resp.chofer);
          swal('Usuario Actualizado!', resp.chofer.nombre, 'success');
        } else {
          swal(resp.mensaje , resp.errors.message, 'error');
        }
      });
  }

  cancelar() {
    this.nuevo = false;
  }

}
