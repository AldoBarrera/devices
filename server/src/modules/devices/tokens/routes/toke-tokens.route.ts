import { Request, Response, NextFunction } from 'express';
import * as App from "../../../../common/route";
import {tokeTokensComponent as TokeTokensComponent}  from "../toke-tokens.component";

export class TokeTokensRoute extends App.CommonRouter {

    constructor(moduleName:string) {        
        super();
        this.dataRoute = "/tokens/";
        this.singleDataRoute= "/tokens/:id"; 
        this.dataRouteSearch = "/tokensSearch/";
        this.singleDataRouteToken = "/tokenUpdate/"
        this.commonComponent=TokeTokensComponent;
		this.moduleName = moduleName;

    } 

    async GetAllData(req: Request, res: Response, next: NextFunction) {
      super.GetAllDataByComp(req, res, next, TokeTokensComponent);
    }
	
	  async GetSingleData(req: Request, res: Response, next: NextFunction) {
      super.GetSingleDataByComp(req, res, next, TokeTokensComponent);
    }
	
	  async FindData(req: Request, res: Response, next: NextFunction) {
      super.FindDataByComp(req, res, next, TokeTokensComponent);
    }

    async InsertData(req: Request, res: Response, next: NextFunction) {
      super.InsertDataByComp(req, res, next, TokeTokensComponent);
    }

    async UpdateData(req: Request, res: Response, next: NextFunction) {
      super.UpdateDataByComp(req, res, next, TokeTokensComponent);
    }

    async DeleteData(req: Request, res: Response, next: NextFunction) {
      super.DeleteDataByComp(req, res, next, TokeTokensComponent);
    }

    async UpdateToken(req: Request, res: Response, next: NextFunction) {
      super.UpdateTokenByComp(req, res, next, TokeTokensComponent);
    }

    
}

