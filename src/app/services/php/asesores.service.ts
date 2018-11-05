import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL } from '../../config/config';

@Injectable()
export class AsesoresService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesor( id: any ) {
    // SI LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250:3001/busqueda/especifico/usuario/' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':3001/busqueda/especifico/usuario/' + id;
    }

    return this.http.get( this.url );
  }

  zonaAsesor( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=0&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=0&perid=' + id;
    }

    return this.http.get( this.url );
  }

  porBajar( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL === 'http://192.168.1.250' || URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=1&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=1&perid=' + id;
    }

    return this.http.get( this.url );
  }

  porSurtir( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=2&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=2&perid=' + id;
    }

    return this.http.get( this.url );
  }

  facturado( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=3&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=3&perid=' + id;
    }

    return this.http.get( this.url );
  }

  cancelados( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=4&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=4&perid=' + id;
    }

    return this.http.get( this.url );
  }

  pedidosTotales( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=5&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=5&perid=' + id;
    }

    return this.http.get( this.url );
  }

  diaVisita( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=6&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=6&perid=' + id;
    }

    return this.http.get( this.url );
  }

  ventaMensual( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=7&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=7&perid=' + id;
    }

    return this.http.get( this.url );
  }

  carteraTotal( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=22&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=22&perid=' + id;
    }

    return this.http.get( this.url );
  }

  carteraVencida( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=8&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=8&perid=' + id;
    }

    return this.http.get( this.url );
  }

  carteraVencidaSana( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=23&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=23&perid=' + id;
    }

    return this.http.get( this.url );
  }

  carteraDia( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=9&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=9&perid=' + id;
    }

    return this.http.get( this.url );
  }

  cobroDia( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=10&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=10&perid=' + id;
    }

    return this.http.get( this.url );
  }

  pedidosDiaDiferente( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=11&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=11&perid=' + id;
    }

    return this.http.get( this.url );
  }

  pedidosDia( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=12&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=12&perid=' + id;
    }

    return this.http.get( this.url );
  }

  ventaMesAnterior( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=13&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=13&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad18( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=14&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=14&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad916( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=15&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=15&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad1730( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=16&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=16&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad3160( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=17&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=17&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad6190( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=18&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=18&perid=' + id;
    }

    return this.http.get( this.url );
  }

  morosidad91( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=19&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=19&perid=' + id;
    }

    return this.http.get( this.url );
  }

  cobranza( id: any = '' ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=20&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=20&perid=' + id;
    }

    return this.http.get( this.url );
  }

  relacionPedidos( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/asesores.php?opcion=21&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/asesores.php?opcion=21&perid=' + id;
    }

    return this.http.get( this.url );
  }

  cobroMes( id: any, tipo: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=1&perid=' + id + '&tipo=' + tipo;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=1&perid=' + id + '&tipo=' + tipo;
    }

    return this.http.get( this.url );
  }

  porVencer( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=2&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=2&perid=' + id;
    }

    return this.http.get( this.url );
  }

  vencidoComision1a8( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=3&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=3&perid=' + id;
    }

    return this.http.get( this.url );
  }

  vencidoComision9a16( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=4&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=4&perid=' + id;
    }

    return this.http.get( this.url );
  }

  vencidoComision17( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=5&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=5&perid=' + id;
    }

    return this.http.get( this.url );
  }

  totalClientesAsesor( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=6&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=6&perid=' + id;
    }

    return this.http.get( this.url );
  }

  coberturaVentas( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=7&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=7&perid=' + id;
    }

    return this.http.get( this.url );
  }

  reglonaje( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=8&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=8&perid=' + id;
    }

    return this.http.get( this.url );
  }

  ventaBruta( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=13&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=13&perid=' + id;
    }

    return this.http.get( this.url );
  }

  devoluciones( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=9&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=9&perid=' + id;
    }

    return this.http.get( this.url );
  }

  notasCredito( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=10&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=10&perid=' + id;
    }

    return this.http.get( this.url );
  }

  bonificacion( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=11&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=11&perid=' + id;
    }

    return this.http.get( this.url );
  }

  penalizacionPedidos( id: any ) {
    // NO LLEVA 3001
    if(URL_SERVICIO_GENERAL == 'http://192.168.1.250' || URL_SERVICIO_GENERAL == 'http://localhost') {
      this.url = 'http://192.168.1.250/api/comisiones.php?opcion=12&perid=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':8080/api/comisiones.php?opcion=12&perid=' + id;
    }

    return this.http.get( this.url );
  }

}
