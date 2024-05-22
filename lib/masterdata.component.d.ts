import { OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionStore } from './pics-masterdata/@core/permissions/permission.store';
import { DataStoreService } from './pics-masterdata/@core/service/data-store.service';
import { RBACINFO } from './pics-masterdata/@core/urls/rbac-url.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class MasterdataComponent implements OnInit, AfterViewInit {
    private permissionStore;
    private _storeservice;
    private fb;
    RBACORG?: RBACINFO;
    PERMISSION?: any;
    mastersEvent: Observable<any>;
    INPUTVALIDATIONMETHOD?: any;
    categoryForm: FormGroup;
    isTextOverflow: boolean;
    nameInput: ElementRef;
    constructor(permissionStore: PermissionStore, _storeservice: DataStoreService, fb: FormBuilder);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onInput(event: Event, fieldName: string, fieldLabel: string, isRequired: boolean): void;
    checkTextOverflow(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MasterdataComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MasterdataComponent, "masterdata", never, { "RBACORG": "RBACORG"; "PERMISSION": "PERMISSION"; "mastersEvent": "mastersEvent"; "INPUTVALIDATIONMETHOD": "INPUTVALIDATIONMETHOD"; }, {}, never, never>;
}
