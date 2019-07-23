import { KeycloakConfig } from 'keycloak-angular';

let keycloakConfig: KeycloakConfig = {
  url: 'http://127.0.0.1:8080/auth',
  realm: 'ip-monitor',
  clientId: 'ipmonitor'
};

export const environment = {
  production: true,
  keycloak: keycloakConfig
};