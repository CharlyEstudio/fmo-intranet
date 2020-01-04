import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO, URL_PETICION } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class PhpService {

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  // Si se cambia a PHP las consultas se debe de cambiar el URL de LOCAL a PETICIO =>>> OJO

  porBajar(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=1&fecha=' + fecha;

    return this.http.get( this.url ).map((bajar: any) => {
      if (bajar.length > 0) {
        return bajar[0];
      } else {
        return 0;
      }
    });
  }

  porBajarZona( zona: any, fecha: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=12&zona=' + zona;

    return this.http.get( this.url ).map((bajarZona: any) => {
      if (bajarZona.length > 0) {
        return bajarZona[0];
      } else {
        return 0;
      }
    });
  }

  porBajarEspecial(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=14';

    return this.http.get( this.url ).map((bajarEspecial: any) => {
      if (bajarEspecial.length > 0) {
        return bajarEspecial[0];
      } else {
        return 0;
      }
    });
  }

  porSurtir(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=2&fecha=' + fecha;

    return this.http.get( this.url ).map((surtir: any) => {
      if (surtir.length > 0) {
        return surtir[0];
      } else {
        return 0;
      }
    });
  }

  porSurtirZona( zona: any, fecha: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=13&zona=' + zona;

    return this.http.get( this.url ).map((surtir: any) => {
      if (surtir.length > 0) {
        return surtir[0];
      } else {
        return 0;
      }
    });
  }

  porSurtirEspecial(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=15';

    return this.http.get( this.url ).map((bajarEspecial: any) => {
      if (bajarEspecial.length > 0) {
        return bajarEspecial[0];
      } else {
        return 0;
      }
    });
  }

  facturados(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=3&fecha=' + fecha;

    return this.http.get( this.url ).map((facturado: any) => {
      if (facturado.length > 0) {
        return facturado[0];
      } else {
        return 0;
      }
    });
  }

  facturadoZona( zona: any, fecha: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=16&zona=' + zona;

    return this.http.get( this.url ).map((facZona: any) => {
      if (facZona.length > 0) {
        return facZona[0];
      } else {
        return 0;
      }
    });
  }

  facturadoEspecial(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=17';

    return this.http.get( this.url ).map((facEsp: any) => {
      if (facEsp.length > 0) {
        return facEsp[0];
      } else {
        return 0;
      }
    });
  }

  cancelados(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=4&fecha=' + fecha;

    return this.http.get( this.url ).map((cancelados: any) => {
      if (cancelados.length > 0) {
        return cancelados;
      } else {
        return 0;
      }
    });
  }

  canceladoZona( zona: any, fecha: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/cancelados/zona/' + fecha + '/' + zona;

    return this.http.get( this.url ).map((canZon: any) => {
      if (canZon.status) {
        return canZon.respuesta;
      } else {
        return 0;
      }
    });
  }

  canceladoEspecial(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/cancelados/especiales/' + fecha;

    return this.http.get( this.url ).map((canEsp: any) => {
      if (canEsp.status) {
        return canEsp.respuesta;
      } else {
        return 0;
      }
    });
  }

  totalPedidos(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=5&fecha=' + fecha;

    return this.http.get( this.url ).map((totPed: any) => {
      if (totPed.length > 0) {
        return totPed;
      } else {
        return 0;
      }
    });
  }

  nivelServicio() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=47';

    return this.http.get( this.url );
  }

  nsFamilia() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=46';

    return this.http.get( this.url );
  }

  ventaActual(inicio: any, final: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=1';

    return this.http.get( this.url ).map((totPed: any) => {
      if (totPed.length > 0) {
        return totPed[0];
      } else {
        return 0;
      }
    });
  }

  ventaAnterior() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=2';

    return this.http.get( this.url );
  }

  zona(inicio: any, final: any, zona: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=3&zona=' + zona;

    return this.http.get( this.url ).map((zonas: any) => {
      if (zonas.length > 0) {
        return zonas[0];
      } else {
        return 0;
      }
    });
  }

  especial(inicio: any, final: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=4';

    return this.http.get( this.url ).map((especiales: any) => {
      if (especiales.length > 0) {
        return especiales[0];
      } else {
        return 0;
      }
    });
  }

  financiado() {
    this.url = URL_LOCAL + '/api/vencido.php?opcion=1&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((financiado: any) => {
      if (financiado.length > 0) {
        return financiado;
      } else {
        return 0;
      }
    });
  }

  saldo(fecha: any) {
    this.url = URL_LOCAL + '/api/vencido.php?opcion=2&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((saldo: any) => {
      if (saldo.length > 0) {
        return saldo;
      } else {
        return 0;
      }
    });
  }

  vencido(fecha: any) {
    this.url = URL_LOCAL + '/api/vencido.php?opcion=3&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((vencido: any) => {
      if (vencido.length > 0) {
        return vencido;
      } else {
        return 0;
      }
    });
  }

  mor18(fecha: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=4&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  mor(fecha: any, dias: any) {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/morosidad/mor/dias/' + fecha + '/' + dias + '/' + this._servidor.db;

    return this.http.get( this.url ).map((vencido: any) => {
      if (vencido.status) {
        return vencido.respuesta;
      } else {
        return 0;
      }
    });
  }

  listaMorosidad( id: any, inicio: any, fin: any ) {
    this.url = URL_SERVICIO_GENERAL + ':' +
    PUERTO_SERVER + '/api/morosidad.php?opcion=29&perid=' + id + '&inicio=' + inicio + '&fin=' + fin + '&servidor=' + this._servidor.db;

    return this.http.get( this.url );
  }

  diferencias() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=5&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((diferencias: any) => {
      if (diferencias.length > 0) {
        return diferencias;
      } else {
        return 0;
      }
    });
  }

  nuevosNC() {
    this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=6&servidor=' + this._servidor.db;

    return this.http.get( this.url ).map((ncs: any) => {
      if (ncs.length > 0) {
        return ncs;
      } else {
        return 0;
      }
    });
  }

}
