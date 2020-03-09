import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Observable';
// import { Subscriber } from 'rxjs/Subscriber';

// Servicios
import { OficinaService } from '../../services/oficina/oficina.service';
import { HerramientasService } from '../../services/herramientas/herramientas.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-facturasmonitor',
  templateUrl: './facturasmonitor.component.html',
  styles: []
})
export class FacturasmonitorComponent implements OnInit {

  @ViewChild('factura') factura: ElementRef;

  // observar: Subscription;

  facturas: any[] = [];
  facturasTrab: any[] = [];
  pendientes: number = 0;
  trabajados: number = 0;

  constructor(
    private oficinaService: OficinaService,
    private herramientasService: HerramientasService,
    private usuarioService: UsuarioService
  ) {
    // Subscripción a Facturas Nuevas
    // this.observar =  this.regresa().subscribe(
    //   numero => console.log(numero),
    //   error => console.error('Error en el obs', error),
    //   () => console.log('El observador termino!')
    // );
  }

  // regresa(): Observable<any> {
  //   return new Observable((observer: Subscriber<any>) => {
  //     setInterval(() => {
  //       this.obtenerFacturasDia();
  //     }, 5000);
  //   });
  // }

  ngOnInit() {
    this.actualizar();
  }

  actualizar() {
    this.obtenerFacturasDia();
    this.obtenerFacturasTrabajadasDia();
  }

  obtenerFacturasDia() {
    this.oficinaService.verFacturasDia(this.herramientasService.fechaActual()).subscribe((facturas: any) => {
      this.facturas = [];
      this.pendientes = 0;
      for (const fac of facturas.resp) {
        this.oficinaService.verfacturasTrabEspe(fac.NUMERO).subscribe((trab: any) => {
          if (!trab.status) {
            this.pendientes++;
            this.facturas.push(fac);
            this.facturas.sort((a, b) => {
              if (a.NUMERO > b.NUMERO) {
                return 1;
              }

              if (a.NUMERO < b.NUMERO) {
                return -1;
              }

              return 0;
            });
          }
        });
      }
    });
  }

  obtenerFacturasTrabajadasDia() {
    this.oficinaService.verfacturasTrab(this.herramientasService.fechaActual()).subscribe((trab: any) => {
      if (trab.status) {
        this.facturasTrab = trab.facturas;
        this.trabajados = trab.facturas.length;
      }
    });
  }

  trabajar() {
    if (Number(this.factura.nativeElement.value) !== 0 && this.factura.nativeElement.value !== '') {
      this.oficinaService.verfacturasTrabEspe(this.factura.nativeElement.value).subscribe((trab: any) => {
        if (!trab.status) {
          for (const fac of this.facturas) {
            if (Number(this.factura.nativeElement.value) === fac.NUMERO) {
              this.oficinaService.guardarFacturaTrab(fac, this.herramientasService.fechaActual(), this.herramientasService.horaActual(), this.usuarioService.usuario._id).subscribe((trabaj: any) => {
                if (trabaj.status) {
                  this.factura.nativeElement.value = '';
                  this.factura.nativeElement.focus();
                  this.obtenerFacturasDia();
                  this.obtenerFacturasTrabajadasDia();
                }
              });
              break;
            }
          }
        } else {
          this.factura.nativeElement.value = '';
          swal('Factura Trabajada', 'No se puede ingresar esta factura por que ya fue trabajada.', 'error');
        }
      });
    } else {
      swal('Sin Factura', 'No ingreso niguna factura para trabajar.', 'error');
    }
  }

  buscar(fecha: any) {
    this.oficinaService.verfacturasTrab(fecha).subscribe((trab: any) => {
      if (trab.status) {
        this.facturasTrab = trab.facturas;
        this.trabajados = trab.facturas.length;
        this.oficinaService.verFacturasDia(fecha).subscribe((facturas: any) => {
          this.facturas = [];
          this.pendientes = 0;
          for (const fac of facturas) {
            this.oficinaService.verfacturasTrabEspe(fac.NUMERO).subscribe((data: any) => {
              if (!data.status) {
                this.pendientes++;
                this.facturas.push(fac);
                this.facturas.sort((a, b) => {
                  if (a.NUMERO > b.NUMERO) {
                    return 1;
                  }

                  if (a.NUMERO < b.NUMERO) {
                    return -1;
                  }

                  return 0;
                });
              }
            });
          }
        });
      } else {
        swal('Sin Datos', 'No hay facturas trabajadas en esta fecha.', 'warning');
      }
    });
  }

  buscarFolio(folio: any) {
    this.oficinaService.verfacturasTrabEspe(folio).subscribe((trab: any) => {
      if (trab.status) {
        console.log(trab);
        this.facturasTrab = [];
        this.facturasTrab.push(trab.factura);
        this.trabajados = this.facturasTrab.length;
      }
    });
  }

}
