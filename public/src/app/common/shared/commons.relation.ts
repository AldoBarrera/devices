import { CommonsService } from '../shared/commons.service';
export abstract class CommonsRelation {


  public static setRelations(fields:any, components:any[], commonsService: CommonsService) {
    
    for (var field of fields) {
      var nameRelation = this.getRelation(field, components, commonsService);
      if(nameRelation) {
        this.setField(field, nameRelation, components, commonsService)
      }
    }
  }

  public static getRelation(field:any, components:any[], commonsService: CommonsService) {
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

  public static setOptions(field:any,data:any) {
    for(let value of data) {
      if(field.options.filter(val=> val.key == value['_id']).length == 0)
        field.options.push({"key": value['_id'],  "value": value[field.selectRelation]});
    }
   
  }
}
