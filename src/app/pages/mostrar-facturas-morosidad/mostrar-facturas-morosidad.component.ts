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

  numEnv: any;

  clienteId: any;
  folio: any;
  saldo: any;
  diasVen: any;
  fecha: any;
  cliID: any;

  mor1a30: any[] = [];
  mor31a45: any[] = [];
  mor46a60: any[] = [];
  mor61a90: any[] = [];
  mor91a120: any[] = [];
  mor120: any[] = [];

  mor130Bol: boolean = false;
  mor3145Bol: boolean = false;
  mor46a60Bol: boolean = false;
  mor61a90Bol: boolean = false;
  mor91a120Bol: boolean = false;
  mor120Bol: boolean = false;
  charlaBol: boolean = false;
  local: boolean = false;

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

    this.obtenerMor1a30(this.get.snapshot.paramMap.get("clienteid"), 'mor1a30');
    this.obtenerMor31a45(this.get.snapshot.paramMap.get("clienteid"), 'mor31a45');
    this.obtenerMor46a60(this.get.snapshot.paramMap.get("clienteid"), 'mor46a60');
    this.obtenerMor61a90(this.get.snapshot.paramMap.get("clienteid"), 'mor61a90');
    this.obtenerMor91a120(this.get.snapshot.paramMap.get("clienteid"), 'mor91a120');
    this.obtenerMor120(this.get.snapshot.paramMap.get("clienteid"), 'mor120');
    this.obtenerTotal(this.get.snapshot.paramMap.get("clienteid"));

  }

  ngOnInit() {}

  obtenerMor1a30( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor1a30 = relacion;
      if (this.mor1a30.length === 0) {
        this.mor130Bol = false;
      } else {
        this.mor130Bol = true;
      }
    });


  }

  obtenerMor31a45( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor31a45 = relacion;
      if (this.mor31a45.length === 0) {
        this.mor3145Bol = false;
      } else {
        this.mor3145Bol = true;
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

  obtenerMor61a90( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor61a90 = relacion;
      if (this.mor61a90.length === 0) {
        this.mor61a90Bol = false;
      } else {
        this.mor61a90Bol = true;
      }
    });

  }

  obtenerMor91a120( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor91a120 = relacion;
      if (this.mor91a120.length === 0) {
        this.mor91a120Bol = false;
      } else {
        this.mor91a120Bol = true;
      }
    });

  }

  obtenerMor120( clienteid: any, tipo: any ) {

    this._creditoService.clienteMoroso(clienteid, tipo).subscribe( ( relacion: any ) => {
      this.mor120 = relacion;
      if (this.mor120.length === 0) {
        this.mor120Bol = false;
      } else {
        this.mor120Bol = true;
      }
    });

  }

  obtenerTotal( clienteid: any ) {

    this._creditoService.clienteMorosoTotal(clienteid).subscribe( ( total: any ) => {
      this.total = total.importe;
    });

  }

  regresar() {
    this.router.navigate(['/infoBitacora/', this.get.snapshot.paramMap.get("tipo")]);
  }

  modalEdoCta(numero: any) {
    this.numEnv = numero;
  }

  modalMovimietos(folio: any, saldo: any) {
    this.folio = folio;
    this.saldo = saldo;
  }

}
