import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

/* Lenguaje en fecha */
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
registerLocaleData(localeEsMx, 'es-Mx');

// Servicios
import { ServiceModule } from './services/service.module';

// Enviroment
import { environment } from '../environments/environment';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

// Push Notification
// npm i ngx-push-notifications
import { PushNotificationService } from 'ngx-push-notifications';

// Modulos
// import { PagesModule } from './pages/pages.module';

// PDF View
// import { PdfViewerModule } from 'ng2-pdf-viewer';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

// Componentes Externos
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { StatusComponent } from './components/status/status.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { CambiarComponent } from './cambiar/cambiar.component';
import { TablachdevService } from './components/tablachdev/tablachdev.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    StatusComponent,
    RecuperarComponent,
    CambiarComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [PushNotificationService, TablachdevService, { provide: LOCALE_ID, useValue: 'es-Mx' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
