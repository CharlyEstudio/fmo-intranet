import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

// Servicios
import { GuiasService } from '../../services/services.index';

@Component({
  selector: 'app-ver-mapa',
  templateUrl: './ver-mapa.component.html',
  styles: []
})
export class VerMapaComponent implements OnInit, OnDestroy {

  // GPS MAGNITRACKING
  gps: Subscription;
  intGPS: any;
  ubicacionesGPS: any[] = [];

  guia: any;
  selecciona: any[] = [];
  selec: any = '0';
  coordenadas: any[] = [];
  clientes: any[] = [];
  coordenadasCopy: any[] = [];
  lat: number = 0;
  lng: number = 0;
  alternativa: boolean = true;

  choferes: any = [];

  origin: any = {
    lat: 0,
    lng: 0
  };

  destiny: any = {
    lat: 0,
    lng: 0
  };

  // Window
  numero: number = 0;
  nombre: string = '';
  domicilio: string = '';
  poblacion: string = '';
  realizo: string = '';
  vendedor: string = '';
  imagen: string = '';
  factura: number = 0;

  // Ver o no Mapa
  verRuta: boolean = true;
  verDestino: boolean = false;

  constructor(
    private get: ActivatedRoute,
    private _guiaService: GuiasService
  ) {
    this.guia = JSON.parse(this.get.snapshot.paramMap.get("guia"));
    this.mostrarRuta();
    // Subscrión a Pedidos por Bajar
    this.gps =  this.regresaBajar().subscribe(
      numero => {
        this.ubicacionesGPS = numero;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  regresaBajar(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {
      this.intGPS = setInterval(() => {
        // this._guiaService.gpsMagnitracking('359857081441099').subscribe((location: any) => {
        //   this._guiaService.gpsMagUserId('359857081441099').subscribe((userUnidad: any) => {
        //     let data = [];
        //     for (const key in location) {
        //       const loc = {
        //         nombre: userUnidad[0].name,
        //         placas: userUnidad[0].plate_number,
        //         ip: userUnidad[0].ip,
        //         label: userUnidad[0].name,
        //         lat: Number(location[key].lat),
        //         lng: Number(location[key].lng),
        //         speed: location[key].speed
        //       }
        //       data.push(loc);
        //     }
        //     observer.next(data);
        //   });
        // });
      }, 5000);
    })
    .map(data => {
      return data;
    });

  }

  ngOnInit() {
    // this._guiaService.gpsMagnitracking('359857081441099').subscribe((location: any) => {
    //   this._guiaService.gpsMagUserId('359857081441099').subscribe((userUnidad: any) => {
    //     let data = [];
    //     for (const key in location) {
    //       const loc = {
    //         nombre: userUnidad[0].name,
    //         placas: userUnidad[0].plate_number,
    //         ip: userUnidad[0].ip,
    //         label: userUnidad[0].name,
    //         lat: Number(location[key].lat),
    //         lng: Number(location[key].lng),
    //         speed: location[key].speed
    //       }
    //       data.push(loc);
    //     }
    //     this.ubicacionesGPS = data;
    //   });
    // });
  }

  clicMarker(origin: any) {
    this.numero  = origin.datos.cliente;
    this.nombre  = origin.datos.nombre;
    this.domicilio = origin.datos.domicilio;
    this.poblacion = origin.datos.poblacion;
    this.realizo = origin.datos.realizo;
    this.vendedor = origin.datos.vendedor;
    this.imagen = origin.datos.imagen;
    this.factura  = origin.factura;
  }

  mostrarRuta() {
    this.verRuta = true;
    this.verDestino = false;
    this.coordenadas = [];
    this.coordenadasCopy = [];
    // this._guiaService.buscarPartidasFolio(this.guia.folio).subscribe((facturas: any) => {
    //   if (facturas.ok) {
    //     const cont = facturas.facturas.length;
    //     this._guiaService.coordenadasCliente(facturas.facturas[0].cliente).subscribe((coords: any) => {
    //         this.lat = coords.coords.lat;
    //         this.lng = coords.coords.lng;
    //     });

    //     for (let i = 0; i < cont; i++) {
    //       let esCliente = (cli: any) => {
    //         return cli.cliente === facturas.facturas[i].cliente;
    //       }

    //       if (!this.clientes.find(esCliente)) {
    //         this.clientes.push(facturas.facturas[i]);
    //       }
    //     }

    //     for (let i = 0; i < this.clientes.length; i++) {
    //       this._guiaService.coordenadasCliente(this.clientes[i].cliente).subscribe((coords: any) => {
    //         if (coords.ok) {
    //           let latCor;
    //           let lngCor;

    //           const enviar = {
    //             id: (i + 1),
    //             label: String(this.clientes[i].cliente),
    //             factura: this.clientes[i].factura,
    //             origin: {
    //               lat: coords.coords.lat,
    //               lng: coords.coords.lng
    //             },
    //             datos: {
    //               cliente: this.clientes[i].cliente,
    //               nombre: this.clientes[i].nombre,
    //               domicilio: this.clientes[i].domicilio,
    //               poblacion: this.clientes[i].poblacion,
    //               vendedor: this.clientes[i].vendedor,
    //               realizo: this.clientes[i].usuario.nombre,
    //               imagen: 'cliente.jpg'
    //             }
    //           }
    //           this.coordenadas.push(enviar);
    //           this.coordenadas.sort(function (a, b) {
    //             if (a.id > b.id) {
    //               return 1;
    //             }
    //             if (a.id < b.id) {
    //               return -1;
    //             }
    //             return 0;
    //           });
    //           this.coordenadasCopy.push(enviar);
    //           this.coordenadasCopy.sort(function (a, b) {
    //             if (a.id > b.id) {
    //               return 1;
    //             }
    //             if (a.id < b.id) {
    //               return -1;
    //             }
    //             return 0;
    //           });
    //         }
    //       }, err => console.log(err.error.mensaje));
    //     }
    //   }
    // });
  }

  ngOnDestroy() {
    this.gps.unsubscribe();
    clearInterval(this.intGPS);
  }

  // mostrarRuta() {
  //   this.verRuta = true;
  //   this.verDestino = false;
  //   this.coordenadas = [];
  //   this._guiaService.buscarPartidasFolio(this.guia.folio).subscribe((facturas: any) => {
  //     if (facturas.ok) {
  //       const cont = facturas.facturas.length;
  //       this._guiaService.coordenadasCliente(facturas.facturas[0].cliente).subscribe((coords: any) => {
  //           this.lat = coords.coords.lat;
  //           this.lng = coords.coords.lng;
  //       });

  //       for (let i = 0; i < cont; i++) {
  //         let esCliente = (cli: any) => {
  //           return cli.cliente === facturas.facturas[i].cliente;
  //         }

  //         if (!this.clientes.find(esCliente)) {
  //           this.clientes.push(facturas.facturas[i]);
  //         }
  //       }

  //       for (let i = 0; i < this.clientes.length; i++) {
  //         this._guiaService.coordenadasCliente(this.clientes[i].cliente).subscribe((coords: any) => {
  //           if (coords.ok) {
  //             let latCor;
  //             let lngCor;
  //             let enviar;
  //             let origin;
  //             let destino;
  //             let buscar;

  //             if (i <= (this.clientes.length - 2)) {
  //                 buscar = this.clientes[i + 1].cliente;
  //             } else {
  //               buscar = 'No';
  //             }

  //             if (buscar !== 'No') {
  //               this._guiaService.coordenadasCliente(buscar).subscribe((dest: any) => {
  //                 if (dest.ok) {
  //                   if (i === 0) {
  //                     origin = {
  //                       lat: 20.5575209,
  //                       lng: -100.4200362
  //                     };
  //                     destino = {
  //                       lat: coords.coords.lat,
  //                       lng: coords.coords.lng
  //                     };
  //                   } else {
  //                     origin = {
  //                       lat: coords.coords.lat,
  //                       lng: coords.coords.lng
  //                     };
  //                     destino = {
  //                       lat: dest.coords.lat,
  //                       lng: dest.coords.lng
  //                     };
  //                   }

  //                   enviar = {
  //                     id: i,
  //                     factura: this.clientes[i].factura,
  //                     origin: origin,
  //                     destination: destino,
  //                     datos: {
  //                       cliente: this.clientes[i].cliente,
  //                       nombre: this.clientes[i].nombre,
  //                       domicilio: this.clientes[i].domicilio,
  //                       poblacion: this.clientes[i].poblacion,
  //                       vendedor: this.clientes[i].vendedor,
  //                       realizo: this.clientes[i].usuario.nombre,
  //                       imagen: 'cliente.jpg'
  //                     }
  //                   }
  //                 } else {
  //                   enviar = {
  //                     id: i,
  //                     factura: this.clientes[i].factura,
  //                     origin: {
  //                       lat: 20.5575209,
  //                       lng: -100.4200362
  //                     },
  //                     destination: {
  //                       lat: coords.coords.lat,
  //                       lng: coords.coords.lng
  //                     },
  //                     datos: {
  //                       cliente: this.clientes[i].cliente,
  //                       nombre: this.clientes[i].nombre,
  //                       domicilio: this.clientes[i].domicilio,
  //                       poblacion: this.clientes[i].poblacion,
  //                       vendedor: this.clientes[i].vendedor,
  //                       realizo: this.clientes[i].usuario.nombre,
  //                       imagen: 'cliente.jpg'
  //                     }
  //                   }
  //                 }
  //                 this.coordenadas.push(enviar);
  //                 this.coordenadas.sort(function (a, b) {
  //                   if (a.id > b.id) {
  //                     return 1;
  //                   }
  //                   if (a.id < b.id) {
  //                     return -1;
  //                   }
  //                   return 0;
  //                 });
  //               });
  //               // this.coordenadasCopy.push(enviar);
  //             } else {
  //               enviar = {
  //                 id: i,
  //                 factura: this.clientes[i].factura,
  //                 origin: {
  //                   lat: coords.coords.lat,
  //                   lng: coords.coords.lng
  //                 },
  //                 destination: {
  //                   lat: 20.5575209,
  //                   lng: -100.4200362
  //                 },
  //                 datos: {
  //                   cliente: this.clientes[i].cliente,
  //                   nombre: this.clientes[i].nombre,
  //                   domicilio: this.clientes[i].domicilio,
  //                   poblacion: this.clientes[i].poblacion,
  //                   vendedor: this.clientes[i].vendedor,
  //                   realizo: this.clientes[i].usuario.nombre,
  //                   imagen: 'cliente.jpg'
  //                 }
  //               }
  //             }
  //             if (enviar !== undefined) {
  //               this.coordenadas.push(enviar);
  //               this.coordenadas.sort(function (a, b) {
  //                 if (a.id > b.id) {
  //                   return 1;
  //                 }
  //                 if (a.id < b.id) {
  //                   return -1;
  //                 }
  //                 return 0;
  //               });
  //             }
  //           }
  //         }, err => console.log(err.error.mensaje));
  //       }
  //     }
  //   });
  // }

  obtener(data: any) {
    if (this.selec !== '0') {
      this.coordenadas = [];
      this.verDestino = true;
      // navigator.geolocation.getCurrentPosition((ubicacion: any) => {
      //   this.origin = { lat: ubicacion.coords.latitude, lng: ubicacion.coords.longitude };
      //   this.destiny = this.selec.origin;
      // });
      let esIndex = (dato: any) =>  {
        return dato.id === this.selec.id;
      };
      if (data.find(esIndex)) {
        // console.log(this.selec, data.find(esIndex));
        if ((data.find(esIndex).id - 2) >= 0) {
          const id = data.find(esIndex).id - 2;
          this.origin = {
            lat: data[id].origin.lat,
            lng: data[id].origin.lng
          };
          this.destiny = {
            lat: this.selec.origin.lat,
            lng: this.selec.origin.lng
          };
          console.log('1', this.origin, this.destiny);
        } else {
          this.origin = {
            lat: 20.557603,
            lng: -100.417761
          }
          this.destiny = this.destiny = {
            lat: this.selec.origin.lat,
            lng: this.selec.origin.lng
          };
          console.log('2', this.origin, this.destiny);
        }
      }
    } else {
      this.mostrarRuta();
    }
  }

  setPanel() {
    return document.querySelector('#myPanel');
  }

  // obtener(data: any) {
  //   if (this.selec !== '0') {
  //     this.coordenadas = [];
  //     // console.log(this.selec, data);
  //     let esIndex = (dato: any) =>  {
  //       return dato.id === this.selec.id;
  //     };
  //     if (data.find(esIndex)) {
  //       // console.log(this.selec, data.find(esIndex));
  //       const id = data.find(esIndex).id - 2;
  //       // console.log((data.find(esIndex).id - 1), data[id].origin, this.selec.origin);
  //       this._guiaService.directionsGoogle(data[id].origin, this.selec.origin).subscribe((gogle: any) => {
  //         console.log(gogle);
  //       });
  //     }
  //   } else {
  //     this.mostrarRuta();
  //   }
  // }

}
