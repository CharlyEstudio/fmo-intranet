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
  AsesoresService,
  SupervisoresService,
  ComisionesService,
  ClientesService
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
    // Servicios
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    MedicoService,
    SubirArchivoService,
    ModalUploadService,
    PhpService,
    DiariosService,
    AsesoresService,
    SupervisoresService,
    ComisionesService,
    ClientesService
  ],
  declarations: []
})
export class ServiceModule { }
