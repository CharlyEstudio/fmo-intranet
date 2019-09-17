import { Component, OnInit } from '@angular/core';

// Servicios
import { PanelasesoresService, UsuarioService, WebsocketService } from '../../services/services.index';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Alertas con Swal
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-configpanel',
  templateUrl: './configpanel.component.html',
  styles: []
})
export class ConfigpanelComponent implements OnInit {

  imporVtaDia: number = 0;
  emisor: any;
  usuario: Usuario

  constructor(
    private usuarioService: UsuarioService,
    private panelService: PanelasesoresService,
    private socketService: WebsocketService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
    this.obtenerImporteDiaria();
  }

  obtenerImporteDiaria() {
    this.panelService.obtenerImporteVtaDiaria().subscribe((impor: any) => {
      if (impor.length > 0) {
        this.imporVtaDia = impor[0].data;
        this.emisor = impor[0].nombre;
      }
    });
  }

  cambiarImporte(importe: any) {
    if (importe === 0 || importe === '') {
      swal('Sin Importe', 'Debe de colocar un importe para poder realizar el cambio', 'error');
      return;
    }
    this.panelService.cambiarImporteVtaDiaria(importe, this.usuario).subscribe((guardado: any) => {
      if (guardado.length === 0) {
        this.obtenerImporteDiaria();
        this.socketService.acciones('cambiar-importe-venta-diaria', importe);
      }
    });
  }

}
