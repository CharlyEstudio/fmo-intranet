import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-avance',
  templateUrl: './barra-avance.component.html',
  styles: []
})
export class BarraAvanceComponent implements OnInit {
  @Input() pasos: number = 0;
  @Input() paso: number = 0;
  @Input() id: any;
  @Input() rol: any;
  @Output() enviar = new EventEmitter();

  avance:  number = 0;
  avance2:  number = 0;

  constructor() {
  }

  ngOnInit() {
    this.calcularAvance();
  }

  calcularAvance() {
    const porcentaje = (this.paso * 1) / this.pasos;
    const porcentaje2 = (this.paso * 100) / this.pasos;
    if (porcentaje2 >= 0) {
      this.avance = porcentaje;
      this.avance2 = porcentaje2;
    } else {
      this.avance = 1;
      this.avance2 = 100;
    }
  }

  guardarAvance(cantidad: any) {
    this.paso = cantidad;
    const porcentaje = (this.paso * 1) / this.pasos;
    this.avance = porcentaje;
    const porcentaje2 = (this.paso * 100) / this.pasos;
    this.avance2 = porcentaje2;
    const data = {
      paso: cantidad,
      _id: this.id
    };
    this.enviar.emit(data);
  }
}
