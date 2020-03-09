import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class WebsocketService {

  public socketStatus = false;

  public usuario: Usuario;

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.cargarStorage();
    this.checkStatusServer();
  }

  checkStatusServer() {
    this.socket.on('connect', () => {
      console.log('Conectado al Servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del Servidor');
      this.socketStatus = false;
    });
  }

  acciones( evento: string, payload?: any, callback?: Function ) {
    this.socket.emit(evento, payload, callback);
  }

  escuchar( evento: string ) {
    return this.socket.fromEvent(evento);
  }

  login( usuario: Usuario ) {
    return new Promise( ( resolve, reject ) => {

      this.acciones( 'configurar-usuario', usuario, resp => {
        let usuarioSocket = {usuario, sala: usuario.rol};
        this.guardarStorage(usuarioSocket);
        resolve();
      });

    });
  }

  guardarStorage( usuario: any ) {
    localStorage.setItem('socketUsuario', JSON.stringify(usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('socketUsuario')) {
      let usuarioSocket = JSON.parse(localStorage.getItem('socketUsuario'));
      this.login(usuarioSocket);
    }
  }

}
