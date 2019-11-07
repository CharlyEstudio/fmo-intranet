import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { UsuarioService, ChequesdevService, WebsocketService } from '../../services/services.index';
import { TablachdevService } from '../../components/tablachdev/tablachdev.service';

@Component({
  selector: 'app-chequesdev',
  templateUrl: './chequesdev.component.html',
  styles: []
})
export class ChequesdevComponent implements OnInit {

  usuario: Usuario;

  chequesDev: any[] = [];

  todos: number = 0;
  pendientes: number = 0;
  cobrados: number = 0;
  terminados: number = 0;

  gerente: boolean = false;
  direccion: boolean = false;
  cc: boolean = false;
  admin: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private chequesDevService: ChequesdevService,
    private ws: WebsocketService,
    private tablachdevService: TablachdevService
  ) {
    this.usuario = this.usuarioService.usuario;
    if (this.usuario.rol === 'DIR_ROLE') {
      this.direccion = true;
      this.gerente = false;
      this.admin = false;
      this.cc = false;
    } else if (this.usuario.rol === 'GER_ROLE') {
      this.direccion = false;
      this.gerente = true;
      this.admin = false;
      this.cc = false;
    } else if (this.usuario.rol === 'ADMIN_ROLE') {
      this.direccion = false;
      this.gerente = false;
      this.admin = true;
      this.cc = false;
    } else if (this.usuario.rol === 'AUD_ROLE') {
      this.direccion = false;
      this.gerente = false;
      this.admin = false;
      this.cc = true;
    }

    this.obtenemosChquesDev();
  }

  ngOnInit() {
    this.actualizar();
  }

  actualizar() {
    swal({
      title: 'Actualizar',
      text: 'Quiere Actualizar la información?',
      buttons: {
        cancel: true,
        confirm: true
      },
      icon: 'warning'
    })
    .then((resp) => {
      if (resp) {
        swal("Recibiendo", 'Actualizando', "success");
        this.chequeDevFerrum();
        this.tablachdevService.actualizar.emit(true);
      }
    })
    .catch(err => {
      if (err) {
        swal("Error", err, "error");
      } else {
        swal.stopLoading();
        swal.close('true');
      }
    });
  }

  enviar(forma: NgForm) {
    if (forma.value.importe === '') {
      swal('Sin Importe', 'Se debe de ingresar un importe', 'error');
      return;
    }

    if (forma.value.fecha === '') {
      swal('Sin Fecha', 'Se debe de ingresar una fecha', 'error');
      return;
    }

    this.chequesDevService.guardarNuevoCheque(forma.value.fecha, forma.value.importe).subscribe((resp: any) => {
      if (resp.length === 0) {
        this.obtenemosChquesDev();
        const enviosock = {
          msg: 'Nuevo registro de Cheque Devuelto',
          opcion: 1,
          data: forma.value.importe
        }
        this.ws.acciones('nuevo-cheque-devuelto', enviosock);
        forma.onReset();
        const input = <HTMLElement>(document.getElementById('importe'));
        input.focus();
      }
    });
  }

  chequeDevFerrum() {
    this.chequesDevService.obtenemosCHFerrum().subscribe((ch: any) => {
      if (ch.length > 0) {
        this.chequesDevService.obtenemosChquesDev().subscribe((cheques: any) => {
          for (const c of ch) {
            const esFolio = (folio: any) => {
              return folio.folio === c.NUMERO;
            };
            if (cheques.find(esFolio)) {
              if ((c.TOTAL - c.TOTALPAGADO) > 0) {
                const enviar = {
                  id: cheques.find(esFolio).id,
                  fechacheque: c.FECHA,
                  importe: cheques.find(esFolio).importe,
                  saldo: (c.TOTAL - c.TOTALPAGADO),
                  fechaaplica: c.CAMBIADO,
                  folio: cheques.find(esFolio).folio,
                  facturas: c.NOTA,
                  banco: cheques.find(esFolio).banco,
                  nocheque: cheques.find(esFolio).nocheque,
                  clienteid: cheques.find(esFolio).clienteid,
                  cobrado: ((c.TOTAL - c.TOTALPAGADO) > 0) ? 0 : 1,
                  terminado: ((c.TOTAL - c.TOTALPAGADO) > 0) ? 0 : 1
                };
                this.recibe(enviar);
              }
            } else {
              const enviar = {
                fechacheque: c.FECHA,
                importe: c.TOTAL,
                saldo: (c.TOTAL - c.TOTALPAGADO),
                fechaaplica: c.CAMBIADO,
                folio: c.NUMERO,
                facturas: c.NOTA,
                banco: '',
                nocheque: '',
                clienteid: c.CLIENTEID,
                cobrado: ((c.TOTAL - c.TOTALPAGADO) > 0) ? 0 : 1,
                terminado: ((c.TOTAL - c.TOTALPAGADO) > 0) ? 0 : 1
              };
              this.chequesDevService.guardarChequeFerrum(enviar).subscribe(() => {});
            }
          }
          this.obtenemosChquesDev();
        });
      }
    });
  }

  obtenemosChquesDev() {
    this.chequesDevService.obtenemosChquesDev().subscribe((cheques: any) => {
      if (cheques.length > 0) {
        this.todos = cheques.length;
        this.chequesDev = cheques;
        // for (const ch of cheques) {
        //   console.log(ch);
        // }
      }
    });

    this.chequesDevService.obtenerPendientes().subscribe((pend: any) => {
      if (pend.length > 0) {
        this.pendientes = pend.length;
      }
    });

    this.chequesDevService.obtenerCobrados().subscribe((cob: any) => {
      if (cob.length > 0) {
        this.cobrados = cob.length;
      }
    });

    this.chequesDevService.obtenerTerninados().subscribe((term: any) => {
      if (term.length > 0) {
        this.terminados = term.length;
      }
    });
  }

  recibe(datos: any) {
    if (datos.guardar) {
      this.chequesDevService.actualizarDato(datos.enviar).subscribe((resp: any) => {
        if (resp.length === 0) {
          this.obtenemosChquesDev();
          const envio = {
            msg: 'Cheque Actualizado',
            opcion: 4,
            folio: datos.enviar.folio,
            cliente: datos.enviar.nombre,
            importe: datos.enviar.importe
          };
          this.ws.acciones('nuevo-cheque-devuelto', envio);
        }
      });
    } else {
      this.chequesDevService.actualizarDato(datos).subscribe((resp: any) => {
        if (resp.length === 0) {
          this.obtenemosChquesDev();
        }
      });
    }
  }

  cerrarCheque(datos: any) {
    if (datos.guardar) {
      this.chequesDevService.terminar(datos.enviar.id).subscribe((resp: any) => {
        if (resp.length === 0) {
          this.obtenemosChquesDev();
          const envio = {
            msg: 'Cheque Terminado',
            opcion: 2,
            folio: datos.folio,
            cliente: datos.nombre,
            importe: datos.importe
          };
          this.ws.acciones('nuevo-cheque-devuelto', envio);
        }
      });
    }
  }

  // cobrado(datos: any) {
  //   console.log('Recibe: ', datos);
  //   this.chequesDevService.cobrado(datos.id).subscribe((resp: any) => {
  //     if (resp.length === 0) {
  //       this.obtenemosChquesDev();
  //       this.ws.acciones('nuevo-cheque-devuelto', datos);
  //     }
  //   });
  // }

  recuperarCheque(datos: any) {
    this.chequesDevService.recuperar(datos.id).subscribe((resp: any) => {
      if (resp.length === 0) {
        this.obtenemosChquesDev();
        const enviosock = {
          msg: 'Retornando Cheque Devuelto',
          opcion: 3,
          folio: datos.folio,
          cliente: datos.nombre,
          importe: datos.importe
        }
        this.ws.acciones('nuevo-cheque-devuelto', enviosock);
      }
    });
  }

}
