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
  filename: any = '';

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

        if (data.status) {

          this.clienteFerrum = data.resp;
          this.nombre = data.resp.NOMBRE;
          this.number = data.resp.NUMERO;
          this.forcre = data.resp.FORCRE;
          this.saldoAct = data.resp.SALDO;
          this.limite = data.resp.LIMITE;
          this.nomAsesor = data.resp.ASESOR;
          const tel = String(data.resp.TEL);
          this.telAsesor = tel.slice(1, 11);

          this._clientesService.obtenerFacturas(data.resp.CLIENTEID, forma.value.inicio, this.fecha).subscribe((edocta: any) => {
            for (let i = 0; i < edocta.resp.length; i++) {
              this.abonos += parseFloat(edocta.resp[i].ABONO);

              let esFolio = (factura) => {
                return factura.FOLIO === edocta.resp[i].FOLIO;
              };

              let saldo;
              let cargo;

              if (this.datos.find(esFolio)) {
                let index = i - 1;
                cargo = parseFloat(this.datos[index].SALDO);
              } else {
                cargo = parseFloat(edocta.resp[i].CARGO);
              }

              this.cargos += cargo;

              saldo = cargo - parseFloat(edocta.resp[i].ABONO);
              this.saldos += saldo;

              let nuevo = [
                {
                  "DOCID": edocta.resp[i].DOCID,
                  "FECHA": edocta.resp[i].FECHA,
                  "FECHAPAG": edocta.resp[i].FECHAPAG,
                  "VENCE": edocta.resp[i].VENCE,
                  "DIASPAGO": edocta.resp[i].DIASPAGO,
                  "FOLIO": edocta.resp[i].FOLIO,
                  "SALDO": saldo,
                  "CARGO": cargo,
                  "ABONO": parseFloat(edocta.resp[i].ABONO),
                  "RECIBO": edocta.resp[i].RECIBO,
                  "TIPO": edocta.resp[i].TIPO,
                  "FP": edocta.resp[i].FP,
                  "NOTA": edocta.resp[i].NOTA,
                  "TOTAL": edocta.resp[i].TOTAL,
                  "TOTALPAGADO": parseFloat(edocta.resp[i].TOTALPAGADO),
                  "SALDOFINAL": parseFloat(edocta.resp[i].SALDOFINAL),
                  "RESTAN": parseFloat(edocta.resp[i].RESTAN)
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
        if (data.status) {

          this.clienteFerrum = data.resp;
          this.nombre = data.resp.NOMBRE;
          this.number = data.resp.NUMERO;
          this.forcre = data.resp.FORCRE;
          this.saldoAct = data.resp.SALDO;
          this.limite = data.resp.LIMITE;
          this.nomAsesor = data.resp.ASESOR;
          const tel = String(data.resp.TEL);
          this.telAsesor = tel.slice(1, 11);

          this._creditoService.clienteSaldo(this.numero, this.fecha).subscribe((edocta: any) => {
            if (edocta.length > 0) {
              for (let i = 0; i < edocta.length; i++) {
                this.abonos += edocta[i].ABONO;

                if (edocta[i].SALDOFINAL !== 0) {
                  this.saldos += edocta[i].SALDOFINAL;
                }

                let esFolio = (factura) => {
                  return factura.FOLIO === edocta[i].FOLIO;
                };

                let saldo;
                let cargo;
                let car;

                if (this.datos.find(esFolio)) {
                  let index = i - 1;
                  cargo = this.datos[index].SALDO;
                  car = 0;
                } else {
                  cargo = edocta[i].CARGO;
                  car = edocta[i].CARGO;
                }

                if (edocta[i].ABONO === 0) {
                  saldo = edocta[i].SALDOFINAL;
                } else {
                  saldo = cargo - edocta[i].ABONO;
                }

                this.cargos += car;
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

          case 'admin':
            email = 'jcramirez@ferremayoristas.com.mx';
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

  public exportarPDF(datos: any, cliente: any, asesor: any, tel: any, cargos: any, abonos: any, saldo: any) {
    let filename = cliente.NUMERO + '-' + cliente.NOMBRE + '.pdf';
    this.filename = cliente.NUMERO + '-' + cliente.NOMBRE + '.pdf';
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
