import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PedFacturadosService {

  importe = new EventEmitter();

  constructor() { }

}
