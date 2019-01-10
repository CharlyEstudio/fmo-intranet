import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO } from '../../config/config';

@Injectable()
export class DiariosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesores() {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=1';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=1';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=1';
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/asesores';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/asesores';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/asesores';
    }

    return this.http.get( this.url ).map((asesores: any) => {
      return asesores.respuesta;
    });
  }

  proveedores() {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=2';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=2';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=2';
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/proveedores';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/proveedores';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/proveedores';
    }

    return this.http.get( this.url ).map((proveedores: any) => {
      return proveedores.respuesta;
    });
  }

  ventas(fechaIn: any, fechaOut: any, asesor: any = 0) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL +
    //   '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS +
    //   '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +
    //   ':' + PUERTO_SERVER + '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/ventas/' + asesor + '/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/ventas/' + asesor + '/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/ventas/' + asesor + '/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url );
  }

  ventasAsesor(fechaIn: any, fechaOut: any, asesor: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL +
    //   '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS +
    //   '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +
    //   ':' + PUERTO_SERVER + '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/ventas/asesor/' + asesor + '/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/ventas/asesor/' + asesor + '/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/ventas/asesor/' + asesor + '/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url ).map((datos: any) => {
      return datos.respuesta;
    });
  }

  compras(fechaIn: any, fechaOut: any, proveedor: any = 0) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL +
    //   '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS +
    //   '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +
    //   ':' + PUERTO_SERVER + '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/compras/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/compras/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/compras/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url ).map((compras: any) => {
      return compras.respuesta;
    });
  }

  comprasProveedor(fechaIn: any, fechaOut: any, proveedor: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL +
    //   '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS +
    //   '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +
    //   ':' + PUERTO_SERVER + '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/compras/proveedor/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/compras/proveedor/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/compras/proveedor/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url ).map((compras: any) => {
      return compras.respuesta;
    });
  }

  utilidades(fechaIn: any, fechaOut: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/utilidades/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/utilidades/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/utilidades/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url ).map((utilidades: any) => {
      return utilidades.respuesta;
    });
  }

  notasCredito(fechaIn: any, fechaOut: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL +
    //   '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS +
    //   '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +
    //   ':' + PUERTO_SERVER + '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/notas/credito/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/notas/credito/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/notas/credito/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url ).map((notas: any) => {
      return notas.respuesta;
    });
  }

  inventario() {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=9';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=9';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=9';
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/inventario';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/inventario';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/inventario';
    }

    return this.http.get( this.url ).map((inventario: any) => {
      return inventario.respuesta;
    });
  }

  entradaSalida(fechaIn: any, fechaOut: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/entsal/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/entsal/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/entsal/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url ).map((entsal: any) => {
      return entsal.respuesta;
    });
  }

  consumoInterno(fechaIn: any, fechaOut: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/entsal/consumo/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/entsal/consumo/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/entsal/consumo/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url ).map((consumo: any) => {
      return consumo.respuesta;
    });
  }

  carteraClientes() {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=14';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=14';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=14';
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/cartera/clientes';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/cartera/clientes';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/cartera/clientes';
    }

    return this.http.get( this.url );
  }

  carteraProveedores() {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=16';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=16';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=16';
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores';
    }

    return this.http.get( this.url ).map((proveedores: any) => {
      return proveedores.respuesta;
    });
  }

  saldoProveedores( fecha: any, id: any ) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=17&id=' + id;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=17&id=' + id;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=17&id=' + id;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores/saldo/' + id + '/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores/saldo/' + id + '/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores/saldo/' + id + '/' + fecha;
    }

    return this.http.get( this.url ).map((proveedoresSaldo: any) => {
      return proveedoresSaldo.respuesta;
    });
  }

  diasLunes(fecha: any) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=18';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=18';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=18';
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/lunes/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/lunes/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/lunes/' + fecha;
    }

    return this.http.get( this.url ).map((lunes: any) => {
      return lunes.respuesta;
    });
  }

  pedidosDiaLunes( fecha: any, id: any ) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=19&id=' + id;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=19&id=' + id;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=19&id=' + id;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/lunes/id/' + fecha + '/' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/lunes/id/' + fecha + '/' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/lunes/id/' + fecha + '/' + id;
    }

    return this.http.get( this.url ).map((lunesId: any) => {
      return lunesId.respuesta;
    });
  }

  backOrder( fechaIn: any, fechaOut: any ) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/back/order/' + fechaIn + '/' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/back/order/' + fechaIn + '/' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/back/order/' + fechaIn + '/' + fechaOut;
    }

    return this.http.get( this.url );
  }

  obtenerBackOrder( tipo: any, fechaIn: any, fechaOut: any, orden: any ) {
    // if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=21&tipo=' +
    //                       tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS +
    //   '/api/diarios.php?opcion=21&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +
    //   ':' + PUERTO_SERVER +
    //   '/api/diarios.php?opcion=21&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    // }

    if (URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
      /*LOCAL*/this.url = URL_LOCAL +
      ':' + PUERTO_INTERNO + '/diarios/back/order/seccion/' + tipo + '/' + fechaIn + '/' + fechaOut + '/' + orden;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS +
      ':' + PUERTO_INTERNO + '/diarios/back/order/seccion/' + tipo + '/' + fechaIn + '/' + fechaOut + '/' + orden;
    } else {
      this.url = URL_SERVICIO_GENERAL +
      ':' + PUERTO_INTERNO + '/diarios/back/order/seccion/' + tipo + '/' + fechaIn + '/' + fechaOut + '/' + orden;
    }

    return this.http.get( this.url );
  }

}
