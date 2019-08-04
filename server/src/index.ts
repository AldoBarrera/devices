import * as http from 'http';
var fs = require("fs");


import debug from 'debug';

import App from './App';
import { Global } from "./types/global"; //that is, path to appState.ts
debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3131);
App.express.set('port', port);
const WSServer = require('socket.io');
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: '+add);
  App.express.set('ip', add);


  var data = "New File Contents";

  fs.writeFile("temp.txt", data, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
})
const server = http.createServer(App.express);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//Configure Socket IO
const io = new WSServer( server );
App.addSocketIO(io);
Global.io = io;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
  debug(`Listening on ${bind}`);
}
