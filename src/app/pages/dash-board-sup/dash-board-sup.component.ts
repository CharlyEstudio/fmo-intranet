import { Component, OnInit } from '@angular/core';
import { UsuarioService, AsesoresService, SupervisoresService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board-sup',
  templateUrl: './dash-board-sup.component.html',
  styles: []
})
export class DashBoardSupComponent implements OnInit {

  datos: any[] = [];
  rol: any;

  asesores: any[] = [];

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private _asesoresService: AsesoresService,
    private _supervisoresServices: SupervisoresService
  ) { }

  ngOnInit() {

    this.datos = JSON.parse(localStorage.getItem('usuario'));

    this.rol = this.datos["rol"];

    this._usuarioService.buscarUsuarios('ASE_ROLE')
      .subscribe( ( resp: any ) => {
        for (let i = 0; i < resp.length; i++) {
          this._supervisoresServices.pedidosGeneral(resp[i].idFerrum)
            .subscribe( ( data: any ) => {
              this.asesores.push(
                {
                  idFerrum: resp[i].idFerrum,
                  nombre: resp[i].nombre,
                  email: resp[i].email,
                  rol: resp[i].rol,
                  img: resp[i].img,
                  porBajarCantidad: data[0].cantidad,
                  porBajarImporte: data[0].importe,
                  porSurtirCantidad: data[1].cantidad,
                  porSurtirImporte: data[1].importe,
                  facturadoCantidad: data[2].cantidad,
                  facturadoImporte: data[2].importe,
                  canceladoCantidad: data[3].cantidad,
                  canceladoImporte: data[3].importe,
                }
              );

              this.asesores.sort((a, b) => {
                if (a.idFerrum > b.idFerrum) {
                  return 1;
                }

                if (a.idFerrum < b.idFerrum) {
                  return -1;
                }

                return 0;
              });
            });
        }
      });
  }

  revisar( idFerrum: any, nombre: any ) {
    this.router.navigate(['/asesor-vista/', idFerrum, nombre]);
  }

  cobrado( idFerrum: any, nombre: any ) {
    this.router.navigate(['/cobro-vista/', idFerrum, nombre]);
  }

  pedidos( idFerrum: any, nombre: any ) {
    this.router.navigate(['/pedido-vista/', idFerrum, nombre]);
  }

  precomision( idFerrum: any, nombre: any, img: any = '' ) {
    this.router.navigate(['/precom-vista/', idFerrum, nombre, img]);
  }

}
