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
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Guards
import { AdminGuard, VerificaTokenGuard } from '../services/services.index';


//     {
//         path: 'progress',
//         component: ProgressComponent,
//         data:
//                 {
//                     titulo: 'Progress',
//                     name: 'description'
//                 }
//     },
//     {
//         path: 'graficas1',
//         component: Graficas1Component,
//         data:
//                 {
//                     titulo: 'Gráficas',
//                     name: 'description'
//                 }
//     },
//     {
//         path: 'promesas',
//         component: PromesasComponent,
//         data:
//                 {
//                     titulo: 'Promesas',
//                     name: 'description'
//                 }
//     },
//     {
//         path: 'rxjs',
//         component: RxjsComponent,
//         data:
//                 {
//                     titulo: 'RXJS',
//                     name: 'description'
//                 }
//     },


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
    {
        path: 'hospitales',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: HospitalesComponent,
        data:
                {
                    titulo: 'Mantenimiento de Asesores',
                    name: 'description'
                }
    },
    {
        path: 'medicos',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: MedicosComponent,
        data:
                {
                    titulo: 'Mantenimiento de Clientes',
                    name: 'description'
                }
    },
    {
        path: 'medico/:id',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: MedicoComponent,
        data:
                {
                    titulo: 'Actualizar Médico',
                    name: 'description'
                }
    }
];

var usuario = JSON.parse(localStorage.getItem('usuario'));

if (localStorage.getItem('usuario') != undefined) {

    if (usuario.rol === 'ADMIN_ROLE' || usuario.rol === 'DIR_ROLE') {

        pageRoutes.push(
            {
                path: '', redirectTo: '/dashboardDir', pathMatch: 'full'
            }
        );

    } else {

        pageRoutes.push(
            {
                path: '', redirectTo: '/dashboard', pathMatch: 'full'
            }
        );

    }

} else {
    pageRoutes.push(
        {
            path: '', redirectTo: '/dashboard', pathMatch: 'full'
        }
    );
}

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
