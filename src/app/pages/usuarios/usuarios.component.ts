import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService, WebsocketService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  nom_asesor: any;
  id_asesor: any;
  idFerrum_asesor: any;

  idFerrum: number = 0;

  serie: number = 0;

  cat_cli: number = 0;

  desde: number = 0;

  totalResgitro: number = 0;

  cargando: boolean = true;

  constructor(
    private _webSocket: WebsocketService,
    public _usuarioService: UsuarioService,
    public _modalUpLoadService: ModalUploadService) {
      this._webSocket.escuchar('movil-aqui-estoy').subscribe((aqui: any) => {
        console.log(aqui);
      });
    }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUpLoadService.notificacion
      .subscribe( resp => this.cargarUsuarios());
  }

  mostraModal( id: string ) {
    this._modalUpLoadService.mostrarModal( 'usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
      .subscribe( ( resp: any ) => {
        this.totalResgitro = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      })
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

    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[] ) => {
        this.usuarios = usuarios;
        this.cargando = false;
      })
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }

    swal({
          title: '¿Está seguro?',
          text: 'Está a punto de borrar a ' + usuario.nombre,
          icon: 'warning',
          buttons: true,
          dangerMode: true
        }).then( borrar => {
          if ( borrar ) {
            this._usuarioService.borrarUsuario( usuario._id )
              .subscribe( borrado => {
                this.desde = 0;
                this._usuarioService.cargarUsuarios( this.desde );
                this.cargarUsuarios();
              });
          }
        });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsusario( usuario )
      .subscribe((act: any) => {
        if (act) {
          this._webSocket.acciones('usuario-cambio', usuario);
        }
      });
  }

  openPosition(usuario: Usuario) {
    console.log(usuario);
    this.nom_asesor = usuario.nombre;
    this.id_asesor = usuario._id;
    this.idFerrum_asesor = usuario.idFerrum;
    this._webSocket.acciones('movil-donde-estas', usuario);
  }

}
