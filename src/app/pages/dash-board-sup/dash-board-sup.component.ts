import { Component, OnInit } from '@angular/core';
import { UsuarioService, AsesoresService, SupervisoresService, VisitasClientesService } from '../../services/services.index';
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

  // Ver Información del Asesor con la ruta del día
  img: any;
  asesor: any;
  ruta: any[] = [];

  // Información en el Mapa
  lat: number = 0;
  lng: number = 0;
  zoom: number = 11;
  mapTypeControl: boolean = false;
  usePanning: boolean = true;
  ubicacionVisita: any[] = [];
  ubicacionVisitaOrigen: any[] = [];
  visitasRep = [
    {
      path: [],
      color: 'red'
    }
  ];
  sigueCLi = [
    {
      path: [],
      color: '#2196f3'
    }
  ];

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private _asesoresService: AsesoresService,
    private _supervisoresServices: SupervisoresService,
    private _visitasService: VisitasClientesService
  ) { }

  ngOnInit() {

    this.datos = JSON.parse(localStorage.getItem('usuario'));

    this.rol = this.datos["rol"];

    this._usuarioService.buscarUsuarios('ASE_ROLE')
      .subscribe( ( resp: any ) => {
        let h = new Date();

        let dia;

        if (h.getDate() < 10) {
          dia = '0' + h.getDate();
        } else {
          dia = h.getDate();
        }

        let mes;

        if (h.getMonth() < 10) {
          mes = '0' + (h.getMonth() + 1);
        } else {
          mes = (h.getMonth() + 1);
        }

        let anio = h.getFullYear();

        let fecha = anio + '-' + mes + '-' + dia;

        for (let i = 0; i < resp.length; i++) {
          this._supervisoresServices.pedidosGeneral(fecha, resp[i].idFerrum)
            .subscribe( ( data: any ) => {
              this.asesores.push(
                {
                  idFerrum: resp[i].idFerrum,
                  nombre: resp[i].nombre,
                  email: resp[i].email,
                  rol: resp[i].rol,
                  img: resp[i].img,
                  lat: resp[i].lat,
                  lng: resp[i].lng,
                  porBajarCantidad: data[0].cantidad,
                  porBajarImporte: data[0].importe,
                  porSurtirCantidad: data[1].cantidad,
                  porSurtirImporte: data[1].importe,
                  facturadoCantidad: data[2].cantidad,
                  facturadoImporte: data[2].importe,
                  canceladoCantidad: data[3].cantidad,
                  canceladoImporte: data[3].importe
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

  reporte( idFerrum: any, nombre: any, img: any = '', lat: any, lng: any ) {
    this.lat = lat;
    this.lng = lng;
    this._supervisoresServices.getComentarios(idFerrum).subscribe((datos: any) => {
      if (datos.length > 0) {
        this.img = img;
        this.asesor = nombre;
        this.ruta = datos;
        this.ubicacionVisita = [];
        this.sigueCLi[0].path = [];
        this.visitasRep[0].path = [];
        this._visitasService.resumenVisitaAsesorFecha(idFerrum, '2019-11-15').subscribe((visitas: any) => {
          if (visitas.status) {
            for (const dat of datos ) {
              const esCli = (cli: any) => {
                return cli.cliente === dat.clienteid;
              };

              if (visitas.visitados.find(esCli)) {
                // Ver los clientes según visitados
                const dividirDestino = visitas.visitados.find(esCli).destino.split(',');
                visitas.visitados.find(esCli).lat = Number(dividirDestino[0]);
                visitas.visitados.find(esCli).lng = Number(dividirDestino[1]);
                this.visitasRep[0].path.push(visitas.visitados.find(esCli));
                this.ubicacionVisita.push(visitas.visitados.find(esCli));

                // Ver la posición del asesor cuando reporto la visita
                const dividirOrigen = visitas.visitados.find(esCli).origen.split(',');
                visitas.visitados.find(esCli).latOrig = Number(dividirOrigen[0]);
                visitas.visitados.find(esCli).lngOrig = Number(dividirOrigen[1]);
                this.sigueCLi[0].path.push(visitas.visitados.find(esCli));
                this.ubicacionVisitaOrigen.push(visitas.visitados.find(esCli));

                // Reporte Normal
                dat.visitado = visitas.visitados.find(esCli).visita;
                dat.origen = visitas.visitados.find(esCli).origen;
                dat.destino = visitas.visitados.find(esCli).destino;
                dat.distancia = visitas.visitados.find(esCli).distancia;
                dat.medida = visitas.visitados.find(esCli).tipo;
                dat.horaReporte = visitas.visitados.find(esCli).hora;
                dat.horaReporte2 = visitas.visitados.find(esCli).hora;
              } else {
                dat.visitado = false;
                dat.origen = '';
                dat.destino = '';
                dat.distancia = '';
                dat.medida = '';
                dat.horaReporte = '';
                dat.horaReporte2 = '20:00:00';
              }
              this.visitasRep[0].path.sort((a, b) => {
                if (a.horaReporte2 > b.horaReporte2) {
                  return 1;
                }

                if (a.horaReporte2 < b.horaReporte2) {
                  return -1;
                }

                return 0;
              });
              this.ubicacionVisita.sort((a, b) => {
                if (a.horaReporte2 > b.horaReporte2) {
                  return 1;
                }

                if (a.horaReporte2 < b.horaReporte2) {
                  return -1;
                }

                return 0;
              });
              this.ruta.sort((a, b) => {
                if (a.horaReporte2 > b.horaReporte2) {
                  return 1;
                }

                if (a.horaReporte2 < b.horaReporte2) {
                  return -1;
                }

                return 0;
              });
            }
          }
        });
      }
    });
  }

  markerIcon() {
    const imagen = 'assets/images/asesores/sup.png';
    return imagen;
  }

  markerIconCli(cli: any) {
    let imagen;
    if (cli.visitado) {
      imagen = 'assets/images/asesores/asesor.png';
    } else {
      imagen = 'assets/images/asesores/customer.png';
    }
    return imagen;
  }

  darLabel(indice: number) {
    const ind = indice + 1;
    return String(ind + '-A');
  }

  darLabelCli(indice: number) {
    const ind = indice + 1;
    return String(ind + '-C');
  }

}
