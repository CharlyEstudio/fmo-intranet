import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config
import { URL_SERVICIO_GENERAL, URL_LOCAL, PUERTO_INTERNO, URL_PRUEBAS, PUERTO_SERVER, URL_PETICION, URL_EXTERNO } from '../../config/config';

// Modelo
import { Cotizacion } from '../../models/cotizacion.model';

@Injectable()
export class PedidosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  obtenerCotizaciones() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/cotizacion';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/cotizacion';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion';
    }

    return this.http.get(this.url);
  }

  obtenerOrdenCompra() {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/cotizacion/orden';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/cotizacion/orden';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion/orden';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/cotizacion/orden';

    return this.http.get(this.url);
  }

  obtenerProducto(codigo: any, precio: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/productos/buscar/codigo/' + codigo + '/' + precio;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/productos/buscar/codigo/' + codigo + '/' + precio;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/productos/buscar/codigo/' + codigo + '/' + precio;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/productos/buscar/codigo/' + codigo + '/' + precio;

    return this.http.get(this.url);
  }

  guardarCotizacion(cotizacion: Cotizacion) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/cotizacion';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/cotizacion';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/cotizacion';

    return this.http.post(this.url, cotizacion);
  }

  guardarPdf(data: any, pdf: any, operacion: any, info: any = '') {
    if (operacion === '1') {
      if (URL_SERVICIO_GENERAL === URL_PETICION) {
        /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=37';
      } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
        this.url = URL_PETICION + '/api/pedidos.php?opcion=37';
      } else {
        this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=37';
      }

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
      if (URL_SERVICIO_GENERAL === URL_PETICION) {
        /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=39';
      } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
        this.url = URL_PETICION + '/api/pedidos.php?opcion=39';
      } else {
        this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=39';
      }

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
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=40';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/pedidos.php?opcion=40';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=40';
    }

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
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=36';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/pedidos.php?opcion=36';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=36';
    }

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
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=38';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/pedidos.php?opcion=38';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=38';
    }

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
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/cotizacion/orden';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/cotizacion/orden';
    } else {
      this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/cotizacion/orden';
    }

    return this.http.post(this.url, orden);
  }

  buscarLote(codigo: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/productos/lote/codigo/' + codigo;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/productos/lote/codigo/' + codigo;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/productos/lote/codigo/' + codigo;
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/productos/lote/codigo/' + codigo;

    return this.http.get(this.url);
  }

  enviarPedido(xml: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/ferrum/subir/pedido/7854956231457643';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/ferrum/subir/pedido/7854956231457643';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +  ':' + PUERTO_INTERNO + '/ferrum/subir/pedido/7854956231457643';
    // }
    this.url = URL_EXTERNO +  ':' + PUERTO_INTERNO + '/ferrum/subir/pedido/7854956231457643';

    return this.http.post(this.url, xml);
  }

}
