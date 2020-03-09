import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { GuiasPartidas } from '../../models/guias.model';

// Servicios
import { GuiasService, WebsocketService } from '../../services/services.index';

@Component({
  selector: 'app-rutas-guias',
  templateUrl: './rutas-guias.component.html',
  styles: []
})
export class RutasGuiasComponent implements OnInit {

  guias: GuiasPartidas[] = [];
  coordenadas: any[] = [];

  constructor(
    public router: Router,
    private _guiaService: GuiasService,
    private _socketService: WebsocketService
  ) {
    this._socketService.escuchar('guias-watch-send').subscribe((socket: any) => {
      this.obtenerGuias();
    });
  }

  ngOnInit() {
    this.obtenerGuias();
  }

  obtenerGuias() {
    let h = new Date();
    let dia;
    let mes;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    if ((h.getMonth() + 1) < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    const anio = h.getFullYear();
    const fecha = anio + '-' + mes + '-' + dia;

    this._guiaService.obtenerGuiasDia(fecha).subscribe((guias: any) => {
      if (guias.ok) {
        this.guias = guias.guias;
      }
    });
  }

  verRuta(guia: any) {
    this.router.navigate(['/verMapa/', JSON.stringify(guia)]);
  }

}
