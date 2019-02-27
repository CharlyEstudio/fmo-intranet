import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { UsuarioService, ChoferesService } from '../../services/services.index';

@Component({
  selector: 'app-usuarios-choferes',
  templateUrl: './usuarios-choferes.component.html',
  styles: []
})
export class UsuariosChoferesComponent implements OnInit {

  choferes: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _choferService: ChoferesService
  ) {
    this._choferService.obtenerChoferes().subscribe((conductores: any) => {
      if (conductores.ok) {
        this.choferes = conductores.choferes;
      }
    });
  }

  ngOnInit() {
  }

  revisar(data: any) {
    console.table(data);
  }

  cobrado(data: any) {
    console.table(data);
  }

  pedidos(data: any) {
    console.table(data);
  }

  precomision(data: any) {
    console.table(data);
  }

}
