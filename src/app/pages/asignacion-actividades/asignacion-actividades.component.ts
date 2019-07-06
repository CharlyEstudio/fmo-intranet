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
     this._actividades.asignacion().subscribe((asignacion: any) => {
        this.info = asignacion;
        console.log(this.info);
     });
   }
}
