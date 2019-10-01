import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cardgarantia',
  templateUrl: './cardgarantia.component.html',
  styles: []
})
export class CardgarantiaComponent implements OnInit {

  @Input() titulo: any;
  @Input() cantidad: number = 0;
  @Input() color: any;
  @Input() colortext: any;

  constructor() { }

  ngOnInit() {
  }

}
