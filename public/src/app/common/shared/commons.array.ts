export class CommonsArray extends Array {

  public moduleName;
  private constructor(items) {
    super(...items)
  }

  static create(): CommonsArray {
    return Object.create(CommonsArray.prototype);
  }

  addElements(data: any[]) {
    for(let element of data) {
      this.push(element);
    }
  }

  addElementsMissing(data: any[]) {
    for(let element of data) {
      if(!this.exist(element))
        this.push(element);
      
    }
  }

   exist(element:any) {
    
    for(let i =0; i<this.length;i++) {
      if(element._id == this[i]._id ) {
        return true
      }
        
    }
    return false
   }
  

  addElement(element:any) {
    this.push(element);
    
  }

  editElement(elementEdit:any) {
    for(let i =0; i<this.length;i++) {
      if(elementEdit._id == this[i]._id ) {
        this[i] = elementEdit;
        break;
      }
        
    }
  }

  getElement(id:string) {
    for(let i =0; i<this.length;i++) {
      if(id == this[i]._id ) {
        return this[i];
      }
        
    }

  }
  removeElementByElement(element:any) {
    let elementfind = this.getElement(element._id) 
    var index = this.indexOf(elementfind); 
      if (index > -1) {
        this.splice(index, 1);
      }
  }
}

