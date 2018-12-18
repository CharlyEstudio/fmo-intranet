import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// Servicios
import {
  SettingsService,
  SidebarService,
  UsuarioService,
  LoginGuardGuard,
  VerificaTokenGuard,
  AdminGuard,
  SuperGuard,
  SubirArchivoService,
  PhpService,
  DiariosService,
  AsesoresService,
  SupervisoresService,
  ComisionesService,
  ClientesService,
  WebsocketService,
  AlmacenService,
  ExcelService,
  CreditoService,
  // NotificationService
} from "./services.index";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // Guardas
    LoginGuardGuard,
    VerificaTokenGuard,
    AdminGuard,
    SuperGuard,
    // Servicios
    SettingsService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    PhpService,
    DiariosService,
    AsesoresService,
    SupervisoresService,
    ComisionesService,
    ClientesService,
    WebsocketService,
    AlmacenService,
    ExcelService,
    CreditoService,
    // NotificationService
  ],
  declarations: []
})
export class ServiceModule { }
