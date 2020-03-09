import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

import { AsesoresService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-pre-comision',
  templateUrl: './pre-comision.component.html',
  styles: []
})
export class PreComisionComponent implements OnInit, OnDestroy {

  // Día
  fecha: number = Date.now();

  observar: Subscription;
  intervalo: any;
  datos: any[] = [];

  usuario: any;
  idFerrum: any;
  nombre: any;
  asesor: any[] = [];
  zona: any;
  gasolina: number = 0;
  sueldoGarantia: number = 3500;

  // Totales
  comisionVenta: number = 0;
  comisionTruperCobrado: number = 0;
  comisionFmoCobrado: number = 0;
  penalizacionCartera: number = 0;
  comisionCobertura: number = 0;
  comisionRenglonaje: number = 0;
  comisionGeneral: number = 0;
  carteraGeneral: number = 0;
  devolucionesGeneral: number = 0;
  penalizacionPedidos: number = 0;
  totalComisionPagar: number = 0;

  // Booleanos
  aparece: boolean = false;
  esperar: boolean = false;
  default: boolean = true;

  // Datos para comisión
  ventaMensual: number = 0;
  notasCredito: number = 0;
  bonificaciones: number = 0;
  ventaFinal: number = 0;
  cobroTruper: any[] = [];
  cobroFmo: any[] = [];
  totalRangoTruper: number = 0;
  totalRangoFmo: number = 0;
  carteraTotal: number = 0;
  porVencer: number = 0;
  vencida: number = 0;
  totaClientes: number = 0;
  coberturaCantidad: number = 0;
  cobertura: any[] = [];
  telefono: number = 0;

  // Devoluciones
  devoluciones: number = 0;
  porDevoluciones: number = 0.0002;

  // Renglonaje
  renglonaje: number = 0;
  ren1000: number = 0;
  ren2000: number = 0;
  ren4000: number = 0;
  ren6000: number = 0;
  ren6001: number = 0;
  tasa1000: number = 0.0010;
  tasa2000: number = 0.0020;
  tasa4000: number = 0.0050;
  tasa6000: number = 0.01;
  tasa6001: number = 0.02;

  // Cantidad de Ventas por clientes
  cant1: number = 0;
  cant2: number = 0;
  neg1: number = -10;
  pos2: number = 30;
  negSinVenta: number = -25;

  // Morosidad Rangos
  de1a8: number = 0;
  de9a16: number = 0;
  de17: number = 0;

  // Porcentaje Morosidad Rangos
  por1a8: number = 0.00015;
  por9a16: number = 0.00020;
  por17: number = 0.00040;

  // Rangos Truper
  de0a2Truper: number = 0;
  de3a7Truper: number = 0;
  de8a14Truper: number = 0;
  de15a21Truper: number = 0;
  de22a31Truper: number = 0;
  de32Truper: number = 0;

  // Rangos FMO
  de0a2Fmo: number = 0;
  de3a7Fmo: number = 0;
  de8a14Fmo: number = 0;
  de15a21Fmo: number = 0;
  de22a31Fmo: number = 0;
  de32Fmo: number = 0;

  // Porcentaje Venta Final
  porVentafInal: number = 0.0035;

  // Porcentajes Cobro Truper
  por0a2Truper: number = 0.03;
  por3a7Truper: number = 0.025;
  por8a14Truper: number = 0.02;
  por15a21Truper: number = 0.018;
  por22a31Truper: number = 0.013;
  por32Truper: number = 0.005;

  // Porcentajes Cobro Fmo
  por0a2Fmo: number = 0.025;
  por3a7Fmo: number = 0.019;
  por8a14Fmo: number = 0.014;
  por15a21Fmo: number = 0.009;
  por22a31Fmo: number = 0.005;
  por32Fmo: number = 0.005;

