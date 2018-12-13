import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditoService } from '../../services/services.index';

@Component({
  selector: 'app-mostrar-info-bitacora',
  templateUrl: './mostrar-info-bitacora.component.html',
  styles: []
})
export class MostrarInfoBitacoraComponent implements OnInit {

  morosidad: any[] = [];
  tipo: any;

  constructor(
    private router: Router,
    private get: ActivatedRoute,
    private _creditoService: CreditoService
  ) {
    this.tipo = this.get.snapshot.paramMap.get("data");
    this.obtener(this.tipo);
  }

  ngOnInit() {
  }

  obtener( morosidad: any ) {

    this._creditoService.morosidadRelacion(morosidad).subscribe( ( relacion: any ) => {
      this.morosidad = relacion;
    });

  }

  irInfo( data: any ) {
    this.router.navigate(['/infoFacturas/', data.clienteid, data.nombre, data.numero, this.tipo]);
  }

  regresar() {
    this.router.navigate(['/direccionCuentas/']);
  }

}
