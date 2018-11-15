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

  usuario: Usuario;
  asesor: number = 0;
  clienteFerrum: any[] = [];
  clienteMongo: any; // Aquí va el modelo de Cliente de Mongo, cambiar "any" por "Cliente"
  numero: any = '';
  abonos: number = 0;

  datos: any[] = [];

  localizado: boolean = false;
  cargando: boolean = false;

  constructor(
    private _usuariosService: UsuarioService,
    private _clientesService: ClientesService
  ) {
    this.usuario = this._usuariosService.usuario;
    this.asesor = Number(this.usuario.idFerrum);
  }

  ngOnInit() {
  }

  obtenerCliente( forma: NgForm ) {

    this.cargando = true;

    this.datos = [];
    this.abonos = 0;

    console.log(forma.value);

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

        if(data.length > 0){

          this.clienteFerrum = data[0];

          this._clientesService.obtenerFacturas(data[0].CLIENTEID, forma.value.inicio)
            .subscribe( ( edocta: any ) => {

              for(let i = 0; i < edocta.length; i++) {
                this._clientesService.obtenerMovimiento(edocta[i].DOCID)
                  .subscribe( ( resp: any ) => {

                    if(resp.length > 0){

                      if(edocta[i].DOCID === resp[0].DOCID){

                        for(let k = 0; k < resp.length; k++) {

                          var nuevo = [
                            {
                              "DOCID": edocta[i].DOCID,
                              "FECHA": resp[k].FECHAAPLICADA,
                              "FOLIO": edocta[i].FOLIO,
                              "CARGO": '',
                              "ABONO": resp[k].PAGADO,
                              "RECIBO": resp[k].RECIBO,
                              "TIPO": resp[k].FORMAPAGO,
                              "FP": resp[k].FP
                            }
                          ];

                          this.abonos += resp[k].PAGADO;

                          if(k === 0){
                            
                            this.datos.push(edocta[i]);

                          }

                          this.datos.push(nuevo[0]);

                        }

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

}