  // Dias Pedido Penalización
  semana1: number = 0;
  semana2: number = 0;
  semana3: number = 0;
  semana4: number = 0;
  dia1: any[] = [];
  dia2: any[] = [];
  dia3: any[] = [];
  dia4: any[] = [];
  dia5: any[] = [];
  dia6: any[] = [];
  dia7: any[] = [];
  dia8: any[] = [];
  dia9: any[] = [];
  dia10: any[] = [];
  dia11: any[] = [];
  dia12: any[] = [];
  dia13: any[] = [];
  dia14: any[] = [];
  dia15: any[] = [];
  dia16: any[] = [];
  dia17: any[] = [];
  dia18: any[] = [];
  dia19: any[] = [];
  dia20: any[] = [];
  dia21: any[] = [];
  dia22: any[] = [];
  dia23: any[] = [];
  dia24: any[] = [];
  dia25: any[] = [];
  dia26: any[] = [];
  dia27: any[] = [];
  dia28: any[] = [];
  dia29: any[] = [];
  dia30: any[] = [];
  dia31: any[] = [];

  constructor(
    private _asesorService: AsesoresService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;

    this.asesor = JSON.parse(localStorage.getItem('usuario'));

    this.nombre = this.asesor["nombre"];
    this.idFerrum = this.asesor["idFerrum"];

    // Zona Asesor
    this._asesorService.zonaAsesor(this.idFerrum)
      .subscribe( ( resp: any ) => {
        this.zona = resp.resp.zona;
      });

  }

  ngOnDestroy() {
    // this.observar.unsubscribe();
  }

  // regresa(): Observable<any> {
  //   return new Observable((observer: Subscriber<any>) => {
  //     this.intervalo = setTimeout(() => {
  //       // Venta Mensual
  //       this._asesorService.ventaBruta(this.idFerrum)
  //       .subscribe( ( resp: any ) => {
  //         const ventaMensual = {
  //           'ventaMensual': resp[0].subtotal
  //         };
  //         observer.next(ventaMensual);
  //       });

  //       // Devoluciones
  //       this._asesorService.devoluciones(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const devoluciones = {
  //             'devoluciones': resp[0].importe
  //           };
  //           observer.next(devoluciones);
  //         });

  //       // Notas de Crédito
  //       this._asesorService.notasCredito(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const notasCredito = {
  //             'notasCredito': resp[0].importe
  //           };
  //           observer.next(notasCredito);
  //         });

  //       // Bonificacion
  //       this._asesorService.bonificacion(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const bonificaciones = {
  //             'bonificaciones': resp[0].importe
  //           };
  //           observer.next(bonificaciones);
  //         });

  //       // Cobro del Mes en Rangos Truper
  //       this._asesorService.cobroMes(this.idFerrum, 'TRUPER')
  //         .subscribe( ( resp: any ) => {
  //           const cobroTruper = {
  //             'cobroTruper': resp
  //           };
  //           observer.next(cobroTruper);
  //         });

  //       // Cobro del Mes en Rangos Fmo
  //       this._asesorService.cobroMes(this.idFerrum, 'FMO')
  //       .subscribe( ( resp: any ) => {
  //         const cobroFmo = {
  //           'cobroFmo': resp
  //         };
  //         observer.next(cobroFmo);
  //       });

  //       // Cartera Total
  //       this._asesorService.carteraTotal(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const carteraTotal = {
  //             'carteraTotal': resp[0].saldo
  //           };
  //           observer.next(carteraTotal);
  //         });

  //       // Por Vencer
  //       this._asesorService.porVencer(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const porVencer = {
  //             'porVencer': resp[0].importe
  //           };
  //           observer.next(porVencer);
  //         });

  //       // Cartera Vencida
  //       this._asesorService.carteraVencida(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const vencida = {
  //             'vencida': resp[0].importe
  //           };
  //           observer.next(vencida);
  //         });

  //       // Vencido Comisión de 1 a 8 días
  //       this._asesorService.vencidoComision1a8(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const de1a8 = {
  //             'de1a8': resp[0].importe
  //           };
  //           observer.next(de1a8);
  //         });

  //       // Vencido Comisión de 9 a 16 días
  //       this._asesorService.vencidoComision9a16(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const de9a16 = {
  //             'de9a16': resp[0].importe
  //           };
  //           observer.next(de9a16);
  //         });

  //       // Vencido Comisión de 17 a más días
  //       this._asesorService.vencidoComision17(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const de17 = {
  //             'de17': resp[0].importe
  //           };
  //           observer.next(de17);
  //         });

  //       // Totla de Clientes del Asesor
  //       this._asesorService.totalClientesAsesor(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const totaClientes = {
  //             'totaClientes': resp[0].cantidad
  //           };
  //           observer.next(totaClientes);
  //         });

