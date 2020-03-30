import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { URL_SERVICIO_GENERAL } from '../../config/config';

// Servicios
import { UsuarioService, ClientesService, DiariosService, PedidosService, HerramientasService } from '../../services/services.index';

// Modelo
import { Cotizacion } from '../../models/cotizacion.model';
import { XmlString } from '../../models/xml.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styles: []
})
export class CotizadorComponent implements OnInit {

  fecha: any = '';
  hora: any = '';
  seg: any = '';

  file: any;
  folio: any;

  codigo: any = '';
  cantidad: any = '';
  cantidadStep: number = 0;

  cot: Cotizacion;

  rol: any = null;
  email: any = null;
  id: any = null;
  nombreUser: string = '';
  nivelPrecio: number = 1000;
  tp: any = '1000';

  usoNombre: any = '';
  usoNumero: any = '';
  op: any = '0';

  // Datos
  productos: any[] = [];
  prod: any[] = [];
  cots: any[] = [];
  ords: any[] = [];
  ordenGuardada: any;
  cts: any = '0';
  ods: any = '0';
  proveedor: any[] = [];
  prove: any = '0';

  // Datos del cliente
  idFerrum: number = 0;
  numero: string = '';
  nombre: string = '';
  direccion: string = '';
  localidad: string = '';
  correoCli: string = '';
  rfc: string = '';

  // Saldos del Cliente
  saldo: number = 0;
  linea: number = 0;
  dias: number = 0;
  precio: any = '';

  // Asesor del Cliente
  asesor: any = '';

  // Booleanos
  cotizar: boolean = false;
  orden: boolean = false;
  nameBol: boolean = true;
  numberBol: boolean = true;
  lectura: boolean = false;
  guardado: boolean = false;
  enviarBool: boolean = false;
  verForm: boolean = false;
  carga: boolean = false;

  // Importes del Pedido/Orden de Compra
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  // Ver Cotización Guardada
  verPDF: any = 'vacio';
  verCotizacion: any = '';
  verOrden: any = '';

  constructor(
    public sanitizer: DomSanitizer,
    private _usuarioService: UsuarioService,
    private _clienteService: ClientesService,
    private _diariosServoce: DiariosService,
    private _pedidoService: PedidosService,
    private _herramientaS: HerramientasService
  ) {
    this.rol = this._usuarioService.usuario.rol;
    this.id = this._usuarioService.usuario._id;
    this.nombreUser = this._usuarioService.usuario.nombre;
    this.email = this._usuarioService.usuario.email;
  }

  ngOnInit() {
    this.precarga();
  }

  precarga() {
    this.hora = this._herramientaS.horaActual();

    this.fecha = this._herramientaS.fechaActual();

    if (localStorage.getItem('tipoOperacion') === '1') {
      this.usoNumero = '';
      this.usoNombre = '';
      this.numberBol = false;
      this.lectura = false;
      this.nameBol = false;
      this.cotizar = true;
      this.orden = false;
      this.enviarBool = false;
      if (localStorage.getItem('ordenGuardada') !== null) {
        this.ordenGuardada = JSON.parse(localStorage.getItem('ordenGuardada'));
        console.log(this.ordenGuardada);
        // this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl(URL_SERVICIO_GENERAL + '/api/cotizaciones/' + this.ordenGuardada.pdf);
      }
      if (localStorage.getItem('guardado') === 'true') {
        this.guardado = true;
      } else {
        this.guardado = false;
      }
      this.correoCli = localStorage.getItem('correoCli');
      this.folio = localStorage.getItem('folio');
      this.rfc = localStorage.getItem('rfcCli');
      this.file = localStorage.getItem('filePDF');
      this.idFerrum = Number(localStorage.getItem('idFerrumCli'));
      this.numero = localStorage.getItem('numeroCli');
      this.nombre = localStorage.getItem('nombreCli');
      this.direccion = localStorage.getItem('direccionCli');
      this.asesor = localStorage.getItem('asesorCli');
      this.precio = localStorage.getItem('precioCli');
      this.saldo = Number(localStorage.getItem('saldoCli'));
      this.linea = Number(localStorage.getItem('lineaCli'));
      this.dias = Number(localStorage.getItem('diasCli'));
      this.op = localStorage.getItem('tipoOperacion');
      if (localStorage.getItem('cambiarPrecio') !== null) {
        this.tp = localStorage.getItem('cambiarPrecio');
        this.nivelPrecio = Number(this.tp);
      } else {
        this.tp = '0';
        this.nivelPrecio = 0;
      }
      if (localStorage.getItem('pedidoDistIntranet') !== null) {
        this.prod = JSON.parse(localStorage.getItem('prodDistIntranet'));
        this.productos = JSON.parse(localStorage.getItem('pedidoDistIntranet'));
        this.subtotal = Number(localStorage.getItem('subtotalPedIntranet'));
        this.iva = Number(localStorage.getItem('ivaPedIntranet'));
        this.total = Number(localStorage.getItem('totalPedIntranet'));
      }
    } else if (localStorage.getItem('tipoOperacion') === '3') {
      this.enviarBool = true;
      if (localStorage.getItem('guardado') === 'true') {
        this.guardado = true;
      } else {
        this.guardado = false;
      }
      this.nombre = localStorage.getItem('nombreCli');
      if (localStorage.getItem('cambiarPrecio') !== null) {
        this.tp = localStorage.getItem('cambiarPrecio');
        this.nivelPrecio = Number(this.tp);
      } else {
        this.tp = '1000';
        this.nivelPrecio = 1000;
      }
      if (localStorage.getItem('pedidoDistIntranet') !== null) {
        this.file = localStorage.getItem('filePDF');
        this.prod = JSON.parse(localStorage.getItem('prodDistIntranet'));
        this.productos = JSON.parse(localStorage.getItem('pedidoDistIntranet'));
        this.subtotal = Number(localStorage.getItem('subtotalPedIntranet'));
        this.iva = Number(localStorage.getItem('ivaPedIntranet'));
        this.total = Number(localStorage.getItem('totalPedIntranet'));
      }
    } else if (localStorage.getItem('tipoOperacion') === '2') {
      this.enviarBool = false;
      this.folio = localStorage.getItem('folio');
      this.file = localStorage.getItem('filePDF');
      this.idFerrum = Number(localStorage.getItem('idFerrumCli'));
      this.numero = localStorage.getItem('numeroCli');
      this.nombre = localStorage.getItem('nombreCli');
      this.direccion = localStorage.getItem('direccionCli');
      this.precio = localStorage.getItem('precioCli');
      this.op = localStorage.getItem('tipoOperacion');
      this.nameBol = false;
      if (localStorage.getItem('ordenGuardada') !== null) {
        this.ordenGuardada = JSON.parse(localStorage.getItem('ordenGuardada'));
        console.log(this.ordenGuardada);
        // this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl(URL_SERVICIO_GENERAL + '/api/ordenes/' + this.ordenGuardada.pdf);
      }
      if (localStorage.getItem('pedidoDistIntranet') !== null) {
        this.file = localStorage.getItem('filePDF');
        this.prod = JSON.parse(localStorage.getItem('prodDistIntranet'));
        this.productos = JSON.parse(localStorage.getItem('pedidoDistIntranet'));
        this.subtotal = Number(localStorage.getItem('subtotalPedIntranet'));
        this.iva = Number(localStorage.getItem('ivaPedIntranet'));
        this.total = Number(localStorage.getItem('totalPedIntranet'));
      }
      this._diariosServoce.proveedores().subscribe((prov: any) => {
        if (prov.length > 0) {
          this.proveedor = prov;
          this.cotizar = false;
          this.orden = true;
          this.precio = 'PROVEEDOR';
          localStorage.setItem('tipoOperacion', this.op);
        } else {
          this.cotizar = false;
          this.orden = false;
          swal('Sin Proveedores', 'No se encontraron proveedores, ver con el administrador.', 'error');
        }
      });
    } else {
      this.iniciar();
    }
  }

