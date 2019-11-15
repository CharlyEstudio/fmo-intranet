import { Component, OnInit, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NgForm } from '@angular/forms';

// Servicios
import { GuiasService, UsuarioService, WebsocketService, ChoferesService, HerramientasService, ClientesService } from '../../services/services.index';

// Modelos
import { GuiasPartidas } from '../../models/guias.model';
import { Guia } from '../../models/guia.model';
import { Usuario } from '../../models/usuario.model';
import { Ruta } from '../../models/ruta.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-dashboard-logistica',
  templateUrl: './dashboard-logistica.component.html',
  styles: []
})
export class DashboardLogisticaComponent implements OnInit {

  @ViewChild('folioIn') inputFolio: ElementRef;
  // @ViewChild('fecBusqueda') inputFecBusqueda: ElementRef;

  fecha: any;

  // Si es viernes, se puede elegir la fecha para asignar la guía.
  diaSemana = new Date().getDay();
  fechaAsignar: any;

  inicial: any;
  final: any;

  idUsuario: any;
  usuario: Usuario;
  rutaEnviar: any[] = [];

  // Vehículos
  unidades: any[] = [];

  // folio: any;
  folios: any[] = [];
  choferes: any[] = [];
  verificadores: any[] = [];
  abiertas: any = '';
  azules: any = '';
  nargde: any = '';
  narpeq: any = '';
  verifica: any = '0';
  carro: any = '0';
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
  terminoEspecial: boolean = true;

  importe: number = 0;
  total: number = 0;

