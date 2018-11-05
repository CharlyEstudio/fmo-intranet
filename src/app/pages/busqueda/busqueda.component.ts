import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];

  medicos: Medico[] = [];

  hospitales: Hospital[] = [];

  constructor(
    public activateRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activateRoute.params
      .subscribe( params => {
        let termino = params['termino'];
        this.buscar( termino );
      });
  }

  ngOnInit() {
  }

  buscar( termino: string ) {
    let url = URL_SERVICIO_GENERAL + ':3001/busqueda/todo/' + termino;
    this.http.get( url )
      .subscribe ( ( resp: any ) => {
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      });
  }

}
