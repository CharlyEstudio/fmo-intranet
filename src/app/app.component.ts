import { Component, OnInit } from '@angular/core';
import { SettingsService, WebsocketService, UsuarioService } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public _ajustes: SettingsService,
    public _wsService: WebsocketService
  ) {
  }

  ngOnInit() {
  }
}
