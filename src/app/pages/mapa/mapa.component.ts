import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

// observable
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

// Servicios
import { GpsService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: []
})
export class MapaComponent implements OnInit, OnDestroy {
  /*FORM*/
  tipo: number = 0;
  asesor: number = 0;
  day: number = 0;
  dias: number = 0;
  valor: number = 0;
  ase: number = 0;

  selectAsesores: boolean = false;
  selectDias: boolean = false;
  presentar: boolean = false;

  asesores: any[] = [];
  asesorArray: any[] = [];
  colores: any[] = [];

  especifico: any;

  /*MAPS*/
  title: string;
  lat: number = 20.557496;
  lng: number = -100.417794;

  usuarios: any[] = [];
  porDias: any[] = [];

  // Info.Window
  num: any;
  tel: any;
  email: any;
  nomAse: any;
  emailAse: any;

  /*OTROS VALORES*/
  fecha: any;
  dia: any;

  /*OBSERVABLES*/
  observar: Subscription;
  intervalo: any;

  constructor(
    private _gps: GpsService,
    private _usuariosServices: UsuarioService
  ) {
    if (JSON.parse(localStorage.getItem('todoGps')) !== null) {
      if (JSON.parse(localStorage.getItem('todoGps')).length === 0) {
        this._gps.obtenerClientesTotal().subscribe((todo: any) => {
          this.usuarios = todo.gps;
          localStorage.setItem('todoGps', JSON.stringify(todo.gps));
        });
      } else {
        this.usuarios = JSON.parse(localStorage.getItem('todoGps'));
      }
    } else {
      this._gps.obtenerClientesTotal().subscribe((todo: any) => {
        this.usuarios = todo.gps;
        localStorage.setItem('todoGps', JSON.stringify(todo.gps));
      });
    }

    // console.log(this.usuarios);

  }

  regresa(): Observable<any> {
    return new Observable((observer) => {
      this.intervalo = setInterval(() => {
        this._gps.obtenerUbicaciones().subscribe((coords: any) => {
          observer.next(coords);
        });
      }, 1000);
    });
  }

  ngOnInit() {}

  mostrar(forma: NgForm) {
    let valor = Number(forma.value.tipo);
    this.valor = Number(forma.value.tipo);
    let ase = Number(forma.value.asesor);
    this.ase = Number(forma.value.asesor);
    let dias = Number(forma.value.day);
    this.dias = Number(forma.value.day);

    this.presentar = false;
    this.selectAsesores = false;
    this.selectDias = false;
    this.usuarios = [];
    this.porDias = [];
    this.asesores = [];
    this.asesorArray = [];

    if (valor === 0) {
      if (this.observar !== undefined) {
        this.observar.unsubscribe();
      }
      clearInterval(this.intervalo);
      this.usuarios = JSON.parse(localStorage.getItem('todoGps'));
      this.obtenerColores();
      this.presentar = false;
    }

    if (valor === 1) {
      // Subscripción
      this.observar = this.regresa().subscribe(
        coords => {
          let users: any[] = [];
          this.usuarios = [];
          for (let i = 0; i < coords.usuarios.length; i++) {
            if (coords.usuarios[i].lat > 0 || coords.usuarios[i].lng > 0) {
              let newUsuario = {
                CLIENTEID: coords.usuarios[i].id,
                DIAVIS: '',
                EMAIL: coords.usuarios[i].email,
                IMAGEN: coords.usuarios[i].img,
                LAT: coords.usuarios[i].lat,
                LNG: coords.usuarios[i].lng,
                NUMERO: '',
                PERID: coords.usuarios[i].idFerrum,
                TEL: '',
                ZONA: '',
                _id: coords.usuarios[i].id
              };
              users.push(newUsuario);
            }
          }
          this.usuarios = users;
        },
        err => console.error(err),
        () => console.log('Termina el observador')
      );
    }

    if (valor === 2) {
      if (this.observar !== undefined) {
        this.observar.unsubscribe();
      }
      this.selectAsesores = true;
      clearInterval(this.intervalo);

      this.usuarios = JSON.parse(localStorage.getItem('todoGps'));

      this._usuariosServices.buscarUsuarios('ASE_ROLE').subscribe( (asesores: any) => {
        localStorage.setItem('asesores', JSON.stringify(asesores));
        this.asesores = asesores;
      });

      if (ase > 0) {
        this.usuarios = [];
        let all = JSON.parse(localStorage.getItem('todoGps'));
        let asesores = JSON.parse(localStorage.getItem('asesores'));

        for (let i = 0; i < asesores.length; i++) {
          if (Number(asesores[i].idFerrum) === ase) {
            this.asesorArray.push(asesores[i]);
            break;
          }
        }

        for (let i = 0; i < all.length; i++) {
          if (all[i].PERID === ase) {
            this.usuarios.push(all[i]);
          }
        }
      }
      this.obtenerColores();
    }

    if (valor === 3) {
      if (this.observar !== undefined) {
        this.observar.unsubscribe();
      }
      this.selectDias = true;
      clearInterval(this.intervalo);

      this.porDias = JSON.parse(localStorage.getItem('todoGps'));

      if (dias > 0) {
        let diaFinal;
        switch (dias) {
          case 1:
            diaFinal = 'L';
          break;

          case 2:
            diaFinal = 'M';
          break;

          case 3:
            diaFinal = 'I';
          break;

          case 4:
            diaFinal = 'J';
          break;

          case 5:
            diaFinal = 'V';
          break;

          case 6:
            diaFinal = 'S';
          break;
        }

        this.porDias = [];
        let diasPor = JSON.parse(localStorage.getItem('todoGps'));
        for (let i = 0; i < diasPor.length; i++) {
          if (diasPor[i].DIAVIS === diaFinal) {
            this.porDias.push(diasPor[i]);
          }
        }
      } else {
        this.porDias = JSON.parse(localStorage.getItem('todoGps'));
      }

      this.obtenerColores();

    }
  }

