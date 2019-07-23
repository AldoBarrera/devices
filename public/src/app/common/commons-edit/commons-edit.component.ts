import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsUtil } from '../shared/commons.util';
import { CommonsService } from '../shared/commons.service';
import { FormsService } from '../../dynamicforms/forms/shared/forms.service';
import { CommonsAddComponent } from '../commons-add/commons-add.component';
@Component({
  selector: 'app-dataedit-form',
  templateUrl: './commons-edit.component.html',
  styleUrls: ['./commons-edit.component.css'],
  providers:  [FormsService]
})
export class CommonsEditComponent extends CommonsAddComponent {
  public singledata: any;
  constructor(    
    protected router: Router,
    protected route: ActivatedRoute,
    protected commonService: CommonsService,
    protected formsService: FormsService
  ) {
    super(router, route, commonService, formsService); 
    
  }

  ngOnInit() {    
    this.route.params.subscribe(params => {
      var id = params['id'];    

      if (!id)
        return;
      this.ngPopulateData(id)      
    });   
  }

  ngPopulateData(id) {
    this.commonService.getDataByIdAsObserver(id)
        .subscribe(
          data => {this.addElements(data);this.responseData(this.singledata); },
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
  }

  addElements (data: any) {
    this.singledata = data
    /*let isRelation = false;
    for(let key in data)
    {
      let relation = key.split("_");
      if(key != "_id")
        isRelation = relation[relation.length-1] == "id"? true:false;
      if (isRelation)
        this.singledata[key] = data[key]._id;
      else
        this.singledata[key] = data[key];
    }*/
    
 }
  responseData(data) {    
    if (data) {
      this.form.setValue(data);
    } 
  }
  
  onCompleteForm(form) {
    this.form = form;
   }

  onSubmit(form) {
    if (!form) { return; }
    let singleData = this.singledata;
    this.commonService.editDataAsObserver(form, this.singledata._id).subscribe((data) => {
      this.commonService.data.editElement(data);
      this.commonService.sendCommand( { type: this.moduleName , data: data, action:"edit" } );  
      
         
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