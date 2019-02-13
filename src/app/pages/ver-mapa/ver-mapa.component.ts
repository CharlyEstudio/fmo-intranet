import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Servicios
import { GuiasService } from '../../services/services.index';

@Component({
  selector: 'app-ver-mapa',
  templateUrl: './ver-mapa.component.html',
  styles: []
})
export class VerMapaComponent implements OnInit {

  coordenadas: any[] = [];
  lat: number = 0;
  lng: number = 0;

  origin: any;
  destination: any;

  // Window
  numero: number = 0;
  nombre: string = '';
  domicilio: string = '';
  poblacion: string = '';
  realizo: string = '';
  vendedor: string = '';
  imagen: string = '';
  factura: number = 0;

  constructor(
    private get: ActivatedRoute,
    private _guiaService: GuiasService
  ) {
    const guia = JSON.parse(this.get.snapshot.paramMap.get("guia"));
    navigator.geolocation.getCurrentPosition(() => {});
    this._guiaService.buscarPartidasFolio(guia.folio).subscribe((facturas: any) => {
      if (facturas.ok) {
        const cont = facturas.facturas.length;
        for (let i = 0; i < cont; i++) {
          this._guiaService.coordenadasCliente(facturas.facturas[i].cliente).subscribe((coords: any) => {
              this.lat = coords.coords[0].lat;
              this.lng = coords.coords[0].lng;
          });
          break;
        }
        for (let i = 0; i < cont; i++) {
          this._guiaService.coordenadasCliente(facturas.facturas[i].cliente).subscribe((coords: any) => {
            if (coords.ok) {
              this.lat = coords.coords[0].lat;
              this.lng = coords.coords[0].lng;
              const enviar = {
                factura: facturas.facturas[i].factura,
                origin: {
                  lat: coords.coords[0].lat,
                  lng: coords.coords[0].lng
                },
                datos: {
                  cliente: facturas.facturas[i].cliente,
                  nombre: facturas.facturas[i].nombre,
                  domicilio: facturas.facturas[i].domicilio,
                  poblacion: facturas.facturas[i].poblacion,
                  vendedor: facturas.facturas[i].vendedor,
                  realizo: facturas.facturas[i].usuario.nombre,
                  imagen: 'cliente.jpg'
                }
              }
              this.coordenadas.push(enviar);
            }
          });
        }
      }
    });
  }

  ngOnInit() {
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

  irUbicacion(info: any) {
    console.log(info);
    navigator.geolocation.getCurrentPosition((ubicacion: any) => {
      this.origin = { lat: ubicacion.coords.latitude, lng: ubicacion.coords.longitude};
      this.destination = info.origin;
      console.log(this.origin, this.destination);
    });
  }

}
