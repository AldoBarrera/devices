import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { FormsComponent } from "./forms/forms.component";
import { ControlsComponent } from "./controls/controls.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatIconModule} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [
    FormsComponent,
    ControlsComponent

  ],
  exports: [
    FormsComponent,
    ControlsComponent,
    BrowserAnimationsModule
  ]
})
export class DynamicFormsModule { }
