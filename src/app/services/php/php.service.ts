import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_GENERAL, URL_LOCAL, URL_PRUEBAS, PUERTO_SERVER, PUERTO_INTERNO, URL_PETICION } from '../../config/config';

@Injectable()
export class PhpService {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  // Si se cambia a PHP las consultas se debe de cambiar el URL de LOCAL a PETICIO =>>> OJO

  porBajar(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=1';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PETICION + '/api/pedidos.php?opcion=1';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=1';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/bajar/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/bajar/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/bajar/' + fecha;
    }

    return this.http.get( this.url ).map((bajar: any) => {
      if (bajar.status) {
        return bajar.respuesta;
      } else {
        return 0;
      }
    });
  }

  porBajarZona( zona: any, fecha: any ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=12&zona=' + zona;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PETICION + '/api/pedidos.php?opcion=12&zona=' + zona;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=12&zona=' + zona;
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/bajar/zona/' + fecha + '/' + zona;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/bajar/zona/' + fecha + '/' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/bajar/zona/' + fecha + '/' + zona;
    }

    return this.http.get( this.url ).map((bajarZona: any) => {
      if (bajarZona.status) {
        return bajarZona.respuesta;
      } else {
        return 0;
      }
    });
  }

  porBajarEspecial(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=14';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=14';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=14';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/bajar/especial/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/bajar/especial/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/bajar/especial/' + fecha;
    }

    return this.http.get( this.url ).map((bajarEspecial: any) => {
      if (bajarEspecial.status) {
        return bajarEspecial.respuesta;
      } else {
        return 0;
      }
    });
  }

  porSurtir(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=2';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=2';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=2';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/surtir/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/surtir/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/surtir/' + fecha;
    }

    return this.http.get( this.url ).map((surtir: any) => {
      if (surtir.status) {
        return surtir.respuesta;
      } else {
        return 0;
      }
    });
  }

  porSurtirZona( zona: any, fecha: any ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=13&zona=' + zona;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=13&zona=' + zona;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=13&zona=' + zona;
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/surtir/zona/' + fecha + '/' + zona;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/surtir/zona/' + fecha + '/' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/surtir/zona/' + fecha + '/' + zona;
    }

    return this.http.get( this.url ).map((surtir: any) => {
      if (surtir.status) {
        return surtir.respuesta;
      } else {
        return 0;
      }
    });
  }

  porSurtirEspecial(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=15';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=15';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=15';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/surtir/especial/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/surtir/especial/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/surtir/especial/' + fecha;
    }

    return this.http.get( this.url ).map((bajarEspecial: any) => {
      if (bajarEspecial.status) {
        return bajarEspecial.respuesta;
      } else {
        return 0;
      }
    });
  }

  facturados(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=3';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=3';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=3';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/facturado/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/facturado/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/facturado/' + fecha;
    }

    return this.http.get( this.url ).map((facturado: any) => {
      if (facturado.status) {
        return facturado.respuesta;
      } else {
        return 0;
      }
    });
  }

  facturadoZona( zona: any, fecha: any ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=16&zona=' + zona;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=16&zona=' + zona;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=16&zona=' + zona;
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/facturado/zona/' + fecha + '/' + zona;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/facturado/zona/' + fecha + '/' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/facturado/zona/' + fecha + '/' + zona;
    }

    return this.http.get( this.url ).map((facZona: any) => {
      if (facZona.status) {
        return facZona.respuesta;
      } else {
        return 0;
      }
    });
  }

  facturadoEspecial(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=17';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=17';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=17';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/facturado/especiales/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/facturado/especiales/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/facturado/especiales/' + fecha;
    }

    return this.http.get( this.url ).map((facEsp: any) => {
      if (facEsp.status) {
        return facEsp.respuesta;
      } else {
        return 0;
      }
    });
  }

  cancelados(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=4';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=4';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=4';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/cancelados/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/cancelados/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/cancelados/' + fecha;
    }

    return this.http.get( this.url ).map((cancelados: any) => {
      if (cancelados.status) {
        return cancelados.respuesta;
      } else {
        return 0;
      }
    });
  }

  canceladoZona( zona: any, fecha: any ) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=18&zona=' + zona;
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=18&zona=' + zona;
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=18&zona=' + zona;
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/cancelados/zona/' + fecha + '/' + zona;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/cancelados/zona/' + fecha + '/' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/cancelados/zona/' + fecha + '/' + zona;
    }

    return this.http.get( this.url ).map((canZon: any) => {
      if (canZon.status) {
        return canZon.respuesta;
      } else {
        return 0;
      }
    });
  }

  canceladoEspecial(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=19';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=19';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=19';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/cancelados/especiales/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/cancelados/especiales/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/cancelados/especiales/' + fecha;
    }

    return this.http.get( this.url ).map((canEsp: any) => {
      if (canEsp.status) {
        return canEsp.respuesta;
      } else {
        return 0;
      }
    });
  }

  totalPedidos(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/pedidos.php?opcion=5';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/pedidos.php?opcion=5';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=5';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/pedidos/totales/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/pedidos/totales/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/pedidos/totales/' + fecha;
    }

    return this.http.get( this.url ).map((totPed: any) => {
      if (totPed.status) {
        return totPed.respuesta;
      } else {
        return 0;
      }
    });
  }

  nivelServicio() {
    // Esto no se puede enviar a BackEnd por que hace 2 consultas al mismo tiempo
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=6';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/pedidos.php?opcion=6';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=6';
    }

    return this.http.get( this.url );
  }

  nsTruper() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=7';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/pedidos.php?opcion=7';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=7';
    }

    return this.http.get( this.url );
  }

  nsFMO() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/pedidos.php?opcion=8';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/pedidos.php?opcion=8';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/pedidos.php?opcion=8';
    }

    return this.http.get( this.url );
  }

  ventaActual(inicio: any, final: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/ventas.php?opcion=1';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/ventas.php?opcion=1';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=1';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/venta/actual/' + inicio + '/' + final;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/venta/actual/' + inicio + '/' + final;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/venta/actual/' + inicio + '/' + final;
    }

    return this.http.get( this.url ).map((totPed: any) => {
      if (totPed.status) {
        return totPed.respuesta;
      } else {
        return 0;
      }
    });
  }

  ventaAnterior() {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/ventas.php?opcion=2';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/ventas.php?opcion=2';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=2';
    }

    return this.http.get( this.url );
  }

  zona(inicio: any, final: any, zona: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/ventas.php?opcion=3&zona=1';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/ventas.php?opcion=3&zona=1';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=3&zona=1';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/zona/' + zona + '/' + inicio + '/' + final + '/' + zona;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/zona/' + zona + '/' + inicio + '/' + final + '/' + zona;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/zona/' + zona + '/' + inicio + '/' + final + '/' + zona;
    }

    return this.http.get( this.url ).map((zonas: any) => {
      if (zonas.status) {
        return zonas.respuesta;
      } else {
        return 0;
      }
    });
  }

  especial(inicio: any, final: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/ventas.php?opcion=4';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/ventas.php?opcion=4';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=4';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/especiales/' + inicio + '/' + final;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/especiales/' + inicio + '/' + final;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/especiales/' + inicio + '/' + final;
    }

    return this.http.get( this.url ).map((especiales: any) => {
      if (especiales.status) {
        return especiales.respuesta;
      } else {
        return 0;
      }
    });
  }

  financiado() {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=1';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=1';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=1';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/morosidad/financiado';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/morosidad/financiado';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/morosidad/financiado';
    }

    return this.http.get( this.url ).map((financiado: any) => {
      if (financiado.status) {
        return financiado.respuesta;
      } else {
        return 0;
      }
    });
  }

  saldo(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=2';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=2';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=2';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/morosidad/saldo/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/morosidad/saldo/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/morosidad/saldo/' + fecha;
    }

    return this.http.get( this.url ).map((saldo: any) => {
      if (saldo.status) {
        return saldo.respuesta;
      } else {
        return 0;
      }
    });
  }

  vencido(fecha: any) {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=3';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=3';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=3';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/morosidad/vencido/' + fecha;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/morosidad/vencido/' + fecha;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/morosidad/vencido/' + fecha;
    }

    return this.http.get( this.url ).map((vencido: any) => {
      if (vencido.status) {
        return vencido.respuesta;
      } else {
        return 0;
      }
    });
  }

  mor18(fecha: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=4';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=4';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=4';
    }

    return this.http.get( this.url );
  }

  mor(fecha: any, dias: any) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/morosidad/mor/dias/' + fecha + '/' + dias;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/morosidad/mor/dias/' + fecha + '/' + dias;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/morosidad/mor/dias/' + fecha + '/' + dias;
    }

    return this.http.get( this.url ).map((vencido: any) => {
      if (vencido.status) {
        return vencido.respuesta;
      } else {
        return 0;
      }
    });
  }

  // mor916() {
  //   if (URL_SERVICIO_GENERAL === URL_PETICION) {
  //     /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=5';
  //   } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
  //     this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=5';
  //   } else {
  //     this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=5';
  //   }

  //   return this.http.get( this.url );
  // }

  // mor1730() {
  //   if (URL_SERVICIO_GENERAL === URL_PETICION) {
  //     /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=6';
  //   } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
  //     this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=6';
  //   } else {
  //     this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=6';
  //   }

  //   return this.http.get( this.url );
  // }

  // mor3160() {
  //   if (URL_SERVICIO_GENERAL === URL_PETICION) {
  //     /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=7';
  //   } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
  //     this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=7';
  //   } else {
  //     this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=7';
  //   }

  //   return this.http.get( this.url );
  // }

  // mor6190() {
  //   if (URL_SERVICIO_GENERAL === URL_PETICION) {
  //     /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=8';
  //   } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
  //     this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=8';
  //   } else {
  //     this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=8';
  //   }

  //   return this.http.get( this.url );
  // }

  // mor91() {
  //   if (URL_SERVICIO_GENERAL === URL_PETICION) {
  //     /*LOCAL*/this.url = URL_LOCAL + '/api/morosidad.php?opcion=9';
  //   } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
  //     this.url = URL_PRUEBAS + '/api/morosidad.php?opcion=9';
  //   } else {
  //     this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/morosidad.php?opcion=9';
  //   }

  //   return this.http.get( this.url );
  // }

  listaMorosidad( id: any, inicio: any, fin: any ) {
    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_PETICION + '/api/morosidad.php?opcion=10&perid=' + id + '&inicio=' + inicio + '&fin=' + fin;
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PETICION + '/api/morosidad.php?opcion=10&perid=' + id + '&inicio=' + inicio + '&fin=' + fin;
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' +
      PUERTO_SERVER + '/api/morosidad.php?opcion=10&perid=' + id + '&inicio=' + inicio + '&fin=' + fin;
    }

    return this.http.get( this.url );
  }

  diferencias() {
    // if (URL_SERVICIO_GENERAL === URL_PETICION) {
    //   /*LOCAL*/this.url = URL_LOCAL + '/api/ventas.php?opcion=5';
    // } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
    //   this.url = URL_PRUEBAS + '/api/ventas.php?opcion=5';
    // } else {
    //   this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_SERVER + '/api/ventas.php?opcion=5';
    // }

    if (URL_SERVICIO_GENERAL === URL_PETICION) {
      /*LOCAL*/this.url = URL_LOCAL + ':' + PUERTO_INTERNO + '/direccion/diferencias/saldo';
    } else if (URL_SERVICIO_GENERAL === 'http://localhost') {
      this.url = URL_PRUEBAS + ':' + PUERTO_INTERNO + '/direccion/diferencias/saldo';
    } else {
      this.url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/direccion/diferencias/saldo';
    }

    return this.http.get( this.url ).map((diferencias: any) => {
      if (diferencias.status) {
        return diferencias.respuesta;
      } else {
        return 0;
      }
    });
  }

}
