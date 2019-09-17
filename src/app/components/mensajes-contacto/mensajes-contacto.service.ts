import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MensajesContactoService {

  mensajes = new EventEmitter<any>();

  constructor() { }

}
