import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* ------ Componentes ----- */
//Escritorios
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashborarDirComponent } from './dashborar-dir/dashborar-dir.component';

// Graficos
import { GraficoBarraComponent } from '../components/grafico-barra/grafico-barra.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

// General
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PorBajarComponent } from '../components/por-bajar/por-bajar.component';
import { PorSurtirComponent } from '../components/por-surtir/por-surtir.component';
import { PedFacturadosComponent } from '../components/ped-facturados/ped-facturados.component';
import { PedCanceladosComponent } from '../components/ped-cancelados/ped-cancelados.component';
import { PedTotalesComponent } from '../components/ped-totales/ped-totales.component';
import { NivelServicioComponent } from '../components/nivel-servicio/nivel-servicio.component';
import { VentasMensualesComponent } from '../components/ventas-mensuales/ventas-mensuales.component';
import { CarteraComponent } from '../components/cartera/cartera.component';
// import { ProgressComponent } from './progress/progress.component';
// import { Graficas1Component } from './graficas1/graficas1.component';
// import { PagesComponent } from './pages.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
// import { HospitalesComponent } from './hospitales/hospitales.component';
// import { MedicosComponent } from './medicos/medicos.component';
// import { MedicoComponent } from './medicos/medico.component';
// import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

// Shared
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Graficas ng2-charts
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        DashborarDirComponent,
        DashboardComponent,
        GraficoDonaComponent,
        GraficoBarraComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        BusquedaComponent,
        PorBajarComponent,
        PorSurtirComponent,
        PedFacturadosComponent,
        PedCanceladosComponent,
        PedTotalesComponent,
        NivelServicioComponent,
        VentasMensualesComponent,
        CarteraComponent,
        // PagesComponent,
        // PromesasComponent, // Desactivado por no usarlo
        // ProgressComponent, // Desactivado por no usarlo
        // Graficas1Component, // Desactivado por no usarlo
        // IncrementadorComponent, // Desactivado por no usarlo
        // RxjsComponent, // Desactivado por no usarlo
        // ModalUploadComponent,
        // HospitalesComponent, // Desactivado por no usarlo
        // MedicosComponent, // Desactivado por no usarlo
        // MedicoComponent, // Desactivado por no usarlo
    ],
    exports: [
        DashborarDirComponent,
        DashboardComponent,
        // PagesComponent,
        // ProgressComponent, // Desactivado por no usarlo
        // Graficas1Component // Desactivado por no usarlo
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
