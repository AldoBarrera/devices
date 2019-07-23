var Keycloak = require('keycloak-connect');
var session = require('express-session');

var memoryStore = new session.MemoryStore();



let kcConfig = {
    clientId: 'ipmonitor',
    bearerOnly: true,
  
    serverUrl: 'http://localhost:8080/auth',
    realm: 'ip-monitor'
  };


  class KeycloakService {
    public sessionConfig:any;
    public keycloackService : any;
    constructor() {
       this.keycloackService = new Keycloak({ store: memoryStore }, kcConfig);
       this.sessionConfig = session({
        secret: '1fcf69f8-1771-4d14-874f-c2b09d5ddf60',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
      })

    }
    public getInstance() {
        return this.keycloackService;
    }
  
    
  
  }
  

  export = new KeycloakService();