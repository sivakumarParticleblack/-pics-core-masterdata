import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '../service/store.service';
@Injectable()
export class PermissionStore extends Store<any> {
  constructor() {
    super({});
  }

  setStore(data: any): void {
    if(data){
      this.setState({ ...this.state, ...data });
    }
  }

  getStore(type: string = 'P'): Observable<any> {
    if (type === 'P') return of(this.state);
    else return of(this.state);
  }

  private flat(array: any[]) {
    let result: any[] = [];
    if(array){
      array.forEach(item => {
        result.push(item);
        if (item && Array.isArray(item)) {
          result = result.concat(this.flat(item));
        }
      });
    }
    return result;
  }
}
