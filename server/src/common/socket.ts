export class CommonSocket {
  public io: any
  public connected: boolean
  public socket: any
  public moduleName: any
  constructor() {
     
  }

  public setSocket(io:any) {
    this.io = io;   
  }
  public connect() {
    this.io.on( 'connection', (socket) => {
        console.log("Connected");
        this.connected = true;
        this.socket = socket;
        this.socket.on( 'cmd', cmd => this.onCommand( socket, cmd ) );   
    } );
  }

  private onCommand( socket, cmd ) {
    console.log( 'cmd:' + cmd.type );
  
    switch( cmd.type ) {
     
      // data changes are broadcast for all clients
      case this.moduleName:
        console.log( cmd.data );
        socket.broadcast.emit( 'event', { type: this.moduleName, action: cmd.action, data: cmd.data } );
        break;
     
    }
  }

  

}
//export {CommonSocket}
//export default (io) => new CommonSocket(io);