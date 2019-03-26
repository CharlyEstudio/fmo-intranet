import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Servicios
import { UsuarioService, ClientesService, DiariosService, PedidosService } from '../../services/services.index';

// Modelo
import { Cotizacion } from '../../models/cotizacion.model';
import { XmlString } from '../../models/xml.model';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styles: []
})
export class CotizadorComponent implements OnInit {

  // @ViewChild('cantidad') cantidadInput: ElementRef;

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
  id: any = null;
  nivelPrecio: number = 0;
  tp: any = '0';

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

  // Importes del Pedido/Orden de Compra
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  // Ver Cotización Guardada
  verPDF: any = 'vacio';

  constructor(
    public sanitizer: DomSanitizer,
    private _usuarioService: UsuarioService,
    private _clienteService: ClientesService,
    private _diariosServoce: DiariosService,
    private _pedidoService: PedidosService
  ) {
    this.rol = this._usuarioService.usuario.rol;
    this.id = this._usuarioService.usuario._id;
  }

  ngOnInit() {
    this.precarga();
  }

  precarga() {
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
      this.seg = sec;
    } else {
      sec = h.getSeconds();
      this.seg = sec;
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

    this.hora = hor + ':' + min + ':' + sec;

    this.fecha = anio + '-' + mes + '-' + dia;

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
        this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.ferremayoristas.com.mx/api/cotizaciones/' + this.ordenGuardada.pdf);
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
        this.tp = '0';
        this.nivelPrecio = 0;
      }
      if (localStorage.getItem('pedidoDistIntranet') !== null) {
        this.file = localStorage.getItem('filePDF');
        this.prod = JSON.parse(localStorage.getItem('prodDistIntranet'));
        this.productos = JSON.parse(localStorage.getItem('pedidoDistIntranet'));
        this.subtotal = Number(localStorage.getItem('subtotalPedIntranet'));
        this.iva = Number(localStorage.getItem('ivaPedIntranet'));
        this.total = Number(localStorage.getItem('totalPedIntranet'));
      }
    } else if(localStorage.getItem('tipoOperacion') === '2') {
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
        this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.ferremayoristas.com.mx/api/ordenes/' + this.ordenGuardada.pdf);
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
      this.nameBol = false;
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
      this._pedidoService.obtenerOrdenCompra().subscribe((ordenes: any) => {
        if (ordenes.status) {
          this.ords = ordenes.ordenes;
        }
      });
    }
  }

  accionOrds() {
    this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.ferremayoristas.com.mx/api/ordenes/' + this.ods.pdf);
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
        if (data.length > 0) {
          this.idFerrum = data[0].CLIENTEID;
          this.numero = this.usoNumero;
          this.nombre = data[0].NOMBRE;
          this.correoCli = data[0].CORREO;
          this.nivelPrecio = data[0].LISTA;
          this.rfc = data[0].RFC;
          // this.file = this.nombre.replace(/ /gi, '-') + '-' + this.seg + '.pdf';
          const h = new Date();
          this.file = this.numero + String(h.getMonth()) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds()) + '.pdf';
          this.folio = 'C' + this.numero + String(h.getMonth() + 1) + String(h.getHours()) + String(h.getMinutes()) + String(h.getSeconds());
          localStorage.setItem('folio', this.folio);
          this.direccion = data[0].DIRECCION + ' ' + data[0].CASA + ' ' + data[0].INTERIOR + ' ' + data[0].COLONIA + ' ' + data[0].CIUDAD + ', ' + data[0].ESTADO + ', ' + data[0].CP;
          if (data[0].ASESOR !== '') {
            this.asesor = data[0].ASESOR;
          } else {
            this.asesor = 'Sin Asesor';
          }

          if (data[0].LISTA === 1) {
            this.precio = 'DISTRIBUIDOR';
          } else if (data[0].LISTA === 2) {
            this.precio = 'SUBDISTRIBUIDOR';
          } else if (data[0].LISTA === 3) {
            this.precio = 'MAYORISTA';
          }

          this.saldo = data[0].SALDO;
          this.linea = data[0].LIMITE;
          this.dias = data[0].DIACREDITO;

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
      // this.file = this.nombre.replace(/ /gi, '-') + '-' + this.seg + '.pdf';
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
    // this.file = this.nombre.replace(/ /gi, '-') + '-' + this.seg + '.pdf';
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
        if (lote.status) {
          const elem = <HTMLInputElement>(document.getElementById('cantidad'));
          elem.value = lote.respuesta[0].lote;
          this.cantidadStep = lote.respuesta[0].lote;
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
    
    if (division === 0 && inputCantidad !== '0') {
      if (this.proveedor.length === 0) {
        if (this.codigo !== '') {
          if (this.nivelPrecio === 0) {
            this.nivelPrecio = 3;
          }
          this._pedidoService.obtenerProducto(this.codigo, this.nivelPrecio).subscribe((producto: any) => {
            if (producto.status) {
              if (producto.respuesta)
              this.subtotal += (producto.respuesta[0].precioneto * inputCantidad);
              this.total += (producto.respuesta[0].precio * inputCantidad);
              if (producto.respuesta[0].iva > 0) {
                this.iva += (producto.respuesta[0].precioneto * inputCantidad) * producto.respuesta[0].iva;
              }
              const agregar = {
                producto: producto.respuesta[0],
                precioFinal: (producto.respuesta[0].precioneto * inputCantidad),
                precioDesc: producto.respuesta[0].precioneto,
                precioTot: producto.respuesta[0].precio,
                cantidad: inputCantidad,
                claveUnidad: producto.respuesta[0].claveUnidad,
                claveProdServ: producto.respuesta[0].claveProdServ
              };
              this.prod.push(producto.respuesta[0]);
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
          if (producto.status) {
            this.subtotal += (producto.respuesta[0].precioneto * this.cantidad);
            this.total += (producto.respuesta[0].precio * this.cantidad);
            if (producto.respuesta[0].iva > 0) {
              this.iva += (producto.respuesta[0].precioneto * this.cantidad) * producto.respuesta[0].iva;
            }
            const agregar = {
              producto: producto.respuesta[0],
              precioFinal: (producto.respuesta[0].precioneto * this.cantidad),
              precioDesc: producto.respuesta[0].precioneto,
              precioTot: producto.respuesta[0].precio,
              cantidad: this.cantidad,
              claveUnidad: producto.respuesta[0].claveUnidad,
              claveProdServ: producto.respuesta[0].claveProdServ
            };
            this.prod.push(producto.respuesta[0]);
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
        nombre: this.nombre,
        pdf: this.file,
        productos: this.prod,
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

  guardarPDF(cotizacion: any, datPDF: any, info: any = '') {
    const operacion = localStorage.getItem('tipoOperacion');
    this._pedidoService.guardarPdf(cotizacion, datPDF, operacion, info).subscribe((resp: any) => {
      if (resp[0].status.ok) {
        this.guardado = true;
        localStorage.setItem('guardado', String(this.guardado));
        swal('PDF Creado', resp[0].status.msg, {
          buttons: {
            catch: {
              text: "Ok",
              value: "catch",
            }
          },
        })
        .then((value) => {
          if (operacion === '2') {
            this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.ferremayoristas.com.mx/api/ordenes/' + info.pdf);
          } else if (operacion === '1') {
            this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.ferremayoristas.com.mx/api/cotizaciones/' + info.pdf);
          }
        });
      } else {
        swal('Error', resp[0].status.msg, 'error');
      }
    });
  }

  enviarOrden(email: any) {
    swal({
      title: "Listo para Enviar!",
      text: "Coloca el email a donde quieres enviar esta cotización.",
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
    .then((email) => {
      if (email === null) {
        return;
      }

      const dataOrder = {
        nombre: this.nombre,
        email: email,
        file: this.ordenGuardada.pdf
      };

      this._pedidoService.enviarEmailOrden(dataOrder).subscribe((resp: any) => {
        if (resp[0].status.ok) {
          swal('Cotización Enviado', resp[0].status.msg, 'success');
        } else {
          swal('Error', resp[0].status.msg, 'error');
        }
      });
    });
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

      this._pedidoService.enviarEmail(dataOrder).subscribe((resp: any) => {
        if (resp[0].status.ok) {
          swal('Cotización Enviado', resp[0].status.msg, 'success');
        } else {
          swal('Error', resp[0].status.msg, 'error');
        }
      });
    });
  }

  enviarEmail(numero: any, nombre: any, direccion: any, saldo: any, linea: any, dias: any, asesor: any, precio: any, productos: any, subtotal: any, iva: any, total: any, correo: any) {
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

      if (this.guardado) {
        this._pedidoService.enviarEmail(dataEmail).subscribe((resp: any) => {
          if (resp[0].status.ok) {
            swal('Cotización Enviado', resp[0].status.msg, 'success');
          }
        });
      } else {
        this._pedidoService.email(dataEmail).subscribe((resp: any) => {
          if (resp[0].status.ok) {
            swal('Cotización Enviado', resp[0].status.msg, 'success');
          }
        });
      }
    });
  }

  accionCots() {
    this.correoCli = '';
    this._clienteService.clienteCorreo(this.cts.idFerrum).subscribe((correo: any) => {
      if (correo.length > 0) {
        this.correoCli = correo[0].CORREO;
      }
    });
    this.verPDF = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.ferremayoristas.com.mx/api/cotizaciones/' + this.cts.pdf);
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
          if (info.status) {
            swal('Pedido Enviado', 'El pedido ha ingresado correctamente.', 'success');
          } else {
            swal('Error Pedido', 'El pedido no se ingresó correctamente.', 'success');
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
    this.file = '';
    this.verPDF = 'vacio';
    this.guardado = false;
    this.ordenGuardada = '';
    this.correoCli = '';
    this.codigo = '';
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
    this.file = '';
    this.verPDF = 'vacio';
    this.guardado = false;
    this.ordenGuardada = '';
    this.correoCli = '';
    this.codigo = '';
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
