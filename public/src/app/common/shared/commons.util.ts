import { CommonsRelations } from './commons.relations';
import { CommonsSocket } from './commons.socket';
import { CommonsService } from '../shared/commons.service';
export abstract class CommonsUtil {

  public static setRelations(fields:any, components:any[], commonsService: CommonsService, isPopulate:Boolean = false, callback:any = null) {
    if(isPopulate)
      CommonsRelations.populateRelations(fields, components, commonsService, callback);
    else
      CommonsRelations.setRelations(fields, components, commonsService);
  }

  

  public static getRemoteEvents(commonService:CommonsService,moduleName:string, method:any, self:any) {
    CommonsSocket.getRemoteEvents(commonService, moduleName, method, self);      
  }



  
}
