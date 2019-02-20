import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService, ClientesService, ExcelService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edo-cta-cli',
  templateUrl: './edo-cta-cli.component.html',
  styles: []
})
export class EdoCtaCliComponent implements OnInit {

  fecha: any;

  // Datos del Usuario
  asesor: number = 0;
  rol: any;
  usuario: Usuario;

  @Input() numero: any;

  // Datos del Cliente
  clienteFerrum: any[] = [];

  // Importes
  inicio: any = '';
  abonos: number = 0;
  cargos: number = 0;
  preSaldo: number = 0;

  // Datos del Cliente
  nombre: any;
  number: any;
  forcre: any;

  // Dato General
  datos: any[] = [];

  // Booleanos
  localizado: boolean = false;
  cargando: boolean = false;

  constructor(
    private _usuariosService: UsuarioService,
    private _clientesService: ClientesService,
    public _excelService: ExcelService
  ) {
    this.usuario = this._usuariosService.usuario;
    this.asesor = Number(this.usuario.idFerrum);
    this.rol = this.usuario.rol;

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

    this.fecha = anio + '-' + mes + '-' + dia;
  }

  ngOnInit() {
  }

  obtenerCliente( forma: NgForm, clienteId: any ) {

    this.cargando = true;

    this.datos = [];
    this.abonos = 0;

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar la fecha inicial', 'No ha ingresado la fecha inicial para la busqueda.', 'error');
      this.cargando = false;
      return;
    }

    this._clientesService.infoCliente(clienteId, this.asesor, this.rol)
      .subscribe( ( data: any ) => {

        if (data.length > 0) {

          this.clienteFerrum = data[0];
          this.nombre = data[0].NOMBRE;
          this.number = data[0].NUMERO;
          this.forcre = data[0].FORCRE;

          this._clientesService.obtenerFacturas(data[0].CLIENTEID, forma.value.inicio, this.fecha)
            .subscribe( ( edocta: any ) => {

              for (let i = 0; i < edocta.length; i++) {

                this.cargos += edocta[i].CARGO;

                this._clientesService.obtenerMovimiento(edocta[i].DOCID)
                  .subscribe( ( resp: any ) => {

                    if (resp.length > 0) {

                      if (edocta[i].DOCID === resp[0].DOCID) {

                        for (let k = 0; k < resp.length; k++) {

                          if (edocta[i].SALDOFINAL > 0) {

                            if (this.preSaldo === 0) {
                              this.preSaldo = edocta[i].SALDO - resp[k].PAGADO;
                            } else {
                              this.preSaldo = this.preSaldo - resp[k].PAGADO;
                            }

                          }

                          let nuevo = [
                            {
                              "DOCID": edocta[i].DOCID,
                              "FECHA": resp[k].FECHAAPLICADA,
                              "FOLIO": edocta[i].FOLIO,
                              "SALDOFINAL": edocta[i].SALDOFINAL,
                              "CARGO": '',
                              "ABONO": resp[k].PAGADO,
                              "SALDO" : this.preSaldo,
                              "RECIBO": resp[k].RECIBO,
                              "TIPO": resp[k].FORMAPAGO,
                              "FP": resp[k].FP,
                              "NOTA": resp[k].NOTA,
                              "TOTALPAGADO": edocta[i].TOTALPAGADO
                            }
                          ];

                          this.abonos += resp[k].PAGADO;

                          if (k === 0) {

                            this.datos.push(edocta[i]);

                          }

                          this.datos.push(nuevo[0]);

                        }

                        this.preSaldo = 0;

                      }

                    } else {

                      this.datos.push(edocta[i]);

                    }

                  });

              }

              this.localizado = true;

              this.cargando = false;

            });

        } else {

          swal('Cliente fuera de Catálogo', 'Este número está fuera de tu catálogo de cliente.', 'error');

          this.localizado = false;

          this.cargando = false;

          return;

        }

      });
  }

  exportarExcel(dato: any, numero: any) {
    let filename = 'reporte_' + numero;
    this._excelService.exportAsExcelFile(dato, filename);
  }

  public exportarPDF(numero: any, nombre: any) {
    let filename = numero + '-' + nombre;
    return xepOnline.Formatter.Format('edo-cta', {render: 'download', filename: filename});
  }

}
