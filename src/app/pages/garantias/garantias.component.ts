import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { GarantiasService, HerramientasService, ProductosService, ClientesService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styles: []
})
export class GarantiasComponent implements OnInit {

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
  perid: any = '0';

  // Detalles
  asesor: any;
  cantidad: number = 0;
  clvprov: number = 0;
  claveprod: any;
  costoprod: number = 0;
  fecha: any;
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

  // Estado del Producto
  estado: any;

  constructor(
    private _garantiaService: GarantiasService,
    private herramienta: HerramientasService,
    private _productoService: ProductosService,
    private _clientesService: ClientesService,
    private _usuarioService: UsuarioService
  ) {
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

  verInfo(garantia: any) {
    this.asesor = '';
    this.cantidad = 0;
    this.clvprov = 0;
    this.claveprod = '';
    this.costoprod = 0;
    this.fecha = '';
    this.tipoFalla = '';
    this.folio = 0;
    this.foltru = 0;
    this.fecregtru = '';
    this.factura = 0;
    this.idgar = 0;
    this.marca = '';
    this.numero = 0;
    this.observa = '';
    this.folnc = 0;

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
    this.folio = garantia.folio;
    this.foltru = garantia.foltru;
    this.fecregtru = garantia.fecregtru;
    this.factura = garantia.facafec;
    this.idgar = garantia.idgar;
    this.marca = garantia.marca;
    this.numero = garantia.numero;
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

  validarFolio(data: any) {
    if (data.value.folio !== null) {
      this._garantiaService.validarFolio(data.value.folio).subscribe((existe: any) => {
        if (existe[0].existe !== 0) {
          swal('Folio Registrado', 'Este folio ya esta registrado, favor de revisar.', 'warning');
        }
      });
    }
  }

  buscarProducto(data: any) {
    if (data.value.codigo !== null || data.value.codigo !== 0) {
      this._productoService.obtenerProducto(data.value.codigo).subscribe((product: any) => {
        if (product.status) {
          this.clave = product.respuesta[0].clave;
          this.costo = product.respuesta[0].precio;
          this.descr = product.respuesta[0].descripcion;
        } else {
          swal('Producto No Encontrado', 'El producto con este código no existe', 'error');
        }
      });
    }
  }

  buscarCliente(data: any) {
    if (data.value.numcli !== null || data.value.numcli !== '') {
      this._clientesService.infoClienteCot(data.value.numcli).subscribe((cli: any) => {
        if (cli.length > 0) {
          this.nomcli = cli[0].NOMBRE;
        } else {
          swal('Cliente No Encontrado', 'El cliente no existe', 'error');
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
      }
    });
  }

  actualizarGarantia(garantia: NgForm) {
    if (this.estado === 'NUEVO') {
      this.estado = 'PROCESO';
      this._garantiaService.actualizarGarantia(garantia.value, this.estado).subscribe((actualizado: any) => {
        if (actualizado) {
          const cerrar = <HTMLElement>(document.getElementById('editar'));
          cerrar.click();
          this.obtenerTodasGarantias();
        } else {
          swal('Cliente No Actualizado', 'Error al actualizar', 'error');
        }
      });
    } else if (this.estado === 'PROCESO') {
      if (garantia.value.enviando !== '') {
        this.estado = 'ENVIANDO';
        this._garantiaService.cambiarEstado(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
          } else {
            swal('Cliente No Actualizado', 'Error al actualizar', 'error');
          }
        });
      } else {
        swal('Sin registro', 'No ha seleccionada nada.', 'error');
      }
    } else if (this.estado === 'ENVIANDO') {
      // Aqui va la condición si pasa o no pasa la garantia SI/NO => AUTORIZACION
      if (this.autorizado) {
        this.estado = 'ENTREGAR';
        this._garantiaService.cambiarEstado(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
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

}