  accion() {
    this.lectura = false;
    if (this.op === '0') {
      this.verPDF = 'vacio';
      this.cots = [];
      this.ords = [];
      this.cts = '0';
      this.ods = '0';
      this.idFerrum = 0;
      this.numero = '';
      this.nombre = '';
      this.direccion = '';
      this.enviarBool = false;
      this.nameBol = false;
      this.cotizar = false;
      this.orden = false;
      this.verForm = false;
      this.iniciar();
      localStorage.setItem('tipoOperacion', this.op);
    } else if (this.op === '1') {
      this.verPDF = 'vacio';
      this.cots = [];
      this.ords = [];
      this.cts = '0';
      this.ods = '0';
      this.usoNumero = '';
      this.usoNombre = '';
      this.enviarBool = false;
      this.numberBol = true;
      this.lectura = false;
      this.nameBol = true;
      this.cotizar = true;
      this.orden = false;
      this.verForm = false;
      localStorage.setItem('tipoOperacion', this.op);
    } else if (this.op === '2') {
      this.verPDF = 'vacio';
      this.cots = [];
      this.ords = [];
      this.cts = '0';
      this.ods = '0';
      this.idFerrum = 0;
      this.numero = '';
      this.nombre = '';
      this.direccion = '';
      this.prove = '0';
      this.enviarBool = false;
      this.nivelPrecio = 1000;
      this.nameBol = false;
      this.verForm = false;
      this._diariosServoce.proveedores().subscribe((prov: any) => {
        if (prov !== 0) {
          console.log(prov);
          this.proveedor = prov;
          this.cotizar = false;
          this.orden = true;
          this.precio = 'PROVEEDOR';
          localStorage.setItem('tipoOperacion', this.op);
        } else {
          this.cotizar = false;
          this.orden = false;
          swal('Sin Proveedores', 'No se encontraron proveedores, ver con el administrador.', 'error');
        }
      });
    } else if (this.op === '3') {
      this.enviarBool = true;
      this.verPDF = 'vacio';
      this.cots = [];
      this.ords = [];
      this.cts = '0';
      this.ods = '0';
      this.idFerrum = 0;
      this.numero = '';
      this.nombre = '';
      this.direccion = '';
      this.nameBol = false;
      this.cotizar = false;
      this.orden = false;
      this.numberBol = false;
      this.nameBol = true;
      this.lectura = false;
      this.nivelPrecio = 0;
      this.verForm = true;
      this._pedidoService.obtenerCotizaciones().subscribe((cotizaciones: any) => {
        if (cotizaciones.status) {
          this.cots = cotizaciones.cotizaciones;
        }
      });
    } else if (this.op === '4') {
      this.verPDF = 'vacio';
      this.cots = [];
      this.ords = [];
      this.cts = '0';
      this.ods = '0';
      this.idFerrum = 0;
      this.numero = '';
      this.nombre = '';
      this.direccion = '';
      this.enviarBool = false;
      this.nameBol = true;
      this.cotizar = false;
      this.orden = false;
      this.verForm = false;
      this._pedidoService.obtenerOrdenCompra().subscribe((ordenes: any) => {
        if (ordenes.status) {
          this.ords = ordenes.ordenes;
        }
      });
    }
  }

