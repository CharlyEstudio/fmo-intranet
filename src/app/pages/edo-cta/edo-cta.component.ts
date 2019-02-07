import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService, ClientesService, ExcelService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edo-cta',
  templateUrl: './edo-cta.component.html',
  styles: []
})
export class EdoCtaComponent implements OnInit {

  @ViewChild('edoCta') edoCta: ElementRef;

  // Datos del Usuario
  asesor: number = 0;
  rol: any;
  usuario: Usuario;

  // Datos del Cliente
  clienteFerrum: any[] = [];
  // clienteMongo: any[] = []; // Aquí va el modelo de Cliente de Mongo, cambiar "any" por "Cliente"

  // Importes
  numero: any = '';
  inicio: any = '';
  abonos: number = 0;
  saldos: number = 0;
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

    // this.clienteMongo = [
    //   {
    //     "email": "contacto@ferremayoristas.com.mx"
    //   }
    // ];
  }

  ngOnInit() {
  }

  obtenerCliente( forma: NgForm ) {

    this.cargando = true;

    this.datos = [];
    this.abonos = 0;
    this.saldos = 0;

    if ( forma.value.numero === "" ) {
      swal('Debe ingresar el número de cliente', 'No ha ingresado el número de cliente para la busqueda.', 'error');
      this.cargando = false;
      return;
    }

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar la fecha inicial', 'No ha ingresado la fecha inicial para la busqueda.', 'error');
      this.cargando = false;
      return;
    }

    this.numero = forma.value.numero;

    this._clientesService.infoCliente(this.numero, this.asesor, this.rol)
      .subscribe( ( data: any ) => {

        if (data.length > 0) {

          this.clienteFerrum = data[0];
          this.nombre = data[0].NOMBRE;
          this.number = data[0].NUMERO;
          this.forcre = data[0].FORCRE;

          this._clientesService.obtenerFacturas(data[0].CLIENTEID, forma.value.inicio).subscribe((edocta: any) => {
            for (let i = 0; i < edocta.length; i++) {
              this.abonos += edocta[i].ABONO;

              if (edocta[i].SALDOFINAL !== 0) {
                this.saldos += edocta[i].SALDOFINAL;
              }

              let esFolio = (factura) => {
                return factura.FOLIO === edocta[i].FOLIO;
              };

              if (this.datos.find(esFolio)) {
                let saldo;
                let cargo;
                if (edocta[i].TOTALGADO === edocta[i].TOTAL) {
                  saldo = (edocta[i].TOTAL - edocta[i].ABONO) - edocta[i].SALDO
                } else {
                  if (edocta[i].ABONO < 0) {
                    saldo = edocta[i].SALDOFINAL + (-1 * edocta[i].ABONO);
                  } else {
                    saldo = edocta[i].SALDOFINAL;
                  }
                }

                if (this.datos.find(esFolio).SALDO !== 0) {
                  cargo = this.datos.find(esFolio).SALDO;
                } else {
                  if (edocta[i].ABONO < 0) {
                    cargo = 0;
                  } else {
                    cargo = edocta[i].CARGO;
                  }
                }

                let nuevo = [
                  {
                    "DOCID": edocta[i].DOCID,
                    "FECHA": edocta[i].FECHA,
                    "FECHAPAG": edocta[i].FECHAPAG,
                    "FOLIO": edocta[i].FOLIO,
                    "SALDO": saldo,
                    "CARGO": cargo,
                    "ABONO": edocta[i].ABONO,
                    "RECIBO": edocta[i].RECIBO,
                    "TIPO": edocta[i].TIPO,
                    "FP": edocta[i].FP,
                    "NOTA": edocta[i].NOTA,
                    "TOTAL": edocta[i].TOTAL,
                    "TOTALPAGADO": edocta[i].TOTALPAGADO,
                    "SALDOFINAL": edocta[i].SALDOFINAL
                  }
                ];
                this.datos.push(nuevo[0]);
              } else {
                this.datos.push(edocta[i]);
              }
            }

            this.cargos = this.saldos + this.abonos;

            this.localizado = true;

            this.cargando = false;
          });

          // this._clientesService.obtenerFacturas(data[0].CLIENTEID, forma.value.inicio)
          //   .subscribe( ( edocta: any ) => {

          //     for (let i = 0; i < edocta.length; i++) {

          //       this.cargos += edocta[i].CARGO;

          //       this._clientesService.obtenerMovimiento(edocta[i].DOCID)
          //         .subscribe( ( resp: any ) => {

          //           if (resp.length > 0) {

          //             if (edocta[i].DOCID === resp[0].DOCID) {

          //               for (let k = 0; k < resp.length; k++) {

          //                 if (edocta[i].SALDOFINAL > 0) {

          //                   if (this.preSaldo === 0) {
          //                     this.preSaldo = edocta[i].SALDO - resp[k].PAGADO;
          //                   } else {
          //                     this.preSaldo = this.preSaldo - resp[k].PAGADO;
          //                   }

          //                 }

          //                 // if(edocta[i].SALDOFINAL > 0 && edocta[i].TOTALPAGADO == 0){
          //                 //   this.preSaldo = edocta[i].SALDO;
          //                 // } else if(edocta[i].SALDOFINAL == 0 && edocta[i].TOTALPAGADO > 0) {
          //                 //   this.preSaldo = 0;
          //                 // } else {
          //                 //   if(this.preSaldo === 0) {
          //                 //     this.preSaldo = edocta[i].SALDO - resp[k].PAGADO;
          //                 //   } else {
          //                 //     this.preSaldo = this.preSaldo - resp[k].PAGADO;
          //                 //   }
          //                 // }

          //                 let nuevo = [
          //                   {
          //                     "DOCID": edocta[i].DOCID,
          //                     "FECHA": resp[k].FECHAAPLICADA,
          //                     "FOLIO": edocta[i].FOLIO,
          //                     "SALDOFINAL": edocta[i].SALDOFINAL,
          //                     "CARGO": '',
          //                     "ABONO": resp[k].PAGADO,
          //                     "SALDO" : this.preSaldo,
          //                     "RECIBO": resp[k].RECIBO,
          //                     "TIPO": resp[k].FORMAPAGO,
          //                     "FP": resp[k].FP,
          //                     "NOTA": resp[k].NOTA,
          //                     "TOTALPAGADO": edocta[i].TOTALPAGADO
          //                   }
          //                 ];

          //                 this.abonos += resp[k].PAGADO;

          //                 if (k === 0) {

          //                   this.datos.push(edocta[i]);

          //                 }

          //                 this.datos.push(nuevo[0]);

          //               }

          //               this.preSaldo = 0;

          //             }

          //           } else {

          //             this.datos.push(edocta[i]);

          //           }

          //         });

          //     }

          //     this.localizado = true;

          //     this.cargando = false;

          //   });

        } else {

          swal('Cliente fuera de Catálogo', 'Este número está fuera de tu catálogo de cliente.', 'error');

          this.localizado = false;

          this.cargando = false;

          return;

        }

      });
  }

  enviarEmail( datos: any, cliente: any ) {

    if (cliente.CORREO === 'cnmfmo@gmail.com') {

      // tslint:disable-next-line:max-line-length
      swal('Cliente Sin Email', 'El cliente:' + cliente.NOMBRE + ' no tiene un email registrado, favor de comunicarse con Gerencia.', 'warning');

    } else {

      let mensaje = 'Escribe "cliente", "cxc-qro", "cxc-tx", "gerencia"' +
      ', "contacto" o "auditoria" si quieres dirigir a uno específico, o bien escribe tu email';

      swal({
        title: "Enviar Email",
        text: mensaje,
        icon: "warning",
        buttons: {
          cancel: true,
          confirm: true
        },
        content: {
          element: "input",
          attributes: {
              placeholder: "Email",
              type: "text",
          },
        },
      })
      .then(( name ) => {
        if (!name) { return null };
        let email;
        switch (name) {
          case 'cliente':
            email = cliente.CORREO;
          break;

          case 'cxc-qro':
            email = 'cxc-qro@ferremayoristas.com.mx';
          break;

          case 'cxc-tx':
            email = 'cxc-tx@ferremayoristas.com.mx';
          break;

          case 'gerencia':
            email = 'vleal@ferremayoristas.com.mx';
          break;

          case 'auditoria':
            email = 'mmontes@ferremayoristas.com.mx';
          break;

          case 'contacto':
            email = 'contacto@ferremayoristas.com.mx';
          break;

          default:
            email = name;
        }

        this._clientesService.enviarEdoCtaEmail(email, datos, cliente).subscribe( ( resp: any ) => {
          if (resp[0].status === 'ok') {
            swal('Enviado', 'Correo enviado', 'success');
          } else {
            swal('Error', 'Correo no enviado', 'error');
          }
        });

        swal.stopLoading();
      });

    }

  }

  exportarExcel(dato: any, clienteFerrum: any) {
    let filename = 'reporte_' + clienteFerrum.numero;
    this._excelService.exportAsExcelFile(dato, filename);
  }

  public exportarPDF(numero: any, nombre: any) {
    let filename = numero + '-' + nombre;
    return xepOnline.Formatter.Format('edoCta', {render: 'download', filename: filename, pageWidth: '297mm', pageHeight: '216mm'});
  }

}
