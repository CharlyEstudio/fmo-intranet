import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { UsuarioService, ActividadesService, WebsocketService } from '../../services/services.index';

// Alertas
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-asignacion-actividades',
  templateUrl: './asignacion-actividades.component.html',
  styles: []
})
export class AsignacionActividadesComponent implements OnInit {

  // @ViewChild('selectDiaAsignar') selectDiaAsignar: ElementRef;

  info: any[] = [];
  selectActividades: any[] = [];
  selectUsuario: any[] = [];
  tabla: any[] = [];
  idferrum: any;
  idUsuario: number = 0;
  labels: any[] = ['SI', 'NO'];
  msg: string = '';
  nombreUsuario: string = '';
  asignado: boolean = false;

  activity: any = '0';
  selectDiaAsignar: any = '0';
  icono: string = '';

  constructor(
    public _usuarioService: UsuarioService,
    public _actividades: ActividadesService,
    private _ws: WebsocketService
  ) {
    this.idferrum = this._usuarioService.usuario.idFerrum;
    this._ws.escuchar('actividades-diarias').subscribe((actividad: any) => {
      this.asignacion_act();
    });
    this.asignacion_act();
    this.actividades();
    this.obtenerUsuarios();
  }

  ngOnInit() {}

  asignacion_act() {
    this.info = [];
    this.msg = '';
    this._actividades.asignacion().subscribe((asignacion: any) => {
      if (asignacion.length > 0) {
        for (let i = 0; i < asignacion.length; i++) {
          const dato = {
            'Nombre': asignacion[i].Nombre,
            'idFerrum': asignacion[i].idFerrum,
            'datos': {
              'labels': ['Terminado', 'No Terminado'],
              'data':  [asignacion[i].Cantidad_si, asignacion[i].Cantidad_no],
              'type': 'doughnut',
              'leyenda': 'General'
            }
          };

          this.info.push(dato);
        }
      } else {
        this.msg = 'Sin datos que mostrar';
      }
    });

  }

  verIcono(clase: any) {
    this.icono = clase;
  }

  altaNuevoActividad (titulo: any, icono: any) {
    if (titulo === '' || titulo === undefined) {
      swal('Sin Título', 'Ingrese un título para la actividad.', 'error');
      return;
    }
    if (icono === '0') {
      swal('Sin Icono', 'Selecione un ícono para la actividad.', 'error');
      return;
    }
    //
    this._actividades.nuevaActividad(titulo, icono, Number(this.idferrum)).subscribe((save: any) => {
      if (save.length === 0) {
        swal('Alta Correcta', 'La Actividad fue dada de alta de forma correcta.', 'success');
      } else {
        swal('Alta Incorrecta', 'La Actividad no fue dada de alta de forma correcta.', 'error');
      }
    });
  }

  obtenerUsuarios() {
    this._actividades.obtenerUsuariosparaAsignar().subscribe((usuarios: any) => {
      if (usuarios.ok) {
        this.selectUsuario = usuarios.verificadores;
      }
    });
  }

  actividades() {
    this._actividades.obtenerActividades().subscribe((actividad: any) => {
      if (actividad.length > 0) {
        this.selectActividades = actividad;
      }
    });
  }

  buscarActividadAsignada (idUsuario: any) {
    this.idUsuario = Number(idUsuario);
    this._actividades.buscarRepetidos(Number(idUsuario), Number(this.activity.id_actividad), this.selectDiaAsignar).subscribe((resp: any) => {
      if (Number(resp[0].cantidad) > 0) {
        this.asignado = true;
        swal('Actividad ya asignada', 'Esta actividad ya fue asignada a este usuario en el mismo día.', 'warning');
      } else {
        this.asignado = false;
      }
    });
  }

  asignar(id_usuario_asig: any) {
    if (this.activity.imagen === undefined) {
      swal('Sin Actividad Seleccionada', 'Seleccione una actividad antes de asignar.', 'error');
      return;
    }

    if (this.idUsuario === 0) {
      swal('Sin Usuari@ Seleccionad@', 'Seleccione un usuari@ antes de asignar.', 'error');
      return;
    }

    if (this.selectDiaAsignar === '0') {
      swal('Sin Día Seleccionado', 'Seleccione un día antes de asignar.', 'error');
      return;
    }

    const data = {
      id_actividad: this.activity.id_actividad,
      id_usuario: Number(this.idUsuario),
      id_usuario_asig: Number(id_usuario_asig),
      dia_asignacion: this.selectDiaAsignar,
      imagen: this.activity.imagen
    };

    this._actividades.asignarActividad(data).subscribe((resp: any) => {
      if (resp.length === 0) {
        this.selectDiaAsignar = "0";
        this._ws.acciones('actividades-diarias', resp);
        swal('Alta Correcta', 'La Actividad al usuario fue dada de alta de forma correcta.', 'success');
      } else {
        swal('Alta Incorrecta', 'La Actividad al usuario no fue dada de alta de forma correcta.', 'error');
      }
    });
  }

  verModal(usuario: any) {
    this.nombreUsuario = usuario.Nombre;
    this._actividades.actividades(usuario.idFerrum).subscribe((info: any) => {
      if (info.length > 0) {
        this.tabla = info;
      }
    });
  }

  eliminarActividad(id: number) {
    console.log(id);
  }
}
