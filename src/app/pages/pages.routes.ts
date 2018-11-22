import { Routes, RouterModule } from '@angular/router';

// Guards
import { AdminGuard, VerificaTokenGuard } from '../services/services.index';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashborarDirComponent } from './dashborar-dir/dashborar-dir.component';
import { DasboardAseComponent } from './dasboard-ase/dasboard-ase.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
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
import { PedidosDiaComponent } from './pedidos-dia/pedidos-dia.component';
import { ListaMorosidadComponent } from './lista-morosidad/lista-morosidad.component';
import { PreComisionComponent } from './pre-comision/pre-comision.component';
import { DashBoardSupComponent } from './dash-board-sup/dash-board-sup.component';
import { AsesorVistaComponent } from './asesor-vista/asesor-vista.component';
import { CobroVistaComponent } from './cobro-vista/cobro-vista.component';
import { PedidoVistaComponent } from './pedido-vista/pedido-vista.component';
import { PrecomVistaComponent } from './precom-vista/precom-vista.component';
import { DashBoardAuditoriaComponent } from './dash-board-auditoria/dash-board-auditoria.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { TotalComisionesComponent } from './total-comisiones/total-comisiones.component';
import { Zona1AuditoriaComponent } from './zona1-auditoria/zona1-auditoria.component';
import { Zona2AuditoriaComponent } from './zona2-auditoria/zona2-auditoria.component';
import { ZonaEspecialComponent } from './zona-especial/zona-especial.component';
import { EdoCtaComponent } from './edo-cta/edo-cta.component';
import { RepoSurtidoComponent } from './repo-surtido/repo-surtido.component';

const pageRoutes: Routes = [
    {
        path: 'dashboardDir',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: DashborarDirComponent,
        data:   {
                    titulo: 'Dashboard Dirección',
                    name: 'description'
                }
    },
    {
        path: 'dashboardAse',
        canActivate: [ VerificaTokenGuard ],
        component: DasboardAseComponent,
        data:   {
                    titulo: 'Dashboard Asesor',
                    name: 'description'
                }
    },
    {
        path: 'dashboard',
        canActivate: [ VerificaTokenGuard ],
        component: DashboardComponent,
        data:   {
                    titulo: 'Dashboard',
                    name: 'description'
                }
    },
    {
        path: 'account-settings',
        canActivate: [ VerificaTokenGuard ],
        component: AccountSettingsComponent,
        data:
                {
                    titulo: 'Configuración',
                    name: 'description'
                }
    },
    {
        path: 'perfil',
        canActivate: [ VerificaTokenGuard ],
        component: ProfileComponent,
        data:
                {
                    titulo: 'Perfil de Usuario',
                    name: 'description'
                }
    },
    {
        path: 'busqueda/:termino',
        canActivate: [ VerificaTokenGuard ],
        component: BusquedaComponent,
        data:
                {
                    titulo: 'Busqueda Completa',
                    name: 'description'
                }
    },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Mantenimiento de Usuarios',
                    name: 'description'
                }
    },
    // Asesores
    {
        path: 'cobranza',
        component: CobranzaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Cobranza del Día',
                    name: 'description'
                }
    },
    {
        path: 'pedidosDia',
        component: PedidosDiaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Pedidos del Día del Asesor',
                    name: 'description'
                }
    },
    {
        path: 'lista-morosidad/:id/:nombre/:inicio/:fin',
        component: ListaMorosidadComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Relación de Clientes Morosos',
                    name: 'description'
                }
    },
    {
        path: 'pre-comision',
        component: PreComisionComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Previsualización de la Comisión del Mes',
                    name: 'description'
                }
    },
    {
        path: 'edo-cta',
        component: EdoCtaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Estado de Cuenta del Cliente',
                    name: 'description'
                }
    },
    // Almacen
    {
        path: 'repoSurtido',
        component: RepoSurtidoComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Reporte de Almacén',
                    name: 'description'
                }
    },
    // Auditoria & Cobranza
    {
        path: 'dashBoardAuditoria',
        component: DashBoardAuditoriaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Dashboard de Auditoria & Cobranza',
                    name: 'description'
                }
    },
    {
        path: 'zona1Auditoria',
        component: Zona1AuditoriaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Información Detallada de Zona 1',
                    name: 'description'
                }
    },
    {
        path: 'zona2Auditoria',
        component: Zona2AuditoriaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Información Detallada de Zona 2',
                    name: 'description'
                }
    },
    {
        path: 'zonaEspecial',
        component: ZonaEspecialComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Información Detallada de Zona Especial',
                    name: 'description'
                }
    },
    // Supervisores
    {
        path: 'dashBoardSup',
        component: DashBoardSupComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Dashboard de Supervisión',
                    name: 'description'
                }
    },
    {
        path: 'asesor-vista/:id/:nombre',
        component: AsesorVistaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Vista del Asesor',
                    name: 'description'
                }
    },
    {
        path: 'cobro-vista/:id/:nombre',
        component: CobroVistaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Vista del Cobro del Asesor',
                    name: 'description'
                }
    },
    {
        path: 'pedido-vista/:id/:nombre',
        component: PedidoVistaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Vista de los Pedidos del Asesor',
                    name: 'description'
                }
    },
    {
        path: 'precom-vista/:id/:nombre/:img',
        component: PrecomVistaComponent,
        canActivate: [ VerificaTokenGuard ],
        data:
                {
                    titulo: 'Vista de la Pre-Comisión del Asesor',
                    name: 'description'
                }
    },
    // Comisiones
    {
        path: 'comisiones',
        component: ComisionesComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Listado de Comisiones Realizadas',
                    name: 'description'
                }
    },
    {
        path: 'totalComisiones',
        component: TotalComisionesComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Totales de Comisiones Realizadas',
                    name: 'description'
                }
    },
    // Diarios
    {
        path: 'dVentas',
        component: VentaComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Diario de Ventas',
                    name: 'description'
                }
    },
    {
        path: 'dCompras',
        component: CompraComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Diario de Compras',
                    name: 'description'
                }
    },
    {
        path: 'utilidades',
        component: UtilidadesComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Utilidades',
                    name: 'description'
                }
    },
    {
        path: 'notCred',
        component: NotasComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Notas de Crédito',
                    name: 'description'
                }
    },
    {
        path: 'dInventario',
        component: InventarioComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Diario de Inventario',
                    name: 'description'
                }
    },
    {
        path: 'backorder',
        component: BackorderComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Back Order',
                    name: 'description'
                }
    },
    {
        path: 'ent-sal',
        component: EntSalComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Entradas & Salidas',
                    name: 'description'
                }
    },
    {
        path: 'dias-lunes',
        component: RepoLunesComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Días Lunes',
                    name: 'description'
                }
    },
    {
        path: 'cProveedores',
        component: CarteraProveedoresComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Cartera de Proveedores',
                    name: 'description'
                }
    },
    {
        path: 'cClientes',
        component: CarteraClientesComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data:
                {
                    titulo: 'Cartera de Clientes',
                    name: 'description'
                }
    },
    // Redirección
    {
        path: '',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        redirectTo: '/dashboardDir',
        pathMatch: 'full'
    },
    {
        path: '',
        canActivate: [ VerificaTokenGuard ],
        redirectTo: '/dashboardAse',
        pathMatch: 'full'
    },
    {
        path: '',
        canActivate: [ VerificaTokenGuard ],
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }

];

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
