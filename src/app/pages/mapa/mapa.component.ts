import { Component, OnInit, OnDestroy } from '@angular/core';

// observable
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

// Servicios
import { GpsService } from '../../services/services.index';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: []
})
export class MapaComponent implements OnInit, OnDestroy {
  title: string;
  lat: number = 20.557496;
  lng: number = -100.417794;

  usuarios: any[] = [];

  observar: Subscription;
  intervalo: any;

  constructor(
    private _gps: GpsService
  ) {
    // Subscripción
    this.observar = this.regresa().subscribe(
      coords => {
        let users: any[] = [];
        for (let i = 0; i < coords.usuarios.length; i++) {
          if (coords.usuarios[i].lat > 0 || coords.usuarios[i].lng > 0) {
            this.title = 'Observando Usuarios';
            users.push(coords.usuarios[i]);
          }
        }
        this.usuarios = users;
      },
      err => console.error(err),
      () => console.log('Termina el observador')
    );
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

  ngOnInit() {
    this.realTime();
  }

  realTime() {
    this._gps.obtenerUbicaciones().subscribe((coords: any) => {
      for (let i = 0; i < coords.usuarios.length; i++) {
        if (coords.usuarios[i].lat > 0 || coords.usuarios[i].lng > 0) {
          this.title = 'Observando Usuarios';
          this.usuarios.push(coords.usuarios[i]);
        }
      }
    });
  }

  ngOnDestroy() {
    this.observar.unsubscribe();
    clearInterval(this.intervalo);
  }

  clicMarker(idFerrum: any, email: any, id: any) {
    console.log(idFerrum, email, id);
  }

}
