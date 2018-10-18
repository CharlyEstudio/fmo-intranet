import { Routes, RouterModule } from '@angular/router';

// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashborarDirComponent } from './dashborar-dir/dashborar-dir.component';
// import { ProgressComponent } from './progress/progress.component';
// import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
// import { HospitalesComponent } from './hospitales/hospitales.component';
// import { MedicoComponent } from './medicos/medico.component';
// import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

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
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }

];

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
