import { Router, Request, Response, NextFunction } from 'express';
import keycloak from '../services/keycloack';
import * as App from "./socket";
import { Global } from "../types/global";
var qr = require('qr-image');  

export class CommonRouter extends App.CommonSocket{
  public router: Router
  public commonComponent: any
  public dataRoute: string
  public singleDataRoute: string 
  public dataRouteSearch: string   

  public singleDataRouteToken: string 
  constructor() {
    super();
    this.router = Router();  
      
  }

  public addSocket(io:any) {
    super.setSocket(io);
    super.connect();
  }
  async GetAllDataByComp(req: Request, res: Response, next: NextFunction, commonComponent: any) {
    let query = req.query;
    let dataResponse;
    let restrict = query.fields?JSON.parse(query.fields):null;
    if (restrict){
      dataResponse = await commonComponent.GetAllRestrictData(restrict);
    } else if(query.populate) {
      dataResponse = await commonComponent.GetPopulateData();
    } else {
      dataResponse = await commonComponent.GetAllData();
    }
    res.send(dataResponse);
  }

  async GetAllData(req: Request, res: Response, next: NextFunction) {
    res.send("Class needs to be implemented by the child");
  }
  async GetSingleDataByComp(req: Request, res: Response, next: NextFunction, commonComponent: any) {
    let id = req.params.id;
    let query = req.query;
    let dataResponse;
    if(query.populate) {
      dataResponse = await commonComponent.GetPopulateDataById(id);
    } else {
      dataResponse = await commonComponent.GetDataById(id);
    }
    res.send(dataResponse);
    
  }

  async FindData(req: Request, res: Response, next: NextFunction) {
    res.send("Class needs to be implemented by the child");
  }
  async FindDataByComp(req: Request, res: Response, next: NextFunction, commonComponent: any) {
    let query = req.query;
    const dataResponse = await commonComponent.FindData(query);
    res.send(dataResponse);
    
  }

  async GetSingleData(req: Request, res: Response, next: NextFunction) {    
    let id = req.params.id;
    const dataResponse = await this.commonComponent.GetDataById(id);
    res.send(dataResponse);  
  }

  async InsertDataByComp(req: Request, res: Response, next: NextFunction, commonComponent: any) {
    let data = req.body;
    data.took_qr = qr.imageSync(data.took_code, { type: 'svg' });
    const dataResponse = await commonComponent.InsertData(data);
    if(dataResponse) {
      const dataResponsePopulate = await commonComponent.GetPopulateDataById(dataResponse.id);
      res.send(dataResponsePopulate);
    } else {
      res.send(dataResponse);
    }   
    
  }

  public InsertData(req: Request, res: Response, next: NextFunction) {
    res.send("Class needs to be implemented by the child");
  }

  async UpdateDataByComp(req: Request, res: Response, next: NextFunction, commonComponent: any) {
    let data = req.body;
    data.took_qr = qr.imageSync(data.took_code, { type: 'svg' });
    let query = {_id:req.params.id};
    const dataResponse = await commonComponent.UpdateData(query, data);
    if (dataResponse.n == 1 && dataResponse.ok == 1) {
      const dataResponsePopulate = await commonComponent.GetPopulateDataById(req.params.id);
      Global.io.sockets.emit('event', { type: commonComponent.modelDb.modelName.split("_")[1], action: "edit", data: dataResponsePopulate });
      res.send(dataResponsePopulate);
    } else {
      res.send(dataResponse);
    }      
  }

  async UpdateTokenByComp(req: Request, res: Response, next: NextFunction, commonComponent: any) {
    let dataToUpdate = await commonComponent.GetLastRecord();
    let data = req.body;
    data.took_qr = qr.imageSync(data.took_code, { type: 'svg' });
    let query = {_id:dataToUpdate._id};
    const dataResponse = await commonComponent.UpdateData(query, data);
    if (dataResponse.n == 1 && dataResponse.ok == 1) {
      const dataResponsePopulate = await commonComponent.GetPopulateDataById(dataToUpdate._id);
      Global.io.sockets.emit('event', { type: commonComponent.modelDb.modelName.split("_")[1], action: "edit", data: dataResponsePopulate });
      res.send(dataResponsePopulate);
    } else {
      res.send(dataResponse);
    }      
  }

  public UpdateData(req: Request, res: Response, next: NextFunction) {
    res.send("Class needs to be implemented by the child");
  }

  public UpdateToken(req: Request, res: Response, next: NextFunction) {
    res.send("Class needs to be implemented by the child");
  }

  async DeleteDataByComp(req: Request, res: Response, next: NextFunction, commonComponent: any) {
    let query = {_id:req.params.id};
    const dataResponse = await commonComponent.DeleteData(query);
    res.send(dataResponse);
  }
  
  public DeleteData(req: Request, res: Response, next: NextFunction) {
    res.send("Class needs to be implemented by the child");
  }
  
  /*async validateRole(token, req: Request, res: Response) {
    return hasRole;
  }*/
  
  public validateRole(token, req: Request, res: Response) {
    return true;
  }
  
  public init() {
    
    this.router.get(this.dataRoute,  this.GetAllData);    
    this.router.get(this.singleDataRoute, this.GetSingleData);
	  this.router.get(this.dataRouteSearch,  this.FindData);
    this.router.post(this.dataRoute,  this.InsertData);
    this.router.put(this.singleDataRoute,  this.UpdateData);
    this.router.put(this.singleDataRouteToken,  this.UpdateToken);
    this.router.delete(this.singleDataRoute,  this.DeleteData);
  }

  public setAngularResponses(appExpress, router) {
    appExpress.use('/' + this.moduleName, router); 
	appExpress.use('/' + this.moduleName + '/:id', router); 
	appExpress.use('/' + this.moduleName + 'add', router); 
	appExpress.use('/' + this.moduleName + 'edit/:id', router); 
	appExpress.use('/' + this.moduleName + 'search', router); 
  }

  public setComponent(commonComponent:any) {    
    this.commonComponent = commonComponent;
  } 

}