  //       // Cobertura en Ventas
  //       this._asesorService.coberturaVentas(this.idFerrum)
  //       .subscribe( (resp: any ) => {
  //         const cobertura = {
  //           'cobertura': resp
  //         };
  //         observer.next(cobertura);
  //       });

  //       // Renglonaje
  //       this._asesorService.reglonaje(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const renglonaje = {
  //             'renglonaje': resp
  //           };
  //           observer.next(renglonaje);
  //         });

  //       // Penalización Pedidos
  //       this._asesorService.penalizacionPedidos(this.idFerrum)
  //         .subscribe( ( resp: any ) => {
  //           const penalizacionPedidos = {
  //             'penalizacionPedidos': resp
  //           };
  //           observer.next(penalizacionPedidos);
  //         });
  //     }, 1000);
  //   })
  //   .retry()
  //   .map((resp) => {
  //     return resp;
  //   });
  // }

  // obtener() {

  //   this.esperar = true;

  //   // Subscrión al Observador
  //   this.observar =  this.regresa().subscribe(
  //     numero => {
  //       this.promover(numero);
  //     },
  //     error => console.error('Error en el obs', error),
  //     () => console.log('El observador termino!')
  //   );

  // }

  // promover( datos: any ) {

  //   if (datos.ventaMensual !== undefined) {
  //     this.ventaMensual = datos.ventaMensual;
  //   }

  //   if (datos.devoluciones !== undefined) {
  //     this.devoluciones = datos.devoluciones;
  //   }

  //   if (datos.bonificaciones !== undefined) {
  //     this.bonificaciones = datos.bonificaciones;
  //   }

  //   if (datos.notasCredito !== undefined) {
  //     this.notasCredito = datos.notasCredito;
  //   }

  //   if (datos.carteraTotal !== undefined) {
  //     this.carteraTotal = datos.carteraTotal;
  //   }

  //   if (datos.totaClientes !== undefined) {
  //     this.totaClientes = datos.totaClientes;
  //   }

  //   if (datos.de1a8 !== undefined) {
  //     this.de1a8 = datos.de1a8;
  //   }

  //   if (datos.de9a16 !== undefined) {
  //     this.de9a16 = datos.de9a16;
  //   }

  //   if (datos.de17 !== undefined) {
  //     this.de17 = datos.de17;
  //   }

  //   if (datos.vencida !== undefined) {
  //     this.vencida = datos.vencida;
  //   }

  //   if (datos.porVencer !== undefined) {
  //     this.porVencer = datos.porVencer;
  //   }

  //   if (datos.cobroTruper !== undefined) {
  //     this.cobroTruper = datos.cobroTruper;
  //     for (let i = 0; i < this.cobroTruper.length; i++) {
  //       if (this.cobroTruper[i].dias_para_pagar >= 0 && this.cobroTruper[i].dias_para_pagar <= 2) {
  //         this.de0a2Truper += this.cobroTruper[i].totalTRUPER;
  //       }

  //       if (this.cobroTruper[i].dias_para_pagar >= 3 && this.cobroTruper[i].dias_para_pagar <= 7) {
  //         this.de3a7Truper += this.cobroTruper[i].totalTRUPER;
  //       }

  //       if (this.cobroTruper[i].dias_para_pagar >= 8 && this.cobroTruper[i].dias_para_pagar <= 14) {
  //         this.de8a14Truper += this.cobroTruper[i].totalTRUPER;
  //       }

  //       if (this.cobroTruper[i].dias_para_pagar >= 15 && this.cobroTruper[i].dias_para_pagar <= 21) {
  //         this.de15a21Truper += this.cobroTruper[i].totalTRUPER;
  //       }

  //       if (this.cobroTruper[i].dias_para_pagar >= 22 && this.cobroTruper[i].dias_para_pagar <= 31) {
  //         this.de22a31Truper += this.cobroTruper[i].totalTRUPER;
  //       }

  //       if (this.cobroTruper[i].dias_para_pagar >= 32) {
  //         this.de32Truper += this.cobroTruper[i].totalTRUPER;
  //       }

  //       this.totalRangoTruper += this.cobroTruper[i].totalTRUPER;
  //     }
  //   }

