import { KeycloakConfig } from 'keycloak-angular';

let Credentials = {
  secret: "1fcf69f8-1771-4d14-874f-c2b09d5ddf60"
};

let keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'ip-monitor',
  clientId: 'ipmonitor',
  credentials: Credentials
};

let appConfig = {
  url: 'http://localhost:3131'
};

export const environment = {
  production: false,
  keycloak: keycloakConfig,
  appConfig: appConfig
};

