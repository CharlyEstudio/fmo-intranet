import { Component, OnInit } from '@angular/core';

// Servicios
import { PaneldiariosService, HerramientasService } from '../../services/services.index';

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
    private panelDiario: PaneldiariosService,
    private herramientas: HerramientasService
  ) {
    this.obtener3Mejores();
    this.obtener3Cobradores();
    this.obtener3ClientesComprando();
    this.obtener3ClientesPagando();
  }

  ngOnInit() {
  }

  obtener3Mejores() {
    this.panelDiario.mejoresAsesores(this.herramientas.fechaInicialMesActual(), this.herramientas.fechaActual()).subscribe((asesores: any) => {
      if (asesores.length > 0) {
        this.asesoresVtas = asesores;
      }
    });
  }

  obtener3Cobradores() {
    this.panelDiario.mejoresCobradores(this.herramientas.fechaInicialMesActual(), this.herramientas.fechaActual()).subscribe((cobradores: any) => {
      if (cobradores.length > 0) {
        this.cobradores = cobradores;
      }
    });
  }

  obtener3ClientesComprando() {
    this.panelDiario.mejoresComprando(this.herramientas.fechaInicialMesActual(), this.herramientas.fechaActual()).subscribe((comprando: any) => {
      if (comprando.length > 0) {
        this.clientesComprando = comprando;
      }
    });
  }

  obtener3ClientesPagando() {
    this.panelDiario.mejoresPagando(this.herramientas.fechaInicialMesActual(), this.herramientas.fechaActual()).subscribe((pagando: any) => {
      if (pagando.length > 0) {
        this.clientesPagando = pagando;
      }
    });
  }

}
