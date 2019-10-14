import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO, URL_PETICION, URL_EXTERNO } from '../../config/config';

@Injectable()
export class DiariosService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  asesores() {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=1';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=1';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=1';
    // }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/asesores';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/asesores';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/asesores';
    // }
    this.url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/diarios/asesores';

    return this.http.get( this.url ).map((asesores: any) => {
      if (asesores.status) {
        return asesores.respuesta;
      } else {
        return 0;
      }
    });
  }

  proveedores() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=2';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=2';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=2';
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/proveedores';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/proveedores';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/proveedores';
    // }

    return this.http.get( this.url ).map((proveedores: any) => {
      if (proveedores.length > 0) {
        return proveedores;
      } else {
        return 0;
      }
    });
  }

  ventas(fechaIn: any, fechaOut: any, asesor: any = 0) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL +
      '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS +
      '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else {
      this.url = URL_SERVICIO_GENERAL +
      ':' + PUERTO_SERVER + '/api/diarios.php?opcion=3&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/ventas/' + asesor + '/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/ventas/' + asesor + '/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/ventas/' + asesor + '/' + fechaIn + '/' + fechaOut;
    // }

    // return this.http.get( this.url ).map((ventas: any) => {
    //   if (ventas.status) {
    //     return ventas.respuesta;
    //   } else {
    //     return 0;
    //   }
    // });

    return this.http.get( this.url ).map((ventas: any) => {
      if (ventas.length > 0) {
        return ventas;
      } else {
        return 0;
      }
    });
  }

  ventasSept(fechaIn: any, fechaOut: any, asesor: any = 0) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL +
      '/api/diarios.php?opcion=27&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS +
      '/api/diarios.php?opcion=27&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else {
      this.url = URL_SERVICIO_GENERAL +
      ':' + PUERTO_SERVER + '/api/diarios.php?opcion=27&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    }

    return this.http.get( this.url ).map((ventas: any) => {
      if (ventas.length > 0) {
        return ventas;
      } else {
        return 0;
      }
    });
  }

  ventasAsesor(fechaIn: any, fechaOut: any, asesor: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL +
      '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS +
      '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    } else {
      this.url = URL_SERVICIO_GENERAL +
      ':' + PUERTO_SERVER + '/api/diarios.php?opcion=4&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&asesor=' + asesor;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/ventas/asesor/' + asesor + '/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/ventas/asesor/' + asesor + '/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/ventas/asesor/' + asesor + '/' + fechaIn + '/' + fechaOut;
    // }

    return this.http.get( this.url ).map((datos: any) => {
      // if (datos.status) {
      //   return datos.respuesta;
      // } else {
      //   return 0;
      // }
      if (datos.length > 0) {
        return datos;
      } else {
        return 0;
      }
    });
  }

  compras(fechaIn: any, fechaOut: any, proveedor: any = 0) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL +
      '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS +
      '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else {
      this.url = URL_SERVICIO_GENERAL +
      ':' + PUERTO_SERVER + '/api/diarios.php?opcion=5&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/compras/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/compras/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/compras/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    // }

    return this.http.get( this.url ).map((compras: any) => {
      if (compras.length > 0) {
        return compras;
      } else {
        return 0;
      }
    });
  }

  comprasProveedor(fechaIn: any, fechaOut: any, proveedor: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL +
      '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS +
      '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    } else {
      this.url = URL_SERVICIO_GENERAL +
      ':' + PUERTO_SERVER + '/api/diarios.php?opcion=6&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&proveedor=' + proveedor;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/compras/proveedor/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/compras/proveedor/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/compras/proveedor/' + proveedor + '/' + fechaIn + '/' + fechaOut;
    // }

    return this.http.get( this.url ).map((compras: any) => {
      if (compras.length > 0) {
        return compras;
      } else {
        return 0;
      }
    });
  }

  utilidades(fechaIn: any, fechaOut: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=7&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/utilidades/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/utilidades/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/utilidades/' + fechaIn + '/' + fechaOut;
    // }

    return this.http.get( this.url ).map((utilidades: any) => {
      if (utilidades.length > 0) {
        return utilidades;
      } else {
        return 0;
      }
    });
  }

  notasCredito(fechaIn: any, fechaOut: any, tipo: any = '1') {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL +
      '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&tipo=' + tipo;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS +
      '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&tipo=' + tipo;
    } else {
      this.url = URL_SERVICIO_GENERAL +
      ':' + PUERTO_SERVER + '/api/diarios.php?opcion=8&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&tipo=' + tipo;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/notas/credito/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/notas/credito/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/notas/credito/' + fechaIn + '/' + fechaOut;
    // }

    return this.http.get( this.url ).map((notas: any) => {
      if (notas.length > 0) {
        return notas;
      } else {
        return 0;
      }
    });
  }

  inventario() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=9';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=9';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=9';
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/inventario';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/inventario';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/inventario';
    // }

    return this.http.get( this.url ).map((inventario: any) => {
      if (inventario.length > 0) {
        return inventario;
      } else {
        return 0;
      }
    });
  }

  entradaSalida(fechaIn: any, fechaOut: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=11&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/entsal/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/entsal/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/entsal/' + fechaIn + '/' + fechaOut;
    // }

    return this.http.get( this.url ).map((entsal: any) => {
      if (entsal.length > 0) {
        return entsal;
      } else {
        return 0;
      }
    });
  }

  consumoInterno(fechaIn: any, fechaOut: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=15&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/entsal/consumo/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/entsal/consumo/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/entsal/consumo/' + fechaIn + '/' + fechaOut;
    // }

    return this.http.get( this.url ).map((consumo: any) => {
      if (consumo.length > 0) {
        return consumo;
      } else {
        return 0;
      }
    });
  }

  carteraClientes() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=14';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=14';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=14';
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/cartera/clientes';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/cartera/clientes';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/cartera/clientes';
    // }

    return this.http.get( this.url ).map((carcli: any) => {
      if (carcli.length > 0) {
        return carcli;
      } else {
        return 0;
      }
    });
  }

  carteraProveedores() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=16';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=16';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=16';
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores';
    // }

    return this.http.get( this.url ).map((proveedores: any) => {
      if (proveedores.length > 0) {
        return proveedores;
      } else {
        return 0;
      }
    });
  }

  saldoProveedores( fecha: any, id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=17&id=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=17&id=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=17&id=' + id;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores/saldo/' + id + '/' + fecha;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores/saldo/' + id + '/' + fecha;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/cartera/proveedores/saldo/' + id + '/' + fecha;
    // }

    return this.http.get( this.url ).map((proveedoresSaldo: any) => {
      if (proveedoresSaldo.length > 0) {
        return proveedoresSaldo;
      } else {
        return 0;
      }
    });
  }

  diasLunes(fecha: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=18';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=18';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=18';
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/lunes/' + fecha;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/lunes/' + fecha;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/lunes/' + fecha;
    // }

    return this.http.get( this.url ).map((lunes: any) => {
      if (lunes.length > 0) {
        return lunes;
      } else {
        return 0;
      }
    });
  }

  diasLunesDocInc() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=29';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=29';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=29';
    }

    return this.http.get( this.url ).map((lunes: any) => {
      if (lunes.length > 0) {
        return lunes;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunes( fecha: any, id: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=19&id=' + id;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=19&id=' + id;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=19&id=' + id;
    }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/lunes/id/' + fecha + '/' + id;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/lunes/id/' + fecha + '/' + id;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/lunes/id/' + fecha + '/' + id;
    // }

    return this.http.get( this.url ).map((lunesId: any) => {
      if (lunesId.length > 0) {
        return lunesId;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesCH( ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=28';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=28';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=28';
    }

    return this.http.get( this.url ).map((lunesId: any) => {
      if (lunesId.length > 0) {
        return lunesId;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesEspecials( ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=31';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=31';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=31';
    }

    return this.http.get( this.url ).map((lunesId: any) => {
      if (lunesId.length > 0) {
        return lunesId;
      } else {
        return 0;
      }
    });
  }

  pedidosDiaLunesDocInc( ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=30';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=30';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=30';
    }

    return this.http.get( this.url ).map((lunesId: any) => {
      if (lunesId.length > 0) {
        return lunesId;
      } else {
        return 0;
      }
    });
  }

  backOrder( fechaIn: any, fechaOut: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=25&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + '/api/diarios.php?opcion=25&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=25&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    }

    // ANTERIOR BACKORDER
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/diarios.php?opcion=20&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut;
    // }

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/diarios/back/order/' + fechaIn + '/' + fechaOut;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/diarios/back/order/' + fechaIn + '/' + fechaOut;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/diarios/back/order/' + fechaIn + '/' + fechaOut;
    // }

    return this.http.get( this.url ).map((back: any) => {
      if (back.length > 0) {
        return back;
      } else {
        return 0;
      }
    });
  }

  obtenerBackOrder( tipo: any, fechaIn: any, fechaOut: any, orden: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + '/api/diarios.php?opcion=26&tipo=' +
                          tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS +
      '/api/diarios.php?opcion=26&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    } else {
      this.url = URL_SERVICIO_GENERAL +
      ':' + PUERTO_SERVER +
      '/api/diarios.php?opcion=26&tipo=' + tipo + '&fechaIn=' + fechaIn + '&fechaOut=' + fechaOut + '&orden=' + orden;
    }

    // BackOrder Anterior
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
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

    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL +
    //   ':' + PUERTO_INTERNO + '/diarios/back/order/seccion/' + tipo + '/' + fechaIn + '/' + fechaOut + '/' + orden;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS +
    //   ':' + PUERTO_INTERNO + '/diarios/back/order/seccion/' + tipo + '/' + fechaIn + '/' + fechaOut + '/' + orden;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL +
    //   ':' + PUERTO_INTERNO + '/diarios/back/order/seccion/' + tipo + '/' + fechaIn + '/' + fechaOut + '/' + orden;
    // }
    // this.url = URL_EXTERNO +
    // ':' + PUERTO_INTERNO + '/diarios/back/order/seccion/' + tipo + '/' + fechaIn + '/' + fechaOut + '/' + orden;

    return this.http.get( this.url ).map((obtbc: any) => {
      if (obtbc.length > 0) {
        return obtbc;
      } else {
        return 0;
      }
    });
  }

  enviarPDF(datos: any, archivo: string) {
    const url = `${URL_SERVICIO_GENERAL}/api/diarios.php?opcion=32`;

    return this.http.post(url, {data: datos, file: archivo}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
  }

}
