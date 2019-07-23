var mongoose = require('mongoose');

export class CommonComponent {
    name: string;
    modelDb: any;

    constructor() {
        
    }

    async GetAllData() {        
        const dataResponse = await this.modelDb.find();
        return dataResponse;
    }

    async GetPopulateData() {   
        var populate = "";
        for (let path in this.modelDb.schema.paths)  {            
            if ((path != 'id') && (path != '_id') && (path != '__v')  && (this.modelDb.schema.paths[path].instance == "ObjectID"))
              populate = populate + path + " ";
        }    
        const dataResponse = await this.modelDb.find().populate(populate);
        return dataResponse;
    }

    async GetAllRestrictData(restrict: any) {        
        const dataResponse = await this.modelDb.find({}, restrict);
        return dataResponse;
    }

    async GetPopulateDataById(dataId: any) {
        var populate = "";
        for (let path in this.modelDb.schema.paths)  {            
            if ((path != 'id') && (path != '_id') && (path != '__v')  && (this.modelDb.schema.paths[path].instance == "ObjectID"))
              populate = populate + path + " ";
        }  
        const dataResponse = await this.modelDb.findById(dataId).populate(populate);
        return dataResponse;
    }

    async GetDataById(dataId: any) {        
        const dataResponse = await this.modelDb.findById(dataId);
        return dataResponse;
    }

    async InsertData(data: any) {
	    data._id = !data._id || data._id == "" ? mongoose.Types.ObjectId():data._id;		
        const dataResponse = await this.modelDb.create(data);
        return dataResponse;
    }

    async UpdateData(query:any, update:any) {
        const dataResponse = await this.modelDb.update(query, update, {});
        return dataResponse; 
    }

    async FindData(query:any) {
        const dataResponse = await this.modelDb.find(query);
        return dataResponse; 
    }

    async FindOne(query:any) {
        const dataResponse = await this.modelDb.findOne(query);
        return dataResponse; 
    }

    async GetLastRecords(limit:any) {
        const dataResponse = await this.modelDb.find().sort({_id:-1}).limit(limit);
        return dataResponse; 
    }

    async GetLastRecord() {
        const dataResponse = await this.modelDb.findOne().sort({_id:-1});
        return dataResponse; 
    }
    async DeleteData(query:any) {
        const dataResponse = this.modelDb.deleteOne(query);
        return dataResponse; 
    }
}
