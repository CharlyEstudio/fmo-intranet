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
    console.log(this.almacenista.length);
    
   }

  ngOnInit() {
  }

  almacenistas(){
    this.pedidoService.personalAlmacen().subscribe((dat: any) => {
     this.lista = dat;
    });
  }

  desactivar(id: any){
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
            this.pedidoService.eliminarPersonal(id,this.idFerrum,this.actividad).subscribe((data: any)=>{
              data.activo = 0;
              this.almacenistas();
            });
      }
    })
  }

  buscador(texto: any){
    this.almacenista = [];
    this.pedidoService.nuevoPersonal(texto).subscribe((data: any) => {
      console.log(data);
      this.lista = data;
      this.accionbtn = 1;
    });
  }

  nuevoRegistro(){
    this.actividad = 'Registro';
    this.pedidoService.guardarRegistro(this.nombre, this.user, this.activo, this.tiempo, this.rotacion, this.marquesina,
      this.capacitacion, this.area, this.seccion,this.idFerrum,this.actividad).subscribe((guarda: any) => {
        swal('Guardado!', `Tu registro se ha guardado correctamente!`, 'success');
        this.almacenistas();
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

  accion(){
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
  
  verAlm(id: any){
    this.img = '';
    this.id = -1;
    this.pedidoService.verPersonal(id).subscribe((ver: any) => {
      this.id = ver[0].id_almacenista;
      this.nombre = ver[0].nombre;
      this.tiempo = ver[0].tiempo;
      this.user = ver[0].usuario;
      this.activo = ver[0].activo;
      this.rotacion = ver[0].rotacion;
      this.marquesina = ver[0].marquesina;
      this.capacitacion = ver[0].capacitacion;
      this.area = ver[0].area;
      this.seccion = ver[0].seccion;
      this.img = ver[0].img;

    });
  }

  editarAlm(){
    this.actividad = 'Editar';
    this.pedidoService.editarPersonal(this.id, this.nombre, this.user, this.activo, this.tiempo, this.rotacion, this.marquesina,
    this.capacitacion, this.area, this.seccion,this.idFerrum,this.actividad ).subscribe((ver: any) => {
      
      swal('Modificado!', `Tu registro guardó las modificaciones`, 'success');

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
  cancelar(){
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