import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonsService } from '../shared/commons.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './commons-detail.component.html',
  styleUrls: ['./commons-detail.component.css']
})
export class CommonsDetailComponent implements OnInit {

  form: FormGroup;
  title: string;
  protected data: any;
  protected date: string;
  protected moduleName: string;
  constructor(
    
    protected router: Router,
    protected route: ActivatedRoute,
    protected commonService: CommonsService
  ) {
    
  }

  ngOnInit() {
    
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = this.ngGetTitle(id);

      if (!id)
        return;
      this.ngPopulateData(id)
      
    });
  }

  ngPopulateData(id) {
    this.commonService.getDataByIdAsObserver(id)
        .subscribe(
          data => {this.data = data;this.responseData(this.data)},
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
  }

  responseData(data) {
    this.data = data
  }
  ngGetTitle(id) {
    return id ? 'Edit ' + this.moduleName : 'New ' + this.moduleName;
  }

}
