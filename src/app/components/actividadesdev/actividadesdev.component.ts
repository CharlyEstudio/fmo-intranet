import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { HerramientasService, ScrumService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-actividadesdev',
  templateUrl: './actividadesdev.component.html',
  styles: []
})
export class ActividadesdevComponent implements OnInit {

  @ViewChild('desarrollador') desarrollador: ElementRef;
  @ViewChild('diasActividad') diasAct: ElementRef;
  @ViewChild('actividadTitulo') actTitle: ElementRef;
  @ViewChild('pasos') pasos: ElementRef;
  @ViewChild('puntosActividad') puntosAct: ElementRef;

  developers: Usuario;
  user: Usuario;
  sprints: any[] = [];
  activities: any[] = [];
  actividadAsignar: any;
  puntosFinales: number = 0;
  dias: number = 0;
  developer: any;
  pasofinal: number;

  // Gráfica SCRUM/Sprint
  lineChartData: Array<any> = [
    {data: [250, 250, 250, 250, 250, 250, 250], label: 'ACTUAL'},
    {data: [250, 200, 150, 100, 50, 0, 0], label: 'OBJETIVO'}
  ];

  lineChartLabels: Array<any> = ['Plan', '1', '2', '3', '4', '5', 'Final'];
  lineChartOptions: any = {
    responsive: true,
    /*scales: {
      yAxes: [
        {
          ticks: {
              // min: 0,
              // max: 55,
              stepSize: 5
          }
        }
      ]
    }*/
  };

  tipoVista: boolean = false;
  nuevo: boolean = false;

  constructor(
    private herramientas: HerramientasService,
    private scrum: ScrumService,
    private usuario: UsuarioService,
  ) {
    this.user = this.usuario.usuario;
  }

  ngOnInit() {
    if (localStorage.getItem('actividades') !== null) {
      this.activities = JSON.parse(localStorage.getItem('actividades'));
      this.dias = Number(localStorage.getItem('diasAct'));
      this.developer = localStorage.getItem('desarrollador');
      this.tipoVista = false;
      this.nuevo = true;
    }
    this.obtenerAdmins();
    this.obtenerSprints();
  }

  recibir(data: any) {
    this.scrum.actualizarSprint(data).subscribe((resp: any) => {
      // console.log(resp);
    });

  }

  obtenerAdmins() {
    this.scrum.obtenerDesarrolladores().subscribe((devs: any) => {
      if (devs.ok) {
        this.developers = devs.devs;
      }
    });
  }

  obtenerSprints() {
    this.sprints = [];
    this.scrum.obtenerSprints().subscribe((sprints: any) => {
      if (sprints.ok) {
        this.sprints = sprints.sprints;
      }
    });
  }

  cambiarVista(tipo: any) {
    if (tipo === '0') {
      this.tipoVista = false;
    } else if (tipo === '1') {
      this.tipoVista = true;
    }
  }

  activarNuevo(activo: boolean) {
    this.nuevo = activo;
    if (!activo) {
      this.activities = [];
      localStorage.removeItem('actividades');
      localStorage.removeItem('diasAct');
      localStorage.removeItem('desarrollador');
    }
  }

  calcularDias() {
    if (this.diasAct.nativeElement.value === '' || this.diasAct.nativeElement.value === '0') {
      swal('Los días no puede estar vacío o en ceros', 'error');
      return;
    }
    this.dias = Number(this.diasAct.nativeElement.value);
    localStorage.setItem('diasAct', this.diasAct.nativeElement.value);
    this.developer = this.desarrollador.nativeElement.value;
    localStorage.setItem('desarrollador', this.desarrollador.nativeElement.value);
    this.puntosFinales = (Number(this.diasAct.nativeElement.value) * 100) / 2;
  }

