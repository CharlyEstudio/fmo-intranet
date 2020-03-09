import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { VisitasClientesService, HerramientasService, ExcelService } from '../../services/services.index';

@Component({
  selector: 'app-clientes-oficina',
  templateUrl: './clientes-oficina.component.html',
  styles: []
})
export class ClientesOficinaComponent implements OnInit {

  @ViewChild('fecha') fecha: ElementRef;
  @ViewChild('cliente') cliente: ElementRef;
  @ViewChild('folio') folio: ElementRef;
  @ViewChild('pago') pago: ElementRef;
  @ViewChild('aplicado') aplicado: ElementRef;
  @ViewChild('atendio') atendio: ElementRef;
  @ViewChild('observacion') observacion: ElementRef;

  info: any;
  visitas: any[] = [];
  visitasDia: any[] = [];
  msg: any = '';
  fechaActual = 'actual';

  constructor(
    private visitasClientes: VisitasClientesService,
    private herramientas: HerramientasService,
    private excel: ExcelService
  ) {
    this.obtenerVisitas();
  }

  ngOnInit() {
  }

  obtenerVisitas() {
    this.visitasClientes.obtenerVisitas().subscribe((visitas: any) => {
      if (visitas.resp.length > 0) {
        this.visitas = visitas.resp;
      }
    });
  }

  obtenerVisitasDia(fecha: any) {
    this.visitasClientes.obtenerVisitasDia(fecha).subscribe((visitasDia: any) => {
      this.visitasDia = visitasDia.resp;
    });
  }

  obtenerInfofolio(folio: number, fecha: string, cliente: number) {
    this.visitasClientes.asegurarFolio(folio, fecha, cliente).subscribe((seguro: any) => {
      if (!seguro.resp) {
        this.visitasClientes.obtenerInfoFolio(folio, fecha, cliente).subscribe((info: any) => {
          if (info.resp !== false) {
            this.info = info.resp;
          }
        });
      } else {
        this.msg = 'Documento ' + folio + ' asignado.';
        this.fecha.nativeElement.value = '';
        this.cliente.nativeElement.value = '';
        this.folio.nativeElement.value = '';
      }
    });
  }


  exportarVisitas(visitasexport: any, fecha) {
    const name = 'visitas-' + fecha;
    this.excel.exportAsExcelFile(visitasexport, name);
  }

  guardarData() {
    let pago;
    let aplicado;
    switch (this.pago.nativeElement.value) {
      case '1':
        pago = 'TDD';
        break;
      case '2':
        pago = 'TDC';
        break;
      case '3':
        pago = '3M-TDCC';
        break;
      case '4':
        pago = '6M-TDCC';
        break;
      case '5':
        pago = '9M-TDCC';
        break;
      case '6':
        pago = '12M-TDCC';
        break;
      case '7':
        pago = '18M-TDCC';
        break;
      case '8':
        pago = 'FIRMO';
        break;
      case '9':
        pago = 'OFICINA';
        break;
      case '10':
        pago = 'EFECTIVO';
        break;
      case '11':
        pago = 'TRANSFERENCIA';
        break;
      case '12':
        pago = 'CHEQUE';
        break;
    }

    switch (this.aplicado.nativeElement.value) {
      case '1':
        aplicado = 'APLICADO';
        break;
      case '2':
        aplicado = 'FISICA';
        break;
      case '3':
        aplicado = 'PENDIENTE';
        break;
    }
    const data = {
      fecha: this.fecha.nativeElement.value,
      cliente: Number(this.cliente.nativeElement.value),
      nombre: this.info.nombre,
      tipo: this.info.tipo,
      folio: Number(this.folio.nativeElement.value),
      importe: this.info.total,
      pago: pago,
      aplicado: aplicado,
      atendio: this.atendio.nativeElement.value,
      observacion: this.observacion.nativeElement.value
    };
    this.visitasClientes.guardarVisita(data).subscribe((guardar: any) => {
      this.info = undefined;
      this.cancelar();
      this.obtenerVisitas();
    });
  }

  cancelar() {
    this.msg = '';
    this.fecha.nativeElement.value = '';
    this.cliente.nativeElement.value = '';
    this.folio.nativeElement.value = '';
    if (this.info !== undefined) {
      this.pago.nativeElement.value = '0';
      this.aplicado.nativeElement.value = '0';
      this.atendio.nativeElement.value = '';
      this.observacion.nativeElement.value = '';
    }
  }

}
