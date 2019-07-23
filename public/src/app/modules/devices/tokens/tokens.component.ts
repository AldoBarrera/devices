import { Component, Input } from '@angular/core';
import {CommonsComponent} from "../../../common/commons.component";
import {default as config} from '../config/config.json';
import {TokensService} from "./shared/tokens.service";
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-' + config['tokens'].component.nameModule.toLowerCase() ,
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent extends CommonsComponent {

  @Input() datafromadd: any[] = [];
  displayString: any;
  constructor(private tokensService: TokensService, private sanitized: DomSanitizer) { 
    super(tokensService);
    this.moduleName = config['tokens'].component.nameModule  ;
  }
  ngOnInit() {
    this.displayString= this.sanitized.bypassSecurityTrustHtml("<svg><text data-card-text>Value I want to update</text></svg>");
    super.ngOnInit(); 
  }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  getQR(value) {    
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
