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
import { Vencido18Component } from '../components/cartera/vencido18/vencido18.component';
import { Vencido916Component } from '../components/cartera/vencido916/vencido916.component';
import { Vencido1730Component } from '../components/cartera/vencido1730/vencido1730.component';
import { Vencido3160Component } from '../components/cartera/vencido3160/vencido3160.component';
import { Vencido6190Component } from '../components/cartera/vencido6190/vencido6190.component';
import { Vencido91Component } from '../components/cartera/vencido91/vencido91.component';
import { VentaComponent } from './diarios/venta/venta.component';
import { CompraComponent } from './diarios/compra/compra.component';
import { UtilidadesComponent } from './diarios/utilidades/utilidades.component';
import { NotasComponent } from './diarios/notas/notas.component';
import { InventarioComponent } from './diarios/inventario/inventario.component';
import { BackorderComponent } from './diarios/backorder/backorder.component';
import { EntSalComponent } from './diarios/ent-sal/ent-sal.component';
import { RepoLunesComponent } from './diarios/repo-lunes/repo-lunes.component';
import { CarteraProveedoresComponent } from './diarios/cartera-proveedores/cartera-proveedores.component';
import { CarteraClientesComponent } from './diarios/cartera-clientes/cartera-clientes.component';
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
        Vencido18Component,
        Vencido916Component,
        Vencido1730Component,
        Vencido3160Component,
        Vencido6190Component,
        Vencido91Component,
        VentaComponent,
        CompraComponent,
        UtilidadesComponent,
        NotasComponent,
        InventarioComponent,
        BackorderComponent,
        EntSalComponent,
        RepoLunesComponent,
        CarteraProveedoresComponent,
        CarteraClientesComponent,
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
