import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioService, WebsocketService, ActividadesService } from '../../services/services.index';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styles: []
})
export class ActividadesComponent implements OnInit {

  act1: any[] = [];
  idferrum: any;
  msg: string = '';
  terminados: number = 0;

  linecolorActividades: Array<any> = [
    {
      backgroundColor :  'rgba(206, 52, 76, 0.2)',
      borderColor: 'rgba(206, 52, 76, 1)',
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(206, 52, 76, 0.8)'
    }
  ];

  linelabelActividades: Array<any> = [];

  linedataActividades: Array<any> = [
    {
      data: [],
      label: 'Actividades'
    }
  ];

  lineoptionsActividades: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 2,
            stepSize: 1
          }
        }
      ]
    }
  }

  constructor(
    public _usuarioService: UsuarioService,
    public _actividades: ActividadesService,
    private _ws: WebsocketService
  ) {
    this.idferrum = this._usuarioService.usuario.idFerrum;
    // this._ws.escuchar('actividades-diarias-send').subscribe((actividad: any) => {
    //   this.check();
    // });
    // this._ws.escuchar('actividades-realizada').subscribe((actividad: any) => {
    //   this.check();
    // });
    // this.check();
  }

  ngOnInit() {
  }

  // check() {
  //   this.act1 = [];
  //   this.msg = '';
  //   this.terminados = 0;
  //   this._actividades.actividades(this.idferrum).subscribe((datos_act: any) => {
  //     if (datos_act.length > 0) {
  //       this.act1 = datos_act;
  //       for (let i = 0; i < this.act1.length; i++) {
  //         this.linedataActividades[0].data[i] = this.act1[i].terminado === 'SI' ? 1 : 0;
  //         this.terminados += this.act1[i].terminado === 'SI' ? 1 : 0;
  //         this.linelabelActividades[i] = this.act1[i].id_actividad;
  //       }
  //     } else {
  //       this.msg = 'No hay actividades asignadas en este día.';
  //     }
  //   });
  // }

  // guardar(d1: any, comentario: any) {
  //   this._actividades.guarda(d1.idactividades_check, comentario).subscribe((save: any) => {
  //     if (save.length === 0) {
  //       d1.terminado = 'SI';
  //       d1.comentario = comentario;
  //       this._ws.acciones('actividad-realizada', d1);
  //       this._actividades.guardahistorial(d1.id_actividad, comentario, d1.id_usuario).subscribe((saveAs: any) => {});
  //     }
  //   });
  // }

}
