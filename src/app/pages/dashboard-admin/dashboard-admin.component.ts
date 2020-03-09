import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

// Socket Service
import { WebsocketService, HerramientasService, UsuarioService, ScrumService, TiendaService, DiferenciasService, GoogleService, MensajesContactoService } from '../../services/services.index';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styles: []
})
export class DashboardAdminComponent implements OnInit {

  selUsuario: any = '0';
  urlCambio: any = '';
  mensajes: boolean = false;
  usuarios: any[] = [];
  saldosDiferentes: any[] = [];

  // VISTAS & Grafica
  lineChartDataVistas: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Productos'}
  ];
  lineChartLabelsVistas: Array<any> = ['Producto 1', 'Producto 1', 'Producto 1', 'Producto 1', 'Producto 1', 'Producto 1', 'Producto 1', 'Producto 1', 'Producto 1', 'Producto 1'];
  lineChartOptionsVistas: any = {
    responsive: true
  };
  lineChartColorsVistas: Array<any> = [
    { // rojo
      backgroundColor: 'rgba(206, 52, 76,0.2)', // fondo
      borderColor: 'rgba(206, 52, 76,1)', // puntos
      pointBackgroundColor: 'rgba(206, 52, 76,1)',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(206, 52, 76,0.8)' // línea
    }
  ];
  vista: boolean = false;
  stringVistos: any = '';
  productoVisto: any = '';

  lineChartColors: Array<any> = [
    { // rojo
      backgroundColor: 'rgba(206, 52, 76,0.0)', // fondo
      borderColor: 'rgba(206, 52, 76,1)', // puntos
      pointBackgroundColor: 'rgba(206, 52, 76,1)',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(206, 52, 76,0.8)' // línea
    },
    { // azul
      backgroundColor: 'rgba(52, 136, 206,0.0)',
      borderColor: 'rgba(52, 136, 206,1)',
      pointBackgroundColor: 'rgba(52, 136, 206,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(52, 136, 206,1)'
    }
  ];

  // Mapa
  // lat: number = 20.557489;
  // lng: number = -100.417779;
  lat: number = 23.555243;
  lng: number = -102.794181;
  // lat: number = 33.779182;
  // lng: number = 9.780247;
  // zoom: number = 2;
  zoom: number = 5;
  mapTypeControl: boolean = false;
  ubicacionVisita: any[] = [];

  constructor(
    private usuario: UsuarioService,
    private mensajeService: MensajesContactoService,
    private tienda: TiendaService,
    private _ws: WebsocketService,
    private _diferencias: DiferenciasService,
    private _google: GoogleService
  ) {
    this.mensajeService.mensajes.subscribe((mensaje: any) => {
      this.mensajes = mensaje.status;
    });
    if (localStorage.getItem('ubicacionVisita')) {
      this.ubicacionVisita = JSON.parse(localStorage.getItem('ubicacionVisita'));
    }
    this._ws.escuchar('visitas-tienda-send').subscribe((visita: any) => {
      let esVisita = (visitaFind: any) => {
        return visitaFind.lat === visita.lat && visitaFind.lng === visita.lng;
      }

      if (!this.ubicacionVisita.find(esVisita)) {
        // Con est ya puedo guardar la visita y hacer un conteo de visitas.
        const gps = `${visita.lat}, ${visita.lng}`;
        this._google.obtenerDireccion(gps).subscribe((dir: any) => {
          const visit = {
            'lugar': `Col. ${dir.results[0].address_components[2].long_name} Ciudad ${dir.results[0].address_components[3].long_name}, ${dir.results[0].address_components[4].long_name}; ${dir.results[0].address_components[5].long_name}`,
            'lat': visita.lat,
            'lng': visita.lng
          };
          this.ubicacionVisita.push(visit);
          localStorage.removeItem('ubicacionVisita');
          localStorage.setItem('ubicacionVisita', JSON.stringify(this.ubicacionVisita));
        });
      }
    });
    this.usuario.cargarUsuariosAll().subscribe((users: any) => {
      if (users.ok) {
        this.usuarios = users.usuarios;
      }
    });
    this._diferencias.notificacion.subscribe((diferencias: any) => {
      this.saldosDiferentes = diferencias;
    });
    // this.tienda.obtenerMejoresTen().subscribe((mejores: any) => {
    //   if (mejores.status) {
    //     const numeros = mejores.todos;
    //     this.lineChartLabelsVistas = [numeros[0].codigo, numeros[1].codigo, numeros[2].codigo, numeros[3].codigo, numeros[4].codigo, numeros[5].codigo, numeros[6].codigo, numeros[7].codigo, numeros[8].codigo, numeros[9].codigo];
    //     setTimeout(() => {
    //       this.lineChartDataVistas = [
    //         {data: [numeros[0].vistas, numeros[1].vistas, numeros[2].vistas, numeros[3].vistas, numeros[4].vistas, numeros[5].vistas, numeros[6].vistas, numeros[7].vistas, numeros[8].vistas, numeros[9].vistas], label: 'Los Más Vistos'}
    //       ];
    //     }, 500);
    //   } else {
    //     this.stringVistos = mejores.mensaje;
    //   }
    // });
    // this._ws.escuchar('producto-visto-send').subscribe((visto: any) => {
    //   this.vista = true;
    //   this.productoVisto = visto.producto.descripcion;
    //   setTimeout(() => {
    //     this.vista = false;
    //   }, 3000);
    //   this.tienda.obtenerMejoresTen().subscribe((mejores: any) => {
    //     if (mejores.status) {
    //       const numeros = mejores.todos;
    //       setTimeout(() => {
    //         this.lineChartLabelsVistas = [];
    //         this.lineChartLabelsVistas = [numeros[0].codigo, numeros[1].codigo, numeros[2].codigo, numeros[3].codigo, numeros[4].codigo, numeros[5].codigo, numeros[6].codigo, numeros[7].codigo, numeros[8].codigo, numeros[9].codigo];
    //       }, 500);
    //       this.lineChartDataVistas = [
    //         {data: [numeros[0].vistas, numeros[1].vistas, numeros[2].vistas, numeros[3].vistas, numeros[4].vistas, numeros[5].vistas, numeros[6].vistas, numeros[7].vistas, numeros[8].vistas, numeros[9].vistas], label: 'Los Más Vistos'}
    //       ];
    //     } else  {
    //       this.stringVistos = mejores.mensaje;
    //     }
    //   });
    // });
  }

  seleccionarUsuario() {
    if (this.selUsuario !== undefined && this.selUsuario !== '0') {
      this.usuario.cambiarPassId(this.selUsuario).subscribe((cambiado: any) => {
        if (cambiado.ok) {
          this.urlCambio = `https://ferremayoristas.com.mx/intranet/#/campass/${cambiado.token}`;
        }
      });
    }
  }

  copiarUrl() {
    const elem = <HTMLElement>(document.getElementById("url" + this.selUsuario._id));
    const range = document.createRange();
    range.selectNode(elem);
    window.getSelection().addRange(range);
    try {
      // intentar copiar el contenido seleccionado
      const resultado = document.execCommand('copy');
      console.log(resultado ? 'Url copiado' : 'No se pudo copiar el Url');
    } catch (err) {
      console.log('ERROR al intentar copiar el Url');
    }
    window.getSelection().removeAllRanges();
  }

  terminarUrl() {
    this.selUsuario = '0';
    this.urlCambio = '';
  }

  ngOnInit() {}

}
