import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DataStoreService {
  private currentStoreSubject = new BehaviorSubject<any>({} as any);
  public currentStore = this.currentStoreSubject.asObservable();

  constructor() {
    // test code
  }

  setData(key: string, value: any) {
    const currentStore = this.getCurrentStore();
    currentStore[key] = value;
    this.currentStoreSubject.next(currentStore);
  }

  setObject(value: any) {
    this.currentStoreSubject.next(value);
  }

  getData(key: string): any {
    const currentStore = this.getCurrentStore();
    return currentStore[key];
  }

  clearStore() {
    const currentStore = this.getCurrentStore();
    Object.keys(currentStore).forEach((key) => {
      delete currentStore[key];
    });
    this.currentStoreSubject.next(currentStore);
  }

  getCurrentStore(): any {
    return this.currentStoreSubject.value;
  }
}
