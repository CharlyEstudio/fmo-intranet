import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NgForm } from '@angular/forms';

// Servicios
import { GuiasService, UsuarioService } from '../../services/services.index';

// Modelos
import { GuiasPartidas } from '../../models/guias.model';
import { Guia } from '../../models/guia.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-dashboard-logistica',
  templateUrl: './dashboard-logistica.component.html',
  styles: []
})
export class DashboardLogisticaComponent implements OnInit {

  fecha = Date.now();

  idUsuario: any;
  usuario: Usuario;

  folio: any;
  folios: any[] = [];
  // pedidos: GuiasPartidas;
  pedidos: any[] = [];
  guiasEnc: any[] = [];
  guiaGuardar: Guia;
  ultimasGuias: any[] = [];
  guiasRecientes: any[] = [];
  especialesDia: any[] = [];
  especiales: any[] = [];

  generar: boolean = false;
  obtener: boolean = false;
  guias: boolean = true;
  tuberias: boolean = false;

  importe: number = 0;
  total: number = 0;

  /* Datos Modal PDF */
  chofer: any;
  cajas: any;
  cantidad: any;
  fec: string;
  hora: string;
  fol: any;
  impo: number;
  veri: string;
  ruta: string;

  /* Modal VER */
  facturas: any[] = [];
  totalModal: number = 0;

  constructor(
    private _guiasServices: GuiasService,
    private _usuarioService: UsuarioService,
    public sanitizer: DomSanitizer
  ) {
    this.idUsuario = this._usuarioService.usuario._id;

    let guias = JSON.parse(localStorage.getItem('guia'));
    let especiales = JSON.parse(localStorage.getItem('especiales'));

    if (guias !== null) {
      if (guias.length > 0) {
        this.folios = guias;
        this.generarGuia();
        this.obtener = true;
      }
    } else {
      let h = new Date();

      let dia;

      if (h.getDate() < 10) {
        dia = '0' + h.getDate();
      } else {
        dia = h.getDate();
      }

      let mes;

      if (h.getMonth() < 10) {
        mes = '0' + (h.getMonth() + 1);
      } else {
        mes = (h.getMonth() + 1);
      }

      let anio = h.getFullYear();

      let fecha = anio + '-' + mes + '-' + dia;

      this._guiasServices.obtenerGuiasDia(fecha).subscribe( ( resp: any ) => {
        this.guiasRecientes = resp.guias;
      });
      this.verGuias();
    }

    if (especiales !== null) {
      if (especiales.length > 0) {
        this.especiales = especiales;
      }
    }
  }

  ngOnInit() {
  }

  generarGuia() {
    if (this.folios.length > 0) {
      this.generar = true;
      this.guias = false;
      this.tuberias = false;
      this.obtener = true;
    } else {
      this.generar = true;
      this.guias = false;
      this.tuberias = false;
      this.obtener = false;
    }
  }

  verGuias() {
    this.ultimasGuias = [];
    this.total = 0;

    let h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    let fecha = anio + '-' + mes + '-' + dia;

    this._guiasServices.obtenerGuiasDia(fecha).subscribe( ( guias: any ) => {
      if (guias.guias.length > 0) {
        this.guiasEnc = guias.guias;
        this.generar = false;
        this.guias = true;
        this.tuberias = false;
        this.obtener = false;
      } else {
        this.generar = false;
        this.guias = false;
        this.tuberias = false;
        this.obtener = false;
      }

      guias.guias.reverse();

      for (let i = 0; i < guias.guias.length; i++) {
        this.total += guias.guias[i].cantidad;
        if (i < 3) {
          this.ultimasGuias.push(guias.guias[i]);
        }

        // Aquí para obtener los especiales
        this._guiasServices.buscarPartidasFolio(guias.guias[i].folio).subscribe( ( partidas: any ) => {
          if (partidas.facturas.length > 0) {
            for (let j = 0; j < partidas.facturas.length; j++) {
              this._guiasServices.buscarEspeciales(partidas.facturas[j].factura).subscribe( ( especiales: any ) => {
                if (especiales.length > 0) {
                  for (let k = 0; k < especiales.length; k++) {
                    let esEspecial = (pedido) => {
                      return pedido.clvprov === especiales[k].clvprov;
                    }

                    if (this.especialesDia.find(esEspecial)) {
                      this.especialesDia.find(esEspecial).desentregado += especiales[k].desentregado;
                    } else {
                      this.especialesDia.push(especiales[k]);
                    }

                  }
                }
              });
            }
          }
        });
      }
    });
  }

