import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { EstadoEmpresaComponent } from '../components/estado-empresa/estado-empresa.component';
import { DiferenciasComponent } from '../components/diferencias/diferencias.component';
import { NewcustomerComponent } from '../components/newcustomer/newcustomer.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent,
        EstadoEmpresaComponent,
        DiferenciasComponent,
        NewcustomerComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ]
})

export class SharedModule {}
