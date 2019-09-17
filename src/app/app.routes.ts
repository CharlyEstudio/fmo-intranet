import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { CambiarComponent } from './cambiar/cambiar.component';

// Guard
import { LoginGuardGuard } from './services/guards/login-guard.guard';

import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'recuperar', component: RecuperarComponent },
    { path: 'campass/:token', component: CambiarComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true} );
