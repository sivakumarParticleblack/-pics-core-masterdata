import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { TreeNode, MenuItem, ConfirmationService } from 'primeng/api';
import { PermissionStore } from '../@core/permissions/permission.store';
import { AlertService } from '../@core/service/alert.service';
import { RbacService } from '../@core/service/rbac.service';
import { DataStoreService } from '../@core/service/data-store.service';
import { Subscription } from 'rxjs';
import { RBACINFO } from '../@core/urls/rbac-url.config';
import { DxTreeListComponent } from 'devextreme-angular';
import * as i0 from "@angular/core";
export declare class MasterdataComponent implements OnInit {
    private mastersService;
    private formBuilder;
    private alertService;
    private confirmationService;
    private permissionStore;
    private _storeservice;
    treeList: DxTreeListComponent;
    updateLookUpForm: FormGroup;
    categories: TreeNode[];
    menuItems: MenuItem[];
    categoryForm: FormGroup;
    filterMasterList: any[];
    lookupForm: FormGroup;
    lookupRuleForm: FormGroup;
    roles: any[];
    permissions: any[];
    nodeType: string;
    saveMode: string;
    selectedItem: any;
    nodeselecttype: string;
    isGlobalLookup: boolean;
    pageErrorShow: boolean;
    dataControlActions: {
        value: string;
        name: string;
    }[];
    sortOrder: {
        value: string;
        name: string;
    }[];
    environment: any;
    RBACORG: RBACINFO;
    orgSubs: Subscription;
    orgId: any;
    selectedCategoryId: any;
    tasksData: any;
    rowEditMode: string;
    selectedEvent: any;
    pattern: any;
    orderPattern: any;
    allowDropInsideItem: boolean;
    allowReordering: boolean;
    showDragIcons: boolean;
    isEditMode: boolean;
    expandedRowKeys: Array<number>;
    edit: string;
    editbatch: string;
    batchEdit: string;
    visibleRows: any;
    isSaveDisabled: boolean;
    isReorderMode: boolean;
    selectedSortOrder: 'asc' | 'desc';
    activeTabIndex: number;
    lookuporder: FormControl;
    formSubmit: boolean;
    validationErrors: {
        [key: string]: string;
    };
    inputValidationMethod: any;
    constructor(mastersService: RbacService, formBuilder: FormBuilder, alertService: AlertService, confirmationService: ConfirmationService, permissionStore: PermissionStore, _storeservice: DataStoreService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    initializeCategoryForm(): void;
    clearCategory(): void;
    onInput(event: Event, fieldtype: any, label: any, required: boolean): void;
    onClickHome(): void;
    clearForm(): void;
    onClickAddCategory(): void;
    initNewRow(e: any): void;
    onCellPrepared(event: any): void;
    onEditCanceled(event: any): void;
    onToolbarPreparing(e: any): void;
    onRowValidating(e: any): void;
    handleTabClick(event: any): void;
    toggleEditMode(): void;
    toggleReorderMode(): void;
    onTabChange(event: any): void;
    onReorder(e: any): Promise<void>;
    sortGrid(order: any): Promise<void>;
    checkKeyDuplicate(params: any): boolean;
    checkValueDuplicate(params: any): boolean;
    nodeSelect(event: any): void;
    list(id: any): void;
    checkValidData(event: any): void;
    saveChanges(event: any): void;
    initializeLookupForm(): void;
    get lookupdata(): FormArray;
    addRule(): FormGroup;
    addlookupdata(): FormGroup;
    onAddLookUpData(): void;
    onDeleteLookupData(i: number): void;
    onClickdeleteCategory(): void;
    searchMaster(event: Event): void;
    clearSearch(): void;
    onNodeContextMenuSelect(event: any): void;
    setInsertEvent(): void;
    nodeExpand(event: any): void;
    saveCategory(): void;
    saveLookup(): void;
    createLookupForm(): void;
    setGlobal(checked: boolean): void;
    private loadContextMenu;
    private loadTree;
    cancel(): void;
    deleteItem(): void;
    requiredIfValidator(predicate: () => any): (formControl: AbstractControl) => import("@angular/forms").ValidationErrors;
    static ɵfac: i0.ɵɵFactoryDeclaration<MasterdataComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MasterdataComponent, "lib-masterdata", never, {}, {}, never, never>;
}