  realTime() {
    this._gps.obtenerUbicaciones().subscribe((coords: any) => {
      for (let i = 0; i < coords.usuarios.length; i++) {
        if (coords.usuarios[i].lat > 0 || coords.usuarios[i].lng > 0) {
          this.usuarios.push(coords.usuarios[i]);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.observar !== undefined) {
      this.observar.unsubscribe();
    }
    clearInterval(this.intervalo);
    localStorage.removeItem('todoGps');
    localStorage.removeItem('asesores');
  }

  clicMarker(datos: any) {
    this._gps.obtenerAsesorEspefico(datos.PERID).subscribe((especifico: any) => {
      this.num = datos.NUMERO;
      this.tel = datos.TEL;
      this.email = datos.EMAIL;
      this.nomAse = especifico.usuarios[0].nombre;
      this.emailAse = especifico.usuarios[0].email;
    });
  }

  obtenerColores() {
    this.presentar = true;
    this.colores = [];

    if (this.valor > 0 && this.ase > 0) {
      let newData = [
        {imagen: 'assets/images/asesores/4.png', nombre: 'Lunes'},
        {imagen: 'assets/images/asesores/6.png', nombre: 'Martes'},
        {imagen: 'assets/images/asesores/2.png', nombre: 'Miércoles'},
        {imagen: 'assets/images/asesores/3.png', nombre: 'Jueves'},
        {imagen: 'assets/images/asesores/211.png', nombre: 'Viernes'},
        {imagen: 'assets/images/asesores/145.png', nombre: 'Sábado'},
      ];
      this.colores = newData;
      return;
    }

    if (this.valor > 0 && this.valor < 3) {

      this._usuariosServices.buscarUsuarios('ASE_ROLE').subscribe( (asesores: any) => {
        for (let i = 0; i < asesores.length; i++) {
          let newData = {
            imagen: 'assets/images/asesores/' + asesores[i].idFerrum + '.png',
            nombre: asesores[i].nombre
          }

          this.colores.push(newData);

        }
      });

      return;

    }

    if (this.valor === 3 && this.dias > 0) {

      this._usuariosServices.buscarUsuarios('ASE_ROLE').subscribe( (asesores: any) => {
        for (let i = 0; i < asesores.length; i++) {
          let newData = {
            imagen: 'assets/images/asesores/' + asesores[i].idFerrum + '.png',
            nombre: asesores[i].nombre
          }

          this.colores.push(newData);

        }
      });

      return;

    }

    if (this.valor > 2) {
      let newData = [
        {imagen: 'assets/images/asesores/4.png', nombre: 'Lunes'},
        {imagen: 'assets/images/asesores/6.png', nombre: 'Martes'},
        {imagen: 'assets/images/asesores/2.png', nombre: 'Miércoles'},
        {imagen: 'assets/images/asesores/3.png', nombre: 'Jueves'},
        {imagen: 'assets/images/asesores/211.png', nombre: 'Viernes'},
        {imagen: 'assets/images/asesores/145.png', nombre: 'Sábado'},
      ];
      this.colores = newData;
      return;
    }
  }

  markerIconDias(dia: any, perid: any) {
    let imagen;
    let opcion;

    if (this.dias > 0) {
      opcion = 2;
    } else {
      opcion = 1;
    }

    if (opcion === 1) {

      switch (dia) {
        case 'L':
          imagen = 'assets/images/asesores/4.png';
        break;

        case 'M':
          imagen = 'assets/images/asesores/6.png';
        break;

        case 'I':
          imagen = 'assets/images/asesores/2.png';
        break;

        case 'J':
          imagen = 'assets/images/asesores/3.png';
        break;

        case 'V':
          imagen = 'assets/images/asesores/211.png';
        break;

        case 'S':
          imagen = 'assets/images/asesores/145.png';
        break;
      }

    } else if (opcion === 2) {

      switch (perid) {
        case 0:
          imagen = 'assets/images/asesores/2.png';
        break;
        case 2:
          imagen = 'assets/images/asesores/2.png';
        break;

        case 3:
          imagen = 'assets/images/asesores/3.png';
        break;

        case 4:
          imagen = 'assets/images/asesores/4.png';
        break;

        case 5:
          imagen = 'assets/images/asesores/5.png';
        break;

        case 6:
          imagen = 'assets/images/asesores/6.png';
        break;

        case 7:
          imagen = 'assets/images/asesores/7.png';
        break;

        case 8:
          imagen = 'assets/images/asesores/8.png';
        break;

        case 9:
          imagen = 'assets/images/asesores/9.png';
        break;

        case 10:
          imagen = 'assets/images/asesores/10.png';
        break;

        case 11:
          imagen = 'assets/images/asesores/11.png';
        break;

        case 12:
          imagen = 'assets/images/asesores/12.png';
        break;

        case 13:
          imagen = 'assets/images/asesores/13.png';
        break;

        case 15:
          imagen = 'assets/images/asesores/15.png';
        break;

        case 19:
          imagen = 'assets/images/asesores/19.png';
        break;

        case 145:
          imagen = 'assets/images/asesores/145.png';
        break;

        case 157:
          imagen = 'assets/images/asesores/157.png';
        break;

        case 211:
          imagen = 'assets/images/asesores/211.png';
        break;

        case 241:
          imagen = 'assets/images/asesores/241.png';
        break;

        case 841:
          imagen = 'assets/images/asesores/841.png';
        break;
      }
    }

    return imagen;
  }

  markerIcon(perid: any, dia: any) {
    let imagen;
    let id;
    let opcion;

    if (this.valor === 0) {
      id = 0;
    } else {
      id = perid;
    }

    if (this.ase > 0) {
      opcion = 2;
    } else {
      opcion = 1;
    }

    if (opcion === 1) {

      switch (id) {
        case 0:
          imagen = 'assets/images/asesores/2.png';
        break;
        case 2:
          imagen = 'assets/images/asesores/2.png';
        break;

        case 3:
          imagen = 'assets/images/asesores/3.png';
        break;

        case 4:
          imagen = 'assets/images/asesores/4.png';
        break;

        case 5:
          imagen = 'assets/images/asesores/5.png';
        break;

        case 6:
          imagen = 'assets/images/asesores/6.png';
        break;

        case 7:
          imagen = 'assets/images/asesores/7.png';
        break;

        case 8:
          imagen = 'assets/images/asesores/8.png';
        break;

        case 9:
          imagen = 'assets/images/asesores/9.png';
        break;

        case 10:
          imagen = 'assets/images/asesores/10.png';
        break;

        case 11:
          imagen = 'assets/images/asesores/11.png';
        break;

        case 12:
          imagen = 'assets/images/asesores/12.png';
        break;

        case 13:
          imagen = 'assets/images/asesores/13.png';
        break;

        case 15:
          imagen = 'assets/images/asesores/15.png';
        break;

        case 19:
          imagen = 'assets/images/asesores/19.png';
        break;

        case 145:
          imagen = 'assets/images/asesores/145.png';
        break;

        case 157:
          imagen = 'assets/images/asesores/157.png';
        break;

        case 211:
          imagen = 'assets/images/asesores/211.png';
        break;

        case 241:
          imagen = 'assets/images/asesores/241.png';
        break;

        case 841:
          imagen = 'assets/images/asesores/841.png';
        break;

        default:
          imagen = 'assets/images/asesores/sup.png';
      }

    } else {

      switch (dia) {
        case 'L':
          imagen = 'assets/images/asesores/4.png';
        break;

        case 'M':
          imagen = 'assets/images/asesores/6.png';
        break;

        case 'I':
          imagen = 'assets/images/asesores/2.png';
        break;

        case 'J':
          imagen = 'assets/images/asesores/3.png';
        break;

        case 'V':
          imagen = 'assets/images/asesores/211.png';
        break;

        case 'S':
          imagen = 'assets/images/asesores/145.png';
        break;
      }

    }

    return imagen;
  }

  markerGeneral() {
    let imagen = 'assets/images/asesores/2.png';
    return imagen;
  }

}
