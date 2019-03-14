import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* ------ Componentes ----- */
// Escritorios
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashborarDirComponent } from './dashborar-dir/dashborar-dir.component';

// Graficos
import { GraficoBarraComponent } from '../components/grafico-barra/grafico-barra.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { GraficoLinealComponent } from '../components/grafico-lineal/grafico-lineal.component';

// Shared
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Graficas ng2-charts
import { ChartsModule } from 'ng2-charts';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// PDF View
import { PdfViewerModule } from 'ng2-pdf-viewer';

// Mapa
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

// General
import { AccountSettingsComponent } from './account-settings/account-settings.component';
// Componentes
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
import { MorosidadBitacoraComponent } from '../components/morosidad-bitacora/morosidad-bitacora.component';
import { MovFolComponent } from '../components/mov-fol/mov-fol.component';
import { EdoCtaCliComponent } from '../components/edo-cta-cli/edo-cta-cli.component';
import { ComentariosComponent } from '../components/comentarios/comentarios.component';
// import { DiferenciasComponent } from '../components/diferencias/diferencias.component';
// Páginas
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
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
import { CobranzaComponent } from './cobranza/cobranza.component';
import { DasboardAseComponent } from './dasboard-ase/dasboard-ase.component';
import { PedidosDiaComponent } from './pedidos-dia/pedidos-dia.component';
import { ListaMorosidadComponent } from './lista-morosidad/lista-morosidad.component';
import { PreComisionComponent } from './pre-comision/pre-comision.component';
import { DashBoardSupComponent } from './dash-board-sup/dash-board-sup.component';
import { AsesorVistaComponent } from './asesor-vista/asesor-vista.component';
import { CobroVistaComponent } from './cobro-vista/cobro-vista.component';
import { PedidoVistaComponent } from './pedido-vista/pedido-vista.component';
import { PrecomVistaComponent } from './precom-vista/precom-vista.component';
import { DashBoardAuditoriaComponent } from './dash-board-auditoria/dash-board-auditoria.component';
import { CobranzaGeneralComponent } from './cobranza-general/cobranza-general.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { TotalComisionesComponent } from './total-comisiones/total-comisiones.component';
import { Zona1AuditoriaComponent } from './zona1-auditoria/zona1-auditoria.component';
import { Zona2AuditoriaComponent } from './zona2-auditoria/zona2-auditoria.component';
import { ZonaEspecialComponent } from './zona-especial/zona-especial.component';
import { EdoCtaComponent } from './edo-cta/edo-cta.component';
import { RepoSurtidoComponent } from './repo-surtido/repo-surtido.component';
import { MovimientosFolioComponent } from './movimientos-folio/movimientos-folio.component';
import { BitacoraComponent } from './bitacora/bitacora/bitacora.component';
import { MostrarInfoBitacoraComponent } from './mostrar-info-bitacora/mostrar-info-bitacora.component';
import { MostrarFacturasMorosidadComponent } from './mostrar-facturas-morosidad/mostrar-facturas-morosidad.component';
import { ChequesDevueltosComponent } from './cheques-devueltos/cheques-devueltos.component';
import { SpeedComponent } from '../components/speed/speed.component';
import { DashboardLogisticaComponent } from './dashboard-logistica/dashboard-logistica.component';
import { BuscarPagosComponent } from './buscar-pagos/buscar-pagos.component';
import { MapaComponent } from './mapa/mapa.component';
import { UsuariosClientesComponent } from './usuarios-clientes/usuarios-clientes.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { BoardComentariosComponent } from './board-comentarios/board-comentarios.component';
import { RutasGuiasComponent } from './rutas-guias/rutas-guias.component';
import { VerMapaComponent } from './ver-mapa/ver-mapa.component';
import { UsuariosChoferesComponent } from './usuarios-choferes/usuarios-choferes.component';
import { PedWebComponent } from './ped-web/ped-web.component';
import { CotizadorComponent } from './cotizador/cotizador.component';

@NgModule({
    declarations: [
        // Graficas
        GraficoDonaComponent,
        GraficoBarraComponent,
        GraficoLinealComponent,
        // Componentes
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
        MorosidadBitacoraComponent,
        MovFolComponent,
        EdoCtaCliComponent,
        ComentariosComponent,
        // DiferenciasComponent,
        // Páginas
        DashborarDirComponent,
        DashboardComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        BusquedaComponent,
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
        DasboardAseComponent,
        CobranzaComponent,
        PedidosDiaComponent,
        ListaMorosidadComponent,
        PreComisionComponent,
        DashBoardSupComponent,
        AsesorVistaComponent,
        CobroVistaComponent,
        PedidoVistaComponent,
        PrecomVistaComponent,
        DashBoardAuditoriaComponent,
        CobranzaGeneralComponent,
        ComisionesComponent,
        TotalComisionesComponent,
        Zona1AuditoriaComponent,
        Zona2AuditoriaComponent,
        ZonaEspecialComponent,
        EdoCtaComponent,
        RepoSurtidoComponent,
        MovimientosFolioComponent,
        BitacoraComponent,
        MostrarInfoBitacoraComponent,
        MostrarFacturasMorosidadComponent,
        ChequesDevueltosComponent,
        ChequesDevueltosComponent,
        SpeedComponent,
        DashboardLogisticaComponent,
        BuscarPagosComponent,
        MapaComponent,
        UsuariosClientesComponent,
        DashboardAdminComponent,
        BoardComentariosComponent,
        RutasGuiasComponent,
        VerMapaComponent,
        UsuariosChoferesComponent,
        PedWebComponent,
        CotizadorComponent
    ],
    exports: [
        DashborarDirComponent,
        DashboardComponent,
        PdfViewerModule
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        PdfViewerModule,
        AgmCoreModule.forRoot({
            apiKey: ''
        }),
        AgmDirectionModule
    ]
})

export class PagesModule { }
