import { URL_SERVICIO_GENERAL } from "../app/config/config";

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
