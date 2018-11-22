import { Component, OnInit } from '@angular/core';
import { UsuarioService, ClientesService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edo-cta',
  templateUrl: './edo-cta.component.html',
  styles: []
})
export class EdoCtaComponent implements OnInit {

  // Datos del Usuario
  asesor: number = 0;
  usuario: Usuario;

  // Datos del Cliente
  clienteFerrum: any[] = [];
  clienteMongo: any[] = []; // Aquí va el modelo de Cliente de Mongo, cambiar "any" por "Cliente"

  // Importes
  numero: any = '';
  abonos: number = 0;
  cargos: number = 0;
  preSaldo: number = 0;

  // Dato General
  datos: any[] = [];

  // Booleanos
  localizado: boolean = false;
  cargando: boolean = false;

  constructor(
    private _usuariosService: UsuarioService,
    private _clientesService: ClientesService
  ) {
    this.usuario = this._usuariosService.usuario;
    this.asesor = Number(this.usuario.idFerrum);

    this.clienteMongo = [
      {
        "email": "contacto@ferremayoristas.com.mx"
      }
    ];
  }

  ngOnInit() {
  }

  obtenerCliente( forma: NgForm ) {

    this.cargando = true;

    this.datos = [];
    this.abonos = 0;

    if ( forma.value.numero === 0 ) {
      swal('Debe ingresar el número de cliente', 'No ha ingresado el número de cliente para la busqueda.', 'error');
      return;
    }

    if ( forma.value.inicio === undefined ) {
      swal('Debe ingresar la fecha inicial', 'No ha ingresado la fecha inicial para la busqueda.', 'error');
      return;
    }

    this.numero = forma.value.numero;

    this._clientesService.infoCliente(this.numero, this.asesor)
      .subscribe( ( data: any ) => {

        if (data.length > 0) {

          this.clienteFerrum = data[0];

          this._clientesService.obtenerFacturas(data[0].CLIENTEID, forma.value.inicio)
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

                          // if(edocta[i].SALDOFINAL > 0 && edocta[i].TOTALPAGADO == 0){
                          //   this.preSaldo = edocta[i].SALDO;
                          // } else if(edocta[i].SALDOFINAL == 0 && edocta[i].TOTALPAGADO > 0) {
                          //   this.preSaldo = 0;
                          // } else {
                          //   if(this.preSaldo === 0) {
                          //     this.preSaldo = edocta[i].SALDO - resp[k].PAGADO;
                          //   } else {
                          //     this.preSaldo = this.preSaldo - resp[k].PAGADO;
                          //   }
                          // }

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

  enviarEmail( datos: any, cliente: any ) {

    if (cliente.CORREO === 'cnmfmo@gmail.com') {

      // tslint:disable-next-line:max-line-length
      swal('Cliente Sin Email', 'El cliente:' + cliente.NOMBRE + ' no tiene un email registrado, favor de comunicarse con Gerencia.', 'warning');

    } else {

      this._clientesService.enviarEdoCtaEmail(cliente.CORREO, datos, cliente)
        .subscribe( ( email: any ) => {

          if (email[0].status === 'ok') {

            // tslint:disable-next-line:max-line-length
            swal('Envío Exitoso', 'El email del Estado de Cuenta del cliente: ' + cliente.NOMBRE + ' se envío de manera correcta.', 'success');

          } else {

            // tslint:disable-next-line:max-line-length
            swal('Error de Envío', 'El email del Estado de Cuenta del cliente: ' + cliente.NOMBRE + ' no se envío de manera correcta.', 'error');

          }

        });

    }

  }

}
