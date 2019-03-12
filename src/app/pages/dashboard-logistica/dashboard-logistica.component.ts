import { Component, OnInit, ɵConsole } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NgForm } from '@angular/forms';

// Servicios
import { GuiasService, UsuarioService, WebsocketService, ChoferesService } from '../../services/services.index';

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
  choferes: any[] = [];
  verificadores: any[] = [];
  abiertas: any = '';
  azules: any = '';
  nargde: any = '';
  narpeq: any = '';
  verifica: any = '0';
  chf: any = '0';
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
  porFecha: boolean = true;
  porFolio: boolean = false;
  facturaEncontrada: boolean = false;
  editarFolio: boolean = false;

  importe: number = 0;
  total: number = 0;

  /* Datos Modal PDF */
  chofer: any;
  choferImg: any;
  cajas: any;
  cantidad: any;
  fec: string;
  hora: string;
  fol: any;
  impo: number;
  veri: string;
  ruta: any;
  cli: any;

  /* Modal VER */
  facturas: any[] = [];
  totalModal: number = 0;

  /* FACTURA ENCONTRADA */
  noFac: number = 0;
  foliosBusq: any[] = [];
  folioPrinBusq: any[] = [];
  generoGuia: any;
  imgGeneroGuia: any;
  guiaEnc: any;

  constructor(
    private _guiasServices: GuiasService,
    private _usuarioService: UsuarioService,
    private _choferService: ChoferesService,
    private _webSocket: WebsocketService,
    public sanitizer: DomSanitizer
  ) {
    this.idUsuario = this._usuarioService.usuario._id;

    this.dataSelect();

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

    // this._webSocket.escuchar('guias-watch').subscribe((datos: any) => {
    //   if (!this.generar) {
    //     this.verGuias();
    //   }
    // });

  }

  ngOnInit() {
  }

  dataSelect() {
    this._choferService.obtenerChoferesAll().subscribe((conductores: any) => {
      if (conductores.ok) {
        this.choferes = conductores.choferes;
      }
    });

    this._choferService.obtenerVerificadores().subscribe((virify: any) => {
      if (virify.ok) {
        this.verificadores = virify.verificadores;
      }
    });
  }

  obtenerChofer() {
    // console.log(this.chf);
  }

  obtenerVerify() {
    // console.log(this.verifica);
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
    this.choferes = [];
    this.verificadores = [];
    this.abiertas = '';
    this.azules = '';
    this.nargde = '';
    this.narpeq = '';
    this.total = 0;
    this.dataSelect();

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

    if (forma === undefined) {
      swal('Sin Datos', 'No se ingreso ningún dato de fecha.', 'warning');
      return;
    }

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
      if (encontrados.status) {
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
    this.sinDatos = false;
    const folio = forma.value.folio;
    if (forma.value.folio === 0) {
      swal('Sin Folio', 'No se ingreso folio para agregar a la guía', 'warning');
      return;
    }

    this._guiasServices.buscarFolioGuia(forma.value.folio).subscribe((obtener: any) => {
      if (!obtener.asignar) {
        swal('Folio Registrado', 'Este folio ' + forma.value.folio + ' ya esta registrado.', 'error');
        return;
      }

      // Cambiar estado de FALSE a TRUE a todos los documentos. TODO

      // if (obtener.folios) {
      //   this.asignar(obtener.folios, 'agregando');
      // }

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
            this.sinDatos = true;
            swal('Ninguna Factura', 'Este folio ' + forma.value.folio + ' no tiene niguna factura relacionada.', 'error');
          }

        });
      }
    }, err => {
      swal('Error en la Búsqueda', 'Se genero un error, favor de contactar al administrador. Error: ' + err.error.mensaje, 'error');
    });

  }

  eliminarFolio(folio: any, index: any) {
    this.folios.splice(index, 1);

    if (this.folios.length === 0) {
      this.cancelarGuia();
      this.verGuias();
    }
  }

  procesarGuia() {

    if (this.chf === '0') {
      swal('Sin Chofer', 'Seleccione un chofer para procesar.', 'error');
      return;
    }

    if (this.verifica === '0') {
      swal('Sin Verificador', 'Seleccione un verificador para procesar.', 'error');
      return;
    }

    if (this.abiertas === '') {
      swal('Sin Número', 'Ingrese una cantidad o cero en cajas abiertas.', 'error');
      return;
    }

    if (this.azules === '') {
      swal('Sin Número', 'Ingrese una cantidad o cero  en cajas azules.', 'error');
      return;
    }

    if (this.nargde === '') {
      swal('Sin Número', 'Ingrese una cantidad o cero  en cajas naranjas grandes.', 'error');
      return;
    }

    if (this.narpeq === '') {
      swal('Sin Número', 'Ingrese una cantidad o cero  en cajas naranjas pequeñas.', 'error');
      return;
    }

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
      title: "¿Quiere procesar la Guía?",
      text: 'Se enviara a procesar la guía.',
      icon: "warning",
      buttons: {
        cancel: true,
        confirm: true,
        closeModal: false
      },
    })
    .then((aceptar) => {
      if (!aceptar) { return null };

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

        this._guiasServices.procesarGuia(ped).subscribe( ( procesado: any ) => {});

      }

      let cajas = "Cafes: " + this.abiertas + ", Azules: " + this.azules + ", NarGde: " + this.nargde + ", NarPeq: " + this.narpeq;

      const pdf = this.chf.nombre.toUpperCase() + '-' + this.folios.length + '-' + fecha + '.pdf';

      this.guiaGuardar = {
        folio: idFol,
        verifico: this.verifica.nombre,
        cantidad: this.folios.length,
        importe: this.importe,
        cajas: cajas,
        fecha: fecha,
        hora: hora,
        pdf: pdf,
        clientes: this.clientes
      };

      this._guiasServices.guardarGuia(this.guiaGuardar, this.chf).subscribe( ( guardado: any ) => {
        if (guardado.ok) {
          // this._webSocket.acciones('guias-watch', guardado.guiasGuardado);
          swal({
            title: "Guia Procesada",
            text: 'Procesado Exitosamente'
          });
        }
      });
      this._guiasServices.enviarPDFguia(
        this.pedidos, this.guiaGuardar, this.especiales, this.chf
      ).subscribe((resp: any) => {}, err => {});

      localStorage.removeItem('guia');
      localStorage.removeItem('especiales');
      this.folio = '';
      this.folios = [];
      this.pedidos = [];
      this.chf = '';
      this.verifica = '';
      this.guiaGuardar = null;
      this.especiales = [];
      this.choferes = [];
      this.verificadores = [];
      this.abiertas = '';
      this.azules = '';
      this.nargde = '';
      this.narpeq = '';
      this.importe = 0;
      this.clientes = 0;
      this.generar = false;
      this.guias = true;
      this.tuberias = false;
      this.obtener = false;
      this.sinDatos = false;
      this.verGuias();
    })
    .catch(err => {
      if (err) {
        swal("Hubo un error!", err, "error");
      } else {
        swal.stopLoading();
      }
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
    this.chofer = '';
    this.fol = '';
    this.hora = '';
    this.impo = 0;
    this.veri = '';
    this.cantidad = 0;
    this.cajas = '';
    this.fec = '';
    this.chofer = dato.chofer.nombre;
    this.fol = dato.folio;
    this.hora = dato.hora;
    this.impo = dato.importe;
    this.veri = dato.verifico;
    this.cantidad = dato.cantidad;
    this.cajas = dato.cajas;
    this.fec = dato.fecha;
    const pdf = dato.pdf

    this.ruta = this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://www.ferremayoristas.com.mx/api/pdf/' + pdf);
  }


  // TODO
  modalVer(dato: any) {
    this.totalModal = 0;
    this.chofer = '';
    this.choferImg = '';
    this.fol = '';
    this.hora = '';
    this.impo = 0;
    this.veri = '';
    this.cantidad = 0;
    this.cajas = '';
    this.fec = '';
    this.chofer = dato.chofer.nombre;
    this.choferImg = dato.chofer.img;
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

  reasignar(fac: GuiasPartidas, tipo: any = '') {
    console.log(fac);
    this._guiasServices.buscarFolioHistorial(fac.factura).subscribe((encon: any) => {
      if (encon.folios.length > 1) {
        for (let i = 0; i < encon.folios.length; i++) {
          encon.folios[i].reasignar = true;
          this._guiasServices.reasignarFolio(encon.folios[i]).subscribe((reasignado: any) => {
            if (reasignado.ok) {
              swal('Factura Reasignado', 'Esta factura se ha liberado.', 'success');
              if (tipo === '') {
                document.getElementById("linea" + fac._id).classList.add("bg-primary");
                document.getElementById("linea" + fac._id).classList.add("text-white");
              }
            } else {
              swal('Factura No Reasignada', 'Esta factura no se liberó correctamente.', 'error');
            }
          });
        }
      } else {
        encon.folios[0].reasignar = true;
        this._guiasServices.reasignarFolio(encon.folios[0]).subscribe((reasignado: any) => {
          if (reasignado.ok) {
            swal('Factura Reasignado', 'Esta factura se ha liberado.', 'success');
            if (tipo === '') {
              document.getElementById("linea" + fac._id).classList.add("bg-primary");
              document.getElementById("linea" + fac._id).classList.add("text-white");
            }
          } else {
            swal('Factura No Reasignada', 'Esta factura no se liberó correctamente.', 'error');
          }
        });
      }
    });
  }

  asignar(fac: GuiasPartidas, tipo: any = '') {
    this._guiasServices.buscarFolioHistorial(fac.factura).subscribe((encon: any) => {
      if (encon.folios.length > 1) {
        for (let i = 0; i < encon.folios.length; i++) {
          encon.folios[i].reasignar = false;
          this._guiasServices.reasignarFolio(encon.folios[i]).subscribe((reasignado: any) => {
            if (reasignado.ok) {
              swal('Factura Asignado', 'Esta factura se ha asignado.', 'success');
              if (tipo === '') {
                document.getElementById("linea" + fac._id).classList.remove("bg-primary");
                document.getElementById("linea" + fac._id).classList.remove("text-white");
              }
            } else {
              swal('Factura No Reasignada', 'Esta factura no se reasigno correctamente.', 'error');
            }
          });
        }
      } else {
        encon.folios[0].reasignar = false;
        this._guiasServices.reasignarFolio(encon.folios[0]).subscribe((reasignado: any) => {
          if (reasignado.ok) {
            swal('Factura Asignado', 'Esta factura se ha asignado.', 'success');
            if (tipo === '') {
              document.getElementById("linea" + fac._id).classList.remove("bg-primary");
              document.getElementById("linea" + fac._id).classList.remove("text-white");
            }
          } else {
            swal('Factura No Reasignada', 'Esta factura no se reasigno correctamente.', 'error');
          }
        });
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

  tipoBus(valor: any) {
    this.foliosBusq = [];
    if (valor === '0') {
      this.porFecha = true;
      this.porFolio = false;
    } else {
      this.porFecha = false;
      this.porFolio = true;
    }
  }

  buscarFolio(folio: any) {
    this.facturaEncontrada = false;
    this.foliosBusq = [];
    const fol = Number(folio);
    this._guiasServices.buscarFolioHistorial(fol).subscribe((factura: any) => {
      if (factura.ok) {
        if (factura.folios.length > 0) {
          this.facturaEncontrada = true;
          this.noFac = fol;
          this.foliosBusq = factura.folios;
        } else {
          swal('Factura No Encontrada', 'Esta factura no se ha asignado ninguna guía.', 'error');
        }
      } else {
        swal('Error', 'Error en la búsqueda.', 'error');
      }
    });
  }

  verGuiaPrin(folio: any) {
    this.guiaEnc = '';
    this.chofer = '';
    this.fol = '';
    this.hora = '';
    this.impo = 0;
    this.veri = '';
    this.cantidad = 0;
    this.cajas = '';
    this.fec = '';
    this._guiasServices.buscarGuiaPrin(folio).subscribe((gP: any) => {
      this.guiaEnc = {factura: this.noFac};
      this.chofer = gP.factura.chofer.nombre;
      this.fol = gP.factura.folio;
      this.hora = gP.factura.hora;
      this.impo = gP.factura.importe;
      this.veri = gP.factura.verifico;
      this.cantidad = gP.factura.cantidad;
      this.cajas = gP.factura.cajas;
      this.fec = gP.factura.fecha;
      this.cli = gP.factura.clientes;
      this.generoGuia = gP.usuario.nombre;
      this.imgGeneroGuia = gP.usuario.img;
    });
  }

  editar(folio: any) {
    document.getElementById('edit' + folio._id).style.display = "none";
    document.getElementById('chofer' + folio._id).style.display = "none";
    document.getElementById('confirm' + folio._id).style.display = "inline";
    document.getElementById('choferSel' + folio._id).style.display = "inline";
  }

  enviarEditar(folio: any) {
    document.getElementById('edit' + folio._id).style.display = "inline";
    document.getElementById('chofer' + folio._id).style.display = "inline";
    document.getElementById('confirm' + folio._id).style.display = "none";
    document.getElementById('choferSel' + folio._id).style.display = "none";
    this._guiasServices.actualizarGuiaPri(folio._id, this.chf).subscribe((resp: any) => {
      if (resp.ok) {
        this.verGuias();
        this._webSocket.acciones('centinela-chofer', resp.guia);
      }
    });
  }

}
