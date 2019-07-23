import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { CommonsComponent } from './commons.component';
import { CommonsService } from './shared/commons.service';
import { CommonsDetailComponent } from './commons-detail/commons-detail.component';
import { CommonsAddComponent } from './commons-add/commons-add.component';
import { CommonsEditComponent } from './commons-edit/commons-edit.component';
import { DynamicFormsModule } from '../dynamicforms/dynamicforms.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    DynamicFormsModule
  ],
  declarations: [
    CommonsComponent,
    CommonsDetailComponent,
    CommonsAddComponent,
    CommonsEditComponent
  ],
  exports: [
    CommonsComponent
  ],
  providers: [
    CommonsService
  ]
})
export class CommonsModule { }
