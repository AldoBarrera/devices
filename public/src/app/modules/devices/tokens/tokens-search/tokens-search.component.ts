import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsSearchComponent } from '../../../../common/commons-search/commons-search.component';

import {default as config} from '../../config/config.json';
import { TokensService } from '../shared/tokens.service';

@Component({
  selector: 'app-' + config['tokens'].component.nameModule.toLowerCase() + '-form',
  templateUrl: './tokens-search.component.html',
  styleUrls: ['./tokens-search.component.css']
})
export class TokensSearchComponent extends CommonsSearchComponent {
  
  constructor(router: Router, route: ActivatedRoute, tokensService: TokensService) 
  {
    super(router, route, tokensService);
    this.moduleName = config['tokens'].component.nameModule ;
  }
}
