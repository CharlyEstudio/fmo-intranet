import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER, PARAM_KEY, KEY } from '../../config/config';
import { ServidorService } from '../db/servidor.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AsesoresService {

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  url: string;
  token: string = '';

  constructor(
    private http: HttpClient,
    private _servidor: ServidorService,
    private _usuarioS: UsuarioService
  ) {
    this.token = this._usuarioS.token;
  }

  asesor( id: any ) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/usuario/especifico/' + id;

    this.url += '?token=' + this.token;

    return this.http.get( this.url );
  }

  zonaAsesor( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/asesores/zona/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  porBajar( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/porbajar/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  porSurtir( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/porsurtir/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  facturado( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/facturado/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  cancelados( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/cancelados/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  pedidosTotales( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/total/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  diaVisita( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/clientes/pordia/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  ventaMensual( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/ventaactual/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  carteraTotal( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  carteraVencida( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/vencida/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  carteraSanaDia( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/sana/dia/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  carteraVencDia( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/vencida/dia/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  cobroDia( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cobro/dia/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  pedidosDiaDiferente( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/dia/diferente/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  pedidosDia( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/dia/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  ventaMesAnterior( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/ventaanterior/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  morosidad130( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/morosidad/segmento/130/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  morosidad3145( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/morosidad/segmento/3145/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  morosidad4660( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/morosidad/segmento/4660/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  morosidad6190( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/morosidad/segmento/6190/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  morosidad91120( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/morosidad/segmento/6190/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  morosidad121( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cartera/morosidad/segmento/121/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  cobranza( id: number = 10000 ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cobro/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  cobranzaTPV( id: number = 10000 ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/cobranza/cobro/asesor/tpv/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  pdfTPV( data: any ) {
    // this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/visitas.php?opcion=50';

    // return this.http.post( this.url, { datos: data }, {
    //   headers: { 'content-Type': 'application/x-www-form-urlencoded' }
    // } );
  }

  relacionPedidos( id: any ) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/all/asesor/${id}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  partidas(folio: any, perid: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/partidas/asesor/folio/${folio}/${perid}/${this._servidor.db}`;

    return this.http.get( this.url, { headers: this.headers } );
  }

  // cobroMes( id: any, tipo: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=1&perid=' + id + '&tipo=' + tipo;

  //   return this.http.get( this.url );
  // }

  // porVencer( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=2&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // vencidoComision1a8( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=3&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // vencidoComision9a16( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=4&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // vencidoComision17( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=5&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // totalClientesAsesor( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=6&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // coberturaVentas( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=7&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // reglonaje( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=8&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // ventaBruta( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=13&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // devoluciones( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=9&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // notasCredito( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=10&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // bonificacion( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=11&perid=' + id;

  //   return this.http.get( this.url );
  // }

  // penalizacionPedidos( id: any ) {
  //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/comisiones.php?opcion=12&perid=' + id;

  //   return this.http.get( this.url );
  // }

}
