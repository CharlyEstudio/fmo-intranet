import { Component, OnInit } from '@angular/core';
import { AsesoresService, WebsocketService, TiendaService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard-ase',
  templateUrl: './dasboard-ase.component.html',
  styles: []
})
export class DasboardAseComponent implements OnInit {

  // Día
  fecha: number = Date.now();
  fec: any;

  datos: any[] = [];
  asesor: string;
  email: string;
  id: any;
  idFerrum: any;
  zona: any;

  // Pedidos
  porBajar: number = 0;
  porBajarNumero: number = 0;
  porSurtir: number = 0;
  porSurtirNumero: number = 0;
  facturado: number = 0;
  facturadoNumero: number = 0;
  cancelados: number = 0;
  canceladosNumero: number = 0;
  total: number = 0;
  totalNumero: number = 0;
  web: number = 0;
  webNumero: number = 0;
  pedidoWeb: any[] = [];

  // Datos
  diaVisita: number = 0;
  ventaMensual: number = 0;
  ventaMnesualAnterior: number = 0;
  carteraTotal: number = 0;
  carteraVencida: number = 0;
  carteraVencidaSana: number = 0;
  carteraDia: number = 0;
  cobroDia: number = 0;
  clientesPedidosDeferenteDia: number = 0;
  clientesPedidosDia: number = 0;

  // Morosidad
  mor130: number = 0;
  mor3145: number = 0;
  mor4660: number = 0;
  mor6190: number = 0;
  mor91120: number = 0;
  mor121: number = 0;

  constructor(
    private router: Router,
    private _asesoresServices: AsesoresService,
    private _tiendaService: TiendaService,
    private _webSocket: WebsocketService
  ) {
    this.datos = JSON.parse(localStorage.getItem('usuario'));

    let h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if ((h.getMonth() + 1) < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    this.fec = anio + '-' + mes + '-' + dia;

    this.asesor = this.datos["nombre"];
    this.id = this.datos["_id"];
    // this.idFerrum = this.datos["idFerrum"];
    this.idFerrum = 11;

    this._tiendaService.obtenerPedidosWeb(this.idFerrum).subscribe((web: any) => {
      if (web.resp.length > 0) {
        this.webNumero = 0;
        this.web = 0;
        this.pedidoWeb = [];
        this.webNumero = web.resp.length;
        this.pedidoWeb = web.resp;
        for (let i = 0; i < web.resp.length; i++) {
          this.web += (web.resp[i].SUBTOTAL1 + web.resp[i].SUBTOTAL2);
        }
      }
    });

    this._webSocket.escuchar('aviso-asesor-send').subscribe((resp: any) => {
      if (resp.cliente.perid === this.id) {
        this._tiendaService.obtenerPedidosWeb(this.idFerrum).subscribe((web: any) => {
          if (web.resp.length > 0) {
            this.webNumero = 0;
            this.web = 0;
            this.pedidoWeb = [];
            this.webNumero = web.resp.length;
            this.pedidoWeb = web.resp;
            for (let i = 0; i < web.resp.length; i++) {
              this.web += (web.resp[i].SUBTOTAL1 + web.resp[i].SUBTOTAL2);
            }
          }
        });
      }
    });
  }

  verPedidosWeb() {
    const data = JSON.stringify(this.pedidoWeb);
    this.router.navigate(['/ped-web', data]);
  }

  ngOnInit() {
    // Zona Asesor
    this._asesoresServices.zonaAsesor(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.zona = resp.resp.zona;
      });

    // Pedidos
    this._asesoresServices.porBajar(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.porBajar = resp.resp.importe;
        this.porBajarNumero = resp.resp.cantidad;
      });

    this._asesoresServices.porSurtir(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.porSurtir = resp.resp.importe;
        this.porSurtirNumero = resp.resp.cantidad;
      });

    this._asesoresServices.facturado(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.facturado = resp.resp.importe;
        this.facturadoNumero = resp.resp.cantidad;
      });

    this._asesoresServices.cancelados(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.cancelados = resp.resp.importe;
        this.canceladosNumero = resp.resp.cantidad;
      });

    this._asesoresServices.pedidosTotales(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.total = resp.resp.importe;
        this.totalNumero = resp.resp.cantidad;
      });

    // Datos
    this._asesoresServices.diaVisita(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.diaVisita = resp.resp.cantidad;
      });

    this._asesoresServices.ventaMensual(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.ventaMensual = resp.resp.subtotal;
      });

    this._asesoresServices.carteraTotal(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.carteraTotal = resp.resp.saldo;
      });

    this._asesoresServices.carteraVencida(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.carteraVencida = resp.resp.importe;
      });

    this._asesoresServices.carteraVencDia(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.carteraVencidaSana = resp.resp.importe;
      });

    this._asesoresServices.carteraSanaDia(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.carteraDia = resp.resp.importe;
      });

    this._asesoresServices.cobroDia(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.cobroDia = resp.resp.importe;
      });

    this._asesoresServices.pedidosDiaDiferente(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.clientesPedidosDeferenteDia = resp.resp.length;
      });

    this._asesoresServices.pedidosDia(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.clientesPedidosDia = resp.resp.length;
      });

    this._asesoresServices.ventaMesAnterior(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.ventaMnesualAnterior = resp.resp.importe;
      });

    // Morosidad
    this._asesoresServices.morosidad130(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.mor130 = resp.resp.importe;
      });

    this._asesoresServices.morosidad3145(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.mor3145 = resp.resp.importe;
      });

    this._asesoresServices.morosidad4660(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.mor4660 = resp.resp.importe;
      });

    this._asesoresServices.morosidad6190(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.mor6190 = resp.resp.importe;
      });

    this._asesoresServices.morosidad91120(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.mor91120 = resp.resp.importe;
      });

    this._asesoresServices.morosidad121(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.mor121 = resp.resp.importe;
      });

  }

  solicitarLista( inicio: any, fin: any = '' ) {
    this.router.navigate(['/lista-morosidad/', this.idFerrum, this.asesor, inicio, fin]);
  }

}
