import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditoService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-mostrar-facturas-morosidad',
  templateUrl: './mostrar-facturas-morosidad.component.html',
  styles: []
})
export class MostrarFacturasMorosidadComponent implements OnInit {

  id: any;

  comentario: any = '';
  charla: any[] = [];

  nombre: any;
  numero: any;

  clienteId: any;
  folio: any;
  saldo: any;
  diasVen: any;

  mor1a28: any[] = [];
  mor29a45: any[] = [];
  mor46a60: any[] = [];
  mor60: any[] = [];

  mor128Bol: boolean = false;
  mor2945Bol: boolean = false;
  mor46a60Bol: boolean = false;
  mor60Bol: boolean = false;
  charlaBol: boolean = false;

  total: number = 0;

  constructor(
    private router: Router,
    private get: ActivatedRoute,
    private _creditoService: CreditoService,
    private _usuariosServices: UsuarioService
  ) {
    this.id = this._usuariosServices.usuario._id;

    this.nombre = this.get.snapshot.paramMap.get("nombre");
    this.numero = this.get.snapshot.paramMap.get("numero");

    this.obtenerMor1a28(this.get.snapshot.paramMap.get("clienteid"), 'mor1a28');
    this.obtenerMor29a45(this.get.snapshot.paramMap.get("clienteid"), 'mor29a45');
    this.obtenerMor46a60(this.get.snapshot.paramMap.get("clienteid"), 'mor46a60');
    this.obtenerMor60(this.get.snapshot.paramMap.get("clienteid"), 'mor60');
    this.obtenerTotal(this.get.snapshot.paramMap.get("clienteid"));

  }

  ngOnInit() {}

  obtenerMor1a28( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor1a28 = relacion;
      if (this.mor1a28.length === 0) {
        this.mor128Bol = false;
      } else {
        this.mor128Bol = true;
      }
    });


  }

  obtenerMor29a45( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor29a45 = relacion;
      if (this.mor29a45.length === 0) {
        this.mor2945Bol = false;
      } else {
        this.mor2945Bol = true;
      }
    });


  }

  obtenerMor46a60( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor46a60 = relacion;
      if (this.mor46a60.length === 0) {
        this.mor46a60Bol = false;
      } else {
        this.mor46a60Bol = true;
      }
    });


  }

  obtenerMor60( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor60 = relacion;
      if (this.mor60.length === 0) {
        this.mor60Bol = false;
      } else {
        this.mor60Bol = true;
      }
    });

  }

  obtenerTotal( clienteid: any ) {

    this._creditoService.clienteMorosoTotal(clienteid).subscribe( ( total: any ) => {
      this.total = total[0].importe;
    });

  }

  regresar() {
    this.router.navigate(['/infoBitacora/', this.get.snapshot.paramMap.get("tipo")]);
  }

}