  accionOrds() {
    console.log('accion Ords');
    // this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl(URL_SERVICIO_GENERAL + '/api/ordenes/' + this.ods.pdf);
  }

  buscarCliente() {
    this.nameBol = true;
    this.numberBol = true;
    this.lectura = false;
    this.idFerrum = 0;
    this.nivelPrecio = 0;
    this.numero = '';
    this.nombre = '';
    this.direccion = '';
    this.correoCli = '';
    this.rfc = '';
    if (this.usoNumero.length > 0) {
      this._clienteService.infoClienteCot(this.usoNumero).subscribe((data: any) => {
        if (data.status) {
          this.idFerrum = data.resp.CLIENTEID;
          this.numero = this.usoNumero;
          this.nombre = data.resp.NOMBRE;
          this.correoCli = data.resp.CORREO;
          this.nivelPrecio = Number(data.resp.LISTA);
          this.rfc = data.resp.RFC;
          const h = new Date();
          this.file = this.numero + String(h.getMonth()) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds()) + '.pdf';
          this.folio = 'C' + this.numero + String(h.getMonth() + 1) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds());
          localStorage.setItem('folio', this.folio);
          this.direccion = data.resp.DIRECCION + ' ' + data.resp.CASA + ' ' + data.resp.INTERIOR + ' ' + data.resp.COLONIA + ' ' + data.resp.CIUDAD + ', ' + data.resp.ESTADO + ', ' + data.resp.CP;
          if (data.resp.ASESOR !== '') {
            this.asesor = data.resp.ASESOR;
          } else {
            this.asesor = 'Sin Asesor';
          }

          if (Number(data.resp.LISTA) === 1) {
            this.precio = 'DISTRIBUIDOR';
          } else if (Number(data.resp.LISTA) === 2) {
            this.precio = 'SUBDISTRIBUIDOR';
          } else if (Number(data.resp.LISTA) === 3) {
            this.precio = 'MAYORISTA';
          }

          this.saldo = data.resp.SALDO;
          this.linea = data.resp.LIMITE;
          this.dias = data.resp.DIACREDITO;

          localStorage.setItem('rfcCli', this.rfc);
          localStorage.setItem('filePDF', this.file);
          localStorage.setItem('correoCli', String(this.correoCli));
          localStorage.setItem('idFerrumCli', String(this.idFerrum));
          localStorage.setItem('numeroCli', this.numero);
          localStorage.setItem('nombreCli', this.nombre);
          localStorage.setItem('direccionCli', this.direccion);
          localStorage.setItem('asesorCli', this.asesor);
          localStorage.setItem('precioCli', this.precio);
          localStorage.setItem('cambiarPrecio', data.resp.LISTA);
          localStorage.setItem('saldoCli', String(this.saldo));
          localStorage.setItem('lineaCli', String(this.linea));
          localStorage.setItem('diasCli', String(this.dias));
          this.nameBol = false;
          this.numberBol = false;
          this.lectura = true;
        }
      });
    }
  }

  asignarCliente() {
    this.numberBol = true;
    this.nameBol = true;
    this.lectura = false;
    this.numero = '';
    this.nombre = '';
    this.direccion = '';
    this.correoCli = '';
    this.rfc = '';
    if (this.usoNombre.length > 0) {
      this.nombre = this.usoNombre;
      const h = new Date();
      this.file = String(h.getMonth()) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds()) + '.pdf';
      this.folio = 'C' + String(h.getMonth() + 1) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds());
      localStorage.setItem('folio', this.folio);
      this.nameBol = false;
      this.numberBol = false;
      this.lectura = true;
      localStorage.setItem('filePDF', this.file);
      localStorage.setItem('idFerrumCli', String(this.idFerrum));
      localStorage.setItem('numeroCli', this.numero);
      localStorage.setItem('nombreCli', this.nombre);
      localStorage.setItem('direccionCli', this.direccion);
      localStorage.setItem('asesorCli', this.asesor);
      localStorage.setItem('precioCli', this.precio);
      localStorage.setItem('saldoCli', String(this.saldo));
      localStorage.setItem('lineaCli', String(this.linea));
      localStorage.setItem('diasCli', String(this.dias));
    }
  }

  asignarProveedor() {
    this.nameBol = false;
    this.lectura = true;
    this.numero = this.prove.numero;
    this.idFerrum = this.prove.clienteid;
    this.nombre = this.prove.nombre;
    this.direccion = this.prove.direccion + ' ' + this.prove.casa + ' ' + this.prove.interior + ' ' + this.prove.colonia + ' ' + this.prove.ciudad + ', ' + this.prove.estado + ', ' + this.prove.cp;
    const h = new Date();
    this.file = this.numero + String(h.getMonth() + 1) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds()) + '.pdf';
    this.folio = 'C' + this.numero + String(h.getMonth()) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds());
    localStorage.setItem('folio', this.folio);
    localStorage.setItem('idFerrumCli', String(this.idFerrum));
    localStorage.setItem('numeroCli', this.numero);
    localStorage.setItem('nombreCli', this.nombre);
    localStorage.setItem('direccionCli', this.direccion);
    localStorage.setItem('filePDF', this.file);
    localStorage.setItem('asesorCli', this.asesor);
    localStorage.setItem('precioCli', this.precio);
  }

  cambiarPrecio() {
    this.nivelPrecio = Number(this.tp);
    localStorage.setItem('cambiarPrecio', this.tp);
  }

  siguiente() {
    if (this.codigo !== '') {
      this._pedidoService.buscarLote(this.codigo).subscribe((lote: any) => {
        if (lote.resp !== false) {
          const elem = <HTMLInputElement>(document.getElementById('cantidad'));
          elem.value = lote.resp.lote;
          this.cantidadStep = Number(lote.resp.lote);
          elem.readOnly = false;
          elem.focus();
        } else {
          swal('Códgio No Existe', 'Este código no existe.', 'error');
          const elem = <HTMLInputElement>(document.getElementById('codigo'));
          elem.value = '';
          elem.focus();
        }
      });
    } else {
      const elem1 = <HTMLInputElement>(document.getElementById('cantidad'));
      const elem2 = <HTMLInputElement>(document.getElementById('codigo'));
      elem1.readOnly = true;
      elem2.focus();
      swal('Sin Código', 'No se agrego el código del producto.', 'error');
    }
  }

  ingresar() {
    const ipC = <HTMLInputElement>(document.getElementById('cantidad'));
    const inputCantidad: any = ipC.value;

    const division = inputCantidad % this.cantidadStep;

    this.cantidad = inputCantidad;

    if (division === 0 && inputCantidad !== '0') {
      if (this.proveedor.length === 0) {
        if (this.codigo !== '') {
          if (this.nivelPrecio === 0) {
            this.nivelPrecio = 3;
          }
          this._pedidoService.obtenerProducto(this.codigo, this.nivelPrecio).subscribe((producto: any) => {
            if (producto.resp !== false) {
              this.subtotal += (parseFloat(producto.resp.precioneto) * inputCantidad);
              this.total += (parseFloat(producto.resp.precio) * inputCantidad);
              if (producto.resp.iva > 0) {
                this.iva += (parseFloat(producto.resp.precioneto) * inputCantidad) * producto.resp.iva;
              }
              const agregar = {
                producto: producto.resp,
                precioFinal: (parseFloat(producto.resp.precioneto) * inputCantidad),
                precioDesc: parseFloat(producto.resp.precioneto),
                precioTot: parseFloat(producto.resp.precio),
                cantidad: inputCantidad,
                claveUnidad: producto.resp.claveUnidad,
                claveProdServ: producto.resp.claveProdServ
              };
              this.prod.push(producto.resp);
              this.productos.push(agregar);
              if (localStorage.getItem('pedidoDistIntranet') !== null) {
                localStorage.removeItem('prodDistIntranet');
                localStorage.removeItem('pedidoDistIntranet');
                localStorage.removeItem('subtotalPedIntranet');
                localStorage.removeItem('ivaPedIntranet');
                localStorage.removeItem('totalPedIntranet');
                localStorage.setItem('prodDistIntranet', JSON.stringify(this.prod));
                localStorage.setItem('pedidoDistIntranet', JSON.stringify(this.productos));
                localStorage.setItem('subtotalPedIntranet', String(this.subtotal));
                localStorage.setItem('ivaPedIntranet', String(this.iva));
                localStorage.setItem('totalPedIntranet', String(this.total));
              } else {
                localStorage.setItem('prodDistIntranet', JSON.stringify(this.prod));
                localStorage.setItem('pedidoDistIntranet', JSON.stringify(this.productos));
                localStorage.setItem('subtotalPedIntranet', String(this.subtotal));
                localStorage.setItem('ivaPedIntranet', String(this.iva));
                localStorage.setItem('totalPedIntranet', String(this.total));
              }
              this.codigo = '';
              this.cantidad = '';
              const elem1 = <HTMLInputElement>(document.getElementById('cantidad'));
              const elem2 = <HTMLInputElement>(document.getElementById('codigo'));
              elem2.focus();
              elem1.value = '';
              elem1.readOnly = true;
            }
          });
        } else {
          this.codigo = '';
          this.cantidad = '';
          const elem = <HTMLInputElement>(document.getElementById('cantidad'));
          elem.readOnly = true;
          swal('Sin Código', 'No se agrego el código del producto.', 'error');
        }
      } else {
        this._pedidoService.obtenerProducto(this.codigo, this.nivelPrecio).subscribe((producto: any) => {
          if (producto.resp !== false) {
            this.subtotal += (parseFloat(producto.resp.precioneto) * this.cantidad);
            this.total += (parseFloat(producto.resp.precio) * this.cantidad);
            if (producto.resp.iva > 0) {
              this.iva += (parseFloat(producto.resp.precioneto) * this.cantidad) * producto.resp.iva;
            }
            const agregar = {
              producto: producto.resp,
              precioFinal: (parseFloat(producto.resp.precioneto) * this.cantidad),
              precioDesc: parseFloat(producto.resp.precioneto),
              precioTot: parseFloat(producto.resp.precio),
              cantidad: this.cantidad,
              claveUnidad: producto.resp.claveUnidad,
              claveProdServ: producto.resp.claveProdServ
            };
            this.prod.push(producto.resp);
            this.productos.push(agregar);
            if (localStorage.getItem('pedidoDistIntranet') !== null) {
              localStorage.removeItem('prodDistIntranet');
              localStorage.removeItem('pedidoDistIntranet');
              localStorage.removeItem('subtotalPedIntranet');
              localStorage.removeItem('ivaPedIntranet');
              localStorage.removeItem('totalPedIntranet');
              localStorage.setItem('prodDistIntranet', JSON.stringify(this.prod));
              localStorage.setItem('pedidoDistIntranet', JSON.stringify(this.productos));
              localStorage.setItem('subtotalPedIntranet', String(this.subtotal));
              localStorage.setItem('ivaPedIntranet', String(this.iva));
              localStorage.setItem('totalPedIntranet', String(this.total));
            } else {
              localStorage.setItem('prodDistIntranet', JSON.stringify(this.prod));
              localStorage.setItem('pedidoDistIntranet', JSON.stringify(this.productos));
              localStorage.setItem('subtotalPedIntranet', String(this.subtotal));
              localStorage.setItem('ivaPedIntranet', String(this.iva));
              localStorage.setItem('totalPedIntranet', String(this.total));
            }
            this.codigo = '';
            this.cantidad = 0;
            const elem1 = <HTMLInputElement>(document.getElementById('codigo'));
            const elem2 = <HTMLInputElement>(document.getElementById('cantidad'));
            elem1.focus();
            elem2.readOnly = true;
          }
        });
      }
    } else {
      const elem = <HTMLInputElement>(document.getElementById('cantidad'));
      elem.value = String(this.cantidadStep);
      swal('ERROR EN CANTIDAD', 'Solo puede ingresar cantidades en multiplos de ' + this.cantidadStep, 'error');
    }
  }

  cambiarCantidad(producto: any, valor: any, indice: any) {
    const cantAnte = producto.cantidad;
    const division = valor % producto.producto.lote;
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;

    if (division === 0 && valor !== '0') {
      producto.precioFinal = (producto.precioDesc * Number(valor));
      producto.precioTot = (producto.producto.precio * Number(valor));
      producto.cantidad = Number(valor);

      for (let i = 0; i < this.productos.length; i++) {
        this.subtotal += this.productos[i].precioFinal;

        if (this.productos[i].producto.iva > 0) {
          this.iva += this.productos[i].precioFinal * ( this.productos[i].producto.iva );
        }
      }
      this.total = this.subtotal + this.iva;

      localStorage.removeItem('prodDistIntranet');
      localStorage.removeItem('pedidoDistIntranet');
      localStorage.removeItem('subtotalPedIntranet');
      localStorage.removeItem('ivaPedIntranet');
      localStorage.removeItem('totalPedIntranet');
      localStorage.setItem('prodDistIntranet', JSON.stringify(this.prod));
      localStorage.setItem('pedidoDistIntranet', JSON.stringify(this.productos));
      localStorage.setItem('subtotalPedIntranet', String(this.subtotal));
      localStorage.setItem('ivaPedIntranet', String(this.iva));
      localStorage.setItem('totalPedIntranet', String(this.total));
    } else {
      const inputCantidad = <HTMLInputElement>(document.getElementById('inputLista' + producto.producto.codigo + '' + indice));
      inputCantidad.value = cantAnte;
      for (let i = 0; i < this.productos.length; i++) {
        this.subtotal += this.productos[i].precioFinal;

        if (this.productos[i].producto.iva > 0) {
          this.iva += this.productos[i].precioFinal * ( this.productos[i].producto.iva );
        }
      }
      this.total = this.subtotal + this.iva;
      swal('ERROR EN CANTIDAD', 'Solo puede ingresar cantidades en multiplos de ' + producto.producto.lote, 'error');
    }
  }

  eliminarProd(index: any) {
    this.productos.splice(index, 1);
    this.prod.splice(index, 1);
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;

    localStorage.removeItem('prodDistIntranet');
    localStorage.removeItem('pedidoDistIntranet');
    localStorage.removeItem('subtotalPedIntranet');
    localStorage.removeItem('ivaPedIntranet');
    localStorage.removeItem('totalPedIntranet');

    for (let i = 0; i < this.productos.length; i++) {
      this.subtotal += this.productos[i].precioFinal;

      if (this.productos[i].producto.iva > 0) {
        this.iva += this.productos[i].precioFinal * ( this.productos[i].producto.iva );
      }
    }
    this.total = this.subtotal + this.iva;

    localStorage.setItem('prodDistIntranet', JSON.stringify(this.prod));
    localStorage.setItem('pedidoDistIntranet', JSON.stringify(this.productos));
    localStorage.setItem('subtotalPedIntranet', String(this.subtotal));
    localStorage.setItem('ivaPedIntranet', String(this.iva));
    localStorage.setItem('totalPedIntranet', String(this.total));
  }

  guardar(numero: any, direccion: any, saldo: any, linea: any, dias: any, asesor: any, precio: any) {
    if (this.proveedor.length === 0) {
      this.cot = {
        idFerrum: this.idFerrum,
        numero: this.numero,
        nombre: this.nombre,
        pdf: this.file,
        productos: this.productos,
        subtotal: this.subtotal,
        iva: this.iva,
        total: this.total,
        _id: this.id,
        folio: this.folio
      };
      const p = this.productos;
      const dataPDF = {
        numero,
        direccion,
        saldo,
        linea,
        dias,
        asesor,
        precio,
        p
      };
      this._pedidoService.guardarCotizacion(this.cot).subscribe((resp: any) => {
        if (resp.status) {
          this.ordenGuardada = resp.respuesta;
          localStorage.setItem('ordenGuardada', JSON.stringify(this.ordenGuardada));
          this.guardarPDF(this.cot, dataPDF, resp.respuesta);
        }
      });
    } else {
      const datOrder = {
        idFerrum: this.idFerrum,
        numero: this.numero,
        nombre: this.nombre,
        direccion: this.direccion,
        file: this.file,
        productos: this.productos,
        folio: this.folio
      };

      const dataPDF = {
        productos: this.productos,
        subtotal: this.subtotal,
        iva: this.iva,
        total: this.total
      };

      this._pedidoService.guardarOrden(datOrder).subscribe((resp: any) => {
        if (resp.status) {
          this.ordenGuardada = resp.respuesta;
          localStorage.setItem('ordenGuardada', JSON.stringify(this.ordenGuardada));
          this.guardarPDF(datOrder, dataPDF, resp.respuesta);
        }
      });
    }
  }

  generarPDF() {
    this.verPDF = 'vacio';
    this.verCotizacion = '';
    this.verOrden = '';
    const datOrder = {
      idFerrum: this.idFerrum,
      numero: this.numero,
      nombre: this.nombre,
      file: this.file,
      productos: this.productos,
      folio: this.folio,
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total
    };

    const dataPDF = {
      direccion: this.direccion,
      p: this.productos
    };

    const info = {
      fecha : this._herramientaS.fechaActual()
    };
    this.guardarPDF(datOrder, dataPDF, info);
  }

  guardarPDF(cotizacion: any, datPDF: any, info: any = '') {
    let operacion;
    this.carga = true;
    if (localStorage.getItem('tipoOperacion') !== null) {
      operacion = localStorage.getItem('tipoOperacion');
    } else {
      operacion = '1';
    }
    this._pedidoService.guardarPdf(cotizacion, datPDF, operacion, info, this.nombreUser, this.id, this.email).subscribe((resp: any) => {
      if (resp.status) {
        this.guardado = true;
        if (operacion === '1') {
          this.verCotizacion = resp.file;
        } else {
          this.verOrden = resp.file;
        }
        this.carga = false;
      } else {
        this.carga = false;
        swal('Error', 'Archivo no creado', 'error');
      }
    });
  }

  enviarOrden(email: any) {
    // swal({
    //   title: "Listo para Enviar!",
    //   text: "Coloca el email a donde quieres enviar esta cotización.",
    //   icon: "warning",
    //   buttons: {
    //     cancel: true,
    //     confirm: true
    //   },
    //   content: {
    //     element: "input",
    //     attributes: {
    //         placeholder: "Email",
    //         type: "text",
    //     },
    //   },
    // })
    // .then((correo) => {
    //   if (correo === null) {
    //     return;
    //   }

    //   const dataOrder = {
    //     nombre: this.nombre,
    //     email: correo,
    //     file: this.ordenGuardada.pdf
    //   };

    //   this._pedidoService.enviarEmailOrden(dataOrder).subscribe((resp: any) => {
    //     if (resp[0].status.ok) {
    //       swal('Cotización Enviado', resp[0].status.msg, 'success');
    //     } else {
    //       swal('Error', resp[0].status.msg, 'error');
    //     }
    //   });
    // });
  }

  enviarCotPDF() {
    let mensaje;
    if (this.correoCli === '') {
      mensaje = "Coloca el email a donde quieres enviar esta cotización."
    } else {
      mensaje = 'Escribe "cliente" y se le enviara al correo: ' + this.correoCli + ' o coloca el correo que deseas enviar.';
    }
    swal({
      title: "Listo para Enviar!",
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
    .then((correo) => {
      if (correo === null) {
        return;
      }

      let email;

      switch (correo) {
        case 'cliente':
          email = this.correoCli;
        break;
        default:
          email = correo;
      }

      const dataOrder = {
        nombre: this.cts.nombre,
        email: email,
        f: this.cts.pdf
      };

      // this._pedidoService.enviarEmail(dataOrder).subscribe((resp: any) => {
      //   if (resp[0].status.ok) {
      //     swal('Cotización Enviado', resp[0].status.msg, 'success');
      //   } else {
      //     swal('Error', resp[0].status.msg, 'error');
      //   }
      // });
    });
  }

  enviarEmail(tipo: any, numero: any, nombre: any, direccion: any, saldo: any, linea: any, dias: any, asesor: any, precio: any, productos: any, subtotal: any, iva: any, total: any, correo: any) {
    let mensaje;
    if (correo === '') {
      mensaje = "Coloca el email a donde quieres enviar esta cotización."
    } else {
      mensaje = 'Escribe "cliente" y se le enviara al correo: ' + correo + ' o coloca el correo que deseas enviar.';
    }
    swal({
      title: "Listo para Evniar!",
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
    .then((cor) => {
      if (cor === null) {
        return;
      }
      let email;

      switch (cor) {
        case 'cliente':
          email = correo;
        break;
        default:
          email = cor;
      }

      let h = new Date();
      const f = this.file;
      const dataEmail = {
        numero,
        nombre,
        direccion,
        saldo,
        linea,
        dias,
        asesor,
        precio,
        productos,
        subtotal,
        iva,
        total,
        email,
        f
      };

      if (tipo === 'cotizacion') {
        this._pedidoService.enviarEmailCotizacion(dataEmail).subscribe((resp: any) => {
          if (resp.ok) {
            swal('Cotización Enviado', 'Se envío el correo', 'success');
          } else {
            swal('Cotización Enviado', resp.err.reason, 'error');
          }
        });
      } else {
        this._pedidoService.enviarEmailOrden(dataEmail).subscribe((resp: any) => {
          if (resp.ok) {
            swal('Cotización Enviado', 'Se envío el correo', 'success');
          } else {
            swal('Cotización Enviado', resp.err.reason, 'error');
          }
        });
      }

    });
  }

  accionCots() {
    this.correoCli = '';
    this._clienteService.clienteCorreo(this.cts.idFerrum).subscribe((correo: any) => {
      if (correo.status) {
        this.correoCli = correo.resp.CORREO;
      }
    });
    console.log('accion Cots');
    // this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl(URL_SERVICIO_GENERAL + '/api/cotizaciones/' + this.cts.pdf);
  }

  cotizarNuevo() {
    this.productos = [];
    this.verPDF = 'vacio';
    this.cotizar = true;
    this.subtotal = this.cts.subtotal;
    this.total = this.cts.total;
    this.iva = this.cts.iva;
    this.idFerrum = this.cts.idFerrum;
    this.numero = this.cts.numero;
    const pr = this.cts.productos;
    for (let i = 0; i < pr.length; i++) {
      const agregar = {
        producto: pr[i].producto,
        precioFinal: (pr[i].producto.precioneto * Number(pr[i].cantidad)),
        precioDesc: pr[i].producto.precioneto,
        precioTot: pr[i].producto.precio,
        cantidad: pr[i].cantidad,
        claveUnidad: pr[i].claveUnidad,
        claveProdServ: pr[i].claveProdServ
      };
      this.productos.push(agregar);
    }
    this.cts = '0';
    if (this.numero !== '') {
      localStorage.removeItem('rfcCli');
      localStorage.removeItem('filePDF');
      localStorage.removeItem('correoCli');
      localStorage.removeItem('idFerrumCli');
      localStorage.removeItem('numeroCli');
      localStorage.removeItem('nombreCli');
      localStorage.removeItem('direccionCli');
      localStorage.removeItem('asesorCli');
      localStorage.removeItem('precioCli');
      localStorage.removeItem('saldoCli');
      localStorage.removeItem('lineaCli');
      localStorage.removeItem('diasCli');
      this._clienteService.infoClienteCot(this.numero).subscribe((data: any) => {
        this.nombre = data.resp.NOMBRE;
        this.correoCli = data.resp.CORREO;
        this.nivelPrecio = data.resp.LISTA;
        this.rfc = data.resp.RFC;
        const h = new Date();
        this.file = this.numero + String(h.getMonth()) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds()) + '.pdf';
        this.folio = 'C' + this.numero + String(h.getMonth() + 1) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds());
        localStorage.setItem('folio', this.folio);
        this.direccion = data.resp.DIRECCION + ' ' + data.resp.CASA + ' ' + data.resp.INTERIOR + ' ' + data.resp.COLONIA + ' ' + data.resp.CIUDAD + ', ' + data.resp.ESTADO + ', ' + data.resp.CP;
        if (data.resp.ASESOR !== '') {
          this.asesor = data.resp.ASESOR;
        } else {
          this.asesor = 'Sin Asesor';
        }

        if (data.resp.LISTA === 1) {
          this.precio = 'DISTRIBUIDOR';
        } else if (data.resp.LISTA === 2) {
          this.precio = 'SUBDISTRIBUIDOR';
        } else if (data.resp.LISTA === 3) {
          this.precio = 'MAYORISTA';
        }

        this.saldo = data.resp.SALDO;
        this.linea = data.resp.LIMITE;
        this.dias = data.resp.DIACREDITO;

        localStorage.setItem('rfcCli', this.rfc);
        localStorage.setItem('filePDF', this.file);
        localStorage.setItem('correoCli', String(this.correoCli));
        localStorage.setItem('idFerrumCli', String(this.idFerrum));
        localStorage.setItem('numeroCli', this.numero);
        localStorage.setItem('nombreCli', this.nombre);
        localStorage.setItem('direccionCli', this.direccion);
        localStorage.setItem('asesorCli', this.asesor);
        localStorage.setItem('precioCli', this.precio);
        localStorage.setItem('saldoCli', String(this.saldo));
        localStorage.setItem('lineaCli', String(this.linea));
        localStorage.setItem('diasCli', String(this.dias));
        this.nameBol = false;
        this.numberBol = false;
        this.lectura = true;
      });
    } else {
      localStorage.removeItem('filePDF');
      localStorage.removeItem('idFerrumCli');
      localStorage.removeItem('numeroCli');
      localStorage.removeItem('nombreCli');
      localStorage.removeItem('direccionCli');
      localStorage.removeItem('asesorCli');
      localStorage.removeItem('precioCli');
      localStorage.removeItem('saldoCli');
      localStorage.removeItem('lineaCli');
      localStorage.removeItem('diasCli');
      this.numberBol = true;
      this.nameBol = true;
      this.lectura = false;
      this.numero = '';
      this.nombre = '';
      this.direccion = '';
      this.correoCli = '';
      this.rfc = '';
      this.nombre = this.cts.nombre;
      const h = new Date();
      this.file = String(h.getMonth()) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds()) + '.pdf';
      this.folio = 'C' + String(h.getMonth() + 1) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds());
      localStorage.setItem('folio', this.folio);
      this.nameBol = false;
      this.numberBol = false;
      this.lectura = true;
      localStorage.setItem('filePDF', this.file);
      localStorage.setItem('idFerrumCli', String(this.idFerrum));
      localStorage.setItem('numeroCli', this.numero);
      localStorage.setItem('nombreCli', this.nombre);
      localStorage.setItem('direccionCli', this.direccion);
      localStorage.setItem('asesorCli', this.asesor);
      localStorage.setItem('precioCli', this.precio);
      localStorage.setItem('saldoCli', String(this.saldo));
      localStorage.setItem('lineaCli', String(this.linea));
      localStorage.setItem('diasCli', String(this.dias));
    }
  }

  hacerPedido() {
    if (this.productos.length > 0) {
      let xml;

      xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<cfdi:Comprobante Version="3.3" Serie="A">' +
              '<cfdi:Receptor Rfc="' + this.rfc + '" CliNumero="' + this.numero + '"/>' +
              '<cfdi:Conceptos>';

      for (let i = 0; i < this.productos.length; i++) {
        xml += '<cfdi:Concepto ClaveProdServ="' + this.productos[i].producto.claveProdServ + '" NoIdentificacion="' + this.productos[i].producto.codigo + '" Cantidad="' + this.productos[i].cantidad + '.000" ClaveUnidad="' + this.productos[i].producto.claveUnidad + '" Unidad="PZ"/>';
      }

      xml +=  '</cfdi:Conceptos>' +
            '</cfdi:Comprobante>';

      // console.log(xml);

      swal({
        title: 'Su pedido será procesado, ¿Seguro que desea enviar su pedido?',
        icon: 'warning',
        buttons: {
          cancel: true,
          confirm: true
        }
      })
      .then(( status ) => {
        if (!status) { return null; }

        const enviarXml: XmlString = {
          texto: xml
        };

        this._pedidoService.enviarPedido(enviarXml).subscribe((info: any) => {
          console.log(info);
          if (info.resp !== false) {
            swal('Pedido Enviado', 'El pedido ha ingresado correctamente.', 'success');
          } else {
            swal('Error Pedido', 'El pedido no se ingresó correctamente.', 'error');
          }
        });
      });
    } else {
      swal('No hay Productos', 'No se ha ingresado ningún a su pedido.', 'warning');
    }
  }

  iniciar() {
    this.usoNumero = '';
    this.usoNombre = '';
    this.op = '0';
    this.tp = '0';
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.nivelPrecio = 0;
    this.numberBol = true;
    this.nameBol = true;
    this.numero = '';
    this.nombre = '';
    this.direccion = '';
    this.asesor = '';
    this.lectura = false;
    this.cotizar = false;
    this.orden = false;
    this.productos = [];
    this.prod = [];
    this.cots = [];
    this.file = '';
    this.verPDF = 'vacio';
    this.guardado = false;
    this.ordenGuardada = '';
    this.correoCli = '';
    this.codigo = '';
    this.verCotizacion = '';
    this.verOrden = '';
    this.cantidad = 0;
    localStorage.removeItem('rfcCli');
    localStorage.removeItem('correoCli');
    localStorage.removeItem('ordenGuardada');
    localStorage.removeItem('guardado');
    localStorage.removeItem('filePDF');
    localStorage.removeItem('idFerrumCli');
    localStorage.removeItem('numeroCli');
    localStorage.removeItem('nombreCli');
    localStorage.removeItem('direccionCli');
    localStorage.removeItem('asesorCli');
    localStorage.removeItem('precioCli');
    localStorage.removeItem('saldoCli');
    localStorage.removeItem('lineaCli');
    localStorage.removeItem('diasCli');
    localStorage.removeItem('prodDistIntranet');
    localStorage.removeItem('pedidoDistIntranet');
    localStorage.removeItem('subtotalPedIntranet');
    localStorage.removeItem('ivaPedIntranet');
    localStorage.removeItem('totalPedIntranet');
    localStorage.removeItem('tipoOperacion');
    localStorage.removeItem('cambiarPrecio');
  }

  limpiar() {
    this.usoNumero = '';
    this.usoNombre = '';
    this.op = '0';
    this.tp = '0';
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.nivelPrecio = 0;
    this.numberBol = true;
    this.nameBol = true;
    this.numero = '';
    this.nombre = '';
    this.direccion = '';
    this.asesor = '';
    this.lectura = false;
    this.cotizar = false;
    this.orden = false;
    this.productos = [];
    this.prod = [];
    this.cots = [];
    this.file = '';
    this.verPDF = 'vacio';
    this.guardado = false;
    this.ordenGuardada = '';
    this.correoCli = '';
    this.codigo = '';
    this.verCotizacion = '';
    this.verOrden = '';
    this.cantidad = 0;
    const elem = <HTMLInputElement>(document.getElementById('cantidad'));
    elem.readOnly = true;
    localStorage.removeItem('rfcCli');
    localStorage.removeItem('correoCli');
    localStorage.removeItem('ordenGuardada');
    localStorage.removeItem('guardado');
    localStorage.removeItem('filePDF');
    localStorage.removeItem('idFerrumCli');
    localStorage.removeItem('numeroCli');
    localStorage.removeItem('nombreCli');
    localStorage.removeItem('direccionCli');
    localStorage.removeItem('asesorCli');
    localStorage.removeItem('precioCli');
    localStorage.removeItem('saldoCli');
    localStorage.removeItem('lineaCli');
    localStorage.removeItem('diasCli');
    localStorage.removeItem('prodDistIntranet');
    localStorage.removeItem('pedidoDistIntranet');
    localStorage.removeItem('subtotalPedIntranet');
    localStorage.removeItem('ivaPedIntranet');
    localStorage.removeItem('totalPedIntranet');
    localStorage.removeItem('tipoOperacion');
    localStorage.removeItem('cambiarPrecio');
  }

}
