import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionStore } from './pics-masterdata/@core/permissions/permission.store';
import { DataStoreService } from './pics-masterdata/@core/service/data-store.service';
import { RBACINFO } from './pics-masterdata/@core/urls/rbac-url.config';

@Component({
  selector: 'masterdata',
  template: `
      <lib-masterdata></lib-masterdata>
  `,
  styles: [
  ]
})
export class MasterdataComponent implements OnInit {
  @Input() public RBACORG?: RBACINFO = new RBACINFO();
  @Input() public PERMISSION?: any;
  @Input() public mastersEvent!: Observable<any>;
  @Input() public INPUTVALIDATIONMETHOD? : any;

  constructor(
    private permissionStore: PermissionStore,
    private _storeservice: DataStoreService
  ) {
  }
  ngOnInit() {
     this.mastersEvent.subscribe((val: any) => {
      this.RBACORG = val.RBACORG;
      this.PERMISSION = val.PERMISSION;
      this._storeservice.setData('RBACORG', this.RBACORG);
      this.permissionStore.setStore(this.PERMISSION);
      this._storeservice.setData('INPUTVALIDATIONMETHOD', this.INPUTVALIDATIONMETHOD);
      this._storeservice.setData('HTTPSERVICE',val.HTTPSERVICE)
    })
  }
}
