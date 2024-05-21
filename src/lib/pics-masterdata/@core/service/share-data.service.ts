import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {

  public data = new BehaviorSubject<string>('');

  constructor() {}
}
