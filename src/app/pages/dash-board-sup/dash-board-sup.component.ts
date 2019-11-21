import { Component, OnInit } from '@angular/core';
import { UsuarioService, AsesoresService, SupervisoresService, VisitasClientesService, HerramientasService } from '../../services/services.index';
import { Router } from '@angular/router';

// Estilos de Mapas
import { AUBERGINE_STYLE, GREY_STYLE, SILVER_STYLE, STANDAR_STYLE, DARK_STYLE, NIGHT_STYLE, RETRO_STYLE } from '../../config/mapas_style';

@Component({
  selector: 'app-dash-board-sup',
  templateUrl: './dash-board-sup.component.html',
  styles: []
})
export class DashBoardSupComponent implements OnInit {

  datos: any[] = [];
  rol: any;
  sinruta: any = '';

  asesores: any[] = [];

  // Ver Información del Asesor con la ruta del día
  img: any;
  asesor: any;
  ultimaPosicion: any;
  ruta: any[] = [];
  comentario: string = 'Comentario';
  cliente: string = 'Número de Cliente';

  // Información en el Mapa
  labelCli: string = '';
  mostrarRuta1: number = 1;
  mostrarRuta2: number = 1;
  mostrarPolyline1: boolean = true;
  mostrarPolyline2: boolean = true;
  mostrarClientes: number = 1;
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
      color: '#06d79c'
    }
  ];
  styles = SILVER_STYLE;

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private _herramientas: HerramientasService,
    private _supervisoresServices: SupervisoresService,
    private _visitasService: VisitasClientesService
  ) { }

  ngOnInit() {

    this.datos = JSON.parse(localStorage.getItem('usuario'));

    this.rol = this.datos["rol"];

    this.inicio();
  }

  inicio() {
    this.asesores = [];
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
                  horaUbicacion: resp[i].horaUbicacion,
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

  reporte( idFerrum: any, nombre: any, img: any = '' ) {
    this._usuarioService.buscarUsuarioEsp(idFerrum).subscribe((user: any) => {
      if (user.ok) {
        this.lat = user.usuario.lat;
        this.lng = user.usuario.lng;
        this.ultimaPosicion = user.usuario.horaUbicacion;
      } else {
        this.lat = 0;
        this.lng = 0;
        this.ultimaPosicion = null;
      }
    });
    this.sinruta = '';
    this.comentario = 'Comentario';
    this.cliente = 'Número de Cliente';
    this._supervisoresServices.getComentarios(idFerrum).subscribe((datos: any) => {
      if (datos.length > 0) {
        this.img = img;
        this.asesor = nombre;
        this.ruta = datos;
        this.ubicacionVisita = [];
        this.ubicacionVisitaOrigen = [];
        this.sigueCLi[0].path = [];
        this.visitasRep[0].path = [];
        this._visitasService.resumenVisitaAsesorFecha(idFerrum, this._herramientas.fechaActual()).subscribe((visitas: any) => {
          if (visitas.status) {
            for (const dat of datos ) {
              const esCli = (cli: any) => {
                return cli.cliente === dat.clienteid;
              };

              if (visitas.visitados.find(esCli)) {
                visitas.visitados.find(esCli).numero = Number(dat.numero);
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
                visitas.visitados.find(esCli).venta = dat.vendio;
                visitas.visitados.find(esCli).cobro = dat.cobro;
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
      } else {
        this.img = img;
        this.asesor = nombre;
        this.ruta = datos;
        this.ubicacionVisita = [];
        this.ubicacionVisitaOrigen = [];
        this.sigueCLi[0].path = [];
        this.visitasRep[0].path = [];
        this.sinruta = 'Sin Ruta';
      }
    });
  }

  markerIconIcons(index: number, cli: any) {
    let imagen;
    if (index === 0) {
      if ((cli.venta !== '' || cli.cobro !== '') && cli.visita && cli.hora !== '') {
        imagen = 'assets/images/asesores/4-inicio.png';
      } else if ((cli.venta !== '' || cli.cobro !== '') && !cli.visita && cli.hora !== '') {
        imagen = 'assets/images/asesores/2-inicio.png';
      } else if ((cli.venta === '' && cli.cobro === '') && cli.visita && cli.hora !== '') {
        imagen = 'assets/images/asesores/3-inicio.png';
      } else if ((cli.venta === '' && cli.cobro === '') && !cli.visita && cli.hora !== '') {
        imagen = 'assets/images/asesores/211-inicio.png';
      } else {
        imagen = 'assets/images/asesores/8-inicio.png';
      }
    } else {
      if ((cli.venta !== '' || cli.cobro !== '') && cli.visita && cli.hora !== '') {
        imagen = 'assets/images/asesores/4.png';
      } else if ((cli.venta !== '' || cli.cobro !== '') && !cli.visita && cli.hora !== '') {
        imagen = 'assets/images/asesores/2.png';
      } else if ((cli.venta === '' && cli.cobro === '') && cli.visita && cli.hora !== '') {
        imagen = 'assets/images/asesores/3.png';
      } else if ((cli.venta === '' && cli.cobro === '') && !cli.visita && cli.hora !== '') {
        imagen = 'assets/images/asesores/211.png';
      } else {
        imagen = 'assets/images/asesores/8.png';
      }
    }
    return imagen;
  }

  markerIcon() {
    const imagen = 'assets/images/asesores/arrow.png';
    return imagen;
  }

  markerIconCli(cli: any) {
    const imagen = 'assets/images/asesores/tienda.png';
    return imagen;
  }

  darLabel(indice: number, ubi: any) {
    const ind = indice + 1;
    return String('#' + ubi.numero + '|' + ind + '-A');
  }

  darLabelCli(indice: number, ubi: any) {
    const ind = indice + 1;
    const name = '#' + ubi.numero + '|' + ind + '-C';
    const label = {color: 'black', fontWeight: 'bold', text: name};
    return label;
  }

  titleCli(numero: number) {
    const num = String('#' + numero);
    return num
  }

  mostrarRuta(opcion: number) {
    switch (opcion) {
      case 1:
        if (this.mostrarRuta1) {
          this.mostrarRuta1 = 0;
          this.mostrarPolyline1 = false;
        } else {
          this.mostrarRuta1 = 1;
          this.mostrarPolyline1 = true;
        }
        break;
      case 2:
        if (this.mostrarRuta2) {
          this.mostrarRuta2 = 0;
          this.mostrarPolyline2 = false;
        } else {
          this.mostrarRuta2 = 1;
          this.mostrarPolyline2 = true;
        }
        break;
      case 3:
        if (this.mostrarClientes) {
          this.mostrarClientes = 0;
        } else {
          this.mostrarClientes = 1;
        }
        break;
      default:
        this.mostrarRuta1 = 1;
        this.mostrarRuta2 = 1;
        this.mostrarClientes = 1;
    }
  }

  entraMouse(event: any) {
    this.comentario = 'Comentario';
    this.cliente = 'Número de Cliente';
    if (event.comentario !== '') {
      this.comentario = event.comentario;
    } else {
      this.comentario = 'Sin Comentarios';
    }
    this.cliente = event.numero;
  }

}
