import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { TokensComponent } from "./tokens/tokens.component"; 
import { TokensService } from "./tokens/shared/tokens.service"; 
import { TokensDetailComponent } from "./tokens/tokens-detail/tokens-detail.component"; 
import { TokensAddComponent } from "./tokens/tokens-add/tokens-add.component"; 
import { TokensEditComponent } from "./tokens/tokens-edit/tokens-edit.component"; 
import { TokensSearchComponent } from "./tokens/tokens-search/tokens-search.component"; 
import { tokensRouting } from "./tokens/tokens.routing"; 


import { DynamicFormsModule } from '../../dynamicforms/dynamicforms.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
	tokensRouting, 

    DynamicFormsModule,
    
    

  ],
  declarations: [
    TokensComponent, 
TokensDetailComponent, 
TokensAddComponent, 
TokensEditComponent, 
TokensSearchComponent, 

  ],
  exports: [
    TokensComponent, 

  ],
  providers: [
    TokensService, 

  ]
})
export class DevicesModule { }
