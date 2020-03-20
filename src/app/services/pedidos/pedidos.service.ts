import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER, PARAM_KEY, KEY } from '../../config/config';

// Modelo
import { Cotizacion } from '../../models/cotizacion.model';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';
import { ServidorService } from '../db/servidor.service';
import { HerramientasService } from '../herramientas/herramientas.service';

@Injectable()
export class PedidosService {

  token: string = '';
  url: string;

  head = new HttpHeaders();
  headers = this.head.append(PARAM_KEY, KEY);

  constructor(
    private http: HttpClient,
    private _usuarioS: UsuarioService,
    private _servidorS: ServidorService,
    private _herramientasS: HerramientasService
  ) {
    this.token = this._usuarioS.token;
  }

  obtenerCotizaciones() {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion';

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerOrdenCompra() {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion/orden';

    this.url += '?token=' + this.token;

    return this.http.get(this.url);
  }

  obtenerProducto(codigo: any, precio: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/producto/codigo/${codigo}/${precio}/${this._servidorS.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  guardarCotizacion(cotizacion: Cotizacion) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion';

    this.url += '?token=' + this.token;

    return this.http.post(this.url, cotizacion);
  }

  guardarPdf(data: any, pdf: any, operacion: any, info: any = '', usuario: string, idUser: number, emailUser: string) {
    if (operacion === '1') {
      // Si es Cotizacion
      this.url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/resumen/cotizacion?token=${this.token}`;

      return this.http.post(this.url, {
        id: idUser,
        emailUser: emailUser,
        usuario: usuario,
        nombre: data.nombre,
        numero: pdf.numero,
        direccion: pdf.direccion,
        saldo: pdf.saldo,
        linea: pdf.linea,
        dias: pdf.dias,
        asesor: pdf.asesor,
        precio: pdf.precio,
        productos: pdf.p,
        subtotal: data.subtotal,
        iva: data.iva,
        total: data.total,
        file: data.pdf,
        folio: data.folio,
        fecha: info.fecha
      });
    } else if (operacion === '2') {
      // Si es Orden de Compra
      this.url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/resumen/orden?token=${this.token}`;

      return this.http.post(this.url, {
        id: idUser,
        emailUser: emailUser,
        usuario: usuario,
        nombre: data.nombre,
        numero: pdf.numero,
        direccion: pdf.direccion,
        saldo: pdf.saldo,
        linea: pdf.linea,
        dias: pdf.dias,
        asesor: pdf.asesor,
        precio: pdf.precio,
        productos: pdf.p,
        subtotal: data.subtotal,
        iva: data.iva,
        total: data.total,
        file: data.pdf,
        folio: data.folio,
        fecha: info.fecha
      });
    }
  }

  enviarEmailOrden(data: any) {
    this.url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/mail/orden?token=${this.token}`;

    return this.http.post(this.url, {
      tipo: data.tipo,
      nombre: data.nombre,
      email: data.email,
      direccion: data.direccion,
      folio: data.f.split('.')[0],
      file: data.f,
      productos: data.productos,
      subtotal: data.subtotal,
      iva: data.iva,
      total: data.total
    });
  }

  email(data: any) {
    // this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=36';

    // return this.http.post(
    //   this.url,
    //   {
    //     nombre: data.nombre,
    //     numero: data.numero,
    //     direccion: data.direccion,
    //     saldo: data.saldo,
    //     linea: data.linea,
    //     dias: data.dias,
    //     asesor: data.asesor,
    //     precio: data.precio,
    //     productos: data.productos,
    //     subtotal: data.subtotal,
    //     iva: data.iva,
    //     total: data.total,
    //     email: data.email,
    //     file: data.f
    //    },
    //   { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    // );
  }

  enviarEmailCotizacion(data: any) {
    this.url = `${URL_SERVICIO_GENERAL}:${PUERTO_INTERNO}/mail/cotizador?token=${this.token}`;

    return this.http.post(this.url, {
      tipo: data.tipo,
      nombre: data.nombre,
      email: data.email,
      direccion: data.direccion,
      folio: data.f.split('.')[0],
      file: data.f,
      productos: data.productos,
      subtotal: data.subtotal,
      iva: data.iva,
      total: data.total
    });
  }

  guardarOrden(orden: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion/orden';

    this.url += '?token=' + this.token;

    return this.http.post(this.url, orden);
  }

  buscarLote(codigo: any) {
    this.url = `${URL_SERVICIO_GENERAL}/services/almacen/producto/codigo/lote/${codigo}/${this._servidorS.db}`;

    return this.http.get(this.url, { headers: this.headers });
  }

  enviarPedido(xml: any) {
    // No porcesa el pedido por que el usuario tiendaweb con el ip 251 no tiene acceso.
    // Ver permisos
    this.url = `${URL_SERVICIO_GENERAL}/services/pedidos/agregar/pedido`;

    return this.http.post(this.url, {data: xml}, { headers: this.headers });
  }

}
