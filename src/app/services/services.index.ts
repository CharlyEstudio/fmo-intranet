
// Guards
export { LoginGuardGuard } from "./guards/login-guard.guard";
export { AdminGuard } from './guards/admin.guard';
export { VerificaTokenGuard } from "./guards/verifica-token.guard";
export { SuperGuard } from "./guards/super.guard";
export { AsesoresGuard } from "./guards/asesores.guard";
export { ClienteGuard } from "./guards/cliente.guard";
export { DireccionGuard } from "./guards/direccion.guard";
export { AuditoriaGuard } from "./guards/auditoria.guard";
export { MesaGuard } from "./guards/mesa.guard";
export { GuiasEdoCtaGuard } from './guards/guias-edocta.guard';

// Subir Archivo o Imagen
export { SubirArchivoService } from "./subirArchivo/subir-archivo.service";

// Servicios
export { UsuarioService } from "./usuario/usuario.service";
export { SettingsService } from "./settings/settings.service";
export { SidebarService } from "./shared/sidebar.service";
export { DiariosService } from "./diarios/diarios.service";
export { AsesoresService } from "./php/asesores.service";
export { SupervisoresService } from "./supervisores/supervisores.service";
export { ComisionesService } from "./comisiones/comisiones.service";
export { ClientesService } from "./clientes/clientes.service";
export { AlmacenService } from './almacen/almacen.service';
export { CreditoService } from "./credito/credito.service";
export { GuiasService } from "./guias/guias.service";
export { GpsService } from "./gps/gps.service";
export { ClienteService } from "./usuario-cliente/cliente.service";
export { ChoferesService } from "./usuario-chofer/choferes.service";
export { TiendaService } from "./tienda/tienda.service";
export { PedidosService } from "./pedidos/pedidos.service";
export { NcService } from "./nc/nc.service";

// Servicio PHP
export { PhpService } from "./php/php.service";

// Sockets
export { WebsocketService } from './sockets/websocket.service';

// Excel
export { ExcelService } from "./excel/excel.service";

// Magnitraking
export { MagnitrackingService } from "./magnitracking/magnitracking.service";

// Notificación
// export { NotificationService } from "./notification/notification.service";
