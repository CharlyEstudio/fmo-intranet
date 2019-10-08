import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { GarantiasService, HerramientasService, ProductosService, ClientesService, UsuarioService, WebsocketService } from '../../services/services.index';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styles: []
})
export class GarantiasComponent implements OnInit {

  usuario: Usuario;

  productosFactura: any[] = [];
  asesores: any[] = [];
  garantias: any[] = [];
  desde: number = 0;
  hasta: number = 10;
  totalResgitro: number = 0;
  fechaHoy: any = '';
  habilitar: boolean = false;
  requerido: boolean = true;
  truperHabilitado: boolean = false;
  autorizado: boolean = true;

  // Formulario del Producto
  clave: any = '';
  costo: number = 0;
  descr: any = '';
  nomcli: any = '';
  nomcliFol: any = '';
  lista: number = 0;
  products: any = '0';
  mecompro: any = '';
  numcli: number = 0;
  numcliFol: number = 0;
  perid: any = '0';

  // Detalles
  asesor: any = '';
  cantidad: number = 0;
  clvprov: number = 0;
  claveprod: any;
  costoprod: number = 0;
  fecha: any;
  fecreg: any;
  folio: number = 0;
  foltru: number = 0;
  fecregtru: any;
  observa: any;
  folnc: number = 0;
  tipoFalla: any;
  factura: number = 0;
  idgar: number = 0;
  marca: any;
  numero: number = 0;
  cliente: any;
  numeroFol: number = 0;
  clienteFol: any;

  // Detalles de Fechas
  fechaproceso: any;
  fechaenviando: any;
  fechaautoriza: any;
  fechaentrega: any;
  fecenvio: any;

  // Estado del Producto
  estado: any;

  constructor(
    private _garantiaService: GarantiasService,
    private herramienta: HerramientasService,
    private _productoService: ProductosService,
    private _clientesService: ClientesService,
    private _usuarioService: UsuarioService,
    private _webSocket: WebsocketService
  ) {
    this.usuario = this._usuarioService.usuario;
    this._garantiaService.totalregistros().subscribe((all: number) => {
      this.totalResgitro = all;
    });

    this._usuarioService.buscarUsuarios('ASE_ROLE').subscribe((asesores: any) => {
      if (asesores.length > 0) {
        this.asesores = asesores;
      }
    });

    this.fechaHoy = this.herramienta.fechaActual();

    this.obtenerTodasGarantias();
  }

  ngOnInit() {
  }

  obtenerTodasGarantias() {
    this._garantiaService.obtenerGarantiasDesde(this.desde).subscribe((gar: any) => {
      if (gar.length > 0) {
        this.garantias = gar;
      }
    });
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this.totalResgitro ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.obtenerTodasGarantias();
  }

  buscarCli(garantia: any) {
    if (garantia.value.numcliFol === '') {
      swal('Sin Cliente', 'Es necesario ingresar un número de cliente para continuar.', 'error');
    }
    this.numcliFol = Number(garantia.value.numcliFol);
    this._clientesService.infoClienteCot(garantia.value.numcliFol).subscribe((cli: any) => {
      if (cli.length > 0) {
        this.nomcliFol = cli[0].NOMBRE;
      }
    });
  }

  buscarFactura(garantia: any) {
    if (garantia.value.factura === '') {
      swal('Sin Folio', 'El folio de la factura es importante para scontinuar.', 'error');
    }

    this._garantiaService.obtenerFactura(garantia.value.factura).subscribe((fac: any) => {
      if (fac.length > 0) {
        this.perid = fac[0].VENDEDORID;
        this.asesor = fac[0].ASESOR;
        this.asesor = fac[0].ASESOR;
        this.numcli = fac[0].CLINUM;
        this.nomcli = fac[0].CLIENTE;
        this.lista = fac[0].LISTA;
        if (this.numcli === this.numcliFol) {
          this.mecompro = 'SI';
        } else {
          this.mecompro = 'NO';
        }
        this._garantiaService.obtenerProductosFacturas(fac[0].DOCID).subscribe((prod: any) => {
          if (prod.length > 0) {
            this.productosFactura = prod;
          }
        });
      } else {
        swal('Factura Vacía', 'No se encontro registro de este folio.', 'error');
      }
    });
  }