  agregarActividad() {
    if (this.actTitle.nativeElement.value === '') {
      swal('Falta Titulo de Actividad', 'warning');
      return;
    }
    if (this.pasos.nativeElement.value < 0) {
      swal('Falta agregar pasos de actividad', 'warning');
      return;
    }
    if (this.puntosAct.nativeElement.value === '') {
      swal('Falta los Puntos de la Actividad', 'warning');
      return;
    }

    if (this.puntosFinales !== 0) {
      if (this.puntosFinales >= Number(this.puntosAct.nativeElement.value)) {
        this.puntosFinales -= Number(this.puntosAct.nativeElement.value);
      } else {
        swal('Los puntos asignados es mayor a lo disponible, favor de revisar.', 'warning');
        return;
      }
    } else {
      swal('Ya no puede asignar más actividades, los puntos quedaron en 0.', 'error');
      return;
    }
    const activity = {
      actividad: this.actTitle.nativeElement.value,
      puntos: this.puntosAct.nativeElement.value,
      dias: '',
      objetivo: '',
      actual: ''
    }
    this.activities.push(activity);
    localStorage.removeItem('actividades');
    localStorage.setItem('actividades', JSON.stringify(this.activities));
  }

  activarActividad() {
    if (this.activities.length === 0) {
      swal('Intentando activar una Actividad sin actividades, favor de agregar actividades.', 'error');
      return;
    }
    if (this.puntosFinales > 0) {
      swal('Estas intentando activar un sprint con puntos faltantes, favor de dejar en 0 los puntos.', 'error');
      return;
    }
    for (const obj of this.activities) {
      let objetivolArm = [];
      let actualArm = [];
      let diasArray = [];
      let anterior = 0;
      const calculo = ((this.dias * 100) / 2) - (((this.dias * 100) / 2) / this.dias);
      for (let i = 0; i <= this.dias; i++) {
        if (i === 0) {
          anterior = calculo;
          diasArray[i] = `Plan`;
        } else if (i === this.dias) {
          diasArray[i] = `Dia ${i}`;
          anterior = 0;
        } else  {
          diasArray[i] = `Dia ${i}`;
          anterior = anterior - (calculo / this.dias);
        }
        objetivolArm[i] = anterior
        actualArm[i] = 0;
      }
      obj.objetivo = objetivolArm;
      obj.actual = actualArm;
      obj.dias = diasArray;
    }
    this.actividadAsignar = {
      desarrollador: this.developer,
      fecha: this.herramientas.fechaActual(),
      hora: this.herramientas.horaActual(),
      asigno: this.usuario.usuario._id,
      dias: this.dias,
      actividad: this.activities,
      pasos: Number(this.pasos.nativeElement.value),
      paso: 0
    }
    this.scrum.enviarSprint(this.actividadAsignar).subscribe((resp: any) => {
      if (resp.ok) {
        swal('Correcto', 'Sprint agregado correctamente.', 'success');
        this.obtenerSprints();
        this.limipar();
      } else {
        swal('Error', 'No se pudo realizar el sprint, favor de revisar.', 'error');
      }
    });
  }

  borrarSprint(id: any) {
    swal({
      title: 'Eliminará un sprint del registro',
      text: 'Seguro?',
      buttons: {
        confirm: {
          text: 'Ok',
          closeModal: false
        }
      },
      closeOnClickOutside: true,
      closeOnEsc: true,
      icon: 'error'
    })
    .then(() => {
      this.scrum.deleteSprint(id).subscribe((eliminado: any) => {
        if (eliminado.ok) {
          swal('Eliminado', 'El Sprint fue eliminado con éxito.', 'success');
        } else {
          swal('Error al Aliminar', 'El Sprint no fue eliminado.', 'error');
          swal.stopLoading();
          swal.close('true');
        }
        this.obtenerSprints();
      });
    })
    .catch(err => {
      if (err) {
        swal("Error", err, "error");
      } else {
        swal.stopLoading();
        swal.close('true');
      }
    });
  }

  limipar() {
    this.activities = [];
    this.tipoVista = false;
    this.nuevo = false;
    localStorage.removeItem('actividades');
    localStorage.removeItem('diasAct');
    localStorage.removeItem('desarrollador');
  }

  completar(id: any) {
    this.scrum.completarSprint(id).subscribe((resp: any) => {
      if (resp.ok) {
        if (resp.sprint.activo === 'NOT') {
          this.obtenerSprints();
        } else {
          swal('Error de Completado', 'No se completo correctamente.', 'error');
        }
      } else {
        swal('Error de Solicitud', 'Se pudo realizar petición de completado, favor de contactar a Admin.', 'error');
      }
    });
  }

}
