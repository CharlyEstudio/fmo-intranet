import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { BackorderService, UsuarioService, HerramientasService } from '../../services/services.index';

@Component({
  selector: 'app-backorder-asesor',
  templateUrl: './backorder-asesor.component.html',
  styles: []
})
export class BackorderAsesorComponent implements OnInit {

  @ViewChild('input') input: ElementRef;

  msg: any = '';
  backorder: any[] = [];
  cargando: boolean = false;

  constructor(
    private _usuario: UsuarioService,
    private _herramientas: HerramientasService,
    private _bo: BackorderService
  ) { }

  ngOnInit() {}

  solicitar() {
    this.backorder = [];
    this.msg = '';
    const numero = this.input.nativeElement.value;
    if (numero === '') {
      this.msg = 'Necesitas un número de cliente.';
      return;
    }
    this.cargando = true;
    const inicio = this._herramientas.fechaInicialMesActual();
    const final = this._herramientas.fechaActual();
    this._bo.backorder(this._usuario.usuario.idFerrum, numero, inicio, final).subscribe((resp: any) => {
      if (resp.status) {
        this.backorder = resp.respuesta;
        this.cargando = false;
      } else {
        this.msg = resp.msg;
        this.cargando = false;
      }
    });
  }

}
