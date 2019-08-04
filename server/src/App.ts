import * as path from 'path';
import express from 'express';
import * as bodyParser from 'body-parser';

import * as log4js from 'log4js';

import log4jsconfig from './config/log4js.json';
//var log4jsconfig = require('./config/log4js.json');
log4js.configure(log4jsconfig);

import keycloak from './services/keycloack';
//var keycloak = require('./services/keycloack');

import DevDevicesModule from "./modules/devices/dev-devices.module" 




var cors = require('cors');
// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public socket;
  private io;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.Security();
  }

  // Configure Express middleware.
  private middleware(): void {

    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors({origin: 'http://localhost:4200'}));

    this.express.use(function (req, res, next) {
      let httpRequest = new Date() + req.method + req.url;
      console.log(httpRequest);
      next();
    });
  }

  // Configure Security.
  private Security(): void {

    this.express.use(keycloak.sessionConfig);
    this.express.use(keycloak.getInstance().middleware());
  }

  //Configure Sockets
  public addSocketIO(io: any): void {
    this.io = io;
    this.routes();

  }

  
  // Configure API endpoints.
  private routes(): void {

	let router = express.Router();
	router.use(express.static(path.join(__dirname, '../../public/dist/public')));
    this.express.use('/', router);
    this.express.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
    this.express.use('/errorpermission', router); 
    this.express.use('/serverip', ()=>{
      this.express.get('ip')
    }); 

	DevDevicesModule.addRoutes(this.express, router, this.io); 


    
  }

}

export default new App();