  activarProducto(garantia: any) {
    this.clave = garantia.value.productos.CLAVE;
    this.clvprov = garantia.value.productos.CLVPROV;
    this.costo = garantia.value.productos.PRECIO;
    this.descr = garantia.value.productos.DESCRIPCIO;
  }

  verInfo(garantia: any) {
    this.asesor = '';
    this.cantidad = 0;
    this.clvprov = 0;
    this.claveprod = '';
    this.costoprod = 0;
    this.fecha = '';
    this.fecreg = '';
    this.tipoFalla = '';
    this.folio = 0;
    this.foltru = 0;
    this.fecregtru = '';
    this.factura = 0;
    this.idgar = 0;
    this.marca = '';
    this.numero = 0;
    this.cliente = '';
    this.numeroFol = 0;
    this.clienteFol = '';
    this.observa = '';
    this.folnc = 0;

    this.fechaproceso = '';
    this.fechaenviando = '';
    this.fechaautoriza = '';
    this.fechaentrega = '';
    this.fecenvio = '';
    this.fechaproceso = garantia.fechaproceso;
    this.fechaenviando = garantia.fechaenviando;
    this.fechaautoriza = garantia.fechaautoriza;
    this.fechaentrega = garantia.fechaentrega;
    this.fecenvio = garantia.fecenvio;

    this.estado = '';
    this.estado = garantia.estado;

    this.tipoFalla = garantia.falla;
    this.asesor = garantia.asesor;
    this.cantidad = garantia.cantidad;
    this.clvprov = garantia.clvprov;
    this.observa = garantia.observa;
    this.folnc = garantia.folnc;
    this._productoService.obtenerProducto(this.clvprov).subscribe((product: any) => {
      if (product.status) {
        this.claveprod = product.respuesta[0].clave;
        this.descr = product.respuesta[0].descripcion;
      } else {
        swal('Producto No Encontrado', 'El producto con este código no existe', 'error');
      }
    });
    this.costoprod = garantia.costo;
    this.fecha = garantia.fecha;
    this.fecreg = garantia.fecreg;
    this.folio = garantia.folio;
    this.foltru = garantia.foltru;
    this.fecregtru = garantia.fecregtru;
    this.factura = garantia.facafec;
    this.idgar = garantia.idgar;
    this.marca = garantia.marca;
    this.numero = garantia.numero;
    this.cliente = garantia.cliente;
    this.numeroFol = garantia.numeroFol;
    this.clienteFol = garantia.clienteFol;
    this.mecompro = garantia.mecompro;
    this._clientesService.infoClienteCot(this.numero).subscribe((cli: any) => {
      if (cli.length > 0) {
        this.nomcli = cli[0].NOMBRE;
      }
    });
  }

  search(texto: any) {
    if (texto.length !== 0) {
      this._garantiaService.buscarGara(texto).subscribe((gar: any) => {
        if (gar.length > 0) {
          this.garantias = gar;
          this.habilitar = true;
        }
      });
    } else {
      this.habilitar = false;
      this.obtenerTodasGarantias();
    }
  }

  limpiar() {
    this.habilitar = false;
    this.obtenerTodasGarantias();
  }

  validarFolio(data: any) {
    if (data.value.folio !== null) {
      this._garantiaService.validarFolio(data.value.folio).subscribe((existe: any) => {
        if (existe[0].existe !== 0) {
          swal('Folio Registrado', 'Este folio ya esta registrado, favor de revisar.', 'warning');
        }
      });
    }
  }

