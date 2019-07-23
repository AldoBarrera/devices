import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonsService } from '../shared/commons.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './commons-search.component.html',
  styleUrls: ['./commons-search.component.css']
})
export class CommonsSearchComponent implements OnInit {

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
    
    this.route.queryParams.subscribe(params => {
      this.ngPopulateData(params)      
    });
  }

  ngPopulateData(params) {
    this.commonService.getDataByQueryAsObserver(params)
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
}
