import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsesoresService } from '../../services/services.index';

@Component({
  selector: 'app-pedido-vista',
  templateUrl: './pedido-vista.component.html',
  styles: []
})
export class PedidoVistaComponent implements OnInit {
  idFerrum: any;
  nombre: any;
  pedidos: any[] = [];

  constructor(
    private router: ActivatedRoute,
    private _asesoresService: AsesoresService
  ) { }

  ngOnInit() {
    this.idFerrum = this.router.snapshot.paramMap.get('id');
    this.nombre = this.router.snapshot.paramMap.get('nombre');

    // Pedidos del Día
    this._asesoresService.relacionPedidos(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.pedidos = resp;
      });
  }

}
