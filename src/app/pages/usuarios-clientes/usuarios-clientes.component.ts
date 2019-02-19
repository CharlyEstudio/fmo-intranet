import { Component, OnInit } from '@angular/core';

import { Cliente } from '../../models/clientes.model';
import { ClienteService, WebsocketService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios-clientes',
  templateUrl: './usuarios-clientes.component.html',
  styles: []
})
export class UsuariosClientesComponent implements OnInit {

  usuariosAutorizados: Cliente[] = [];
  usuariosPendientes: Cliente[] = [];

  idFerrum: number = 0;

  serie: number = 0;

  cat_cli: number = 0;

  desde: number = 0;

  totalResgitro: number = 0;
  totalPendientes: number = 0;

  cargando: boolean = true;

  constructor(
    private _clienteService: ClienteService,
    public _modalUpLoadService: ModalUploadService,
    private _webSocket: WebsocketService
  ) {
    this._webSocket.escuchar('registro-watch').subscribe(() => {
      this.cargarUsuarios();
      this.cargarUsuariosPendientes();
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarUsuariosPendientes();
    this._modalUpLoadService.notificacion
      .subscribe( resp => this.cargarUsuarios());
  }

  mostraModal( id: string ) {
    this._modalUpLoadService.mostrarModal( 'clientes', id);
  }

  cargarUsuarios() {
    this.usuariosAutorizados = [];
    this.cargando = true;

    this._clienteService.cargarUsuarios( this.desde )
      .subscribe( ( resp: any ) => {
        if (resp.ok) {
          for (let i = 0; i < resp.clientes.length; i++) {
            if (resp.clientes[i].activo === 'YES') {
              this.usuariosAutorizados.push(resp.clientes[i]);
            }
          }
          this.totalResgitro = resp.total;
          this.cargando = false;
        } else {
          this.cargando = false;
        }
      })
  }

  cargarUsuariosPendientes() {
    this.usuariosPendientes = [];
    this._clienteService.cargarUsuarios( this.desde )
      .subscribe( ( resp: any ) => {
        if (resp.ok) {
          for (let i = 0; i < resp.clientes.length; i++) {
            if (resp.clientes[i].activo !== 'YES') {
              this.usuariosPendientes.push(resp.clientes[i]);
            }
          }
          this.totalPendientes = this.usuariosPendientes.length;
        }
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

  // buscarUsuario( termino: string ) {
  //   if ( termino.length <= 0 ) {
  //     this.cargarUsuarios();
  //     return;
  //   }

  //   this.cargando = true;

  //   this._usuarioService.buscarUsuarios( termino )
  //     .subscribe( (usuarios: Usuario[] ) => {
  //       this.usuarios = usuarios;
  //       this.cargando = false;
  //     })
  // }

  // borrarUsuario( usuario: Cliente ) {
  //   if ( usuario._id === this._usuarioService.usuario._id ) {
  //     swal('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
  //     return;
  //   }

  //   swal({
  //         title: '¿Está seguro?',
  //         text: 'Está a punto de borrar a ' + usuario.nombre,
  //         icon: 'warning',
  //         buttons: true,
  //         dangerMode: true
  //       }).then( borrar => {
  //         if ( borrar ) {
  //           this._usuarioService.borrarUsuario( usuario._id )
  //             .subscribe( borrado => {
  //               this.desde = 0;
  //               this._usuarioService.cargarUsuarios( this.desde );
  //               this.cargarUsuarios();
  //             });
  //         }
  //       });
  // }

  guardarUsuario( cliente: Cliente ) {
    this._clienteService.actualizarUsusario( cliente )
      .subscribe(() => {
        this._webSocket.acciones('registro-watch', cliente);
      });
  }

  borrarUsuario( usuario: Cliente ) {
    swal({
          title: '¿Está seguro?',
          text: 'Está a punto de borrar a ' + usuario.nombre,
          icon: 'warning',
          buttons: true,
          dangerMode: true
        }).then( borrar => {
          if ( borrar ) {
            this._clienteService.borrarUsuario( usuario._id )
              .subscribe( borrado => {
                this.cargarUsuarios();
                this.cargarUsuariosPendientes();
              });
          }
        });
  }

}
