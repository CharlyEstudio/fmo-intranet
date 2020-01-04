import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ServidorService {

  public notificacion = new EventEmitter<any>();

  db: string = '';

  constructor() {
    this.cargarStorage();
  }

  obtenerDB() {
    return this.db;
  }

  cambiarServidor(servidor: any) {
    this.db = servidor;
    localStorage.setItem('db', servidor);
  }

  cargarStorage() {
    if (localStorage.getItem('db') !== null) {
      this.db = localStorage.getItem('db');
    } else {
      localStorage.setItem('db', 'datosb');
      this.db = 'datosb';
    }
  }

}
