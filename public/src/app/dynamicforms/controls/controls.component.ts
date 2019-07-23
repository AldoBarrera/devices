import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { Controls }     from './shared/controls';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html'
})
export class ControlsComponent {
  @Input() control: Controls<any>;
  @Input() form: FormGroup;
  get isValid() { 
    return this.form.controls[this.control.key].valid; 
  }


  isRequired() {
    return this.form.controls[this.control.key];
  }
  
}
