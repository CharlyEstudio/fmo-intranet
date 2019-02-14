import { Component, OnInit, ɵConsole } from '@angular/core';
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

  inicial: any;
  final: any;

  idUsuario: any;
  usuario: Usuario;

  folio: any;
  folios: any[] = [];
  clientes: number = 0;
  // pedidos: GuiasPartidas;
  pedidos: any[] = [];
  guiasEnc: any[] = [];
  guiaGuardar: Guia;
  ultimasGuias: any[] = [];
  guiasRecientes: any[] = [];
  especialesDia: any[] = [];
  especialesDiaModal: any[] = [];
  especiales: any[] = [];

  generar: boolean = false;
  obtener: boolean = false;
  guias: boolean = true;
  tuberias: boolean = false;
  sinDatos: boolean = false;
  reasignadoBol: boolean = false;

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
  ruta: any;

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
      }
    });
  }

  // Este es el botón de buscar guia TODO
  checarLista(forma: NgForm) {
    this.total = 0;

    if (forma.value.inicial === undefined) {
      swal('Sin Fecha Inicial', 'No se ingreso fecha inicial para la busqueda.', 'warning');
      return;
    }

    if (forma.value.final === undefined) {
      swal('Sin Fecha Inicial', 'No se ingreso fecha final para la busqueda.', 'warning');
      return;
    }

    this.guiasEnc = [];

    this._guiasServices.buscarGuiasRango(forma.value.inicial, forma.value.final).subscribe((encontrados: any) => {
      if (encontrados.encontrados.length > 0) {
        this.generar = false;
        this.guias = false;
        this.tuberias = true;
        this.obtener = false;
        this.guiasEnc = encontrados.encontrados;
        for (let i = 0; i < encontrados.encontrados.length; i++) {
          this.total += encontrados.encontrados[i].cantidad;
        }
      } else {
        swal('No se encontro registro', 'No se encontro registro de guias en estas fechas.', 'warning');
        this.verGuias();
      }
    });
  }

  obtenerFolio(forma: NgForm) {
    this.generar = true;
    const folio = forma.value.folio;
    if (forma.value.folio === 0) {
      swal('Sin Folio', 'No se ingreso folio para agregar a la guía', 'warning');
      return;
    }

    this._guiasServices.buscarFolioGuia(forma.value.folio).subscribe((obtener: any) => {
      if (obtener.ok) {
        if (obtener.folios.length > 0) {
          swal('Folio Registrado', 'Este folio ' + forma.value.folio + ' ya esta registrado.', 'error');
        } else {
          let esFolio = (fac: any) => {
            return fac.folio === forma.value.folio;
          }

          if (this.folios.find(esFolio) !== undefined) {
            swal('Folio Repetido', 'Este folio ' + forma.value.folio + ' ya esta en la guía.', 'error');
            this.folio = '';
          } else {

            this._guiasServices.obtenerFolio(forma.value.folio).subscribe( ( partidas: any ) => {
              if (partidas.status) {
                this._guiasServices.buscarEspeciales(forma.value.folio).subscribe( ( especiales: any ) => {
                  if (especiales.status) {
                    for (let i = 0; i < especiales.respuesta.length; i++) {
                      let esEspecial = (pedido) => {
                        return pedido.clvprov === especiales.respuesta[i].clvprov;
                      }

                      if (this.especiales.find(esEspecial)) {
                        this.especiales.find(esEspecial).desentregado += especiales.respuesta[i].desentregado;
                      } else {
                        this.especiales.push(especiales.respuesta[i]);
                      }

                    }
                    this.especiales.reverse();
                    localStorage.setItem('especiales', JSON.stringify(this.especiales));
                  }
                });

                for (let i = 0; i < partidas.respuesta.length; i++) {
                  let esCliente = (cliente) => {
                    return cliente.numero === partidas.respuesta[i].numero;
                  }

                  if (!this.folios.find(esCliente)) {
                    if (this.clientes === 0) {
                      this.clientes = 1;
                    } else {
                      this.clientes += 1;
                    }
                  }
                  this.folios.push(partidas.respuesta[i]);
                }

                this.folios.reverse();

                localStorage.setItem('guia', JSON.stringify(this.folios));

                this.obtener = true;
                this.generar = true;
                this.sinDatos = false;

                this.folio = '';
              } else {
                this.obtener = false;
                this.generar = false;
                this.sinDatos = true;
                this.guias = false;
                swal('Ninguna Factura', 'Este folio ' + forma.value.folio + ' no tiene niguna factura relacionada.', 'error');
              }

            });
          }
        }
      } else {
        swal('Error en la Búsqueda', 'Se genero un error, favor de contactar al administrador.', 'error');
      }
    });

    /*this._guiasServices.buscarFolioGuia(forma.value.folio).subscribe( ( obtener: any ) => {
      if (obtener.ok) {
        swal('Folio Registrado', 'Este folio ' + forma.value.folio + ' ya esta registrado.', 'error');
        this.folio = '';
      } else {
        let esFolio = (fac: any) => {
          return fac.folio === forma.value.folio;
        }

        if (this.folios.find(esFolio) !== undefined) {
          swal('Folio Repetido', 'Este folio ' + forma.value.folio + ' ya esta en la guía.', 'error');
          this.folio = '';
        } else {

          this._guiasServices.obtenerFolio(forma.value.folio).subscribe( ( partidas: any ) => {
            if (partidas.status) {
              this._guiasServices.buscarEspeciales(forma.value.folio).subscribe( ( especiales: any ) => {
                if (especiales.status) {
                  for (let i = 0; i < especiales.respuesta.length; i++) {
                    let esEspecial = (pedido) => {
                      return pedido.clvprov === especiales.respuesta[i].clvprov;
                    }

                    if (this.especiales.find(esEspecial)) {
                      this.especiales.find(esEspecial).desentregado += especiales.respuesta[i].desentregado;
                    } else {
                      this.especiales.push(especiales.respuesta[i]);
                    }

                  }
                  localStorage.setItem('especiales', JSON.stringify(this.especiales));
                }
              });

              for (let i = 0; i < partidas.respuesta.length; i++) {
                let esCliente = (cliente) => {
                  return cliente.numero === partidas.respuesta[i].numero;
                }

                if (!this.folios.find(esCliente)) {
                  if (this.clientes === 0) {
                    this.clientes = 1;
                  } else {
                    this.clientes += 1;
                  }
                }
                this.folios.push(partidas.respuesta[i]);
              }

              localStorage.setItem('guia', JSON.stringify(this.folios));

              this.obtener = true;
              this.generar = true;
              this.sinDatos = false;

              this.folio = '';
            } else {
              this.obtener = false;
              this.generar = false;
              this.sinDatos = true;
              this.guias = false;
              swal('Ninguna Factura', 'Este folio ' + forma.value.folio + ' no tiene niguna factura relacionada.', 'error');
            }

          });
        }
      }
    });*/

  }

  eliminarFolio(folio: any, index: any) {
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
                    reasignar: false
                  };

                  this.pedidos.push(ped);

                  this.importe += this.folios[i].total;

                  // this._guiasServices.procesarGuia(ped).subscribe( ( procesado: any ) => {});

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
                  hora: hora,
                  clientes: this.clientes
                };

                // this._guiasServices.guardarGuia(this.guiaGuardar).subscribe( ( guardado: any ) => {});
                this._guiasServices.enviarPDFguia(
                  this.pedidos, this.guiaGuardar, this.especiales
                ).subscribe((resp: any) => {}, err => {});

                localStorage.removeItem('guia');
                localStorage.removeItem('especiales');
                this.folio = '';
                this.folios = [];
                this.pedidos = [];
                this.guiaGuardar = null;
                this.especiales = [];
                this.importe = 0;
                this.clientes = 0;
                this.generar = false;
                this.guias = true;
                this.tuberias = false;
                this.obtener = false;
                this.sinDatos = false;
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
    this.sinDatos = false;
    this.verGuias();
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

    this.ruta = this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://www.ferremayoristas.com.mx/api/pdf/' + this.chofer.toUpperCase() + '-' + this.cantidad + '-' + this.fec + '.pdf');
  }


  // TODO
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
        this._guiasServices.buscarEspeciales(facturas.facturas[i].factura).subscribe( ( especiales: any ) => {
          if (especiales.status) {
            for (let k = 0; k < especiales.respuesta.length; k++) {
              let esEspecial = (pedido) => {
                return pedido.clvprov === especiales.respuesta[k].clvprov;
              }

              if (this.especialesDiaModal.find(esEspecial)) {
                this.especialesDiaModal.find(esEspecial).desentregado += especiales.respuesta[k].desentregado;
              } else {
                this.especialesDiaModal.push(especiales.respuesta[k]);
              }

            }
          }
        });
      }
    });
  }

  borarModalVer() {
    this.especialesDiaModal = [];
    this.totalModal = 0;
    this.chofer = '';
    this.fol = 0;
    this.hora = '';
    this.impo = 0;
    this.veri = '';
    this.cantidad = 0;
    this.cajas = '';
    this.fec = '';
  }

  reasignar(fac: GuiasPartidas) {
    fac.reasignar = true;
    this._guiasServices.reasignarFolio(fac).subscribe((reasignado: any) => {
      if (reasignado.ok) {
        swal('Factura Reasignado', 'Esta factura se ha liberado.', 'success');
        document.getElementById("linea" + fac._id).classList.add("bg-primary");
        document.getElementById("linea" + fac._id).classList.add("text-white");
      } else {
        swal('Factura No Reasignada', 'Esta factura no se liberó correctamente.', 'error');
      }
    });
  }

  asignar(fac: GuiasPartidas) {
    fac.reasignar = false;
    this._guiasServices.reasignarFolio(fac).subscribe((reasignado: any) => {
      if (reasignado.ok) {
        swal('Factura Asignado', 'Esta factura se ha asignado.', 'success');
        document.getElementById("linea" + fac._id).classList.remove("bg-primary");
        document.getElementById("linea" + fac._id).classList.remove("text-white");
      } else {
        swal('Factura No Reasignada', 'Esta factura no se reasigno correctamente.', 'error');
      }
    });
  }

  enviarEmail(dato: any) {

    this._guiasServices.enviarEmail(dato).subscribe((email: any) => {
      if (email.ok) {
        swal('Factura Enviado', email.msg, 'success');
      } else {
        swal('Factura No Enviado', email.msg, 'error');
      }
    });

  }

}
