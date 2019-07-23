import { CommonsService } from '../shared/commons.service';
export abstract class CommonsRelations {


  public static setRelations(fields:any, components:any[], commonsService: CommonsService) {
    
    for (var field of fields) {
      var nameRelation = this.getRelations(field, components);
      if(nameRelation) {
        this.setField(field, nameRelation, components, commonsService)
      }
    }
  }

   public static populateRelations(data:any, components:any[], commonsService: CommonsService, callback:any = null)
  {
    for (var key in data) {
      data.key = key;
      var nameRelation = this.getRelations(data, components);
      if(nameRelation) {
        this.getField(data, nameRelation, components, commonsService, data[key], key, callback)
      }
    }
  }
  

  public static getRelations(field:any, components:any[]) {
    var prefix = field.key.split("_")[1];
    if (prefix != "") {
      for (var component in components) {
        if(components[component].component.prefix == prefix) {
          return {
            nameModule: components[component].component.nameModule,
            urlRelative: components[component].component.urlRelative
          }
        }      
      } 
    }       
    return null;
  }

  public static setField(field:any, nameRelation:any, components:any[], commonsService: CommonsService) {
    var fields = ['_id', field.selectRelation];
    commonsService.getAllCustomDataAsObserver(nameRelation.urlRelative, fields)
      .subscribe(
	  data => {this.setOptions(field, data);}
	  );
  }

  public static getField(field:any, nameRelation:any, components:any[], commonsService: CommonsService, id:string, key:string, callback:any = null) {
    var fields = ['_id', field.selectRelation];
    commonsService.getIdCustomDataAsObserver(nameRelation.urlRelative, fields, id)
      .subscribe(
	  data => {this.setProperty(field, data, key);if (callback) callback(field)}
	  );
  }

  public static setProperty(field:any,data:any, key:string) {
    field[key] = data;   
  }

  public static setOptions(field:any,data:any) {
    for(let value of data) {
      if(field.options.filter(val=> val.key == value['_id']).length == 0)
        field.options.push({"key": value['_id'],  "value": value[field.selectRelation]});
    }
   
  }
}
