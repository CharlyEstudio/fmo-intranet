import { URL_SERVICIO_GENERAL } from "../app/config/config";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let url = '';

if (URL_SERVICIO_GENERAL === 'http://localhost' || URL_SERVICIO_GENERAL === 'http://192.168.1.250') {
  url = 'http://192.168.1.250:3001';
} else {
  url = 'http://177.244.55.122:3001';
}

export const environment = {
  production: true,
  wsUrl: url
};