  //   if (datos.cobroFmo !== undefined) {
  //     this.cobroFmo = datos.cobroFmo;
  //     for (let i = 0; i < this.cobroFmo.length; i++) {
  //       if (this.cobroFmo[i].dias_para_pagar >= 0 && this.cobroFmo[i].dias_para_pagar <= 2) {
  //         this.de0a2Fmo += this.cobroFmo[i].totalFMO;
  //       }

  //       if (this.cobroFmo[i].dias_para_pagar >= 3 && this.cobroFmo[i].dias_para_pagar <= 7) {
  //         this.de3a7Fmo += this.cobroFmo[i].totalFMO;
  //       }

  //       if (this.cobroFmo[i].dias_para_pagar >= 8 && this.cobroFmo[i].dias_para_pagar <= 14) {
  //         this.de8a14Fmo += this.cobroFmo[i].totalFMO;
  //       }

  //       if (this.cobroFmo[i].dias_para_pagar >= 15 && this.cobroFmo[i].dias_para_pagar <= 21) {
  //         this.de15a21Fmo += this.cobroFmo[i].totalFMO;
  //       }

  //       if (this.cobroFmo[i].dias_para_pagar >= 22 && this.cobroFmo[i].dias_para_pagar <= 31) {
  //         this.de22a31Fmo += this.cobroFmo[i].totalFMO;
  //       }

  //       if (this.cobroFmo[i].dias_para_pagar >= 32) {
  //         this.de32Fmo += this.cobroFmo[i].totalFMO;
  //       }

  //       this.totalRangoFmo += this.cobroFmo[i].totalFMO;
  //     }
  //   }

  //   if (datos.cobertura !== undefined) {
  //     this.coberturaCantidad = datos.cobertura.length;
  //     this.cobertura = datos.cobertura;
  //     for (let i = 0; i < this.coberturaCantidad; i++) {
  //       if (this.cobertura[i].ventas === 1) {
  //         this.cant1 ++;
  //       } else {
  //         this.cant2 ++;
  //       }
  //     }
  //   }

  //   if (datos.renglonaje !== undefined) {
  //     this.renglonaje = datos.renglonaje.length;
  //     for (let i = 0; i < datos.renglonaje.length; i ++) {
  //       if (i < 1000) {
  //         this.ren1000 ++;
  //       }

  //       if (i >= 1000 && i < 2000) {
  //         this.ren2000 ++;
  //       }

  //       if (i >= 2000 && i < 4000) {
  //         this.ren4000 ++;
  //       }

  //       if (i >= 4000 && i < 6000) {
  //         this.ren6000 ++;
  //       }

  //       if (i >= 6000) {
  //         this.ren6001 ++;
  //       }
  //     }
  //   }

