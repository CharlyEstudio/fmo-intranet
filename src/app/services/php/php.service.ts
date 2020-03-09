import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_SERVER, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';

@Injectable()
export class PhpService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  url: string;

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService
  ) { }

  // Si se cambia a PHP las consultas se debe de cambiar el URL de LOCAL a PETICIO =>>> OJO

  porBajar(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/porbajar/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((bajar: any) => {
      if (bajar.resp !== false) {
        return bajar.resp;
      } else {
        return 0;
      }
    });
  }

  porBajarZona( zona: any, fecha: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/porbajar/zona/${zona}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((bajarZona: any) => {
      if (bajarZona.resp !== false) {
        return bajarZona.resp;
      } else {
        return 0;
      }
    });
  }

  porBajarEspecial(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/bajar/especial/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((bajarEspecial: any) => {
      if (bajarEspecial.resp !== false) {
        return bajarEspecial.resp;
      } else {
        return 0;
      }
    });
  }

  porSurtir(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/porsurtir/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((surtir: any) => {
      if (surtir.resp !== false) {
        return surtir.resp;
      } else {
        return 0;
      }
    });
  }

  porSurtirZona( zona: any, fecha: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/porsurtir/zona/${zona}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((surtir: any) => {
      if (surtir.resp !== false) {
        return surtir.resp;
      } else {
        return 0;
      }
    });
  }

  porSurtirEspecial(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/surtir/especial/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((bajarEspecial: any) => {
      if (bajarEspecial.resp !== false) {
        return bajarEspecial.resp;
      } else {
        return 0;
      }
    });
  }

  facturados(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturado/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((facturado: any) => {
      if (facturado.resp !== false) {
        return facturado.resp;
      } else {
        return 0;
      }
    });
  }

  facturadoZona( zona: any, fecha: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturado/zona/${zona}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((facZona: any) => {
      if (facZona.resp !== false) {
        return facZona.resp;
      } else {
        return 0;
      }
    });
  }

  facturadoEspecial(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/fac/especial/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((facEsp: any) => {
      if (facEsp.resp !== false) {
        return facEsp.resp;
      } else {
        return 0;
      }
    });
  }

  cancelados(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/cancelados/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((cancelados: any) => {
      if (cancelados.resp !== false) {
        return cancelados.resp;
      } else {
        return 0;
      }
    });
  }

  canceladoZona( zona: any, fecha: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/cancelados/zona/${zona}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((canZon: any) => {
      if (canZon.resp !== false) {
        return canZon.resp;
      } else {
        return 0;
      }
    });
  }

  canceladoEspecial(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/cance/especial/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((canEsp: any) => {
      if (canEsp.resp !== false) {
        return canEsp.resp;
      } else {
        return 0;
      }
    });
  }

  totalPedidos(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/total/${fecha}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((totPed: any) => {
      if (totPed.resp !== false) {
        return totPed.resp;
      } else {
        return 0;
      }
    });
  }

  nivelServicio() {
    this.url = `${URL_SERVICIO_GENERAL}/services/nivelservicio/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  nsFamilia() {
    this.url = `${URL_SERVICIO_GENERAL}/services/nivelservicio/bo/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  ventaActual(inicio: any, final: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/ventaactual/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((totPed: any) => {
      if (totPed.resp !== false) {
        return totPed.resp;
      } else {
        return 0;
      }
    });
  }

  ventaAnterior() {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/ventaanterior/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  zona(inicio: any, final: any, zona: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/ventaactual/zona/${zona}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((zonas: any) => {
      if (zonas.resp !== false) {
        return zonas.resp;
      } else {
        return 0;
      }
    });
  }

  especial(inicio: any, final: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/ventaactual/especiales/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((especiales: any) => {
      if (especiales.resp !== false) {
        return especiales.resp;
      } else {
        return 0;
      }
    });
  }

  financiado() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((financiado: any) => {
      if (financiado.resp !== false) {
        return financiado.resp;
      } else {
        return 0;
      }
    });
  }

  saldo(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/sana/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((saldo: any) => {
      if (saldo.resp !== false) {
        return saldo.resp;
      } else {
        return 0;
      }
    });
  }

  vencido(fecha: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/vencido/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((vencido: any) => {
      if (vencido.resp !== false) {
        return vencido.resp;
      } else {
        return 0;
      }
    });
  }

  // mor18(fecha: any) {
  //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=4&servidor=' + this._servidor.db;
  //   this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/morosidad/18/${this._servidor.db}`;

  //   return this.http.get( this.url, { headers: this.headers } );
  // }

  mor(fecha: any, dias: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/morosidad/${fecha}/${dias}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((vencido: any) => {
      if (vencido.resp !== false) {
        return vencido.resp;
      } else {
        return 0;
      }
    });
  }

  listaMorosidad( id: any, inicio: any, fin: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/lista/morosos/${id}/${inicio}/${fin}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  diferencias() {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/diferencias/saldo/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((diferencias: any) => {
      if (diferencias.resp !== null) {
        return diferencias.resp;
      } else {
        return 0;
      }
    });
  }

  nuevosNC() {
    this.url = `${URL_SERVICIO_GENERAL}/services/notascredito/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } ).map((ncs: any) => {
      if (ncs.resp.length > 0) {
        return ncs.resp;
      } else {
        return 0;
      }
    });
  }

}
