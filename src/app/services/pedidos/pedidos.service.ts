import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO, PUERTO_SERVER } from '../../config/config';

// Modelo
import { Cotizacion } from '../../models/cotizacion.model';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class PedidosService {

  token: string = '';
  url: string;

  constructor(
    private http: HttpClient,
    private _usuarioS: UsuarioService
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
    this.url = URL_SERVICIO_GENERAL + '/api/productos.php?opcion=3&codigo=' + codigo + '&precio=' + precio;

    return this.http.get(this.url);
  }

  guardarCotizacion(cotizacion: Cotizacion) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion';

    this.url += '?token=' + this.token;

    return this.http.post(this.url, cotizacion);
  }

  guardarPdf(data: any, pdf: any, operacion: any, info: any = '', usuario: string, idUser: number, emailUser: string) {
    if (operacion === '1') {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=37';

      const date = new Date(Number(info.fecha));

      let dia;

      if (date.getDate() < 10) {
        dia = '0' + date.getDate();
      } else {
        dia = date.getDate();
      }

      let mes;

      if (date.getMonth() < 10) {
        mes = '0' + (date.getMonth() + 1);
      } else {
        mes = (date.getMonth() + 1);
      }

      let anio = date.getFullYear();

      const d = anio + '-' + mes + '-' + dia;

      return this.http.post(
        this.url,
        {
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
          fecha: d
        },
        { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
      );
    } else if (operacion === '2') {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=39';

      const date = new Date(Number(info.fecha));

      let dia;

      if (date.getDate() < 10) {
        dia = '0' + date.getDate();
      } else {
        dia = date.getDate();
      }

      let mes;

      if (date.getMonth() < 10) {
        mes = '0' + (date.getMonth() + 1);
      } else {
        mes = (date.getMonth() + 1);
      }

      let anio = date.getFullYear();

      const d = anio + '-' + mes + '-' + dia;

      return this.http.post(
        this.url,
        {
          nombre: data.nombre,
          numero: data.numero,
          direccion: data.direccion,
          productos: pdf.productos,
          subtotal: pdf.subtotal,
          iva: pdf.iva,
          total: pdf.total,
          file: data.file,
          folio: data.folio,
          fecha: d
        },
        { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
      );
    }
  }

  enviarEmailOrden(data: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=40';

    return this.http.post(
      this.url,
      {
        nombre: data.nombre,
        email: data.email,
        file: data.file
       },
      { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  email(data: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=36';

    return this.http.post(
      this.url,
      {
        nombre: data.nombre,
        numero: data.numero,
        direccion: data.direccion,
        saldo: data.saldo,
        linea: data.linea,
        dias: data.dias,
        asesor: data.asesor,
        precio: data.precio,
        productos: data.productos,
        subtotal: data.subtotal,
        iva: data.iva,
        total: data.total,
        email: data.email,
        file: data.f
       },
      { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  enviarEmail(data: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=38';

    return this.http.post(
      this.url,
      {
        nombre: data.nombre,
        email: data.email,
        file: data.f
       },
      { headers: { 'content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  guardarOrden(orden: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion/orden';

    this.url += '?token=' + this.token;

    return this.http.post(this.url, orden);
  }

  buscarLote(codigo: any) {
    this.url = URL_SERVICIO_GENERAL + '/api/productos.php?opcion=2&codigo=' + codigo;

    return this.http.get(this.url);
  }

  enviarPedido(xml: any) {
    this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/ferrum/subir/pedido/7854956231457643';

    return this.http.post(this.url, xml);
  }

}
