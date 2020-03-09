import { Component, OnInit } from '@angular/core';

// Servicios
import { HerramientasService } from '../../services/services.index';

@Component({
  selector: 'app-diarios',
  templateUrl: './diarios.component.html',
  styles: []
})
export class DiariosComponent implements OnInit {

  asesoresVtas: any[] = [];
  cobradores: any[] = [];
  clientesComprando: any[] = [];
  clientesPagando: any[] = [];

  constructor(
    private herramientas: HerramientasService
  ) {}

  ngOnInit() {
  }

}
