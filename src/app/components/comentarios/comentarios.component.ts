import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { CreditoService } from '../../services/services.index';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styles: []
})
export class ComentariosComponent implements OnInit {

  clienteid: any = 0;
  numero: string = '';
  nombre: string = '';
  idFerrum: string = '';
  asesor: string = '';
  inicio: any;
  fin: any;

  charla: any[] = [];

  error: boolean = false;
  charlaBol: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private ruta: Router,
    private _creditoService: CreditoService
  ) {
    this.clienteid = Number(this.router.snapshot.paramMap.get('clienteid'));
    this.numero = this.router.snapshot.paramMap.get('numero');
    this.nombre = this.router.snapshot.paramMap.get('nombre');
    this.idFerrum = this.router.snapshot.paramMap.get('idFerrum');
    this.asesor = this.router.snapshot.paramMap.get('asesor');
    this.inicio = this.router.snapshot.paramMap.get('inicio');
    this.fin = this.router.snapshot.paramMap.get('fin');

    this.obtenerComentarios();
  }

  ngOnInit() {
  }

  async obtenerComentarios() {
    const charla: any = await this._creditoService.obtenerComentarios(this.clienteid);
    if (charla.ok) {
      if (charla.charla.length > 0) {
        this.charlaBol = true;
        this.charla = charla.charla;
      } else {
        this.charlaBol = false;
      }
    } else {
      this.error = true;
    }
  }

  regresar() {
    this.ruta.navigate(['/boardComentarios/']);
  }

}
