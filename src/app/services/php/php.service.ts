import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL } from '../../config/config';

@Injectable()
export class PhpService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  porBajar() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=1';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=1';
    }

    return this.http.get( this.url );
  }

  porBajarZona( zona: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=12&zona=' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=12&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  porBajarEspecial() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=14';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=14';
    }

    return this.http.get( this.url );
  }

  porSurtir() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=2';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=2';
    }

    return this.http.get( this.url );
  }

  porSurtirZona( zona: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=13&zona=' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=13&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  porSurtirEspecial() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=15';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=15';
    }

    return this.http.get( this.url );
  }

  facturados() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=3';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=3';
    }

    return this.http.get( this.url );
  }

  facturadoZona( zona: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=16&zona=' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=16&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  facturadoEspecial() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=17';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=17';
    }

    return this.http.get( this.url );
  }

  cancelados() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=4';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=4';
    }

    return this.http.get( this.url );
  }

  canceladoZona( zona: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=18&zona=' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=18&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  canceladoEspecial() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=19';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=19';
    }

    return this.http.get( this.url );
  }

  totalPedidos() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=5';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=5';
    }

    return this.http.get( this.url );
  }

  nivelServicio() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=6';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=6';
    }

    return this.http.get( this.url );
  }

  nsTruper() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=7';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=7';
    }

    return this.http.get( this.url );
  }

  nsFMO() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=8';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/pedidos.php?opcion=8';
    }

    return this.http.get( this.url );
  }

  ventaActual() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/ventas.php?opcion=1';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/ventas.php?opcion=1';
    }

    return this.http.get( this.url );
  }

  ventaAnterior() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/ventas.php?opcion=2';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/ventas.php?opcion=2';
    }

    return this.http.get( this.url );
  }

  zona1() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/ventas.php?opcion=3&zona=1';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/ventas.php?opcion=3&zona=1';
    }

    return this.http.get( this.url );
  }

  zona2() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/ventas.php?opcion=3&zona=2';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/ventas.php?opcion=3&zona=2';
    }

    return this.http.get( this.url );
  }

  especial() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/ventas.php?opcion=4';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/ventas.php?opcion=4';
    }

    return this.http.get( this.url );
  }

  financiado() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=1';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=1';
    }

    return this.http.get( this.url );
  }

  saldo() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=2';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=2';
    }

    return this.http.get( this.url );
  }

  vencido() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=3';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=3';
    }

    return this.http.get( this.url );
  }

  mor18() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=4';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=4';
    }

    return this.http.get( this.url );
  }

  mor916() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=5';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=5';
    }

    return this.http.get( this.url );
  }

  mor1730() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=6';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=6';
    }

    return this.http.get( this.url );
  }

  mor3160() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=7';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=7';
    }

    return this.http.get( this.url );
  }

  mor6190() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=8';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=8';
    }

    return this.http.get( this.url );
  }

  mor91() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=9';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=9';
    }

    return this.http.get( this.url );
  }

  listaMorosidad( id: any, inicio: any, fin: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/morosidad.php?opcion=10&perid=' + id + '&inicio=' + inicio + '&fin=' + fin;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/morosidad.php?opcion=10&perid=' + id + '&inicio=' + inicio + '&fin=' + fin;
    }

    return this.http.get( this.url );
  }

  diferencias() {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/ventas.php?opcion=5';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':8080/api/ventas.php?opcion=5';
    }

    return this.http.get( this.url );
  }

}
