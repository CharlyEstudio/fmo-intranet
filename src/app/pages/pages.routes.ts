import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashborarDirComponent } from './dashborar-dir/dashborar-dir.component';
import { DasboardAseComponent } from './dasboard-ase/dasboard-ase.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
// import { PagesComponent } from './pages.component';
// import { ProgressComponent } from './progress/progress.component';
// import { Graficas1Component } from './graficas1/graficas1.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';

// import { HospitalesComponent } from './hospitales/hospitales.component';
// import { MedicoComponent } from './medicos/medico.component';
// import { MedicosComponent } from './medicos/medicos.component';

// Guards
import { AdminGuard, VerificaTokenGuard } from '../services/services.index';

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
        data:
                {
                    titulo: 'Cobranza del Día',
                    name: 'description'
                }
    },
    {
        path: 'pedidosDia',
        component: PedidosDiaComponent,
        data:
                {
                    titulo: 'Pedidos del Día del Asesor',
                    name: 'description'
                }
    },
    {
        path: 'lista-morosidad/:id/:nombre/:inicio/:fin',
        component: ListaMorosidadComponent,
        data:
                {
                    titulo: 'Relación de Clientes Morosos',
                    name: 'description'
                }
    },
    // {
    //     path: 'pre-comision',
    //     component: PreComisionComponent,
    //     data:
    //             {
    //                 titulo: 'Previsualización de la Comisión del Mes',
    //                 name: 'description'
    //             }
    // },
    // Supervisores
    {
        path: 'dashBoardSup',
        component: DashBoardSupComponent,
        data:
                {
                    titulo: 'Dashboard de Supervisión',
                    name: 'description'
                }
    },
    {
        path: 'asesor-vista/:id/:nombre',
        component: AsesorVistaComponent,
        data:
                {
                    titulo: 'Vista del Asesor',
                    name: 'description'
                }
    },
    {
        path: 'cobro-vista/:id/:nombre',
        component: CobroVistaComponent,
        data:
                {
                    titulo: 'Vista del Cobro del Asesor',
                    name: 'description'
                }
    },
    {
        path: 'pedido-vista/:id/:nombre',
        component: PedidoVistaComponent,
        data:
                {
                    titulo: 'Vista de los Pedidos del Asesor',
                    name: 'description'
                }
    },
    {
        path: 'precom-vista/:id/:nombre/:img',
        component: PrecomVistaComponent,
        data:
                {
                    titulo: 'Vista de la Pre-Comisión del Asesor',
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
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }

];

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
