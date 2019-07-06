import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { ActividadesService } from '../../services/actividades/actividades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styles: []
})
export class ActividadesComponent implements OnInit {

  act1: any[] = [];
  idferrum: any;
  
  linecolorActividades: Array<any> = [
    {
      backgroundColor :  'rgba(206, 52, 76, 0.2)',
      borderColor: 'rgba(206, 52, 76, 1)',
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(206, 52, 76, 0.8)'
    }
  ];

  linelabelActividades: Array<any> = [];

  linedataActividades: Array<any> = [
    {
      data: [],
      label: 'Actividades'
    }
  ];

  lineoptionsActividades: any = {
    responsive: true
  }

  constructor(
    public _usuarioService: UsuarioService,
    public _actividades: ActividadesService
  ) { 
    this.idferrum = this._usuarioService.usuario.idFerrum;
    this.check();
  }

  ngOnInit() {
  }

 check(){
  this.act1 = [];
   this._actividades.actividades(this.idferrum).subscribe((datos_act: any) => {
      this.act1 = datos_act;
      console.log(this.act1);
      // this.linedataActividades[0].data = [];
      for(let i=0; i<this.act1.length; i++){
        this.linedataActividades[0].data[i] = this.act1[i].terminado === 'SI' ? 1 : 0;
        this.linelabelActividades[i] = this.act1[i].id_actividad;
      }
      console.log(this.linedataActividades);
    //console.log(this.act1);
    //return this.act1;
   });
 }

 guardar(d1: any, comentario: any){
  this._actividades.guarda(d1.id_actividad, comentario).subscribe((save: any)=>{
    //console.log(d1.comentario);
    d1.terminado = 'SI';
    d1.comentario = comentario;
  });
}

guardarhistorial(d1: any, comentario: any, d2: any){
  console.log(d1.id_usuario);
  //console.log(d2.id_usuario);
  this._actividades.guardahistorial(d1.id_actividad, comentario,d1.id_usuario).subscribe((save: any)=>{
   
  });
}


}
