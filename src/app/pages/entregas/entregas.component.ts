import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { GuiasService } from '../../services/services.index';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styles: []
})
export class EntregasComponent implements OnInit {

  @ViewChild('numero') numero: ElementRef;

  entregas: any[] = [];

  constructor(
    private guiasService: GuiasService
  ) { }

  ngOnInit() {
  }

  buscarEntregas() {
    console.log(this.numero);
    if (this.numero.nativeElement.value === '') {
      return;
    }

    this.guiasService.buscarEntregasCliente(this.numero.nativeElement.value).subscribe((entregas: any) => {
      if (entregas.ok) {
        console.log(entregas.guia);
        this.entregas = entregas.guia;
      }
    });
  }

  limpiar() {
    this.numero.nativeElement.value = '';
    this.entregas = [];
  }

}
