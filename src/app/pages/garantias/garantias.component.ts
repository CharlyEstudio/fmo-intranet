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
  foliosGuia: any[] = [];
  desde: number = 0;
  hasta: number = 10;
  totalResgitro: number = 0;
  fechaHoy: any = '';
  habilitar: boolean = false;
  requerido: boolean = true;
  truperHabilitado: boolean = false;
  autorizado: boolean = true;
  accion: boolean = false;
  enviar: any = '';
  guia: any = '';
  
  // Formulario del Producto
  folioGar: number = 0;
  numFactura: any = '';
  numFacturaO: any = '';
  pro: any = '0';
  falla: any = '';
  clave: any = '';
  costo: number = 0;
  descr: any = '';
  nomcli: any = '';
  nomcliO: any = '';
  nomcliFol: any = '';
  lista: number = 0;
  listaO: number = 0;
  products: any = '0';
  mecompro: any = '';
  numcli: number = 0;
  numcliO: number = 0;
  numcliFol: number = 0;
  perid: number = 0;
  peridO: number = 0;
  saldo: number = 0;
  saldoO: number = 0;
  folioFact: number = 0;
  folioFactO: number = 0;

  // Detalles
  asesor: any = '';
  asesorO: any = '';
  cantidad: number = 0;
  clvprov: number = 0;
  claveprod: any;
  costoprod: number = 0;
  fecha: any;
  fecreg: any;
  folio: number = 0;
  foltru: any = '0';
  fecregtru: Date;
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
  placas: any;
  chofer:any;
  folterm: any = '';

  // Detalles de Fechas
  fechaproceso: any;
  fechaenviando: any;
  fechaautoriza: any;
  fechaentrega: any;
  fecenvio: any;

  // Estado del Producto
  estado: any;
  idcance: number;

  realizo: any;
  fechaGuia: any;
  hora: any;
  choferGuia: any;
  verifico: any;

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
    this.garantias = [];
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
    this.numcliFol = garantia.value.numcliFol;
    this._clientesService.infoClienteCot(this.numcliFol).subscribe((cli: any) => {
      if (cli.length > 0) {
        this.nomcliFol = cli[0].NOMBRE;
      }
    });
  }

  buscarFactura(garantia: any) {
    this.numFactura = garantia.value.factura;
    if (this.numFactura === '') {
      swal('Sin Folio', 'El folio de la factura es importante para scontinuar.', 'error');
    }
    
    this._garantiaService.obtenerFactura(this.numFactura).subscribe((fac: any) => {
      if (fac.length > 0) {
        this.perid = fac[0].VENDEDORID;
        this.asesor = fac[0].ASESOR;
        this.asesor = fac[0].ASESOR;
        this.numcli = fac[0].CLINUM;
        this.nomcli = fac[0].CLIENTE;
        this.saldo = fac[0].SALDO;
        this.lista = fac[0].LISTA;
        this.folioFact = fac[0].DOCID;
        if (this.numcli === this.numcliFol) {
          this.mecompro = 'SI';
        } else {
          this.mecompro = 'NO';
        }
        this._garantiaService.obtenerProductosFacturas(this.folioFact).subscribe((prod: any) => {
          if (prod.length > 0) {
            this.productosFactura = prod;
          }
        });
      } else {
        swal('Factura Vacía', 'No se encontro registro de este folio.', 'error');
      }
    });
  }

  buscarFacturaOtro(garantiaO: any) {
    this.numFacturaO = garantiaO.value.facturaDos;
    if (this.numFacturaO === '') {
      swal('Sin Folio', 'El folio de la factura es importante para continuar.', 'error');
    }
    
    this._garantiaService.obtenerFactura(this.numFacturaO).subscribe((fact: any) => {
      if (fact.length > 0) {
        this.peridO = fact[0].VENDEDORID;
        this.asesorO = fact[0].ASESOR;
        this.asesorO = fact[0].ASESOR;
        this.numcliO = fact[0].CLINUM;
        this.nomcliO = fact[0].CLIENTE;
        this.saldoO = fact[0].SALDO;
        this.listaO = fact[0].LISTA;
        this.folioFactO = fact[0].DOCID;
        if (this.numcliO === this.numcliFol) {
          this.mecompro = 'SI';
        } else {
          this.mecompro = 'NO';
        }
        this._garantiaService.obtenerProductosFacturas(this.folioFactO).subscribe((prod: any) => {
          if (prod.length > 0) {
            this.productosFactura = prod;
          }
        });
      } else {
        swal('Factura Vacía', 'No se encontro registro de este folio.', 'error');
      }
    });
  }

  enviarCosto(enviar: any){
    this.enviar = enviar;
  }
  
  
  obtenerPro(garantia: any){
    this.accion = true;
    this.falla = garantia.value.falla;
    this.cantidad = garantia.value.cantidad;
    this.clave = this.pro.CLAVE;
    this.clvprov = this.pro.CLVPROV;
    this.costo = this.pro.PRECIO;
    this.descr = this.pro.DESCRIPCIO;

  }
  limpiando(){
    this.garantias = [];
  }

  verInfo(garantia: any) {
    
    // this.fecregtru = Date;
    

    this.fechaproceso = garantia.fechaproceso;
    this.fechaenviando = garantia.fechaenviando;
    this.fechaautoriza = garantia.fechaautoriza;
    this.fechaentrega = garantia.fechaentrega;
    this.fecenvio = garantia.fecenvio;
    // this.estado = '';
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
    this.placas = garantia.placas;
    this.chofer = garantia.chofer;
    
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
    this.limpiando();
  }

  validarFolio(data: any) {
    this.folioGar = data.value.folio;
    if (data.value.folio !== null) {
      this._garantiaService.validarFolio(this.folioGar).subscribe((existe: any) => {
        if (existe[0].existe !== 0) {
          swal('Folio Registrado', 'Este folio ya esta registrado, favor de revisar.', 'warning');
        }
      });
    }
    this.limpiando();
  }


  agregarGarantia(garantia: NgForm) {
   if(garantia.value.numFacturaO === ''){
     this.observa = '';
   }else {
     this.observa = garantia.value.facturaDos;
   }

      this._garantiaService.nuevaGarantia(garantia.value, this.observa).subscribe((resp: any) => {
        if (resp) {
          swal('Nueva Garantia', 'Los datos de la garantia se han guardado correctamente.', 'success');
          const cerrar = <HTMLElement>(document.getElementById('cerrarModalGar'));
          cerrar.click();
           this.obtenerTodasGarantias();
           this.limpiando();
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
   
  
 
  autorizacion(valor: any) {
    if (valor === 'NO') {
      this.autorizado = false;
    } else {
      this.autorizado = true;
    }
  }
 
  actualizarGarantia(garantia: NgForm) {
    console.log(garantia.value);
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
            this.limpiando();
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
      if (this.autorizado === true) {
        this.estado = 'ENTREGAR';
        this._garantiaService.cambiarEstado(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            swal('Cliente Actualizado', 'actualizado', 'success');
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
            this.limpiando();
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
            this.limpiando();
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
          this.limpiando();
          setTimeout(() => {
            this.seguimiento(garantia.value, this.usuario, this.estado, this.folio, this.numero, this.nomcli);
          }, 100);
        } else {
          swal('Cliente No Actualizado', 'Error al actualizar', 'error');
        }
      });
    } else if (this.estado === 'ENTREGAR') {
      this.estado = 'ENTREGANDO';
      this._garantiaService.cambiarEstado(garantia.value, this.estado).subscribe((actualizado: any) => {
        if (actualizado) {
          const cerrar = <HTMLElement>(document.getElementById('editar'));
          cerrar.click();
          this.obtenerTodasGarantias();
          this.limpiando();
          setTimeout(() => {
            this.seguimiento(garantia.value, this.usuario, this.estado, this.folio, this.numero, this.nomcli);
          }, 100);
        } else {
          swal('Cliente No Actualizado', 'Error al actualizar', 'error');
        }
      });
 
    }else if (this.estado === 'ENTREGANDO') {
      if (garantia.value !== '') {
        this.estado = 'TERMINADO';
        this._garantiaService.terminarGarantia(garantia.value, this.estado).subscribe((actualizado: any) => {
          if (actualizado) {
            const cerrar = <HTMLElement>(document.getElementById('editar'));
            cerrar.click();
            this.obtenerTodasGarantias();
            this.limpiando();
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
    this.limpiando();
  }

  cancelar(){
    this._garantiaService.cancelarGarantia(this.idgar).subscribe((resp:any) => {
      swal('Garantia Cancelada', 'Esta garantía ha sido cancelada.', 'success');
      const cerrar = <HTMLElement>(document.getElementById('editar'));
          cerrar.click();
          this.obtenerTodasGarantias();
          this.limpiando();
    });
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

  obtenerFolio(garantia: any) {
    this.guia = '';
    this.foliosGuia = [];
    this._garantiaService.buscarFolioHistorial(garantia.foltru).subscribe((resp: any)=>{
      if(resp.ok){
        if(resp.folios.length > 0){
          this.foliosGuia = resp.folios;
          var reversed = this.foliosGuia.reverse(); 
          // console.log(reversed);
          this.guia = 'DATOS DE GUIA';
        }else{
          this.guia = 'GUIA NO ENCONTRADA';
        }
      }
    });
  }

  devolucion(){
    // console.log(this.estado);
    this.estado = 'ENTREGAR';
    this.folterm = 'Devolucion';
    console.log(this.folterm)
    this._garantiaService.devolucionGarantia(this.idgar, this.estado, this.folterm).subscribe((resp:any) => {
      swal('Devolucion', 'Esta garantía esta devuelta', 'success');
      const cerrar = <HTMLElement>(document.getElementById('editar'));
          cerrar.click();
          this.obtenerTodasGarantias();
          this.limpiando();
          // this.folterm = '';
    });

  }

}
