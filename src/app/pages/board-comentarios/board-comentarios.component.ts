import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { CreditoService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-board-comentarios',
  templateUrl: './board-comentarios.component.html',
  styles: []
})
export class BoardComentariosComponent implements OnInit {
  @ViewChild('input') input: ElementRef;

  perid: any;

  cuentas: any[] = [];

  mor028: any[] = [];
  tipo028: any;
  mor2945: any[] = [];
  tipo2945: any;
  mor4660: any[] = [];
  tipo4660: any;
  mor61: any[] = [];
  tipo61: any;

  correcto: boolean = false;
  buscando: boolean = false;
  encontrado: boolean = false;
  error: boolean = false;

  constructor(
    private router: Router,
    private _creditoService: CreditoService,
    private _usuarioService: UsuarioService
  ) {
    this.perid = this._usuarioService.usuario.idFerrum;
    this.cargarCuentas();
  }

  ngOnInit() {
  }

  cargarCuentas() {
    this._creditoService.morosidadRelacionAsesor(this.perid).subscribe((cuentas: any) => {
      for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].cuenta === '0 A 28') {
          this.tipo028 = cuentas[i].cuenta;
          this.mor028.push(cuentas[i]);
        }

        if (cuentas[i].cuenta === '29 A 45') {
          this.tipo2945 = cuentas[i].cuenta;
          this.mor2945.push(cuentas[i]);
        }

        if (cuentas[i].cuenta === '46 A 60') {
          this.tipo4660 = cuentas[i].cuenta;
          this.mor4660.push(cuentas[i]);
        }

        if (cuentas[i].cuenta === '60+') {
          this.tipo61 = cuentas[i].cuenta;
          this.mor61.push(cuentas[i]);
        }
      }
      this.cuentas = cuentas;
      this.correcto = true;
    });
  }

  solicitarComentarios( datos: any ) {
    this.router.navigate(['/comentarios/', datos.clienteid, datos.numero, datos.nombre]);
  }

  buscar(termino: string) {
    this.error = false;
    this.buscando = true;
    if ( termino.length <= 0 ) {
      this.cargarCuentas();
      return;
    }

    this._creditoService.morosidadRelacionCliente(termino, this.perid).subscribe((cuentas: any) => {
      if (cuentas.length > 0) {
        this.mor028 = [];
        this.mor2945 = [];
        this.mor4660 = [];
        this.mor61 = [];
        this.cuentas = [];
        for (let i = 0; i < cuentas.length; i++) {
          if (cuentas[i].cuenta === '0 A 28') {
            this.tipo028 = cuentas[i].cuenta;
            this.mor028.push(cuentas[i]);
          }

          if (cuentas[i].cuenta === '29 A 45') {
            this.tipo2945 = cuentas[i].cuenta;
            this.mor2945.push(cuentas[i]);
          }

          if (cuentas[i].cuenta === '46 A 60') {
            this.tipo4660 = cuentas[i].cuenta;
            this.mor4660.push(cuentas[i]);
          }

          if (cuentas[i].cuenta === '60+') {
            this.tipo61 = cuentas[i].cuenta;
            this.mor61.push(cuentas[i]);
          }
        }
        this.cuentas = cuentas;
        this.correcto = true;
        this.buscando = false;
        this.encontrado = true;
      } else {
        this.buscando = false;
        this.encontrado = false;
        this.error = true;
      }
    }, err => {
      this.error = true;
      this.buscando = false;
      this.encontrado = false;
    });
  }

  limpiar() {
    this.mor028 = [];
    this.mor2945 = [];
    this.mor4660 = [];
    this.mor61 = [];
    this.cuentas = [];
    this.buscando = false;
    this.encontrado = false;
    this.error = false;
    this.correcto = false;
    this.input.nativeElement.value = '';
    this.input.nativeElement.focus();
    this.cargarCuentas();
  }

}
