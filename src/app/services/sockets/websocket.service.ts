import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Injectable()
export class WebsocketService {

  socketStatus: boolean = false;

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.checkStatusServer();
  }

  checkStatusServer() {
    this.socket.on('connect', () => {
      console.log('Conectado al Servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del Servidor');
      this.socketStatus = false;
      this.router.navigateByUrl('/login');
    });
  }

  acciones( evento: string, payload?: any, callback?: Function ) {
    this.socket.emit(evento, payload, callback);
  }

  escuchar( evento: string ) {
    return this.socket.fromEvent(evento);
  }

}
