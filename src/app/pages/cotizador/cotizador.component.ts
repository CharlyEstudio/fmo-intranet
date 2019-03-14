import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { UsuarioService, ClientesService, DiariosService } from '../../services/services.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styles: []
})
export class CotizadorComponent implements OnInit {

  @ViewChild('numberCli') numberCli: ElementRef;
  @ViewChild('nameCli') nameCli: ElementRef;
  @ViewChild('operacion') operacion: ElementRef;

  // formulario: NgForm;

  rol: any = null;

  usoNombre: any = '';
  usoNumero: any = '';

  // Datos
  cotización: any[] = [];
  proveedor: any[] = [];
  prove: any = '0';

  // Datos del cliente
  numero: any = null;
  nombre: any = null;
  direccion: any = null;
  localidad: any = null;

  // Saldos del Cliente
  saldo: number = 0;
  limite: number = 0;
  dias: number = 0;
  precio: any = '';

  // Asesor del Cliente
  asesor: any = null;

  // Booleanos
  cotizar: boolean = false;
  orden: boolean = false;
  nameBol: boolean = true;
  numberBol: boolean = true;
  lectura: boolean = false;

  constructor(
    private _usuarioService: UsuarioService,
    private _clienteService: ClientesService,
    private _diariosServoce: DiariosService
  ) {
    this.rol = this._usuarioService.usuario.rol;
  }

  ngOnInit() {}

  accion(tipo: any) {
    this.lectura = false;
    if (tipo === '0') {
      this.numero = null;
      this.nombre = null;
      this.direccion = null;
      this.nameBol = false;
      this.cotizar = false;
      this.orden = false;
    } else if (tipo === '1') {
      this.usoNumero = '';
      this.usoNombre = '';
      this.numberBol = true;
      this.lectura = false;
      this.nameBol = true;
      this.cotizar = true;
      this.orden = false;
    } else if (tipo === '2') {
      this.numero = null;
      this.nombre = null;
      this.direccion = null;
      this.prove = '0';
      this.nameBol = false;
      this._diariosServoce.proveedores().subscribe((prov: any) => {
        if (prov.length > 0) {
          this.proveedor = prov;
          this.cotizar = false;
          this.orden = true;
        } else {
          this.cotizar = false;
          this.orden = false;
          swal('Sin Proveedores', 'No se encontraron proveedores, ver con el administrador.', 'error');
        }
      });
    }
  }

  buscarCliente() {
    this.nameBol = true;
    this.numberBol = true;
    this.lectura = false;
    this.numero = null;
    this.nombre = null;
    this.direccion = null;
    if (this.usoNumero.length > 0) {
      this._clienteService.infoClienteCot(this.usoNumero).subscribe((data: any) => {
        if (data.length > 0) {
          this.numero = data[0].NUMERO;
          this.nombre = data[0].NOMBRE;
          this.direccion = data[0].DIRECCION + ' ' + data[0].CASA + ' ' + data[0].INTERIOR + ' ' + data[0].COLONIA + ' ' + data[0].CIUDAD + ', ' + data[0].ESTADO + ', ' + data[0].CP;
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
    this.numero = null;
    this.nombre = null;
    this.direccion = null;
    if (this.usoNombre.length > 0) {
      this.nombre = this.usoNombre;
      this.nameBol = false;
      this.numberBol = false;
      this.lectura = true;
    }
  }

  asignarProveedor() {
    this.nameBol = false;
    this.lectura = true;
    this.numero = this.prove.numero;
    this.nombre = this.prove.nombre;
    this.direccion = this.prove.direccion + ' ' + this.prove.casa + ' ' + this.prove.interior + ' ' + this.prove.colonia + ' ' + this.prove.ciudad + ', ' + this.prove.estado + ', ' + this.prove.cp;
  }

  iniciar() {
    this.usoNumero = '';
    this.usoNombre = '';
    this.operacion.nativeElement.value = '0';
    this.numberBol = true;
    this.nameBol = true;
    this.numero = null;
    this.nombre = null;
    this.direccion = null;
    this.lectura = false;
    this.cotizar = false;
    this.orden = false;
  }

}
