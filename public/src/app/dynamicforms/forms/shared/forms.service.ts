import { Injectable }       from '@angular/core';

import { Controls }     from '../../controls/shared/controls';
import { Textbox }  from '../../controls/shared/controls-textbox';
import { Dropdown }  from '../../controls/shared/controls-dropdown';

@Injectable()
export class FormsService {
  
  public fields: Controls<any>[] = [];

  setFields(fields:any) {
    for (var field of fields) {
      if(field.control.toLowerCase() == "textbox") {
         this.fields.push(new Textbox(field))
      }
	  if(field.control.toLowerCase() == "dropdown") {
        this.fields.push(new Dropdown(field))
      } 	  
    }
  }
  getFields() {
    return this.fields.sort((a, b) => a.order - b.order);
  }
}
