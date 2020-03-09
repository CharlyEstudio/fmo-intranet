import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { PhpService } from '../../services/services.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-lista-morosidad',
  templateUrl: './lista-morosidad.component.html',
  styles: []
})
export class ListaMorosidadComponent implements OnInit {

  id: any;
  nombre: any;
  inicio: any;
  fin: any;

  datos: any[] = [];

  total: number = 0;

  constructor(
    private router: ActivatedRoute,
    private ruta: Router,
    private _phpService: PhpService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.id = this.router.snapshot.paramMap.get('id');

    this.nombre = this.router.snapshot.paramMap.get('nombre');

    this.inicio = this.router.snapshot.paramMap.get('inicio');

    this.fin = this.router.snapshot.paramMap.get('fin');

    this.solicitarLista(this.id, this.inicio, this.fin);

  }

  solicitarLista( id: any, inicio: any, fin: any ) {
    this._phpService.listaMorosidad(id, inicio, fin)
      .subscribe( ( resp: any ) => {
        this.datos = resp.resp;

        for ( let i = 0; i < resp.resp.length; i++) {
          this.total += parseFloat(resp.resp[i].total);
        }
      });
  }

  regresar() {
    if (this._usuarioService.usuario.rol !== 'ADMIN_ROLE') {
      this.ruta.navigate(['/dashboardAse']);
    } else {
      this.ruta.navigate(['/asesor-vista', this.id, this.nombre]);
    }
  }

}