  checarLista(especiales: any) {
    this.generar = false;
    this.guias = false;
    this.tuberias = true;
    this.obtener = false;
  }

  obtenerFolio(forma: NgForm) {
    if (forma.value.folio === 0) {
      swal('Sin Folio', 'No se ingreso folio para agregar a la guía', 'warning');
      return;
    }

    this._guiasServices.buscarFolioGuia(forma.value.folio).subscribe( ( obtener: any ) => {
      if (obtener.ok) {
        swal('Folio Registrado', 'Este folio ' + forma.value.folio + ' ya esta registrado.', 'error');
        this.folio = '';
      } else {
        let esFolio = (folio) => {
          return folio.folio === forma.value.folio;
        }

        if (this.folios.find(esFolio) !== undefined) {
          swal('Folio Repetido', 'Este folio ' + forma.value.folio + ' ya esta en la guía.', 'error');
          this.folio = '';
          return;
        }

        this.obtener = true;

        this._guiasServices.buscarEspeciales(forma.value.folio).subscribe( ( especiales: any ) => {
          if (especiales.length > 0) {
            for (let i = 0; i < especiales.length; i++) {
              let esEspecial = (pedido) => {
                return pedido.clvprov === especiales[i].clvprov;
              }

              if (this.especiales.find(esEspecial)) {
                this.especiales.find(esEspecial).desentregado += especiales[i].desentregado;
              } else {
                this.especiales.push(especiales[i]);
              }

            }
            localStorage.setItem('especiales', JSON.stringify(this.especiales));
          }
        });

        this._guiasServices.obtenerFolio(forma.value.folio).subscribe( ( partidas: any ) => {
          for (let i = 0; i < partidas.length; i++) {
            this.folios.push(partidas[i]);
          }

          localStorage.setItem('guia', JSON.stringify(this.folios));

          this.folio = '';

        });
      }
    });

  }

  eliminarFolio(folio: any, index: any) {
    console.log(folio, index);
    console.log(this.folios);
    this.folios.splice(index, 1);

    if (this.folios.length === 0) {
      this.cancelarGuia();
      this.verGuias();
    }
  }

