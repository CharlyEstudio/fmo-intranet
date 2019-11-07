import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TablachdevService {

  actualizar = new EventEmitter();

  constructor() { }

}
