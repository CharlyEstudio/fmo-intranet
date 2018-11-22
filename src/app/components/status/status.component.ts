import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/services.index';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(
    public _wsService: WebsocketService
  ) {
  }

  ngOnInit() {
  }

  estado() {
  }

}
