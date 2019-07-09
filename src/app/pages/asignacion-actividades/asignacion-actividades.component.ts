import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades/actividades.service';
import { UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-asignacion-actividades',
  templateUrl: './asignacion-actividades.component.html',
  styles: []
})
export class AsignacionActividadesComponent implements OnInit {
  
  info: any[] = [];
  idferrum: any;
  labels: any[] = ['SI', 'NO'];

  grafica: any = {
    'datos': {
      'labels': ['SI', 'NO'],
      'data':  [0, 0],
      'type': 'doughnut',
      'leyenda': 'General'
    }
  };

  constructor(
    public _usuarioService: UsuarioService,
    public _actividades: ActividadesService
  ) { 
    this.idferrum = this._usuarioService.usuario.idFerrum;
    this.asignacion_act();
  }

  ngOnInit() {
  }

  asignacion_act(){
    this.info = [];
    this.grafica = {
      'datos': {
        'labels': ['SI', 'NO'],
        'data':  [0, 0],
        'type': 'doughnut',
        'leyenda': 'General'
      }
    };
     this._actividades.asignacion().subscribe((asignacion: any) => {
        
        console.log(asignacion);
        for(let i=0; i<asignacion.length; i++){

          const dato = {
            'Nombre': asignacion[i].Nombre,
            'datos': {
              'labels': ['SI', 'NO'],
              'data':  [asignacion[i].Cantidad_si,asignacion[i].Cantidad_no],
              'type': 'doughnut',
              'leyenda': 'General'
            }
          };

          this.info.push(dato);
          
        }
     });
   }
}