  agregarGarantia(garantia: NgForm) {
    this._garantiaService.nuevaGarantia(garantia.value).subscribe((resp: any) => {
      if (resp) {
        const cerrar = <HTMLElement>(document.getElementById('cerrarModalGar'));
        cerrar.click();
        this.obtenerTodasGarantias();
        setTimeout(() => {
          const payload = {
            datos: garantia.value,
            usuario: this.usuario
          };
          this._webSocket.acciones('nueva-garantia', payload);
        }, 100);
      }
    });
  }

  actualizarGarantia(garantia: NgForm) {
    if (this.estado === 'NUEVO') {
      if (garantia.value.fechaTrup < this.fecha) {
        swal('Fecha Incorrecta', 'No se puede colocar una fecha menor a la de registro.', 'error');
      } else {
        this.estado = 'PROCESO';
        this._garantiaService.actualizarGarantia(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
            setTimeout(() => {
              this.seguimiento(garantia.value, this.usuario, this.estado, this.folio, this.numero, this.nomcli);
            }, 100);
          } else {
            swal('Cliente No Actualizado', 'Error al actualizar', 'error');
          }
        });
      }
    } else if (this.estado === 'PROCESO') {
      if (garantia.value.enviando !== '') {
        this.estado = 'ENVIANDO';
        this._garantiaService.cambiarEstado(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
            setTimeout(() => {
              this.seguimiento(garantia.value, this.usuario, this.estado, this.folio, this.numero, this.nomcli);
            }, 100);
          } else {
            swal('Cliente No Actualizado', 'Error al actualizar', 'error');
          }
        });
      } else {
        swal('Sin registro', 'No ha seleccionada nada.', 'error');
      }
    } else if (this.estado === 'ENVIANDO') {
      if (this.autorizado) {
        this.estado = 'ENTREGAR';
        this._garantiaService.cambiarEstado(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
            setTimeout(() => {
              this.seguimiento(garantia.value, this.usuario, this.estado, this.folio, this.numero, this.nomcli);
            }, 100);
          } else {
            swal('Cliente No Actualizado', 'Error al actualizar', 'error');
          }
        });
      } else {
        this.estado = 'AUTORIZACION';
        this._garantiaService.cambiarEstado(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
            setTimeout(() => {
              this.seguimiento(garantia.value, this.usuario, this.estado, this.folio, this.numero, this.nomcli);
            }, 100);
          } else {
            swal('Cliente No Actualizado', 'Error al actualizar', 'error');
          }
        });
      }
    } else if (this.estado === 'AUTORIZACION') {
      this.estado = 'ENTREGAR';
      this._garantiaService.anexarNCGarantia(garantia.value, this.estado).subscribe((actualizado: any) => {
        if (actualizado) {
          const cerrar = <HTMLElement>(document.getElementById('editar'));
          cerrar.click();
          this.obtenerTodasGarantias();
          setTimeout(() => {
            this.seguimiento(garantia.value, this.usuario, this.estado, this.folio, this.numero, this.nomcli);
          }, 100);
        } else {
          swal('Cliente No Actualizado', 'Error al actualizar', 'error');
        }
      });
    } else if (this.estado === 'ENTREGAR') {
      if (garantia.value !== '') {
        this.estado = 'TERMINADO';
        this._garantiaService.terminarGarantia(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
            setTimeout(() => {
              this.seguimiento(garantia.value, this.usuario, this.estado, this.folio, this.numero, this.nomcli);
            }, 100);
          } else {
            swal('Cliente No Actualizado', 'Error al actualizar', 'error');
          }
        });
      } else {
        swal('Sin Selección', 'No ah selecionado nada.', 'error');
      }
    }
  }

  autorizacion(valor: any) {
    if (valor === 'NO') {
      this.autorizado = false;
    } else {
      this.autorizado = true;
    }
  }

  seguimiento(data: any, user: Usuario, estate: any, fol: any, numCli: any, nomCli: any) {
    const payload = {
      datos: data,
      usuario: user,
      estado: estate,
      folio: fol,
      numeroCli: numCli,
      nombreCli: nomCli
    };
    this._webSocket.acciones('seguimiento-garantia', payload);
  }

}