  /* Datos Modal PDF */
  infoDato: any;
  idModal: any;
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
  unidad: any = '';
  placa: any = '';
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
    private _clienteService: ClientesService,
    private _choferService: ChoferesService,
    private _webSocket: WebsocketService,
    private _herramientas: HerramientasService,
    public sanitizer: DomSanitizer
  ) {
    this.idUsuario = this._usuarioService.usuario._id;
    this.fecha = this._herramientas.fechaActual();

    this.dataSelect();
    this.vehiculos();

    let guias = JSON.parse(localStorage.getItem('guia'));
    let especiales = JSON.parse(localStorage.getItem('especiales'));
    this.clientes = Number(localStorage.getItem('NumCli'));
    this.importe = Number(localStorage.getItem('importeGuia'));

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

      if ((h.getMonth() + 1) < 10) {
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

  vehiculos() {
    this._guiasServices.obtenerUnidades().subscribe((cars: any) => {
      if (cars.status) {
        this.unidades = cars.carros;
      }
    });
  }

  obtenerUnidad() {
    // console.log(this.carro);
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
      setTimeout(() => {
        this.inputFolio.nativeElement.focus();
      }, 200);
    } else {
      this.generar = true;
      this.guias = false;
      this.tuberias = false;
      this.obtener = false;
      setTimeout(() => {
        this.inputFolio.nativeElement.focus();
      }, 200);
    }
  }

  verGuias() {
    this.ultimasGuias = [];
    this.choferes = [];
    this.verificadores = [];
    this.facturas = [];
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

    if ((h.getMonth() + 1) < 10) {
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
    const folio = Number(this.inputFolio.nativeElement.value);
    if (folio === 0) {
      swal('Sin Folio', 'No se ingreso folio para agregar a la guía', 'warning');
      return;
    }

    this._guiasServices.buscarFolioGuiaGnl(folio).subscribe((obtener: any) => {
      if (obtener.ok) {
        swal('Folio Registrado', 'Este folio ' + folio + ' ya esta registrado.', 'error');
        this.inputFolio.nativeElement.value = '';
        return;
      }

      let esFolio = (fac: any) => {
        return fac.folio === folio;
      }

      if (this.folios.find(esFolio) !== undefined) {
        swal('Folio Repetido', 'Este folio ' + folio + ' ya esta en la guía.', 'error');
        this.inputFolio.nativeElement.value = '';
      } else {

        this._guiasServices.obtenerFolio(folio).subscribe( ( partidas: any ) => {
          if (partidas.length > 0) {
            this.terminoEspecial = false;
            this._guiasServices.buscarEspeciales(folio).subscribe( ( especiales: any ) => {
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
                  if ((i + 1) === especiales.length) {
                    this.terminoEspecial = true;
                    setTimeout(() => {
                      this.inputFolio.nativeElement.value = '';
                      this.inputFolio.nativeElement.focus();
                    }, 200);
                  } else {
                    this.terminoEspecial = false;
                  }
                  this.especiales.sort((a, b) => {
                    if (a.clvprov > b.clvprov) {
                      return 1;
                    }

                    if (a.clvprov < b.clvprov) {
                      return -1;
                    }

                    return 0;
                  });
                }
                localStorage.setItem('especiales', JSON.stringify(this.especiales));
              } else {
                this.terminoEspecial = true;
                setTimeout(() => {
                  this.inputFolio.nativeElement.value = '';
                  this.inputFolio.nativeElement.focus();
                }, 200);
              }
            });

            for (let i = 0; i < partidas.length; i++) {
              let esCliente = (cliente) => {
                return cliente.numero === partidas[i].numero;
              }

              if (!this.folios.find(esCliente)) {
                if (this.clientes === 0) {
                  this.clientes = 1;
                } else {
                  this.clientes += 1;
                }
              }
              localStorage.setItem('NumCli', String(this.clientes));
              this.folios.push(partidas[i]);
            }

            localStorage.setItem('guia', JSON.stringify(this.folios));

            this.obtener = true;
            this.generar = true;
            this.sinDatos = false;

            this.inputFolio.nativeElement.value = '';
          } else {
            // Aquí va la pregunta si es garantia
            swal({
              title: '¿Folio Garantía?',
              text: 'El folio que ingreso no se encuentra en Ferrum, desea manejarlo como garantía?',
              icon: "warning",
              buttons: {
                catch: {
                  text: 'Cancelar',
                  value: false
                },
                defeat: {
                  text: 'Si',
                  value: true
                },
              }
            })
            .then(( value ) => {
              if (value) {
                swal({
                  title: "Agregando Garantía",
                  text: 'Ingrese el No. de Cliente',
                  icon: "success",
                  buttons: {
                    cancel: true,
                    confirm: true
                  },
                  content: {
                    element: "input",
                    attributes: {
                        placeholder: "Número de Cliente",
                        type: "text",
                    },
                  },
                })
                .then(( numero ) => {
                  if (!numero) {
                    this.sinDatos = true;
                    swal('Ninguna Factura', 'Este folio ' + folio + ' no tiene niguna factura relacionada.', 'error');
                    this.inputFolio.nativeElement.value = '';
                    return;
                  };

                  swal({
                    title: "Agregando Garantía",
                    text: 'Ingrese el importe de la Garantía',
                    icon: "success",
                    buttons: {
                      cancel: true,
                      confirm: true
                    },
                    content: {
                      element: "input",
                      attributes: {
                          placeholder: "Importe",
                          type: "number",
                      },
                    },
                  })
                  .then(( importe ) => {
                    if (!importe) {
                      this.sinDatos = true;
                      swal('Ninguna Factura', 'Este folio ' + folio + ' no tiene niguna factura relacionada.', 'error');
                      this.inputFolio.nativeElement.value = '';
                      return;
                    };

                    this._clienteService.infoClienteGarantia(numero).subscribe((cli: any) => {
                      if (cli.length === 0) {
                        this.sinDatos = true;
                        swal('Sin Cliente', 'Este número de cliente no existe.', 'error');
                        this.inputFolio.nativeElement.value = '';
                        return;
                      }
                      const ingresarFolio = {
                        cerrado: 0,
                        ciudad: cli[0].CIUDAD,
                        clienteid: cli[0].CLIENTEID,
                        colonia: cli[0].COLONIA,
                        diavis: cli[0].DIAVIS,
                        direccion: cli[0].DIRECCION,
                        entregado: 0,
                        estado: cli[0].ESTADO,
                        folio: folio,
                        lat: cli[0].LAT,
                        lng: cli[0].LNG,
                        nombre: cli[0].NOMBRE,
                        numero: numero,
                        perid: cli[0].VENDEDORID,
                        total: Number(importe),
                        vendedor: 'Victor Leal'
                      };
                      let esCliente = (cliente) => {
                        return cliente.numero === ingresarFolio.numero;
                      }

                      if (!this.folios.find(esCliente)) {
                        if (this.clientes === 0) {
                          this.clientes = 1;
                        } else {
                          this.clientes += 1;
                        }
                      }
                      localStorage.setItem('NumCli', String(this.clientes));
                      this.folios.push(ingresarFolio);
                      localStorage.setItem('guia', JSON.stringify(this.folios));

                      this.obtener = true;
                      this.generar = true;
                      this.sinDatos = false;

                      this.inputFolio.nativeElement.value = '';
                      swal.stopLoading();
                    });
                  });
                });
              } else {
                this.sinDatos = true;
                swal('Ninguna Factura', 'Este folio ' + folio + ' no tiene niguna factura relacionada.', 'error');
                this.inputFolio.nativeElement.value = '';
              }
            });
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

    if (this.carro === '0') {
      swal('Sin Vehículo', 'Seleccione un vehículo para procesar.', 'error');
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
    let min;
    let sec;
    let dia;
    let mes;
    let anio = h.getFullYear();
    let fecha;
    let fechaAsig;

    if (h.getHours() < 10) {
      hor = '0' + h.getHours();
    } else {
      hor = h.getHours();
    }

    if (h.getMinutes() < 10) {
      min = '0' + h.getMinutes();
    } else {
      min = h.getMinutes();
    }

    if (h.getSeconds() < 10) {
      sec = '0' + h.getSeconds();
    } else {
      sec = h.getSeconds();
    }

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    if ((h.getMonth() + 1) < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let hora = hor + ':' + min + ':' + sec;
    fecha = anio + '-' + mes + '-' + dia;

    if (this.diaSemana === 5) {
      if (this.fechaAsignar === undefined) {
        swal('Sin Fecha Asignar', 'Hoy es VIERNES y se necesita asignar la fecha de forma manual.', 'error');
        return;
      }
      fechaAsig = this.fechaAsignar;
    } else {
      fechaAsig = anio + '-' + mes + '-' + dia;
    }

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

        // TODO

        this.importe += this.folios[i].total;
        localStorage.setItem('importeGuia', String(this.importe));
      }

      let rutaArmar = [];

      // Guardamos la lista para la app de asesores y choferes
      let guardarFacturas: any[] = [];
      let clienteidGF;
      let latGF;
      let lngGF;
      let numeroGF;
      let nombreGF;
      let domicilioGF;
      let poblacionGF;
      let vendedorGF;
      let diavisGF;
      const fechaGF = fecha;
      const fechaAS = fechaAsig;
      const horaGF = hora;
      let envio: Ruta;

      for (let i = 0; i < this.folios.length; i++) {
        let esCliente = (cliente) => {
          return cliente.numero === this.folios[i].numero;
        };

        const domicilio = this.folios[i].direccion + ', ' + this.folios[i].colonia;

        if (!rutaArmar.find(esCliente)) {
          rutaArmar.push(this.folios[i]);
          guardarFacturas = this.folios[i];
          clienteidGF = this.folios[i].clienteid;
          latGF = this.folios[i].lat;
          lngGF = this.folios[i].lng;
          numeroGF = this.folios[i].numero;
          nombreGF = this.folios[i].nombre;
          domicilioGF = domicilio;
          poblacionGF = this.folios[i].ciudad;
          vendedorGF = this.folios[i].perid;
          diavisGF = this.folios[i].diavis;
          envio = {
            clienteid: clienteidGF,
            lat: latGF,
            lng: lngGF,
            numero: numeroGF,
            nombre: nombreGF,
            domicilio: domicilioGF,
            poblacion: poblacionGF,
            vendedor: vendedorGF,
            diavis: diavisGF,
            fecha: fechaGF,
            fechaAsig: fechaAS,
            hora: horaGF,
            facturas: guardarFacturas,
            entregado: false,
            cerrado: false,
            comentarios: ''
          };
          this.rutaEnviar.push(envio);
        } else {
          for (let k = 0; k < this.rutaEnviar.length; k++) {
            if (this.folios[i].clienteid === this.rutaEnviar[k].clienteid) {
              const datoAnt = this.rutaEnviar[k].facturas;
              this.rutaEnviar[k].facturas = [];
              let newDate = [];
              if (datoAnt.length === undefined) {
                newDate.push(datoAnt);
                newDate.push(this.folios[i]);
                this.rutaEnviar[k].facturas = newDate;
              } else {
                for (let j = 0; j < datoAnt.length; j++) {
                  newDate.push(datoAnt[j]);
                }
                newDate.push(this.folios[i]);
                this.rutaEnviar[k].facturas = newDate;
              }
            }
          }
        }
      }
      // Este si
      // Guarda por cliente la ruta del chofer
      // Esto pasará a guardarse como se hacen en las Guias, de forma completa.
      // Cuando se tenga por completo terminado el servicio nuevo, se dejará de usar este.
      // ### IMPORTANT ###
      // for (let i = 0; i < this.rutaEnviar.length; i++) {
      //   this._guiasServices.guardarRuta(this.rutaEnviar[i], this.chf).subscribe(() => {});
      // }

      // Con esto guardamos de forma completa
      const subirRuta = {
        fecha: fechaAS,
        hora: horaGF,
        clientes: this.rutaEnviar
      };

      // Este si
      this._guiasServices.guardarRutaGuia(subirRuta, this.chf).subscribe(() => {});

      let cajas = "Cafes: " + this.abiertas + "      Azules: " + this.azules + "      Naranja Gde: " + this.nargde + "      Naranja Ch: " + this.narpeq;

      const pdf = this.chf.nombre.toUpperCase() + '-' + this.folios.length + '-' + fecha + '.pdf';

      // Necesito guardar primero, luego recibir el id para agregarlo aquí y luego enviarlo al PDF
      // Esto para que guarde el Folio adecuado
      // Cambiar al lugar cuando se guarde la guía.
      // De igual forma el servicio para general el PDF debe ir adentro de guardarGuia.
      this.guiaGuardar = {
        facturas: this.pedidos,
        especiales: this.especiales,
        verifico: this.verifica.nombre,
        cantidad: this.folios.length,
        importe: this.importe,
        cajas: cajas,
        fecha: fecha,
        fechaAsig: fechaAsig,
        hora: hora,
        pdf: pdf,
        clientes: this.clientes,
        unidad: this.carro._id
      };

      // Todo esto si
      // Guarda la guia de forma completa
      this._guiasServices.guardarGuia(this.guiaGuardar, this.chf).subscribe( ( guardado: any ) => {
        if (guardado.ok) {
          const guiaGuardarPDF = {
            folio: guardado.guiasGuardado._id, // Aquí va el folio generado cuando se guarda la guia
            facturas: this.pedidos,
            especiales: this.especiales,
            verifico: this.verifica.nombre,
            cantidad: this.folios.length,
            importe: this.importe,
            cajas: cajas,
            fecha: fecha,
            fechaAsig: fechaAsig,
            hora: hora,
            pdf: pdf,
            clientes: this.clientes,
            unidad: this.carro._id
          };
          // Genera el PDF para la guía del chofer
          this._guiasServices.enviarPDFguia(
            this.pedidos, guiaGuardarPDF, this.especiales, this.chf, this.carro
          ).subscribe((resp: any) => {}, err => {});
          // Iniciamos la guía de cero
          this.cancelarGuia();
          this._webSocket.acciones('guias-watch', guardado.guiasGuardado);
          swal({
            title: "Guia Procesada",
            text: 'Procesado Exitosamente'
          });
        }
      });

      // Genera el PDF para la guía del chofer
      // this._guiasServices.enviarPDFguia(
      //   this.pedidos, this.guiaGuardar, this.especiales, this.chf, this.carro
      // ).subscribe((resp: any) => {}, err => {});

      // Iniciamos la guía de cero
      // this.cancelarGuia();
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
    localStorage.removeItem('NumCli');
    localStorage.removeItem('importeGuia');
    this.inputFolio.nativeElement.value = '';
    // this.inputFecBusqueda.nativeElement.value = '';
    this.folios = [];
    this.pedidos = [];
    this.especiales = [];
    this.rutaEnviar = [];
    this.carro = '0';
    this.chf = '0';
    this.verifica = '0';
    this.guiaGuardar = null;
    this.especiales = [];
    this.choferes = [];
    this.verificadores = [];
    this.foliosBusq = [];
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
      'https://ferremayoristas.com.mx/api/pdf/' + pdf);
  }


  // TODO
  modalVer(dato: any) {
    this.infoDato = [];
    this.idModal = '';
    this.totalModal = 0;
    this.chofer = '';
    this.choferImg = '';
    this.unidad = '';
    this.placa = '';
    this.fol = '';
    this.hora = '';
    this.impo = 0;
    this.veri = '';
    this.cantidad = 0;
    this.cajas = '';
    this.fec = '';
    if (dato.unidad !== undefined) {
      this.unidad = dato.unidad.AUTO;
      this.placa = dato.unidad.PLACAS;
    } else {
      this.unidad = 'Sin Unidad Registrado';
      this.placa = 'XXXXX';
    }
    this.infoDato = dato;
    this.idModal = dato._id;
    this.chofer = dato.chofer.nombre;
    this.choferImg = dato.chofer.img;
    this.fol = dato.folio;
    this.hora = dato.hora;
    this.impo = dato.importe;
    this.veri = dato.verifico;
    this.cantidad = dato.cantidad;
    this.cajas = dato.cajas;
    this.fec = dato.fecha;
    this.facturas = dato.facturas;
    this.especialesDiaModal = dato.especiales;
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

  reasignar(fac: GuiasPartidas, indice: number, tipo: any = '') {
    this.infoDato.facturas[indice].reasignar = true;
    this._guiasServices.buscarGuiaPrinId(this.infoDato).subscribe((resp: any) => {
      if (resp.ok) {
        swal('Factura Liberada', 'Esta factura se ha liberado.', 'success');
        if (tipo === '') {
          document.getElementById("linea" + fac.factura).classList.add("bg-primary");
          document.getElementById("linea" + fac.factura).classList.add("text-white");
        }
      } else {
        swal('Factura No Reasignada', 'Esta factura no se liberó correctamente.', 'error');
      }
    });
  }

  asignar(fac: GuiasPartidas, indice: number, tipo: any = '') {
    this.infoDato.facturas[indice].reasignar = false;
    this._guiasServices.buscarGuiaPrinId(this.infoDato).subscribe((resp: any) => {
      if (resp.ok) {
        swal('Factura Asignada', 'Esta factura se ha asignado.', 'success');
        if (tipo === '') {
          document.getElementById("linea" + fac.factura).classList.remove("bg-primary");
          document.getElementById("linea" + fac.factura).classList.remove("text-white");
        }
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
        console.log(factura);
        if (factura.folios.length > 0) {
          this.facturaEncontrada = true;
          this.noFac = fol;
          this.foliosBusq = factura.folios;
          this.foliosBusq.reverse();
        } else {
          swal('Factura No Encontrada', 'Esta Remisión no se ha asignado ninguna guía.', 'error');
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
    console.log(folio);
    const editar = <HTMLElement>(document.getElementById('edit' + folio.chofer._id));
    editar.style.display = "none";
    const chofer = <HTMLElement>(document.getElementById('chofer' + folio.chofer._id));
    chofer.style.display = "none";
    const confirm = <HTMLElement>(document.getElementById('confirm' + folio.chofer._id));
    confirm.style.display = "inline";
    const choferSel = <HTMLElement>(document.getElementById('choferSel' + folio.chofer._id));
    choferSel.style.display = "inline";
  }

  enviarEditar(folio: any) {
    document.getElementById('edit' + folio.chofer._id).style.display = "inline";
    document.getElementById('chofer' + folio.chofer._id).style.display = "inline";
    document.getElementById('confirm' + folio.chofer._id).style.display = "none";
    document.getElementById('choferSel' + folio.chofer._id).style.display = "none";
    this._guiasServices.actualizarGuiaPri(folio.chofer._id, this.chf).subscribe((resp: any) => {
      if (resp.ok) {
        this.verGuias();
        this._webSocket.acciones('centinela-chofer', resp.guia);
      }
    });
  }

}
