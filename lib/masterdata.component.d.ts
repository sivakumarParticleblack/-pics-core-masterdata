import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionStore } from './pics-masterdata/@core/permissions/permission.store';
import { DataStoreService } from './pics-masterdata/@core/service/data-store.service';
import { RBACINFO } from './pics-masterdata/@core/urls/rbac-url.config';
import * as i0 from "@angular/core";
export declare class MasterdataComponent implements OnInit {
    private permissionStore;
    private _storeservice;
    RBACORG?: RBACINFO;
    PERMISSION?: any;
    mastersEvent: Observable<any>;
    INPUTVALIDATIONMETHOD?: any;
    constructor(permissionStore: PermissionStore, _storeservice: DataStoreService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MasterdataComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MasterdataComponent, "masterdata", never, { "RBACORG": "RBACORG"; "PERMISSION": "PERMISSION"; "mastersEvent": "mastersEvent"; "INPUTVALIDATIONMETHOD": "INPUTVALIDATIONMETHOD"; }, {}, never, never>;
}
