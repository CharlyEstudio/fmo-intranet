import { Component, OnInit } from '@angular/core';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// MultiSelect
import { IDropdownSettings } from 'ng-multiselect-dropdown';

// Servicios
import { ProveedoresService, ExcelService, HerramientasService } from '../../services/services.index';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styles: []
})
export class CostosComponent implements OnInit {

  // MultiSelect
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};

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
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  obtenerProveedores() {
    this.proveedoresService.obtenerProveedores().subscribe((prov: any) => {
      if (prov.length > 0) {
        this.dropdownList = prov;
      }
    });
  }

  onItemSelect(item: any) {
    this.proveedores.push(item);
  }

  onDeSelect(items: any) {
    const esBorrado = prov => {
      return prov.item_id === items.item_id;
    };
    if (this.proveedores.find(esBorrado)) {
      const indice = this.proveedores.indexOf(this.proveedores.find(esBorrado));
      this.proveedores.splice(indice, 1);
    }
  }

  obtener() {
    if (this.proveedores.length === 0) {
      swal('Sin Proveedor', 'No ah seleccionado proveedor.', 'warning');
      return;
    }
    this.buscando = true;
    this.productos = [];
    this.productosTemp = [];
    for (const prove of this.proveedores) {
      this.proveedoresService.obtenerProductos(prove.item_id).subscribe((prods: any) => {
        if (prods.length > 0) {
          for (const prod of prods) {
            this.productos.push(prod);
            this.productosTemp.push(prod);
          }
        }
      });
    }
    this.buscando = false;
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
