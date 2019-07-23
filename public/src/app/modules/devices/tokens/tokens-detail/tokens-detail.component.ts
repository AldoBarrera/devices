import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsDetailComponent } from '../../../../common/commons-detail/commons-detail.component';

import {default as config} from '../../config/config.json';
import { TokensService } from '../shared/tokens.service';

@Component({
  selector: 'app-' + config['tokens'].component.nameModule.toLowerCase() + '-form',
  templateUrl: './tokens-detail.component.html',
  styleUrls: ['./tokens-detail.component.css']
})
export class TokensDetailComponent extends CommonsDetailComponent {
  
  constructor(router: Router, route: ActivatedRoute, tokensService: TokensService) 
  {
    super(router, route, tokensService);
    this.moduleName = config['tokens'].component.nameModule ;
  }
}
