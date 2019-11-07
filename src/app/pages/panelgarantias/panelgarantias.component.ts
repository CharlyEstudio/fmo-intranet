import { Component, OnInit } from '@angular/core';

// Servicios
import { GarantiasService, WebsocketService } from '../../services/services.index';

@Component({
  selector: 'app-panelgarantias',
  templateUrl: './panelgarantias.component.html',
  styles: []
})
export class PanelgarantiasComponent implements OnInit {

  // nuevos: any[] = [];
  // proceso: any[] = [];
  // enviando: any[] = [];
  // autorizacion: any[] = [];
  // entregar: any[] = [];
  // terminado: any[] = [];
  estados: any[] = [];
  nuevos: number = 0;
  proceso: number = 0;
  enviando: number = 0;
  autorizacion: number = 0;
  entregar: number = 0;
  terminado: number = 0;

  constructor(
    private _garantiaService: GarantiasService,
    private _webSocket: WebsocketService
  ) {
    this.obtenerTodasGarantias();
    this._webSocket.escuchar('nueva-garantia').subscribe(acciones => this.obtenerTodasGarantias());
    this._webSocket.escuchar('seguimiento-garantia').subscribe(acciones => this.obtenerTodasGarantias());
  }

  ngOnInit() {
  }

  obtenerTodasGarantias() {
    this.estados = [];
    this.nuevos = 0;
    this.proceso = 0;
    this.enviando = 0;
    this.autorizacion = 0;
    this.entregar = 0;
    this.terminado = 0;
    this._garantiaService.obtenerGarantias().subscribe((gar: any) => {
      if (gar.length > 0) {
        this.estados = gar;
      }
    });
    this._garantiaService.obtenerGarantiasNuevos().subscribe((gar: any) => {
      if (gar.length > 0) {
        this.nuevos = gar.length;
      }
    });
    this._garantiaService.obtenerGarantiasProceso().subscribe((gar: any) => {
      if (gar.length > 0) {
        this.proceso = gar.length;
      }
    });
    this._garantiaService.obtenerGarantiasEnviando().subscribe((gar: any) => {
      if (gar.length > 0) {
        this.enviando = gar.length;
      }
    });
    this._garantiaService.obtenerGarantiasAutorizacion().subscribe((gar: any) => {
      if (gar.length > 0) {
        this.autorizacion = gar.length;
      }
    });
    this._garantiaService.obtenerGarantiasEntregar().subscribe((gar: any) => {
      if (gar.length > 0) {
        this.entregar = gar.length;
      }
    });
    this._garantiaService.obtenerGarantiasTerminado().subscribe((gar: any) => {
      if (gar.length > 0) {
        this.terminado = gar.length;
      }
    });
  }

    
  

}
