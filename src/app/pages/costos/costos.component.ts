import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { ProveedoresService, ExcelService, HerramientasService } from '../../services/services.index';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styles: []
})
export class CostosComponent implements OnInit {

  proveedor: any = '0';
  proveedores: any[] = [];
  productos: any[] = [];
  productosTemp: any[] = [];
  buscando: boolean = false;

  constructor(
    private proveedoresService: ProveedoresService,
    private excelService: ExcelService,
    private herramientasService: HerramientasService
  ) { }

  ngOnInit() {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedoresService.obtenerProveedores().subscribe((prov: any) => {
      if (prov.length > 0) {
        this.proveedores = prov;
      }
    });
  }

  obtener() {
    if (this.proveedor === '0') {
      swal('Sin Proveedor', 'No ah seleccionado un proveedor.', 'warning');
      return;
    }
    this.buscando = true;
    this.productos = [];
    this.proveedoresService.obtenerProductos(this.proveedor.clienteid).subscribe((prods: any) => {
      if (prods.length > 0) {
        this.productos = prods;
        this.productosTemp = prods;
      }
      this.buscando = false;
    });
  }

  filtrar(codigo: any) {
    if (codigo.length > 0) {
      if (this.productos.length === 0) {
        swal('Sin Productos', 'No se puede filtrar por que no hay productos.', 'warning');
        return;
      }
    }
    console.log(codigo);
    const esCodigo = articulo => {
      return articulo.codigo === codigo;
    };
  }

  descargar() {
    if (this.productos.length === 0) {
      swal('Sin Productos', 'No se puede descargar nada, por que no hay productos.', 'warning');
      return;
    }
    const file = this.proveedor.nombre + '_' + this.herramientasService.fechaActual();
    this.excelService.exportAsExcelFile(this.productos, file);
  }

}
