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

  constructor() { 
  }
  
  ngOnInit() {
    this.calcularAvance();
  }

  calcularAvance(){
    const porcentaje = (this.paso * 100) / this.pasos;
    if(porcentaje >= 0){
      this.avance = porcentaje;
    }else{
      this.avance = 100;
    }
    console.log(this.avance);
  }

  guardarAvance(cantidad: any){
    this.avance = cantidad;
    console.log(this.avance);
    this.paso = cantidad;
    const porcentaje = (this.paso * 100) / this.pasos;
    this.avance = porcentaje;
    const data = {
      paso: cantidad,
      _id: this.id
    };
    this.enviar.emit(data);
  }
}
