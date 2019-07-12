import { URL_SERVICIO_GENERAL } from "../app/config/config";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  wsUrl: 'https://ferremayoristas.com.mx:3001',
  mapbox: {
    accessToken: 'pk.eyJ1IjoiY2hhcmx5cmRldiIsImEiOiJjankwZ2N6NWwwMTJoM2dscWRpZ3Z1dW5kIn0.W59EjXg2_En1yuTXTyq6cQ'
  }
};
