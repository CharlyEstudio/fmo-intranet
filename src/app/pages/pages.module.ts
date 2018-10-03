import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficoBarraComponent } from '../components/grafico-barra/grafico-barra.component';
// import { PagesComponent } from './pages.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PorBajarComponent } from '../components/por-bajar/por-bajar.component';
import { PorSurtirComponent } from '../components/por-surtir/por-surtir.component';
import { PedFacturadosComponent } from '../components/ped-facturados/ped-facturados.component';
import { PedCanceladosComponent } from '../components/ped-cancelados/ped-cancelados.component';
import { PedTotalesComponent } from '../components/ped-totales/ped-totales.component';
import { NivelServicioComponent } from '../components/nivel-servicio/nivel-servicio.component';

// Shared
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

// Graficas ng2-charts
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { DashborarDirComponent } from './dashborar-dir/dashborar-dir.component';

@NgModule({
    declarations: [
        // PagesComponent,
        DashborarDirComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        GraficoBarraComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent,
        PorBajarComponent,
        PorSurtirComponent,
        PedFacturadosComponent,
        PedCanceladosComponent,
        PedTotalesComponent,
        NivelServicioComponent
    ],
    exports: [
        // PagesComponent,
        DashborarDirComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PagesModule { }
