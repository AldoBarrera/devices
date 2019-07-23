import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsService } from '../shared/commons.service';
import { CommonsUtil } from '../shared/commons.util';
import { FormsService } from '../../dynamicforms/forms/shared/forms.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './commons-add.component.html',
  styleUrls: ['./commons-add.component.css'],
  providers:  [FormsService]
})
export class CommonsAddComponent implements OnInit {
  controls : any = [];
  controlsJson : any = [];
  
  protected model: any = [];
  protected moduleName: string;
  protected components: any = [];
  public form:any;
  constructor(    
    protected router: Router,
    protected route: ActivatedRoute,
    protected commonService: CommonsService,
    protected formsService: FormsService
  ) {    
    this.controlsJson =  this.controlsJson.length == 0?this.getJasonControls():this.controlsJson.length;
    this.createForm();
    
  }

  //It si not necessary if we are using services
  createRemoteEvents(remoteMethod:any = null) {
    /*remoteMethod = !remoteMethod?this.remoteMethod:remoteMethod;   
    if(!this.commonService.subscribeSocketAdd)
      CommonsUtil.getRemoteEvents(this.commonService, this.moduleName, remoteMethod, this);  */   
  }

  remoteMethod(data:any, self) {
    /*self.commonService.data.push(data);*/
  }
  //--------------------------------------------

  createForm() {
    this.formsService.setFields(this.controlsJson);
    CommonsUtil.setRelations(this.controlsJson, this.components, this.commonService);
    this.controls = this.formsService.getFields();
  }

  ngOnInit() {
    
  }
  
  onSubmit(form) {
    if (!form) { return; }
    this.commonService.addDataAsObserver(form).subscribe((data) => {
      this.commonService.data.addElement(data);
      this.commonService.sendCommand( { type: this.moduleName , data: data, action:"add" } );       
    });
    
  }  

  getJasonControls() {
    return [{
      key: '__v',
      label: 'V',
      value: '',
      required: false,
      type: 'text',
      order: 1,
      control : 'textBox'
      },
      {
        key: '_id',
        label: 'Id',
        value: '',
        required: true,
        type: 'text',
        order: 1,
        control : 'textBox'
      },
      {
        key: 'comm_test',
        label: 'test',
        value: '',
        required: true,
        type: 'text',
        order: 1,
        control : 'textBox'
      }
    ]
  }
  
}