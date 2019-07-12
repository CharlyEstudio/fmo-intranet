import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DiferenciasService {

  public notificacion = new EventEmitter<any>();

  constructor() { }

}
