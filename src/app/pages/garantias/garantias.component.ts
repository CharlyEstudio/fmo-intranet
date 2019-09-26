import { Component, OnInit } from '@angular/core';

// Servicios
import { GarantiasService } from '../../services/services.index';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styles: []
})
export class GarantiasComponent implements OnInit {

  garantias: any[] = [];

  constructor(
    private _garantiaService: GarantiasService
  ) {
    this.obtenerTodasGarantias();
  }

  ngOnInit() {
  }

  obtenerTodasGarantias() {
    this._garantiaService.obtenerGarantiasAll().subscribe((gar: any) => {
      if (gar.length > 0) {
        console.log(gar);
        this.garantias = gar;
      }
    });
  }

}
