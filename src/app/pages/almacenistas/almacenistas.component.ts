import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { PedidoService } from '../../services/pedido/pedido.service';


// import Swal from 'sweetalert2'
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-almacenistas',
  templateUrl: './almacenistas.component.html',
  styles: []
})
export class AlmacenistasComponent implements OnInit {


  idFerrum: any;
  id: number = -1;
  nombre: string;
  img: string = '';
  tiempo: string = '2';
  user: string;
  activo: string = '2';
  rotacion: string = '2';
  marquesina: string = '2';
  capacitacion: string = '2';
  area: string;
  seccion: string;
  lista: any[] = [];
  almacenista: any[] = [];
  datos: any[] = [];
  accionBtn: boolean = false;
  accionbtn: number = 0;
  actividad: string;

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService
  ) {
    this.idFerrum = this.usuarioService.usuario.idFerrum;
    this.almacenistas();
   }

  ngOnInit() {
  }

  almacenistas() {
    this.pedidoService.personalAlmacen().subscribe((dat: any) => {
      this.lista = dat.resp;
    });
  }

  desactivar(id: any) {
    this.actividad = 'Desactivado';
    swal({
      title: "¿Deseas eliminar este registro?",
      text: "Se eliminara este registro de la lista",
      icon: "warning",
      buttons: {
        cancel: true,
        confirm: true
      }
    })
    .then((confirm) => {
      if (confirm) {
        swal(
          'Eliminado!',
          'Tu registro ha sido eliminado.',
          'success'
          )
            this.pedidoService.eliminarPersonal(id).subscribe((data: any) => {
              data.activo = 0;
              this.almacenistas();
            });
      }
    })
  }

  buscador(texto: any) {
    if (texto.length > 0) {
      this.almacenista = [];
      this.pedidoService.buscarAlmacenista(texto).subscribe((data: any) => {
        this.lista = data.resp;
        this.accionbtn = 1;
      });
    } else {
      this.almacenistas();
    }
  }

  nuevoRegistro() {
    this.actividad = 'Registro';
    const enviar = {
      nombre: this.nombre,
      usuario: this.user,
      activo: this.activo,
      tiempo: this.tiempo,
      rotacion: this.rotacion,
      marquesina: this.marquesina,
      capacitacion: this.capacitacion,
      area: this.area,
      seccion: this.seccion,
      idFerrum: Number(this.idFerrum),
      actividad: this.actividad
    };
    this.pedidoService.guardarRegistro(enviar).subscribe((guarda: any) => {
      if (!guarda) {
        swal('Guardado!', `Tu registro se ha guardado correctamente!`, 'success');
        this.almacenistas();
      } else {
        swal('Error!', `Tu registro no se ha guardado correctamente!`, 'error');
      }
    });

    this.nombre = '';
    this.img = '';
    this.tiempo = '';
    this.user = '';
    this.activo = '';
    this.rotacion = '';
    this.marquesina = '';
    this.capacitacion = '';
    this.area = '';
    this.seccion = '';
    this.idFerrum = '';
    this.actividad = '';
  }

  accion() {
    this.img = 'newuser2.jpg';
    this.accionBtn = true;
    this.nombre = '';
    this.tiempo = '2';
    this.user = '';
    this.activo = '2';
    this.rotacion = '2';
    this.marquesina = '2';
    this.capacitacion = '2';
    this.area = '';
    this.seccion = '';
    this.id = -1;
  }

  verAlm(id: any) {
    this.img = '';
    this.id = -1;
    this.pedidoService.verPersonal(id).subscribe((ver: any) => {
      this.id = ver.resp.id_almacenista;
      this.nombre = ver.resp.nombre;
      this.tiempo = ver.resp.tiempo;
      this.user = ver.resp.usuario;
      this.activo = ver.resp.activo;
      this.rotacion = ver.resp.rotacion;
      this.marquesina = ver.resp.marquesina;
      this.capacitacion = ver.resp.capacitacion;
      this.area = ver.resp.area;
      this.seccion = ver.resp.seccion;
      this.img = ver.resp.img;

    });
  }

  editarAlm() {
    this.actividad = 'Editar';
    const enviar = {
      id: Number(this.id),
      nombre: this.nombre,
      usuario: this.user,
      activo: this.activo,
      tiempo: this.tiempo,
      rotacion: this.rotacion,
      marquesina: this.marquesina,
      capacitacion: this.capacitacion,
      area: this.area,
      seccion: this.seccion,
      idFerrum: Number(this.idFerrum),
      actividad: this.actividad
    };
    this.pedidoService.editarPersonal(enviar).subscribe((ver: any) => {
      if (!ver) {
        this.almacenistas();
        swal('Modificado!', `Tu registro guardó las modificaciones`, 'success');
      } else {
        swal('Error!', `Tu registro no se actualizo`, 'error');
      }
    });

    this.id = -1;
    this.nombre = '';
    this.img = '';
    this.tiempo = '';
    this.user = '';
    this.activo = '';
    this.rotacion = '';
    this.marquesina = '';
    this.capacitacion = '';
    this.area = '';
    this.seccion = '';
    this.idFerrum = '';
    this.actividad = '';
  }

  cancelar() {
    this.accionbtn = 0;
    this.id = -1;
    this.nombre = '';
    this.img = '';
    this.tiempo = '';
    this.user = '';
    this.activo = '';
    this.rotacion = '';
    this.marquesina = '';
    this.capacitacion = '';
    this.area = '';
    this.seccion = '';
    this.idFerrum = '';
    this.actividad = '';
    this.almacenistas();
  }

}
