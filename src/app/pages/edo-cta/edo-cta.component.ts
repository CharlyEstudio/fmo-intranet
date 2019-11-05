import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { UsuarioService, ClientesService, ExcelService, CreditoService } from '../../services/services.index';

@Component({
  selector: 'app-edo-cta',
  templateUrl: './edo-cta.component.html',
  styles: []
})
export class EdoCtaComponent implements OnInit {

  @ViewChild('edoCta') edoCta: ElementRef;

  fecha: any;
  tipoS: any;
  verPDF: any = '';

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
  tipo: any = '0';
  abonos: number = 0;
  saldos: number = 0;
  cargos: number = 0;
  preSaldo: number = 0;

  // Datos del Cliente
  nombre: any;
  number: any;
  forcre: any;
  saldoAct: any;
  limite: any;

  // Datos Asesor
  nomAsesor: any;
  telAsesor: any;

  // Dato General
  datos: any[] = [];

  // Booleanos
  localizado: boolean = false;
  cargando: boolean = false;
  mostrar: boolean = false;

  constructor(
    public sanitizer: DomSanitizer,
    private _usuariosService: UsuarioService,
    private _clientesService: ClientesService,
    private _creditoService: CreditoService,
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
    this.verPDF = '';

    this.datos = [];
    this.abonos = 0;
    this.saldos = 0;
    this.cargos = 0;

    if ( forma.value.numero === "" ) {
      swal('Debe ingresar el número de cliente', 'No ha ingresado el número de cliente para la busqueda.', 'error');
      this.cargando = false;
      return;
    }

    if ( forma.value.inicio === '' ) {
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
          this.saldoAct = data[0].SALDO;
          this.limite = data[0].LIMITE;
          this.nomAsesor = data[0].ASESOR;
          const tel = String(data[0].TEL);
          this.telAsesor = tel.slice(1, 11);

          this._clientesService.obtenerFacturas(data[0].CLIENTEID, forma.value.inicio, this.fecha).subscribe((edocta: any) => {
            for (let i = 0; i < edocta.length; i++) {
              this.abonos += edocta[i].ABONO;

              let esFolio = (factura) => {
                return factura.FOLIO === edocta[i].FOLIO;
              };

              let saldo;
              let cargo;
              // let index;

              if (this.datos.find(esFolio)) {
                // const index = i - 1;
                let index = i - 1;
                cargo = this.datos[index].SALDO;
              } else {
                cargo = edocta[i].CARGO;
              }

              this.cargos += cargo;

              saldo = cargo - edocta[i].ABONO;
              this.saldos += saldo;

              let nuevo = [
                {
                  "DOCID": edocta[i].DOCID,
                  "FECHA": edocta[i].FECHA,
                  "FECHAPAG": edocta[i].FECHAPAG,
                  "VENCE": edocta[i].VENCE,
                  "DIASPAGO": edocta[i].DIASPAGO,
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
                  "SALDOFINAL": edocta[i].SALDOFINAL,
                  "RESTAN": edocta[i].RESTAN
                }
              ];
              this.datos.push(nuevo[0]);
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

  obtenerSaldo(dato: NgForm) {
    this.cargando = true;
    this.verPDF = '';

    this.datos = [];
    this.abonos = 0;
    this.saldos = 0;
    this.cargos = 0;

    this.cargando = false;
    if (dato.value.numero === '') {
      swal('Debe ingresar el número de cliente', 'No ha ingresado el número de cliente para la busqueda.', 'error');
      this.cargando = false;
      return;
    }

    if (dato.value.tipo === '0') {
      swal('Debe ingresar el tipo de busqueda', 'No ha seleccionado el tipo de busqueda.', 'error');
      this.cargando = false;
      return;
    }

    this.numero = dato.value.numero;

    this._clientesService.infoCliente(this.numero, this.asesor, this.rol)
      .subscribe( ( data: any ) => {
        if (data.length > 0) {

          this.clienteFerrum = data[0];
          this.nombre = data[0].NOMBRE;
          this.number = data[0].NUMERO;
          this.forcre = data[0].FORCRE;
          this.saldoAct = data[0].SALDO;
          this.limite = data[0].LIMITE;
          this.nomAsesor = data[0].ASESOR;
          const tel = String(data[0].TEL);
          this.telAsesor = tel.slice(1, 11);

          this._creditoService.clienteSaldo(this.numero, this.fecha).subscribe((edocta: any) => {
            if (edocta.status) {
              for (let i = 0; i < edocta.respuesta.length; i++) {
                this.abonos += edocta.respuesta[i].ABONO;

                if (edocta.respuesta[i].SALDOFINAL !== 0) {
                  this.saldos += edocta.respuesta[i].SALDOFINAL;
                }

                let esFolio = (factura) => {
                  return factura.FOLIO === edocta.respuesta[i].FOLIO;
                };

                let saldo;
                let cargo;
                let car;

                if (this.datos.find(esFolio)) {
                  let index = i - 1;
                  cargo = this.datos[index].SALDO;
                  car = 0;
                } else {
                  cargo = edocta.respuesta[i].CARGO;
                  car = edocta.respuesta[i].CARGO;
                }

                if (edocta.respuesta[i].ABONO === 0) {
                  saldo = edocta.respuesta[i].SALDOFINAL;
                } else {
                  saldo = cargo - edocta.respuesta[i].ABONO;
                }

                this.cargos += car;
                let nuevo = [
                  {
                    "DOCID": edocta.respuesta[i].DOCID,
                    "FECHA": edocta.respuesta[i].FECHA,
                    "FECHAPAG": edocta.respuesta[i].FECHAPAG,
                    "VENCE": edocta.respuesta[i].VENCE,
                    "DIASPAGO": edocta.respuesta[i].DIASPAGO,
                    "FOLIO": edocta.respuesta[i].FOLIO,
                    "SALDO": saldo,
                    "CARGO": cargo,
                    "ABONO": edocta.respuesta[i].ABONO,
                    "RECIBO": edocta.respuesta[i].RECIBO,
                    "TIPO": edocta.respuesta[i].TIPO,
                    "FP": edocta.respuesta[i].FP,
                    "NOTA": edocta.respuesta[i].NOTA,
                    "TOTAL": edocta.respuesta[i].TOTAL,
                    "TOTALPAGADO": edocta.respuesta[i].TOTALPAGADO,
                    "SALDOFINAL": edocta.respuesta[i].SALDOFINAL,
                    "RESTAN": edocta.respuesta[i].RESTAN
                  }
                ];
                this.datos.push(nuevo[0]);
              }
              // this.cargos = this.saldos + this.abonos;
              this.localizado = true;

              this.cargando = false;
            } else {
              swal('Cliente Sin Adeudo', 'El Cliente no tiene ninguna factura vigente.', 'success');
            }
          });

        } else {

          swal('Cliente fuera de Catálogo', 'Este número está fuera de tu catálogo de cliente.', 'error');

          this.localizado = false;

          this.cargando = false;

          return;

        }

      });
  }

  enviarEmail( cliente: any, ases: any, telases: any ) {
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

        this._clientesService.enviarEdoCtaPDFEmail(email, cliente, ases, telases, this.tipoS).subscribe( ( resp: any ) => {
          if (resp[0].status) {
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

  tipoSel(tipo: any) {
    this.localizado = false;
    this.tipoS = '';
    this.verPDF = '';
    this.datos = [];
    this.cargos = 0;
    this.abonos = 0;
    if (tipo !== '2') {
      this.mostrar = false;
      this.tipoS = 'ESTADO DE CUENTA';
    } else {
      this.mostrar = true;
      this.tipoS = 'MOVIMIENTOS DE CUENTA';
    }
  }

  // public exportarPDF(numero: any, nombre: any) {
  //   let filename = numero + '-' + nombre;
  //   return xepOnline.Formatter.Format('edoCta', {render: 'download', filename: filename, pageWidth: '297mm', pageHeight: '216mm'});
  // }

  public exportarPDF(datos: any, cliente: any, asesor: any, tel: any, cargos: any, abonos: any, saldo: any) {
    let filename = cliente.NUMERO + '-' + cliente.NOMBRE + '.pdf';
    this._creditoService.exportarPDFphp(datos, filename, cliente, asesor, tel, this.tipoS, cargos, abonos, saldo).subscribe((resp: any) => {
      if (resp[0].msg.ok) {
        swal({
          title: 'Correcto ' + resp[0].msg.msg,
          text: 'El ' + this.tipoS + ' se ha creado correctamente. ¿Quiere enviar este PDF a email o ver?',
          icon: "success",
          buttons: {
            cancel: {
              text: 'Cancelar',
              value: 'cancel'
            },
            catch: {
              text: 'Enviar',
              value: 'catch'
            },
            defeat: {
              text: 'Ver',
              value: 'defeat'
            },
          }
        })
        .then(( value ) => {

          switch (value) {

            case "defeat":
              this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl('https://ferremayoristas.com.mx/api/edo-cta/' + filename);
              break;

            case "catch":
              this.enviarEmail( cliente, asesor, tel );
              break;

            default:
              return null;
          }

          swal.stopLoading();
        });
      } else {
        swal('Error', 'Contacte con el administrado.', 'error');
      }
    });
  }

}
