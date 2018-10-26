import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// Servicios
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  HospitalService,
  MedicoService,
  LoginGuardGuard,
  VerificaTokenGuard,
  AdminGuard,
  SubirArchivoService,
  PhpService,
  DiariosService,
  AsesoresService
} from "./services.index";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    VerificaTokenGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    PhpService,
    DiariosService,
    AsesoresService
  ],
  declarations: []
})
export class ServiceModule { }
