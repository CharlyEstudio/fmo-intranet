import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from "../app/config/config";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  // wsUrl: 'https://ferremayoristas.com.mx:3001'
  // wsUrl: 'http://192.168.1.251:3001'
  wsUrl: URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO
};
