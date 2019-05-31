import { Component, OnInit } from '@angular/core';

// Servicios
import { ChoferesService } from '../../services/services.index';
import { ExcelService } from '../../services/excel/excel.service';

@Component({
  selector: 'app-frecuencias',
  templateUrl: './frecuencias.component.html',
  styles: []
})
export class FrecuenciasComponent implements OnInit {

  clientes: any[] = [];
  descarga: number = 0;
  meta: number = 0;
  descargado: boolean = false

  constructor(
    private _choferService: ChoferesService,
    private _excel: ExcelService
  ) {
    this.verFrecuencias();
  }

  ngOnInit() {
  }

  verFrecuencias( ) {
    this.descargado = false;
    this._choferService.obtenerChoferesAll().subscribe((chofer: any) => {
      if (chofer.ok) {
        this.meta = chofer.choferes.length - 1;
        this.descarga = 0;
        for (let i = 0; i < chofer.choferes.length; i++) {
          this.descarga = (i * 100) / this.meta;
          this._choferService.mostrarGuias(chofer.choferes[i]._id).subscribe((guias: any) => {
            if (guias.ok) {
              for (let j = 0; j < guias.guias.length; j++) {
                if (guias.guias[j].facturas.length > 0) {
                  for (let k = 0; k < guias.guias[j].facturas.length; k++) {
                    // let esCliente = (cliente) => {
                    //   return cliente.cliente === guias.guias[j].facturas[k].cliente;
                    // };

                    // if (!clientes.find(esCliente)) {
                    // }
                    const cliente = {
                      chofer: chofer.choferes[i].nombre,
                      cliente: guias.guias[j].facturas[k].cliente,
                      nombre: guias.guias[j].facturas[k].nombre,
                      domicilio: guias.guias[j].facturas[k].domicilio,
                      poblacion: guias.guias[j].facturas[k].poblacion,
                      fecha: guias.guias[j].facturas[k].fecha,
                      hora: guias.guias[j].facturas[k].hora,
                      importe: guias.guias[j].facturas[k].importe,
                      vendedor: guias.guias[j].facturas[k].vendedor
                    };
                    this.clientes.push(cliente);
                    this.clientes.sort((a, b) => {
                      if (a.cliente > b.cliente) {
                        return 1;
                      }

                      if (a.cliente < b.cliente) {
                        return -1;
                      }

                      return 0;
                    });
                  }
                }
              }
              setTimeout(() => {
                this.descargado = true;
              }, 1000);
            }
          });
        }
        // console.log(this.clientes);
      }
    });
  }

  exportar(clientes: any) {
    this._excel.exportAsExcelFile(clientes, 'clientes-choferes');
  }

}
