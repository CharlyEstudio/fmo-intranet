import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from "../app/config/config";

export const environment = {
  production: true,
  // wsUrl: 'https://ferremayoristas.com.mx:3001'
  // wsUrl: 'http://192.168.1.251:3001'
  wsUrl: URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO
};
