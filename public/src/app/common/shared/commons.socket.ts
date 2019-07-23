import { CommonsService } from '../shared/commons.service';
export abstract class CommonsSocket {

    public static getRemoteEvents(commonService:CommonsService,moduleName:string, method:any, self:any) {
      commonService.getRemoteEvents().subscribe( {
        next: evt => this.handleRemoteEvent( evt , moduleName, method, self)
      } ); 
  }

  public static handleRemoteEvent( evt , moduleName, method, self) {
    var serverMessage = JSON.stringify( evt );
    switch( evt.type ) {    
      case moduleName :
        console.log(moduleName);
        console.log( evt.data);
        if(method && evt.action == "add")
          method["add"]( evt.data, self );
        if(method && evt.action == "edit")
          method["edit"]( evt.data, self );
        if(method && evt.action == "delete")
          method["delete"]( evt.data, self );
        break;   
        
    }
  }



  
}