  procesarGuia() {
    let h = new Date();

    let hor;

    if (h.getHours() < 10) {
      hor = '0' + h.getHours();
    } else {
      hor = h.getHours();
    }

    let min;

    if (h.getMinutes() < 10) {
      min = '0' + h.getMinutes();
    } else {
      min = h.getMinutes();
    }

    let sec;

    if (h.getSeconds() < 10) {
      sec = '0' + h.getSeconds();
    } else {
      sec = h.getSeconds();
    }

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    let hora = hor + ':' + min + ':' + sec;

    let fecha = anio + '-' + mes + '-' + dia;

    let idFol = this.idUsuario + '-' + Date.now();

    swal({
      title: "¿Procesar Guía?",
      text: 'Ingrese el nombre del chofer.',
      icon: "warning",
      buttons: {
        cancel: true,
        confirm: true
      },
      content: {
        element: "input",
        attributes: {
            placeholder: "Chofer",
            type: "text",
        },
      },
    })
    .then(( chofer ) => {
      if (!chofer) { return null };

      swal({
        title: "¿Procesar Guía?",
        text: 'Ingrese el nombre del verificador.',
        icon: "warning",
        buttons: {
          cancel: true,
          confirm: true
        },
        content: {
          element: "input",
          attributes: {
              placeholder: "Verificador",
              type: "text",
          },
        },
      })
      .then((verificador) => {
        if (!verificador) { return null };

        swal({
          title: "¿Cajas Abiertas?",
          text: 'Ingrese las cajas cafes/abiertas.',
          icon: "warning",
          buttons: {
            cancel: true,
            confirm: true
          },
          content: {
            element: "input",
            attributes: {
                placeholder: "Abiertas",
                type: "text",
            },
          },
        })
        .then((abiertas) => {
          if (!abiertas) { return null };

          swal({
            title: "¿Cajas Azules?",
            text: 'Ingrese las cajas azules.',
            icon: "warning",
            buttons: {
              cancel: true,
              confirm: true
            },
            content: {
              element: "input",
              attributes: {
                  placeholder: "Azules",
                  type: "text",
              },
            },
          })
          .then((azules) => {
            if (!azules) { return null };

            swal({
              title: "¿Cajas Naranjas Grandes?",
              text: 'Ingrese las cajas naranjas grandes.',
              icon: "warning",
              buttons: {
                cancel: true,
                confirm: true
              },
              content: {
                element: "input",
                attributes: {
                    placeholder: "Narajnas Grandes",
                    type: "text",
                },
              },
            })
            .then((narGde) => {
              if (!narGde) { return null };

              swal({
                title: "¿Cajas Naranjas Pequeñas?",
                text: 'Ingrese las cajas naranjas pequeñas.',
                icon: "warning",
                buttons: {
                  cancel: true,
                  confirm: true
                },
                content: {
                  element: "input",
                  attributes: {
                      placeholder: "Narajnas Pequeñas",
                      type: "text",
                  },
                },
              })
              .then((narPeq) => {
                if (!narPeq) { return null };

                let importe;

                for (let i = 0; i < this.folios.length; i++) {
                  let ped = {
                    folio: idFol,
                    factura: this.folios[i].folio,
                    cliente: this.folios[i].numero,
                    nombre: this.folios[i].nombre,
                    domicilio: this.folios[i].direccion + ', ' + this.folios[i].colonia,
                    poblacion: this.folios[i].ciudad + ', ' + this.folios[i].estado,
                    vendedor: this.folios[i].vendedor,
                    importe: this.folios[i].total,
                    fecha: fecha,
                    hora: hora,
                  };

                  this.pedidos.push(ped);

                  this.importe += this.folios[i].total;

                  this._guiasServices.procesarGuia(ped).subscribe( ( procesado: any ) => {});

                }

                let cajas = "Cafes: " + abiertas + ", Azules: " + azules + ", NarGde: " + narGde + ", NarPeq: " + narPeq;

                this.guiaGuardar = {
                  folio: idFol,
                  chofer: chofer,
                  verifico: verificador,
                  cantidad: this.folios.length,
                  importe: this.importe,
                  cajas: cajas,
                  fecha: fecha,
                  hora: hora
                };

                this._guiasServices.guardarGuia(this.guiaGuardar).subscribe( ( guardado: any ) => {});
                this._guiasServices.enviarPDFguia(this.pedidos, this.guiaGuardar, this.especiales).subscribe( (pdf: any) => {
                  console.log(pdf);
                });

                localStorage.removeItem('guia');
                localStorage.removeItem('especiales');
                this.folio = '';
                this.folios = [];
                this.especiales = [];
                this.importe = 0;
                this.generar = false;
                this.guias = true;
                this.tuberias = false;
                this.obtener = false;
                setTimeout(() => this.verGuias(), 500);

                swal.stopLoading();
              });
            });
          });
        });
      });
    });
  }

  cancelarGuia() {
    localStorage.removeItem('guia');
    localStorage.removeItem('especiales');
    this.folio = '';
    this.folios = [];
    this.especiales = [];
    this.generar = false;
    this.guias = true;
    this.tuberias = false;
    this.obtener = false;
  }

  modalPDF(dato: any) {
    this.chofer = dato.chofer;
    this.fol = dato.folio;
    this.hora = dato.hora;
    this.impo = dato.importe;
    this.veri = dato.verifico;
    this.cantidad = dato.cantidad;
    this.cajas = dato.cajas;
    this.fec = dato.fecha;

    this.ruta = 'http://www.ferremayoristas.com.mx/api/pdf/' + 'JuanGarcia' + '-' + this.cantidad + '-' + this.fec + '.pdf';
  }

  modalVer(dato: any) {
    this.totalModal = 0;
    this.chofer = dato.chofer;
    this.fol = dato.folio;
    this.hora = dato.hora;
    this.impo = dato.importe;
    this.veri = dato.verifico;
    this.cantidad = dato.cantidad;
    this.cajas = dato.cajas;
    this.fec = dato.fecha;

    this._guiasServices.obtenerFacturasFolio(this.fol).subscribe( ( facturas: any ) => {
      this.facturas = facturas.facturas;
      for (let i = 0; i < facturas.facturas.length; i++) {
        this.totalModal += facturas.facturas[i].importe;
      }
    });
  }

}