  //   if (datos.penalizacionPedidos !== undefined) {
  //     let resp = datos.penalizacionPedidos;
  //     let numero = 0;
  //     let numero2 = 0;
  //     let numero3 = 0;
  //     let numero4 = 0;
  //     let numero5 = 0;
  //     let numero6 = 0;
  //     let numero7 = 0;
  //     let numero8 = 0;
  //     let numero9 = 0;
  //     let numero10 = 0;
  //     let numero11 = 0;
  //     let numero12 = 0;
  //     let numero13 = 0;
  //     let numero14 = 0;
  //     let numero15 = 0;
  //     let numero16 = 0;
  //     let numero17 = 0;
  //     let numero18 = 0;
  //     let numero19 = 0;
  //     let numero20 = 0;
  //     let numero21 = 0;
  //     let numero22 = 0;
  //     let numero23 = 0;
  //     let numero24 = 0;
  //     let numero25 = 0;
  //     let numero26 = 0;
  //     let numero27 = 0;
  //     let numero28 = 0;
  //     let numero29 = 0;
  //     let numero30 = 0;
  //     let numero31 = 0;

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 1) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero += resp[i].correcto;
  //           this.dia1 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero) }
  //           ];
  //         } else {
  //           this.dia1 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia1.length === 0) {
  //       this.dia1 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 2) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero2 += resp[i].correcto;
  //           this.dia2 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero2) }
  //           ];
  //         } else {
  //           this.dia2 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia2.length === 0) {
  //       this.dia2 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 3) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero3 += resp[i].correcto;
  //           this.dia3 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero3) }
  //           ];
  //         } else {
  //           this.dia3 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia3.length === 0) {
  //       this.dia3 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       numero4 = (i + 1) - numero - numero2 - numero3;
  //       if (resp[i].digito === 4) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero4 += resp[i].correcto;
  //           this.dia4 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero4) }
  //           ];
  //         } else {
  //           this.dia4 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }

  //       if (this.dia4.length === 0) {
  //         this.dia4 = [
  //           { fecha: '', dia: '', total: 1000 }
  //         ];
  //       }
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 5) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero5 += resp[i].correcto;
  //           this.dia5 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero5) }
  //           ];
  //         } else {
  //           this.dia5 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia5.length === 0) {
  //       this.dia5 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 6) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero6 += resp[i].correcto;
  //           this.dia6 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero6) }
  //           ];
  //         } else {
  //           this.dia6 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia6.length === 0) {
  //       this.dia6 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 7) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero7 += resp[i].correcto;
  //           this.dia7 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero7) }
  //           ];
  //         } else {
  //           this.dia7 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia7.length === 0) {
  //       this.dia7 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 8) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero8 += resp[i].correcto;
  //           this.dia8 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero8) }
  //           ];
  //         } else {
  //           this.dia8 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia8.length === 0) {
  //       this.dia8 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 9) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero9 += resp[i].correcto;
  //           this.dia9 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero9) }
  //           ];
  //         } else {
  //           this.dia9 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia9.length === 0) {
  //       this.dia9 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 10) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero10 += resp[i].correcto;
  //           this.dia10 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero10) }
  //           ];
  //         } else {
  //           this.dia10 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia10.length === 0) {
  //       this.dia10 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 11) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero11 += resp[i].correcto;
  //           this.dia11 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero11) }
  //           ];
  //         } else {
  //           this.dia11 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia11.length === 0) {
  //       this.dia11 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 12) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero12 += resp[i].correcto;
  //           this.dia12 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero12) }
  //           ];
  //         } else {
  //           this.dia12 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia12.length === 0) {
  //       this.dia12 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 13) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero13 += resp[i].correcto;
  //           this.dia13 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero13) }
  //           ];
  //         } else {
  //           this.dia13 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia13.length === 0) {
  //       this.dia13 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 14) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero14 += resp[i].correcto;
  //           this.dia14 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero14) }
  //           ];
  //         } else {
  //           this.dia14 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia14.length === 0) {
  //       this.dia14 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 15) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero15 += resp[i].correcto;
  //           this.dia15 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero15) }
  //           ];
  //         } else {
  //           this.dia15 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia15.length === 0) {
  //       this.dia15 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 16) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero16 += resp[i].correcto;
  //           this.dia16 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero16) }
  //           ];
  //         } else {
  //           this.dia16 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia16.length === 0) {
  //       this.dia16 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 17) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero17 += resp[i].correcto;
  //           this.dia17 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero17) }
  //           ];
  //         } else {
  //           this.dia17 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia17.length === 0) {
  //       this.dia17 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 18) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero18 += resp[i].correcto;
  //           this.dia18 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero18) }
  //           ];
  //         } else {
  //           this.dia18 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia18.length === 0) {
  //       this.dia18 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 19) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero19 += resp[i].correcto;
  //           this.dia19 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero19) }
  //           ];
  //         } else {
  //           this.dia19 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia19.length === 0) {
  //       this.dia19 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 20) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero20 += resp[i].correcto;
  //           this.dia20 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero20) }
  //           ];
  //         } else {
  //           this.dia20 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia20.length === 0) {
  //       this.dia20 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 21) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero21 += resp[i].correcto;
  //           this.dia21 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero21) }
  //           ];
  //         } else {
  //           this.dia21 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia21.length === 0) {
  //       this.dia21 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 22) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero22 += resp[i].correcto;
  //           this.dia22 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero22) }
  //           ];
  //         } else {
  //           this.dia22 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia22.length === 0) {
  //       this.dia22 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 23) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero23 += resp[i].correcto;
  //           this.dia23 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero23) }
  //           ];
  //         } else {
  //           this.dia23 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia23.length === 0) {
  //       this.dia23 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 24) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero24 += resp[i].correcto;
  //           this.dia24 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero24) }
  //           ];
  //         } else {
  //           this.dia24 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia24.length === 0) {
  //       this.dia24 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 25) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero25 += resp[i].correcto;
  //           this.dia25 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero25) }
  //           ];
  //         } else {
  //           this.dia25 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia25.length === 0) {
  //       this.dia25 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 26) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero26 += resp[i].correcto;
  //           this.dia26 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero26) }
  //           ];
  //         } else {
  //           this.dia26 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia26.length === 0) {
  //       this.dia26 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 27) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero27 += resp[i].correcto;
  //           this.dia27 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero27) }
  //           ];
  //         } else {
  //           this.dia27 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia27.length === 0) {
  //       this.dia27 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 28) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero28 += resp[i].correcto;
  //           this.dia28 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero28) }
  //           ];
  //         } else {
  //           this.dia28 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia28.length === 0) {
  //       this.dia28 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 29) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero29 += resp[i].correcto;
  //           this.dia29 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero29) }
  //           ];
  //         } else {
  //           this.dia29 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia29.length === 0) {
  //       this.dia29 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 30) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero30 += resp[i].correcto;
  //           this.dia30 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero30) }
  //           ];
  //         } else {
  //           this.dia30 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia30.length === 0) {
  //       this.dia30 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     for (let i = 0; i < resp.length; i++) {
  //       if (resp[i].digito === 31) {
  //         if (resp[i].dia !== 'Sabado') {
  //           numero31 += resp[i].correcto;
  //           this.dia31 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: (numero31) }
  //           ];
  //         } else {
  //           this.dia31 = [
  //             { fecha: resp[i].fecha, dia: resp[i].dia, total: 1000 }
  //           ];
  //         }
  //       }
  //     }

  //     if (this.dia31.length === 0) {
  //       this.dia31 = [
  //         { fecha: '', dia: '', total: 1000 }
  //       ];
  //     }

  //     // Hacemos la solicitud semana 1
  //     if (
  //       this.dia1[0].total < 8 ||
  //       this.dia2[0].total < 8 ||
  //       this.dia3[0].total < 8 ||
  //       this.dia4[0].total < 8 ||
  //       this.dia5[0].total < 8 ||
  //       this.dia6[0].total < 8 ||
  //       this.dia7[0].total < 8
  //       ) {
  //           this.semana1 = 200;
  //       } else if (
  //         this.dia1[0].total < 12 ||
  //         this.dia2[0].total < 12 ||
  //         this.dia3[0].total < 12 ||
  //         this.dia4[0].total < 12 ||
  //         this.dia5[0].total < 12 ||
  //         this.dia6[0].total < 12 ||
  //         this.dia7[0].total < 12
  //         ) {
  //           this.semana1 = 100;
  //       }

  //     // Hacemos la solicitud semana 2
  //     if (
  //       this.dia8[0].total < 8 ||
  //       this.dia9[0].total < 8 ||
  //       this.dia10[0].total < 8 ||
  //       this.dia11[0].total < 8 ||
  //       this.dia12[0].total < 8 ||
  //       this.dia13[0].total < 8 ||
  //       this.dia14[0].total < 8
  //       ) {
  //           this.semana2 = 200;
  //       } else if (
  //         this.dia8[0].total < 12 ||
  //         this.dia9[0].total < 12 ||
  //         this.dia10[0].total < 12 ||
  //         this.dia11[0].total < 12 ||
  //         this.dia12[0].total < 12 ||
  //         this.dia13[0].total < 12 ||
  //         this.dia14[0].total < 12
  //         ) {
  //           this.semana2 = 100;
  //       }

  //     // Hacemos la solicitud semana 3
  //     if (
  //       this.dia15[0].total < 8 ||
  //       this.dia16[0].total < 8 ||
  //       this.dia17[0].total < 8 ||
  //       this.dia18[0].total < 8 ||
  //       this.dia19[0].total < 8 ||
  //       this.dia20[0].total < 8 ||
  //       this.dia21[0].total < 8
  //       ) {
  //           this.semana3 = 200;
  //       } else if (
  //         this.dia15[0].total < 12 ||
  //         this.dia16[0].total < 12 ||
  //         this.dia17[0].total < 12 ||
  //         this.dia18[0].total < 12 ||
  //         this.dia19[0].total < 12 ||
  //         this.dia20[0].total < 12 ||
  //         this.dia21[0].total < 12
  //         ) {
  //           this.semana3 = 100;
  //       }

  //     // Hacemos la solicitud semana 4
  //     if (
  //       this.dia22[0].total < 8 ||
  //       this.dia23[0].total < 8 ||
  //       this.dia24[0].total < 8 ||
  //       this.dia25[0].total < 8 ||
  //       this.dia26[0].total < 8 ||
  //       this.dia27[0].total < 8 ||
  //       this.dia28[0].total < 8 ||
  //       this.dia29[0].total < 8 ||
  //       this.dia30[0].total < 8 ||
  //       this.dia31[0].total < 8
  //       ) {
  //           this.semana4 = 200;
  //       } else if (
  //         this.dia22[0].total < 12 ||
  //         this.dia23[0].total < 12 ||
  //         this.dia24[0].total < 12 ||
  //         this.dia25[0].total < 12 ||
  //         this.dia26[0].total < 12 ||
  //         this.dia27[0].total < 12 ||
  //         this.dia28[0].total < 12 ||
  //         this.dia29[0].total < 12 ||
  //         this.dia30[0].total < 12 ||
  //         this.dia31[0].total < 12
  //         ) {
  //           this.semana4 = 100;
  //       }

  //   }

  //   // Totales, estas variables siervirán para guardar en tabla
  //   this.comisionVenta = ((this.ventaMensual - this.devoluciones - this.notasCredito - this.bonificaciones) * this.porVentafInal);

  //   this.comisionTruperCobrado = (
  //     (this.de0a2Truper * this.por0a2Truper) +
  //     (this.de3a7Truper * this.por3a7Truper) +
  //     (this.de8a14Truper * this.por8a14Truper) +
  //     (this.de15a21Truper * this.por15a21Truper) +
  //     (this.de22a31Truper * this.por22a31Truper) +
  //     (this.de32Truper * this.por32Truper));

  //   this.comisionFmoCobrado = (
  //     (this.de0a2Fmo * this.por0a2Fmo) +
  //     (this.de3a7Fmo * this.por3a7Fmo) +
  //     (this.de8a14Fmo * this.por8a14Fmo) +
  //     (this.de15a21Fmo * this.por15a21Fmo) +
  //     (this.de22a31Fmo * this.por22a31Fmo) +
  //     (this.de32Fmo * this.por32Fmo));

  //   this.penalizacionCartera = (
  //     ((this.de1a8 * this.por1a8) * 100) + ((this.de9a16 * this.por9a16) * 100) +
  //     ((this.de17 * this.por17) * 100));

  //   this.comisionCobertura = (
  //     (this.cant2 * this.pos2) +
  //     (this.cant1 * this.neg1) +
  //     ((this.totaClientes - this.coberturaCantidad) * this.negSinVenta));

  //   this.comisionRenglonaje = (
  //     ((this.ren1000 * this.tasa1000) * 100) +
  //     ((this.ren2000 * this.tasa2000) * 100) +
  //     ((this.ren4000 * this.tasa4000) * 100) +
  //     ((this.ren6000 * this.tasa6000) * 100) +
  //     ((this.ren6001 * this.tasa6001) * 100));

  //   this.comisionGeneral = this.comisionVenta +
  //   this.comisionTruperCobrado +
  //   this.comisionFmoCobrado +
  //   this.comisionCobertura +
  //   this.comisionRenglonaje;

  //   this.carteraGeneral = this.penalizacionCartera;

  //   this.devolucionesGeneral = (
  //     ((this.devoluciones + this.notasCredito) * this.porDevoluciones) * 100);

  //   this.penalizacionPedidos = (this.semana1 + this.semana2 + this.semana3 + this.semana4);

  //   this.totalComisionPagar = (
  //     (
  //       (
  //         (
  //           (this.ventaMensual - this.bonificaciones) * this.porVentafInal) +
  //           this.comisionTruperCobrado + this.comisionFmoCobrado + this.comisionCobertura + this.comisionRenglonaje) -
  //           this.penalizacionCartera - this.devolucionesGeneral - this.penalizacionPedidos));

  //   this.esperar = false;
  //   this.aparece = true;

  // }

}
