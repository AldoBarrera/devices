import { Component  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsEditComponent } from '../../../../common/commons-edit/commons-edit.component';

import {default as config} from '../../config/config.json';


import { TokensService } from '../shared/tokens.service';
import { FormsService } from '../../../../dynamicforms/forms/shared/forms.service';

@Component({
  selector: 'app-' + config['tokens'].component.nameModule.toLowerCase()  + '-addform',
  templateUrl: './tokens-edit.component.html',
  styleUrls: ['./tokens-edit.component.css'],
  providers:  [FormsService]
})
export class TokensEditComponent extends CommonsEditComponent {
 
  constructor(router: Router, route: ActivatedRoute, tokensService: TokensService, formsService: FormsService) 
  {    
    super(router, route, tokensService, formsService);    
    this.moduleName = config['tokens'].component.nameModule;
	  this.components = config;
  }

  createForm() {
    this.controlsJson = config['tokens'].model;
	  this.components = config;
    super.createForm();  
  }
  
}
