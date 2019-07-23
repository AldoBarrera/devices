import express from 'express';
import * as App from "../../common/module" 

import * as TokeTokensRoute from "./tokens/routes/toke-tokens.route" 


class DevDevicesModule extends App.CommonModule {

    public addRoutes(appExpress:express.Application, router:any, io?: any) {  
		var tokeTokensRoute = new TokeTokensRoute.TokeTokensRoute('tokens'); 
    tokeTokensRoute.init();  
    if(io) 
        tokeTokensRoute.addSocket(io);  
    tokeTokensRoute.setAngularResponses(appExpress, router);  
    appExpress.use('/api/v1/device/', tokeTokensRoute.router); 
 
    }
}
export default new DevDevicesModule()
