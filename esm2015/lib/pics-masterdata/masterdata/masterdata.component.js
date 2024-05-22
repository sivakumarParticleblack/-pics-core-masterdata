import { __awaiter } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { RBACINFO } from '../@core/urls/rbac-url.config';
import { DxTreeListComponent } from 'devextreme-angular';
import * as i0 from "@angular/core";
import * as i1 from "../@core/service/rbac.service";
import * as i2 from "@angular/forms";
import * as i3 from "../@core/service/alert.service";
import * as i4 from "primeng/api";
import * as i5 from "../@core/permissions/permission.store";
import * as i6 from "../@core/service/data-store.service";
import * as i7 from "../@shared/alert/alert.component";
import * as i8 from "primeng/tree";
import * as i9 from "primeng/contextmenu";
import * as i10 from "primeng/confirmpopup";
import * as i11 from "primeng/card";
import * as i12 from "primeng/checkbox";
import * as i13 from "primeng/tabview";
import * as i14 from "primeng/dropdown";
import * as i15 from "devextreme-angular";
import * as i16 from "devextreme-angular/ui/nested";
import * as i17 from "../@core/directives/permission.directive";
import * as i18 from "primeng/inputtext";
import * as i19 from "primeng/tooltip";
import * as i20 from "@angular/common";
export class MasterdataComponent {
    constructor(mastersService, formBuilder, alertService, confirmationService, permissionStore, _storeservice) {
        this.mastersService = mastersService;
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.confirmationService = confirmationService;
        this.permissionStore = permissionStore;
        this._storeservice = _storeservice;
        this.menuItems = [];
        this.filterMasterList = [];
        this.selectedItem = {};
        this.pageErrorShow = false;
        this.dataControlActions = [
            { value: '', name: 'Select' },
            { value: 'HIDE', name: 'Hide' },
            { value: 'DISABLE', name: 'Disable' },
            { value: 'MASK', name: 'Mask' }
        ];
        this.sortOrder = [
            { value: 'asc', name: 'ASC' },
            { value: 'desc', name: 'DESC' }
        ];
        this.RBACORG = new RBACINFO();
        this.tasksData = [];
        this.rowEditMode = 'batch';
        this.pattern = /^[a-zA-Z0-9-_ ]+$/;
        //pattern: any = /^[a-zA-Z0-9,./ _*-]+$/;
        this.orderPattern = /^[0-9]+$/;
        this.allowDropInsideItem = true;
        this.allowReordering = false;
        this.showDragIcons = false;
        this.isEditMode = true;
        this.expandedRowKeys = [1];
        this.isSaveDisabled = false;
        this.isReorderMode = false;
        this.selectedSortOrder = 'asc';
        this.activeTabIndex = 0;
        this.formSubmit = false;
        this.validationErrors = {};
        this.nodeType = 'category';
        this.saveMode = 'INSERT';
        this.isGlobalLookup = true;
        this.selectedCategoryId = '';
        this.initializeCategoryForm();
        this.initializeLookupForm();
        this.showDragIcons = true;
        this.onReorder = this.onReorder.bind(this);
        this.checkKeyDuplicate = this.checkKeyDuplicate.bind(this);
        this.checkValueDuplicate = this.checkValueDuplicate.bind(this);
    }
    ngOnInit() {
        this.orgSubs = this._storeservice.currentStore.subscribe((res) => {
            this.inputValidationMethod = res['INPUTVALIDATIONMETHOD'];
            if (res['RBACORG'] && res['RBACORG'] !== '') {
                this.RBACORG = res['RBACORG'];
                console.log(this.RBACORG, 'RBACORG Permisson');
                this.environment = this.RBACORG['environment'];
                this.orgId = parseInt(this.RBACORG['orgID']);
                if (this.environment) {
                    this.loadTree();
                    this.loadContextMenu();
                    this.mastersService.getAllUserRole().subscribe((items) => {
                        this.roles = items.data;
                    });
                    this.mastersService.getPermissionsTree(this.environment.applicationid).subscribe((items) => {
                        this.permissions = items.data;
                    });
                }
            }
        });
    }
    ngOnDestroy() {
        this.orgSubs.unsubscribe();
    }
    initializeCategoryForm() {
        this.lookuporder = new FormControl();
        this.categoryForm = this.formBuilder.group({
            id: [0],
            applicationid: [this.environment ? this.environment['applicationid'] : ''],
            name: ['', Validators.required],
            description: [''],
            readonly: [false],
            isenabled: [true],
            lookuporder: this.lookuporder
        });
    }
    clearCategory() {
        //this.clearForm();
        this.formSubmit = false;
        this.validationErrors = {};
        this.initializeCategoryForm();
        this.mastersService.getLookupBycategoryID(this.selectedCategoryId).subscribe((item) => {
            const lookupdataitems = item['data'];
            this.categoryForm.patchValue({
                id: lookupdataitems.id,
                applicationid: lookupdataitems.applicationid,
                name: lookupdataitems.name,
                description: lookupdataitems.description,
                readonly: lookupdataitems.readonly,
                isenabled: lookupdataitems.isenabled,
            });
        });
    }
    onInput(event, fieldtype, label, required) {
        const error = this.inputValidationMethod(event, fieldtype, label, required);
        if (error && typeof error === 'string') {
            this.validationErrors[label] = error;
        }
        else {
            delete this.validationErrors[label];
        }
    }
    onClickHome() {
        this.saveMode = 'INSERT';
        this.nodeType = 'category';
        this.selectedCategoryId = '';
        this.clearForm();
        this.loadTree();
        this.formSubmit = false;
        this.validationErrors = {};
    }
    clearForm() {
        this.validationErrors = {};
        this.formSubmit = false;
        this.initializeCategoryForm();
        this.tasksData = [];
    }
    onClickAddCategory() {
        this.saveMode = 'INSERT';
        this.nodeType = 'category';
        this.selectedCategoryId = '';
        this.clearForm();
        this.loadTree();
    }
    // onClickDeleteCategory() {
    //   this.saveMode = 'DELETE';
    //   this.nodeType = this.selectedItem.type;
    //   $('#Deleteuser').modal('show');
    // }
    initNewRow(e) {
        e.data.order = 0;
        //e.data.id = 0;
        e.data.lookupcategoryid = this.selectedCategoryId;
    }
    onCellPrepared(event) {
        // The event parameter contains information about the Component data
        this.visibleRows = event.component.getVisibleRows();
    }
    onEditCanceled(event) {
        this.list(this.selectedCategoryId);
    }
    onToolbarPreparing(e) {
        let toolbarItems = e.toolbarOptions.items;
        // Modifies an existing item
        toolbarItems.forEach(function (item) {
            if (item.name === "searchPanel") {
                item.location = "before";
            }
        });
    }
    onRowValidating(e) {
        console.log('event', e);
        if (e.isValid == false) {
            this.alertService.error(`Please correct existing row-level validation(s).`);
        }
        // else {
        //     this.isSaveDisabled = false;
        //     const saveButton = e.element.find("[aria-label='Speichern']").dxButton("instance");
        //     saveButton.option("disabled", this.isSaveDisabled);
        // }
    }
    //   onRowValidating(e) {
    //     console.log('event', e);
    //     const saveButton = e.element.querySelector(".dx-treelist-save-button"); // Use the correct class name
    //     if (e.isValid === false) {
    //         this.isSaveDisabled = true;
    //        // saveButton.prop("disabled", true);
    //        // this.alertService.error(`Error: Duplicate value found`);
    //     } else {
    //         this.isSaveDisabled = false;
    //       //  saveButton.prop("disabled", false);
    //     }
    //  }
    handleTabClick(event) {
        console.log('Tab clicked:', event.itemData);
        if (event.itemData.text == 'Edit') {
            this.toggleEditMode();
        }
        if (event.itemData.text == 'Reorder') {
            this.toggleReorderMode();
        }
    }
    toggleEditMode() {
        this.isEditMode = true;
        this.batchEdit = "batch";
        this.isReorderMode = false;
        this.list(this.selectedCategoryId);
    }
    toggleReorderMode() {
        this.isEditMode = false;
        this.batchEdit = "";
        this.allowReordering = true;
        this.showDragIcons = true;
        this.isReorderMode = true;
        this.list(this.selectedCategoryId);
    }
    onTabChange(event) {
        // Handle tab change logic here
        console.log('Tab changed:', event.index);
        if (event.index === 0) {
            // Call your toggleEditMode() method
            this.toggleEditMode();
        }
        else if (event.index === 1) {
            // Call your toggleReorderMode() method
            this.toggleReorderMode();
        }
    }
    onReorder(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortOrder = 'custom';
            const visibleRows = e.component.getVisibleRows();
            const toIndex = this.tasksData.findIndex((item) => item.id === visibleRows[e.toIndex].data.id);
            const fromIndex = this.tasksData.findIndex((item) => item.id === e.itemData.id);
            this.tasksData.splice(fromIndex, 1);
            this.tasksData.splice(toIndex, 0, e.itemData);
            //moveItemInArray(this.tasksData, e.fromIndex, e.toIndex);
            this.tasksData.forEach((item, index) => {
                item.order = index + 1;
            });
            yield this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(() => __awaiter(this, void 0, void 0, function* () {
                yield this.list(this.selectedCategoryId);
            }));
        });
    }
    sortGrid(order) {
        return __awaiter(this, void 0, void 0, function* () {
            if (order === 'asc') {
                // Sort the grid in ascending order
                const sortOrder = 'asc';
                this.tasksData.sort((a, b) => a.value.localeCompare(b.value));
                this.tasksData.forEach((item, index) => item.order = index + 1);
                yield this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.list(this.selectedCategoryId);
                }));
            }
            else {
                // Sort the grid in descending order
                const sortOrder = 'desc';
                this.tasksData.sort((a, b) => b.value.localeCompare(a.value));
                this.tasksData.forEach((item, index) => item.order = index + 1);
                yield this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.list(this.selectedCategoryId);
                }));
            }
        });
    }
    checkKeyDuplicate(params) {
        if (params.data && params.data.key && params.data.key.length > 0) {
            const editedKey = params.data.key.trim().toLowerCase();
            const occurrences = this.visibleRows.filter((item) => {
                item.data.parentid = item.data.parentid == null ? 0 : item.data.parentid;
                params.data.parentid = params.data.parentid == null ? 0 : params.data.parentid;
                if (params.data.parentid == item.data.parentid) {
                    return item.data && item.data.key && item.data.key.trim().toLowerCase() === editedKey;
                }
            }).length;
            const isDuplicate = occurrences > 1;
            return !isDuplicate;
        }
    }
    checkValueDuplicate(params) {
        if (params.data && params.data.value && params.data.value.length > 0) {
            const editedValue = params.data.value.trim().toLowerCase();
            const occurrences = this.visibleRows.filter((item) => {
                item.data.parentid = item.data.parentid == null ? 0 : item.data.parentid;
                params.data.parentid = params.data.parentid == null ? 0 : params.data.parentid;
                if (params.data.parentid == item.data.parentid) {
                    return item.data && item.data.value && item.data.value.trim().toLowerCase() === editedValue;
                }
            }).length;
            const isDuplicate = occurrences > 1;
            return !isDuplicate;
        }
    }
    nodeSelect(event) {
        this.validationErrors = {};
        this.formSubmit = false;
        this.nodeselecttype = 'UPDATE';
        this.saveMode = 'UPDATE';
        this.nodeType = event.node.type;
        this.selectedEvent = event;
        this.selectedCategoryId = event.node.id;
        this.tasksData = [];
        this.activeTabIndex = 0; // Simulate tab change event to index 0
        this.onTabChange({ index: 0 });
    }
    list(id) {
        this.nodeselecttype = 'UPDATE';
        this.saveMode = 'UPDATE';
        this.nodeType = 'category';
        this.mastersService.getLookupBycategoryID(id).subscribe((item) => {
            const lookupdataitems = item['data'];
            this.categoryForm.patchValue({
                id: lookupdataitems.id,
                applicationid: lookupdataitems.applicationid,
                name: lookupdataitems.name,
                description: lookupdataitems.description,
                readonly: lookupdataitems.readonly,
                isenabled: lookupdataitems.isenabled,
                lookuporder: lookupdataitems.lookuporder
            });
            this.mastersService.getAllLookupBycategoryID(id).subscribe((nodes) => {
                this.tasksData = nodes.data;
            });
        });
    }
    checkValidData(event) {
        const validationRules = event.component.option('validationRules');
        const hasValidationErrors = validationRules.some((rule) => !rule.isValid);
        if (hasValidationErrors) {
            this.isSaveDisabled = true;
        }
        else {
            // Enable the Save icon
            this.isSaveDisabled = false;
        }
    }
    saveChanges(event) {
        console.log('addedItems', event);
        const changes = event.changes || [];
        let keysSet = new Set();
        let valuesSet = new Set();
        let lookupcategoryid;
        for (const change of changes) {
            if (change.type === 'update') {
                const originalData = this.tasksData.filter((originalItem) => originalItem.id === change.key);
                change.data = Object.assign(Object.assign({}, originalData[0]), change.data);
            }
        }
        // for (const change of changes) {
        //   if (change.type === 'insert' || change.type === 'update') {
        //     lookupcategoryid = change.data.lookupcategoryid;
        //     const item = change.data;
        //     // Check for duplicate keys and values
        //     if (keysSet.has(item.key)) {
        //       this.alertService.error(`Error: Duplicate key found - ${item.key}`);
        //       // Optionally, you can prevent further processing or handle the error differently.
        //     } else {
        //       keysSet.add(item.key);
        //     }
        //     if (valuesSet.has(item.value)) {
        //       this.alertService.error(`Error: Duplicate value found - ${item.value}`);
        //       // Optionally, you can prevent further processing or handle the error differently.
        //     } else {
        //       valuesSet.add(item.value);
        //     }
        //   }
        // }
        const request = {
            // keylist:  Array.from(keysSet),
            // valuelist: Array.from(valuesSet),
            data: changes,
            // lookupcategoryid: lookupcategoryid
        };
        // Make the API call
        this.mastersService.addOrUpdateLookup(request).subscribe(() => {
            // API call was successful, update UI or refresh data
            this.alertService.success('Updated Successfully');
            // this.loadTree();
            this.clearForm();
            this.nodeSelect(this.selectedEvent);
        }, (err) => {
            // Handle API call error without refreshing the data
            this.alertService.error(err.error.message);
        });
    }
    initializeLookupForm() {
        this.pageErrorShow = false;
        this.lookupForm = this.formBuilder.group({
            id: [0],
            lookupcategoryid: [0],
            parentid: [null],
            // optionaldata: this.formBuilder.group({
            //   rules: this.formBuilder.array([])
            // }),
            // access: this.formBuilder.group({
            //   assign: ['', [this.requiredIfValidator(() => !this.isGlobalLookup)]],
            //   view: ['', [this.requiredIfValidator(() => !this.isGlobalLookup)]]
            // }),
            lookupdata: this.formBuilder.array([this.addlookupdata()]),
            readonly: [false],
            global: [true],
            isenabled: [true]
        });
    }
    // get datarules() {
    //   return this.lookupForm.get('optionaldata.rules') as FormArray;
    // }
    get lookupdata() {
        return this.lookupForm.get('lookupdata');
    }
    addRule() {
        return this.formBuilder.group({
            roles: ['', Validators.required],
            permission: ['', Validators.required],
            action: ['', Validators.required]
        });
    }
    // onAddRule(): void {
    //   this.datarules.push(this.addRule());
    // }
    addlookupdata() {
        return this.formBuilder.group({
            key: ['', Validators.required],
            value: ['', Validators.required],
            order: [0]
        });
    }
    onAddLookUpData() {
        this.pageErrorShow = false;
        this.lookupdata.push(this.addlookupdata());
    }
    onDeleteLookupData(i) {
        this.lookupdata.removeAt(i);
    }
    // onDeleteRule(rowIndex: number): void {
    //   this.datarules.removeAt(rowIndex);
    // }
    onClickdeleteCategory() {
        // this.saveMode = 'DELETE';
        this.nodeType = this.selectedItem.type;
        $('#Deleteuser').modal('show');
    }
    searchMaster(event) {
        const value = event.target.value.toUpperCase();
        this.filterMasterList = this.categories.filter((a) => { var _a; return (_a = a['name']) === null || _a === void 0 ? void 0 : _a.toUpperCase().startsWith(value); });
    }
    clearSearch() {
        const inputElement = document.querySelector('.form-control');
        if (inputElement) {
            inputElement.value = '';
            this.filterMasterList = this.categories; // Reset the filtered list
        }
    }
    onNodeContextMenuSelect(event) {
        if (event.node.type === 'category') {
            const permission = this.permissionStore.state;
            this.menuItems = [
                // {
                //   label: 'Create Category',
                //   icon: PrimeIcons.ARROW_UP_LEFT,
                //   //visible: permission.SETTINGS_MAS_CREATE_CATOGORY,
                //   badge: 'SETTINGS_MAS_CREATE_CATOGORY',
                //   command: (createEvent: any) => {
                //     this.saveMode = 'INSERT';
                //     this.nodeType = 'category';
                //     this.selectedCategoryId = '';
                //     this.clearForm();
                //     this.loadTree();
                //     console.log(createEvent);
                //   }
                // },
                {
                    label: 'Delete',
                    icon: PrimeIcons.TRASH,
                    visible: permission.SETTINGS_MAS_DELETE,
                    badge: 'SETTINGS_MAS_DELETE',
                    command: deleteEvent => {
                        this.saveMode = 'DELETE';
                        this.nodeType = this.selectedItem.type;
                        $('#Deleteuser').modal('show');
                        // this.confirmationService.confirm({
                        //   target: deleteEvent.target,
                        //   message: 'Are you sure that you want to delete?',
                        //   icon: 'pi pi-exclamation-triangle',
                        //   accept: () => {
                        //     this.deleteItem();
                        //   },
                        //   reject: () => {
                        //     //not to be empty
                        //   }
                        // });
                    }
                }
            ];
        }
        else if (event.node.type === 'lookup') {
            this.menuItems = [
                {
                    label: 'Create Lookup',
                    icon: PrimeIcons.ARROW_DOWN_RIGHT,
                    command: _eventErase => {
                        this.setInsertEvent();
                    }
                },
                {
                    label: 'Delete',
                    icon: PrimeIcons.TRASH,
                    command: RemoveEvent => {
                        this.saveMode = 'DELETE';
                        this.nodeType = this.selectedItem.type;
                        console.log(RemoveEvent);
                        $('#Deleteuser').modal('show');
                        // this.confirmationService.confirm({
                        //   target: RemoveEvent.target,
                        //   message: 'Are you sure that you want to delete?',
                        //   icon: 'pi pi-exclamation-triangle',
                        //   accept: () => {
                        //     this.deleteItem();
                        //   },
                        //   reject: () => {
                        //     //not to be empty
                        //   }
                        // });
                    }
                }
            ];
        }
    }
    setInsertEvent() {
        this.saveMode = 'INSERT';
        this.nodeType = this.selectedItem.type;
        this.createLookupForm();
        // this.clearRules();
    }
    nodeExpand(event) {
        if (event.node && event.node.data && event.node.type !== 'lookup') {
            this.mastersService.getLookupTree(event.node.data).subscribe((nodes) => {
                const sortedChildren = nodes.data.sort((a, b) => a.value.localeCompare(b.value));
                event.node.children = sortedChildren;
            });
        }
    }
    saveCategory() {
        const category = this.categoryForm.value;
        this.formSubmit = true;
        category.applicationid = this.environment.applicationid;
        console.log(category);
        category.order = category.order ? Number(category.order) : 1;
        if (this.categoryForm.valid) {
            if (this.saveMode === 'INSERT') {
                this.mastersService.createCategory(category).subscribe((response) => {
                    this.alertService.success('Category created successfully.');
                    //this.selectedCategoryId = response.data;
                    this.cancel();
                    this.loadTree();
                    this.clearForm();
                }, (err) => this.alertService.error(err.error.message));
            }
            else {
                this.mastersService.updateCategory(category).subscribe(() => {
                    this.alertService.success('Category updated successfully.');
                    this.cancel();
                    this.list(this.selectedCategoryId);
                    this.loadTree();
                    this.clearForm();
                }, (err) => this.alertService.error(err.error.message));
            }
        }
        // else {
        //   this.alertService.error('Please Fill All Required Fields');
        // }
    }
    saveLookup() {
        this.pageErrorShow = true;
        const lookupdts = this.lookupForm.value;
        lookupdts.applicationid = this.environment.applicationid;
        lookupdts.order = lookupdts.order ? Number(lookupdts.order) : Number(1);
        if (this.lookupForm.valid) {
            delete lookupdts.readonly;
            lookupdts.lookup.order = lookupdts.lookup.order ? Number(lookupdts.lookup.order) : 1;
            // if (lookup.optionaldata && lookup.optionaldata.rules) {
            //   lookup.optionaldata.rules = lookup.optionaldata.rules.map((rule: any) => {
            //     rule.permission.parent = null;
            //     return rule;
            //   });
            // }
            if (this.saveMode === 'INSERT') {
                this.mastersService.createLookup(lookupdts).subscribe(() => {
                    this.alertService.success('Lookup created successfully.');
                    this.loadTree();
                    this.clearForm();
                }, (err) => this.alertService.error(err.error.message));
            }
            else {
                this.mastersService.updateLookup(lookupdts).subscribe(() => {
                    this.alertService.success('Lookup updated successfully.');
                    this.loadTree();
                    this.clearForm();
                }, (err) => this.alertService.error(err.error.message));
            }
        }
        else {
            // this.alertService.error('Invalid lookup data.');
        }
    }
    createLookupForm() {
        this.initializeLookupForm();
        this.setGlobal(true);
        if (this.nodeType === 'category') {
            this.nodeType = 'lookup';
            this.lookupForm.patchValue({
                lookupcategoryid: this.selectedItem.id
            });
        }
        else {
            this.lookupForm.patchValue({
                lookupcategoryid: this.selectedItem.lookupcategoryid,
                parentid: this.selectedItem.id
            });
        }
    }
    setGlobal(checked) {
        var _a;
        this.isGlobalLookup = checked;
        (_a = this.lookupForm.get('access')) === null || _a === void 0 ? void 0 : _a.patchValue({
            view: [],
            assign: []
        });
    }
    loadContextMenu() {
        this.menuItems = [
            {
                label: 'Create Category',
                icon: PrimeIcons.ARROW_UP_LEFT,
                command: (event) => {
                    this.saveMode = 'INSERT';
                    this.nodeType = 'category';
                    this.clearForm();
                    console.log(event);
                }
            },
            {
                label: 'Create Lookup',
                icon: PrimeIcons.ARROW_DOWN_RIGHT,
                command: _eventNode => {
                    this.setInsertEvent();
                }
            },
            {
                label: 'Delete',
                icon: PrimeIcons.TRASH,
                command: event => {
                    this.saveMode = 'DELETE';
                    this.nodeType = this.selectedItem.type;
                    console.log(event);
                    $('#Deleteuser').modal('show');
                    // this.confirmationService.confirm({
                    //   target: event.target,
                    //   message: 'Are you sure that you want to delete?',
                    //   icon: 'pi pi-exclamation-triangle',
                    //   accept: () => {
                    //     //confirm action
                    //     this.deleteItem();
                    //   },
                    //   reject: () => {
                    //     // This is intentional
                    //   }
                    // });
                }
            }
        ];
    }
    loadTree() {
        this.pageErrorShow = false;
        this.mastersService.getAllCategoryTree(this.environment.applicationid).subscribe((items) => {
            this.categories = items;
            if (this.categories.length) {
                // this.selectedItem = this.categories[0];
                if (this.selectedCategoryId) {
                    const index = this.categories.findIndex((category) => category.id === this.selectedCategoryId);
                    if (index !== -1) {
                        this.selectedItem = this.categories[index];
                    }
                }
                this.filterMasterList = this.categories;
            }
        });
        this.clearSearch();
    }
    cancel() {
        this.categoryForm.reset();
        this.formSubmit = false;
    }
    deleteItem() {
        this.saveMode = 'UPDATE';
        if (this.selectedItem.type === 'lookup') {
            this.mastersService.deleteLookup(this.selectedItem.id).subscribe((_item) => {
                this.cancel();
                $('#Deleteuser').modal('hide');
                this.alertService.success('Lookup deleted successfully.');
                this.loadTree();
            });
        }
        else {
            this.mastersService.deleteCategory(this.selectedItem.id).subscribe((_item) => {
                this.cancel();
                $('#Deleteuser').modal('hide');
                this.alertService.success('Category deleted successfully.');
                this.selectedCategoryId = '';
                this.onClickHome();
            });
        }
    }
    requiredIfValidator(predicate) {
        return (formControl) => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return Validators.required(formControl);
            }
            return null;
        };
    }
}
MasterdataComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent, deps: [{ token: i1.RbacService }, { token: i2.FormBuilder }, { token: i3.AlertService }, { token: i4.ConfirmationService }, { token: i5.PermissionStore }, { token: i6.DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
MasterdataComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MasterdataComponent, selector: "lib-masterdata", viewQueries: [{ propertyName: "treeList", first: true, predicate: DxTreeListComponent, descendants: true }], ngImport: i0, template: "<head>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn3.devexpress.com/jslib/23.2.3/css/dx.material.blue.light.css\" />\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\" integrity=\"sha384-dfST6o4eMl42MOv72d7aMR3zdTtiErUq6nhB65eA6ATlFAq1RfiaDJt9FCx0X1o5\" crossorigin=\"anonymous\">\n</head>\n<app-alert></app-alert>\n<div class=\"permission\">\n  <div class=\"row\">\n    <div class=\"col-lg-4 col-md-6 col-12\">\n      <div class=\"clearfix\"></div>\n      <div class=\"tab-content py-2\">\n        <div class=\"tab-pane fade show active\">\n          <div class=\"row\">\n            <div class=\"col-md-10 col-12 form-group bgiconsearch pr-1\">\n              <span class=\"p-input-icon-right w-100\">\n                <i class=\"pi pi-times-circle\" (click)=\"clearSearch()\"></i>\n                <input class=\"form-control\" placeholder=\"Search by Category name\" type=\"text\" (keyup)=\"searchMaster($event)\"\n                  fieldKey=\"SETTINGS_MAS_SEARCH_BY_NAME\" pInputText />\n              </span>\n            </div>\n            <div class=\"col-md-2 col-12 form-group pl-0 text-md-right\">\n              <button type=\"button\" class=\"btn btn-primary btncommon\" (click)=\"onClickAddCategory()\">Add</button>\n            </div>\n          </div>\n          <div class=\"clearfix\"></div>\n          <div class=\"masteracess\">\n            <p-tree [value]=\"filterMasterList\" selectionMode=\"single\" [(selection)]=\"selectedItem\"\n              (onNodeSelect)=\"nodeSelect($event)\">\n            </p-tree>\n            <p-contextMenu #treeContextMenu [model]=\"menuItems\" appendTo=\"body\"></p-contextMenu>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-lg-8 col-md-6 col-12 master-right mt-2\">\n      <p-confirmPopup></p-confirmPopup>\n      <p-card id=\"categoryForm\" class=\"rbac-card\" [formGroup]=\"categoryForm\"\n        [style]=\"{ width: '100%', 'margin-bottom': '1em' }\">\n\n        <input id=\"cid\" type=\"hidden\" formControlName=\"id\" />\n        <input id=\"capplicationid\" type=\"hidden\" formControlName=\"applicationid\" />\n\n        <div class=\"p-fluid p-formgrid p-grid\">\n          <div class=\"col-md-12 col-12 mb-3\">\n            <div class=\"strip_head toggleleft m-0 p-0\">\n              <span class=\"report_head font-weight-bold\">{{saveMode === 'INSERT' ? 'Add Category' : 'Update Category'}}</span>\n            </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12 col-12 mb-3\">\n            <label for=\"mName\" class=\"referral-form-labels\">Name\n              <span class=\"requiredfield text-danger\">*</span>\n            </label>\n            <div pTooltip=\"{{ categoryForm.get('name').value }}\" tooltipPosition=\"top\" class=\"text-truncate\">\n                <input id=\"mName\" type=\"text\" formControlName=\"name\" fieldKey=\"SETTINGS_MAS_NAME\" placeholder=\"Enter Name\" aria-describedby=\"mName\" \n                (input)=\"onInput($event, 'name', 'Category Name', true)\" pInputText class=\"wide-input\" />\n            </div>\n            <div *ngIf=\"validationErrors['Category Name']\" class=\"p-error block mt-1\">{{validationErrors['Category Name']}}</div>\n            <div *ngIf=\"!validationErrors['Category Name'] && \n            categoryForm.controls['name'].invalid &&\n            categoryForm.controls['name'].hasError('required') && categoryForm.controls['name'].errors && formSubmit\">\n              <div *ngIf=\"categoryForm.controls['name'].hasError('required')\" class=\"p-error block mt-1\">Category Name is required</div>\n            </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12 col-12 mb-3\">\n            <label for=\"cdescription\" class=\"referral-form-labels\">Description </label>\n            <input id=\"cdescription\" type=\"text\" formControlName=\"description\" fieldKey=\"SETTINGS_MAS_DESCRYPTION\"\n              placeholder=\"Enter Description\" aria-describedby=\"cdescription\"\n              (input)=\"onInput($event, 'description', 'Description', false)\" pInputText class=\"wide-input\" />\n              <div *ngIf=\"validationErrors['Description']\" class=\"p-error block mt-1\">{{validationErrors['Description']}}</div>\n          </div>\n          <div class=\"col-lg-3 col-md-12 col-12 mb-3\">\n            <label for=\"corder\" class=\"referral-form-labels d-none d-lg-inline-block\">&#160;</label>\n            <div class=\"d-flex align-items-center\" style=\"height: 32px;\">\n              <p-checkbox st inputId=\"active\" [binary]=\"true\" formControlName=\"isenabled\" fieldKey=\"SETTINGS_MAS_ACTIVE\"\n                label=\"Active\"></p-checkbox>\n            </div>\n          </div>\n        </div>\n       <div class=\"mt-2 text-right\">\n          <button class=\"mb-2 btn btn-danger\"\n            fieldKey=\"SETTINGS_MAS_CANCEL\" (click)=\"onClickdeleteCategory()\" *ngIf=\"saveMode === 'UPDATE'\">\n            Delete\n          </button>\n          <button class=\"mb-2 btn bg-white text-primary border border-primary btncancel\"\n            fieldKey=\"SETTINGS_MAS_CANCEL\" (click)=\"clearCategory()\">\n            Cancel\n          </button>\n          <button class=\"mb-2 btn btn-primary btncommon\" fieldKey=\"SETTINGS_MAS_ADD_CATOGORY\"\n            (click)=\"saveCategory()\">\n            {{ saveMode === 'UPDATE' ? 'Update' : 'Save' }}\n          </button>\n        </div>\n      </p-card>\n\n      <div id=\"tree-list-demo\" *ngIf=\"selectedCategoryId != '' \">\n        <style>\n          #lookuptasks .dx-datagrid-rowsview .dx-row {\n            border-bottom: 1px solid #ddd;\n          }\n          #lookuptasks .dx-header-row .dx-header-cell {\n            font-weight: bold;\n          }\n          #searchpanel .dx-datagrid-search-panel {\n            margin-left: 0px;\n            padding-left: 0px;\n          }\n        </style>\n\n        <p-tabView #tabView [(activeIndex)]=\"activeTabIndex\" (onChange)=\"onTabChange($event)\">\n          <p-tabPanel header=\"Edit\">\n              <!-- Content for the Edit tab -->\n          </p-tabPanel>\n          <p-tabPanel header=\"Reorder\">\n              <!-- Content for the Reorder tab -->\n          </p-tabPanel>\n          </p-tabView>\n        <div class=\"sort-options col-lg-3 col-md-12 col-12 mb-3\" *ngIf=\"isReorderMode\">\n          <form [formGroup]=\"categoryForm\">\n            <p-dropdown\n              [options]=\"sortOrder\"\n              placeholder=\"Select a Order\"\n              formControlName=\"lookuporder\"\n              optionLabel=\"name\"\n              optionValue=\"value\"\n              styleClass=\"icon-dropdown\"\n              (onChange)=\"sortGrid($event.value)\">\n            </p-dropdown>\n          </form>\n        </div>\n        <dx-tree-list\n          id=\"lookuptasks\"\n          [dataSource]=\"tasksData\"\n          keyExpr=\"id\"\n          parentIdExpr=\"parentid\"\n          [columnAutoWidth]=\"true\"\n          [wordWrapEnabled]=\"true\"\n          [showBorders]=\"true\"\n          (onInitNewRow)=\"initNewRow($event)\"\n          (onSaving)=\"saveChanges($event)\"\n          (onCellPrepared)=\"onCellPrepared($event)\"\n          (onEditCanceled)=\"onEditCanceled($event)\"\n          (onToolbarPreparing)=\"onToolbarPreparing($event)\"\n          (onRowValidating)=\"onRowValidating($event)\"\n        >\n          <dxo-sorting mode=\"none\"></dxo-sorting>\n          <dxo-search-panel id=\"searchpanel\" class=\"dx-datagrid-search-panel\" [visible]=\"isEditMode\" [width]=\"300\" [style]=\"{ 'position': 'absolute', 'left': '0' }\"></dxo-search-panel>\n          <dxo-editing\n            mode=\"batch\"\n            [allowAdding]=\"isEditMode\"\n            [allowUpdating]=\"isEditMode\"\n            [allowDeleting]=\"isEditMode\"\n            [useIcons]=\"true\">\n          </dxo-editing>\n          <dxo-row-dragging\n            [allowReordering]=\"!isEditMode\"\n            [onReorder]=\"onReorder\"\n            [showDragIcons]=\"false\">\n          </dxo-row-dragging>\n          <dxo-header-filter>\n            <style>\n              #lookuptasks .dx-header-row .dx-header-cell {\n                font-weight: bold;\n              }\n            </style>\n          </dxo-header-filter>\n\n          <dxi-column class=\"dx-header-row\" dataField=\"key\" caption=\"Key\" [minWidth]=\"200\" [maxWidth]=\"200\">\n            <div class=\"required-header\">\n              Key<span class=\"required-marker\">*</span>\n            </div>\n            <dxi-validation-rule type=\"required\" message=\"Key is required\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"pattern\" [pattern]=\"pattern\" message=\"Allowed input - Alpha numeric, hyphen, underscore and space.\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"stringLength\" [max]=\"50\" message=\"Key limit - 50 characters\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"custom\" [validationCallback]=\"checkKeyDuplicate\" message=\"Key Already Exists\"></dxi-validation-rule>\n          </dxi-column>\n          <dxi-column class=\"dx-header-row\" dataField=\"value\" caption=\"Value\" [minWidth]=\"250\" [maxWidth]=\"250\">\n            <dxi-validation-rule type=\"required\" message=\"Value is required\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"stringLength\" [max]=\"250\" message=\"Value limit - 250 characters\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"custom\" [validationCallback]=\"checkValueDuplicate\" message=\"Value Already Exists\"></dxi-validation-rule>\n          </dxi-column>\n        </dx-tree-list>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal\" id=\"Deleteuser\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">Delete {{this.selectedItem.type === 'lookup' ? 'Lookup' : 'Category'}}</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Are you sure you want to delete the {{this.selectedItem.type === 'lookup' ? 'Lookup' : 'Category'}}?\n        <div class=\"clearfix\"></div>\n        <div class=\"mt-2\">\n          <button class=\"pull-right mb-2 btn btn-primary btncommon delete\" data-dismiss=\"modal\" (click)=\"deleteItem()\">\n            Delete\n          </button>\n          <button class=\"pull-right mb-2 mr-2 btn bg-white text-primary btncancel\" data-dismiss=\"modal\">Cancel</button>\n        </div>\n        <div class=\"clearfix\"></div>\n      </div>\n    </div>\n  </div>\n</div>", styles: ["@import\"devextreme/dist/css/dx.common.css\";@import\"devextreme/dist/css/dx.light.css\";.head-div{padding-top:9px;padding-left:7px}.bgiconsearch{margin-bottom:5px;padding-bottom:0;font-size:var(--base-font-size)}.masteracess{border:solid 1px var(--table-border);border-radius:2px;padding:5px 0;overflow-y:auto;background:var(--bg-light);max-height:calc(100vh - 243px);min-height:calc(100vh - 237px)}.masterempty{max-width:none;border-radius:50%;height:40px;width:40px}.row.masterdata{margin:0;border-bottom:solid 1px var(--table-border);padding:5px 0;cursor:pointer}.overflow_txt{overflow:hidden;text-overflow:ellipsis}span.namemaster{font-size:var(--base-font-size);color:#000}.masterid,span.emailmaster{font-size:var(--base-font-size);color:#9b9b9b}span.deletemaster{position:absolute;top:0px;right:15px;z-index:9;width:20px;float:right;cursor:pointer}span.deletemaster img{width:12px}.wide-input{width:100%}.activate{position:absolute;margin-top:-46px;margin-left:44rem}.toggleleft{font-size:13px;font-weight:600;display:block;margin-top:-12px;padding-bottom:13px}.report_button{margin-left:12px}:host ::ng-deep .ui-tree.permission-tree{width:100%}:host ::ng-deep .p-datatable .p-datatable-header{background:var(--background-color);color:var(--text-dark);border-color:var(--table-border)}:host ::ng-deep .p-datatable .p-datatable-thead tr th{background:var(--background-color);color:var(--text-dark);border-color:var(--table-border)}.p-datatable-wrapper tr td{text-align:left;border:none;padding:15px 8px;vertical-align:top}.p-datatable-wrapper tr td input{width:100%}.p-datatable-wrapper tr td button i{color:#f92929}::ng-deep #tree-list-demo{min-height:700px}::ng-deep #tasks{max-height:700px}.highlighted-row{background-color:#cbe4a9}.tab-container{display:flex;margin-bottom:10px}.tab-button{cursor:pointer;padding:10px;background-color:#f2f2f2;margin-right:5px;border-bottom:1px solid var(--table-border);background-color:var(--bg-light)}.tab-button.active{background-color:#ddd}.dx-datagrid-search-panel{margin-left:0;padding-left:0}.required-header{position:relative}.required-marker{color:red;margin-left:4px}:host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus{box-shadow:none}:host ::ng-deep .icon-dropdown li.p-dropdown-item{padding:.5rem 15px!important}:host ::ng-deep .icon-dropdown li.p-dropdown-item.p-highlight .userempty,:host ::ng-deep .icon-dropdown li.p-dropdown-item:hover .userempty,:host ::ng-deep .icon-dropdown li.p-dropdown-item:focus .userempty{color:#fff}:host ::ng-deep .icon-dropdown .userempty{height:inherit;padding:0;justify-content:start;font-size:19px;width:25px}:host ::ng-deep .p-card .p-card-content{padding:0}\n", "\n          #lookuptasks .dx-datagrid-rowsview .dx-row {\n            border-bottom: 1px solid #ddd;\n          }\n          #lookuptasks .dx-header-row .dx-header-cell {\n            font-weight: bold;\n          }\n          #searchpanel .dx-datagrid-search-panel {\n            margin-left: 0px;\n            padding-left: 0px;\n          }\n        ", "\n              #lookuptasks .dx-header-row .dx-header-cell {\n                font-weight: bold;\n              }\n            "], components: [{ type: i7.AlertComponent, selector: "app-alert" }, { type: i8.Tree, selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "togglerAriaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filteredNodes", "filterLocale", "scrollHeight", "virtualScroll", "virtualNodeHeight", "minBufferPx", "maxBufferPx", "indentation", "trackBy"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onFilter"] }, { type: i9.ContextMenu, selector: "p-contextMenu", inputs: ["model", "global", "target", "style", "styleClass", "appendTo", "autoZIndex", "baseZIndex", "triggerEvent"], outputs: ["onShow", "onHide"] }, { type: i10.ConfirmPopup, selector: "p-confirmPopup", inputs: ["key", "defaultFocus", "showTransitionOptions", "hideTransitionOptions", "autoZIndex", "baseZIndex", "style", "styleClass", "visible"] }, { type: i11.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { type: i12.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }, { type: i13.TabView, selector: "p-tabView", inputs: ["orientation", "style", "styleClass", "controlClose", "scrollable", "activeIndex"], outputs: ["onChange", "onClose", "activeIndexChange"] }, { type: i13.TabPanel, selector: "p-tabPanel", inputs: ["closable", "headerStyle", "headerStyleClass", "cache", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "selected", "disabled", "header", "leftIcon", "rightIcon"] }, { type: i14.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear"] }, { type: i15.DxTreeListComponent, selector: "dx-tree-list", inputs: ["accessKey", "activeStateEnabled", "allowColumnReordering", "allowColumnResizing", "autoExpandAll", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columns", "columnWidth", "customizeColumns", "dataSource", "dataStructure", "dateSerializationFormat", "disabled", "editing", "elementAttr", "errorRowEnabled", "expandedRowKeys", "expandNodesOnFiltering", "filterBuilder", "filterBuilderPopup", "filterMode", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "focusedColumnIndex", "focusedRowEnabled", "focusedRowIndex", "focusedRowKey", "focusStateEnabled", "hasItemsExpr", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "itemsExpr", "keyboardNavigation", "keyExpr", "loadPanel", "noDataText", "pager", "paging", "parentIdExpr", "remoteOperations", "renderAsync", "repaintChangesOnly", "rootValue", "rowAlternationEnabled", "rowDragging", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selection", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sorting", "stateStoring", "tabIndex", "toolbar", "twoWayBindingEnabled", "visible", "width", "wordWrapEnabled"], outputs: ["onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDisposing", "onEditCanceled", "onEditCanceling", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInitialized", "onInitNewRow", "onKeyDown", "onNodesInitialized", "onOptionChanged", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onSelectionChanged", "onToolbarPreparing", "accessKeyChange", "activeStateEnabledChange", "allowColumnReorderingChange", "allowColumnResizingChange", "autoExpandAllChange", "autoNavigateToFocusedRowChange", "cacheEnabledChange", "cellHintEnabledChange", "columnAutoWidthChange", "columnChooserChange", "columnFixingChange", "columnHidingEnabledChange", "columnMinWidthChange", "columnResizingModeChange", "columnsChange", "columnWidthChange", "customizeColumnsChange", "dataSourceChange", "dataStructureChange", "dateSerializationFormatChange", "disabledChange", "editingChange", "elementAttrChange", "errorRowEnabledChange", "expandedRowKeysChange", "expandNodesOnFilteringChange", "filterBuilderChange", "filterBuilderPopupChange", "filterModeChange", "filterPanelChange", "filterRowChange", "filterSyncEnabledChange", "filterValueChange", "focusedColumnIndexChange", "focusedRowEnabledChange", "focusedRowIndexChange", "focusedRowKeyChange", "focusStateEnabledChange", "hasItemsExprChange", "headerFilterChange", "heightChange", "highlightChangesChange", "hintChange", "hoverStateEnabledChange", "itemsExprChange", "keyboardNavigationChange", "keyExprChange", "loadPanelChange", "noDataTextChange", "pagerChange", "pagingChange", "parentIdExprChange", "remoteOperationsChange", "renderAsyncChange", "repaintChangesOnlyChange", "rootValueChange", "rowAlternationEnabledChange", "rowDraggingChange", "rtlEnabledChange", "scrollingChange", "searchPanelChange", "selectedRowKeysChange", "selectionChange", "showBordersChange", "showColumnHeadersChange", "showColumnLinesChange", "showRowLinesChange", "sortingChange", "stateStoringChange", "tabIndexChange", "toolbarChange", "twoWayBindingEnabledChange", "visibleChange", "widthChange", "wordWrapEnabledChange"] }, { type: i16.DxoSortingComponent, selector: "dxo-sorting", inputs: ["ascendingText", "clearText", "descendingText", "mode", "showSortIndexes"] }, { type: i16.DxoSearchPanelComponent, selector: "dxo-search-panel", inputs: ["highlightCaseSensitive", "highlightSearchText", "placeholder", "searchVisibleColumnsOnly", "text", "visible", "width"], outputs: ["textChange"] }, { type: i16.DxoEditingComponent, selector: "dxo-editing", inputs: ["allowAdding", "allowDeleting", "allowUpdating", "changes", "confirmDelete", "editColumnName", "editRowKey", "form", "mode", "newRowPosition", "popup", "refreshMode", "selectTextOnEditStart", "startEditAction", "texts", "useIcons", "allowAddShape", "allowChangeConnection", "allowChangeConnectorPoints", "allowChangeConnectorText", "allowChangeShapeText", "allowDeleteConnector", "allowDeleteShape", "allowMoveShape", "allowResizeShape", "allowDependencyAdding", "allowDependencyDeleting", "allowResourceAdding", "allowResourceDeleting", "allowResourceUpdating", "allowTaskAdding", "allowTaskDeleting", "allowTaskResourceUpdating", "allowTaskUpdating", "enabled", "allowDragging", "allowResizing", "allowTimeZoneEditing"], outputs: ["changesChange", "editColumnNameChange", "editRowKeyChange"] }, { type: i16.DxoRowDraggingComponent, selector: "dxo-row-dragging", inputs: ["allowDropInsideItem", "allowReordering", "autoScroll", "boundary", "container", "cursorOffset", "data", "dragDirection", "dragTemplate", "dropFeedbackMode", "filter", "group", "handle", "onAdd", "onDragChange", "onDragEnd", "onDragMove", "onDragStart", "onRemove", "onReorder", "scrollSensitivity", "scrollSpeed", "showDragIcons"] }, { type: i16.DxoHeaderFilterComponent, selector: "dxo-header-filter", inputs: ["allowSearch", "dataSource", "groupInterval", "height", "searchMode", "width", "searchTimeout", "texts", "visible", "showRelevantValues"] }, { type: i16.DxiColumnComponent, selector: "dxi-column", inputs: ["alignment", "allowEditing", "allowExporting", "allowFiltering", "allowFixing", "allowGrouping", "allowHeaderFiltering", "allowHiding", "allowReordering", "allowResizing", "allowSearch", "allowSorting", "autoExpandGroup", "buttons", "calculateCellValue", "calculateDisplayValue", "calculateFilterExpression", "calculateGroupValue", "calculateSortValue", "caption", "cellTemplate", "columns", "cssClass", "customizeText", "dataField", "dataType", "editCellTemplate", "editorOptions", "encodeHtml", "falseText", "filterOperations", "filterType", "filterValue", "filterValues", "fixed", "fixedPosition", "format", "formItem", "groupCellTemplate", "groupIndex", "headerCellTemplate", "headerFilter", "hidingPriority", "isBand", "lookup", "minWidth", "name", "ownerBand", "renderAsync", "selectedFilterOperation", "setCellValue", "showEditorAlways", "showInColumnChooser", "showWhenGrouped", "sortIndex", "sortingMethod", "sortOrder", "trueText", "type", "validationRules", "visible", "visibleIndex", "width"], outputs: ["filterValueChange", "filterValuesChange", "groupIndexChange", "selectedFilterOperationChange", "sortIndexChange", "sortOrderChange", "visibleChange", "visibleIndexChange"] }, { type: i16.DxiValidationRuleComponent, selector: "dxi-validation-rule", inputs: ["message", "trim", "type", "ignoreEmptyValue", "max", "min", "reevaluate", "validationCallback", "comparisonTarget", "comparisonType", "pattern"] }], directives: [{ type: i17.PermissionDirective, selector: "[fieldKey]", inputs: ["fieldKey"] }, { type: i18.InputText, selector: "[pInputText]" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i19.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i20.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-masterdata',
                    templateUrl: './masterdata.component.html',
                    styleUrls: ['./masterdata.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RbacService }, { type: i2.FormBuilder }, { type: i3.AlertService }, { type: i4.ConfirmationService }, { type: i5.PermissionStore }, { type: i6.DataStoreService }]; }, propDecorators: { treeList: [{
                type: ViewChild,
                args: [DxTreeListComponent, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvbWFzdGVyZGF0YS9zcmMvbGliL3BpY3MtbWFzdGVyZGF0YS9tYXN0ZXJkYXRhL21hc3RlcmRhdGEuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL21hc3RlcmRhdGEvc3JjL2xpYi9waWNzLW1hc3RlcmRhdGEvbWFzdGVyZGF0YS9tYXN0ZXJkYXRhLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQTBCLFVBQVUsRUFBOEIsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0csT0FBTyxFQUEyQyxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFNbEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBR3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT3pELE1BQU0sT0FBTyxtQkFBbUI7SUF3RDlCLFlBQ1UsY0FBMkIsRUFDM0IsV0FBd0IsRUFDeEIsWUFBMEIsRUFDMUIsbUJBQXdDLEVBQ3hDLGVBQWdDLEVBQ2hDLGFBQStCO1FBTC9CLG1CQUFjLEdBQWQsY0FBYyxDQUFhO1FBQzNCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQTFEekMsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUUzQixxQkFBZ0IsR0FBVSxFQUFF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QW1CLGdEQ25CaEMsdW5WQWdOTTs0RkQ5TE8sbUJBQW1CO2tCQUwvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFdBQVcsRUFBRSw2QkFBNkI7b0JBQzFDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2lCQUMzQztzUEFFb0QsUUFBUTtzQkFBMUQsU0FBUzt1QkFBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtQXJyYXksIEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUcmVlTm9kZSwgTWVudUl0ZW0sIENvbmZpcm1hdGlvblNlcnZpY2UsIFByaW1lSWNvbnMgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uU3RvcmUgfSBmcm9tICcuLi9AY29yZS9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLnN0b3JlJztcbmltcG9ydCB7IEFsZXJ0U2VydmljZSB9IGZyb20gJy4uL0Bjb3JlL3NlcnZpY2UvYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBSYmFjU2VydmljZSB9IGZyb20gJy4uL0Bjb3JlL3NlcnZpY2UvcmJhYy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yZVNlcnZpY2UgfSBmcm9tICcuLi9AY29yZS9zZXJ2aWNlL2RhdGEtc3RvcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJCQUNJTkZPIH0gZnJvbSAnLi4vQGNvcmUvdXJscy9yYmFjLXVybC5jb25maWcnO1xuaW1wb3J0IHsgQ2RrRHJhZ0Ryb3AsIG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgRHhUcmVlTGlzdE1vZHVsZSB9IGZyb20gJ2RldmV4dHJlbWUtYW5ndWxhcic7XG5pbXBvcnQgeyBEeFRyZWVMaXN0Q29tcG9uZW50IH0gZnJvbSAnZGV2ZXh0cmVtZS1hbmd1bGFyJztcbmRlY2xhcmUgY29uc3QgJDogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW1hc3RlcmRhdGEnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFzdGVyZGF0YS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hc3RlcmRhdGEuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYXN0ZXJkYXRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChEeFRyZWVMaXN0Q29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSkgdHJlZUxpc3Q6IER4VHJlZUxpc3RDb21wb25lbnQ7XG4gIHVwZGF0ZUxvb2tVcEZvcm06IEZvcm1Hcm91cDtcbiAgY2F0ZWdvcmllcyE6IFRyZWVOb2RlW107XG4gIG1lbnVJdGVtczogTWVudUl0ZW1bXSA9IFtdO1xuICBjYXRlZ29yeUZvcm0hOiBGb3JtR3JvdXA7XG4gIGZpbHRlck1hc3Rlckxpc3Q6IGFueVtdID0gW107XG4gIGxvb2t1cEZvcm0hOiBGb3JtR3JvdXA7XG4gIGxvb2t1cFJ1bGVGb3JtITogRm9ybUdyb3VwO1xuICByb2xlcyE6IGFueVtdO1xuICBwZXJtaXNzaW9ucyE6IGFueVtdO1xuICBub2RlVHlwZTogc3RyaW5nO1xuICBzYXZlTW9kZTogc3RyaW5nO1xuICBzZWxlY3RlZEl0ZW06IGFueSA9IHt9O1xuICBub2Rlc2VsZWN0dHlwZTogc3RyaW5nO1xuICBpc0dsb2JhbExvb2t1cDogYm9vbGVhbjtcbiAgcGFnZUVycm9yU2hvdyA9IGZhbHNlO1xuICBkYXRhQ29udHJvbEFjdGlvbnMgPSBbXG4gICAgeyB2YWx1ZTogJycsIG5hbWU6ICdTZWxlY3QnIH0sXG4gICAgeyB2YWx1ZTogJ0hJREUnLCBuYW1lOiAnSGlkZScgfSxcbiAgICB7IHZhbHVlOiAnRElTQUJMRScsIG5hbWU6ICdEaXNhYmxlJyB9LFxuICAgIHsgdmFsdWU6ICdNQVNLJywgbmFtZTogJ01hc2snIH1cbiAgXTtcbiAgc29ydE9yZGVyID0gW1xuICAgIHsgdmFsdWU6ICdhc2MnLCBuYW1lOiAnQVNDJyB9LFxuICAgIHsgdmFsdWU6ICdkZXNjJywgbmFtZTogJ0RFU0MnIH1cbiAgXTtcbiAgZW52aXJvbm1lbnQ6IGFueTtcbiAgUkJBQ09SRzogUkJBQ0lORk8gPSBuZXcgUkJBQ0lORk8oKTtcbiAgb3JnU3VicyE6IFN1YnNjcmlwdGlvbjtcbiAgb3JnSWQ6IGFueTtcbiAgc2VsZWN0ZWRDYXRlZ29yeUlkOiBhbnk7XG4gIHRhc2tzRGF0YTogYW55ID0gW107XG4gIHJvd0VkaXRNb2RlOiBzdHJpbmcgPSAnYmF0Y2gnO1xuICBzZWxlY3RlZEV2ZW50OiBhbnk7XG4gIHBhdHRlcm46IGFueSA9L15bYS16QS1aMC05LV8gXSskLztcbiAgLy9wYXR0ZXJuOiBhbnkgPSAvXlthLXpBLVowLTksLi8gXyotXSskLztcbiAgb3JkZXJQYXR0ZXJuOiBhbnkgPSAvXlswLTldKyQvO1xuICBhbGxvd0Ryb3BJbnNpZGVJdGVtID0gdHJ1ZTtcbiAgYWxsb3dSZW9yZGVyaW5nID0gZmFsc2U7XG4gIHNob3dEcmFnSWNvbnMgPSBmYWxzZTtcbiAgaXNFZGl0TW9kZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgZXhwYW5kZWRSb3dLZXlzOiBBcnJheTxudW1iZXI+ID0gWzFdO1xuICBlZGl0OiBzdHJpbmc7XG4gIGVkaXRiYXRjaDogc3RyaW5nO1xuICBiYXRjaEVkaXQ6IHN0cmluZztcbiAgdmlzaWJsZVJvd3M6IGFueTtcbiAgaXNTYXZlRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNSZW9yZGVyTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWxlY3RlZFNvcnRPcmRlcjogJ2FzYycgfCAnZGVzYycgPSAnYXNjJztcbiAgYWN0aXZlVGFiSW5kZXggPSAwO1xuICBsb29rdXBvcmRlcjogRm9ybUNvbnRyb2w7XG4gIGZvcm1TdWJtaXQgOiBib29sZWFuID0gZmFsc2U7XG4gIHZhbGlkYXRpb25FcnJvcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgaW5wdXRWYWxpZGF0aW9uTWV0aG9kOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWFzdGVyc1NlcnZpY2U6IFJiYWNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maXJtYXRpb25TZXJ2aWNlOiBDb25maXJtYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcGVybWlzc2lvblN0b3JlOiBQZXJtaXNzaW9uU3RvcmUsXG4gICAgcHJpdmF0ZSBfc3RvcmVzZXJ2aWNlOiBEYXRhU3RvcmVTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLm5vZGVUeXBlID0gJ2NhdGVnb3J5JztcbiAgICB0aGlzLnNhdmVNb2RlID0gJ0lOU0VSVCc7XG4gICAgdGhpcy5pc0dsb2JhbExvb2t1cCA9IHRydWU7XG4gICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5SWQgPSAnJztcbiAgICB0aGlzLmluaXRpYWxpemVDYXRlZ29yeUZvcm0oKTtcbiAgICB0aGlzLmluaXRpYWxpemVMb29rdXBGb3JtKCk7XG4gICAgdGhpcy5zaG93RHJhZ0ljb25zID0gdHJ1ZTtcbiAgICB0aGlzLm9uUmVvcmRlciA9IHRoaXMub25SZW9yZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jaGVja0tleUR1cGxpY2F0ZSA9IHRoaXMuY2hlY2tLZXlEdXBsaWNhdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoZWNrVmFsdWVEdXBsaWNhdGUgPSB0aGlzLmNoZWNrVmFsdWVEdXBsaWNhdGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMub3JnU3VicyA9IHRoaXMuX3N0b3Jlc2VydmljZS5jdXJyZW50U3RvcmUuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgdGhpcy5pbnB1dFZhbGlkYXRpb25NZXRob2QgPSByZXNbJ0lOUFVUVkFMSURBVElPTk1FVEhPRCddXG4gICAgICBpZiAocmVzWydSQkFDT1JHJ10gJiYgcmVzWydSQkFDT1JHJ10gIT09ICcnKSB7XG4gICAgICAgIHRoaXMuUkJBQ09SRyA9IHJlc1snUkJBQ09SRyddO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlJCQUNPUkcsICdSQkFDT1JHIFBlcm1pc3NvbicpO1xuICAgICAgICB0aGlzLmVudmlyb25tZW50ID0gdGhpcy5SQkFDT1JHWydlbnZpcm9ubWVudCddO1xuICAgICAgICB0aGlzLm9yZ0lkID0gcGFyc2VJbnQodGhpcy5SQkFDT1JHWydvcmdJRCddKTtcbiAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQpIHtcbiAgICAgICAgICB0aGlzLmxvYWRUcmVlKCk7XG4gICAgICAgICAgdGhpcy5sb2FkQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmdldEFsbFVzZXJSb2xlKCkuc3Vic2NyaWJlKChpdGVtczogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJvbGVzID0gaXRlbXMuZGF0YTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmdldFBlcm1pc3Npb25zVHJlZSh0aGlzLmVudmlyb25tZW50LmFwcGxpY2F0aW9uaWQpLnN1YnNjcmliZSgoaXRlbXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9ucyA9IGl0ZW1zLmRhdGE7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm9yZ1N1YnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGluaXRpYWxpemVDYXRlZ29yeUZvcm0oKSB7XG4gICAgdGhpcy5sb29rdXBvcmRlciA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgIHRoaXMuY2F0ZWdvcnlGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICBpZDogWzBdLFxuICAgICAgYXBwbGljYXRpb25pZDogW3RoaXMuZW52aXJvbm1lbnQgPyB0aGlzLmVudmlyb25tZW50WydhcHBsaWNhdGlvbmlkJ10gOiAnJ10sXG4gICAgICBuYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgZGVzY3JpcHRpb246IFsnJ10sXG4gICAgICByZWFkb25seTogW2ZhbHNlXSxcbiAgICAgIGlzZW5hYmxlZDogW3RydWVdLFxuICAgICAgbG9va3Vwb3JkZXI6IHRoaXMubG9va3Vwb3JkZXJcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyQ2F0ZWdvcnkoKSB7XG4gICAgLy90aGlzLmNsZWFyRm9ybSgpO1xuICAgIHRoaXMuZm9ybVN1Ym1pdCA9IGZhbHNlO1xuICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuICAgIHRoaXMuaW5pdGlhbGl6ZUNhdGVnb3J5Rm9ybSgpO1xuICAgIHRoaXMubWFzdGVyc1NlcnZpY2UuZ2V0TG9va3VwQnljYXRlZ29yeUlEKHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkKS5zdWJzY3JpYmUoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgY29uc3QgbG9va3VwZGF0YWl0ZW1zID0gaXRlbVsnZGF0YSddO1xuICAgICAgdGhpcy5jYXRlZ29yeUZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICAgIGlkOiBsb29rdXBkYXRhaXRlbXMuaWQsXG4gICAgICAgIGFwcGxpY2F0aW9uaWQ6IGxvb2t1cGRhdGFpdGVtcy5hcHBsaWNhdGlvbmlkLFxuICAgICAgICBuYW1lOiBsb29rdXBkYXRhaXRlbXMubmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGxvb2t1cGRhdGFpdGVtcy5kZXNjcmlwdGlvbixcbiAgICAgICAgcmVhZG9ubHk6IGxvb2t1cGRhdGFpdGVtcy5yZWFkb25seSxcbiAgICAgICAgaXNlbmFibGVkOiBsb29rdXBkYXRhaXRlbXMuaXNlbmFibGVkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBvbklucHV0KGV2ZW50OiBFdmVudCwgZmllbGR0eXBlOiBhbnksIGxhYmVsOiBhbnksIHJlcXVpcmVkOiBib29sZWFuKSB7XG4gICAgY29uc3QgZXJyb3IgPSAgdGhpcy5pbnB1dFZhbGlkYXRpb25NZXRob2QoZXZlbnQsIGZpZWxkdHlwZSwgbGFiZWwsIHJlcXVpcmVkKTtcbiAgICBpZiAoZXJyb3IgJiYgdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzW2xhYmVsXSA9IGVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy52YWxpZGF0aW9uRXJyb3JzW2xhYmVsXTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrSG9tZSgpIHtcbiAgICB0aGlzLnNhdmVNb2RlID0gJ0lOU0VSVCc7XG4gICAgdGhpcy5ub2RlVHlwZSA9ICdjYXRlZ29yeSc7XG4gICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5SWQgPSAnJztcbiAgICB0aGlzLmNsZWFyRm9ybSgpO1xuICAgIHRoaXMubG9hZFRyZWUoKTtcbiAgICB0aGlzLmZvcm1TdWJtaXQgPSBmYWxzZTtcbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSB7fTtcbiAgfVxuXG4gIGNsZWFyRm9ybSgpIHtcbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSB7fTtcbiAgICB0aGlzLmZvcm1TdWJtaXQgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRpYWxpemVDYXRlZ29yeUZvcm0oKTtcbiAgICB0aGlzLnRhc2tzRGF0YSA9IFtdO1xuICB9XG5cbiAgb25DbGlja0FkZENhdGVnb3J5KCkge1xuICAgIHRoaXMuc2F2ZU1vZGUgPSAnSU5TRVJUJztcbiAgICB0aGlzLm5vZGVUeXBlID0gJ2NhdGVnb3J5JztcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCA9ICcnO1xuICAgIHRoaXMuY2xlYXJGb3JtKCk7XG4gICAgdGhpcy5sb2FkVHJlZSgpO1xuICB9XG5cbiAgLy8gb25DbGlja0RlbGV0ZUNhdGVnb3J5KCkge1xuICAvLyAgIHRoaXMuc2F2ZU1vZGUgPSAnREVMRVRFJztcbiAgLy8gICB0aGlzLm5vZGVUeXBlID0gdGhpcy5zZWxlY3RlZEl0ZW0udHlwZTtcbiAgLy8gICAkKCcjRGVsZXRldXNlcicpLm1vZGFsKCdzaG93Jyk7XG4gIC8vIH1cblxuICBpbml0TmV3Um93KGUpIHtcbiAgICBlLmRhdGEub3JkZXIgPSAwO1xuICAgIC8vZS5kYXRhLmlkID0gMDtcbiAgICBlLmRhdGEubG9va3VwY2F0ZWdvcnlpZCA9IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkO1xuICB9XG5cbiAgb25DZWxsUHJlcGFyZWQoZXZlbnQ6IGFueSkge1xuICAgIC8vIFRoZSBldmVudCBwYXJhbWV0ZXIgY29udGFpbnMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIENvbXBvbmVudCBkYXRhXG4gICAgdGhpcy52aXNpYmxlUm93cyA9IGV2ZW50LmNvbXBvbmVudC5nZXRWaXNpYmxlUm93cygpO1xuICB9XG5cbiAgb25FZGl0Q2FuY2VsZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMubGlzdCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCk7XG4gIH1cblxuICBvblRvb2xiYXJQcmVwYXJpbmcoZTogYW55KSB7XG4gICAgbGV0IHRvb2xiYXJJdGVtcyA9IGUudG9vbGJhck9wdGlvbnMuaXRlbXM7XG5cbiAgICAvLyBNb2RpZmllcyBhbiBleGlzdGluZyBpdGVtXG4gICAgdG9vbGJhckl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IFwic2VhcmNoUGFuZWxcIikge1xuICAgICAgICBpdGVtLmxvY2F0aW9uID0gXCJiZWZvcmVcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBvblJvd1ZhbGlkYXRpbmcoZSkge1xuICAgIGNvbnNvbGUubG9nKCdldmVudCcsIGUpXG4gICAgaWYgKGUuaXNWYWxpZCA9PSBmYWxzZSkge1xuICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoYFBsZWFzZSBjb3JyZWN0IGV4aXN0aW5nIHJvdy1sZXZlbCB2YWxpZGF0aW9uKHMpLmApXG4gICAgfVxuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgICB0aGlzLmlzU2F2ZURpc2FibGVkID0gZmFsc2U7XG4gICAgLy8gICAgIGNvbnN0IHNhdmVCdXR0b24gPSBlLmVsZW1lbnQuZmluZChcIlthcmlhLWxhYmVsPSdTcGVpY2hlcm4nXVwiKS5keEJ1dHRvbihcImluc3RhbmNlXCIpO1xuICAgIC8vICAgICBzYXZlQnV0dG9uLm9wdGlvbihcImRpc2FibGVkXCIsIHRoaXMuaXNTYXZlRGlzYWJsZWQpO1xuICAgIC8vIH1cbiAgfVxuICAvLyAgIG9uUm93VmFsaWRhdGluZyhlKSB7XG4gIC8vICAgICBjb25zb2xlLmxvZygnZXZlbnQnLCBlKTtcblxuICAvLyAgICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGUuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmR4LXRyZWVsaXN0LXNhdmUtYnV0dG9uXCIpOyAvLyBVc2UgdGhlIGNvcnJlY3QgY2xhc3MgbmFtZVxuXG4gIC8vICAgICBpZiAoZS5pc1ZhbGlkID09PSBmYWxzZSkge1xuICAvLyAgICAgICAgIHRoaXMuaXNTYXZlRGlzYWJsZWQgPSB0cnVlO1xuICAvLyAgICAgICAgLy8gc2F2ZUJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gIC8vICAgICAgICAvLyB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcihgRXJyb3I6IER1cGxpY2F0ZSB2YWx1ZSBmb3VuZGApO1xuICAvLyAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICB0aGlzLmlzU2F2ZURpc2FibGVkID0gZmFsc2U7XG4gIC8vICAgICAgIC8vICBzYXZlQnV0dG9uLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG4gIC8vICAgICB9XG4gIC8vICB9XG5cbiAgaGFuZGxlVGFiQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKCdUYWIgY2xpY2tlZDonLCBldmVudC5pdGVtRGF0YSk7XG4gICAgaWYgKGV2ZW50Lml0ZW1EYXRhLnRleHQgPT0gJ0VkaXQnKSB7XG4gICAgICB0aGlzLnRvZ2dsZUVkaXRNb2RlKCk7XG4gICAgfVxuICAgIGlmIChldmVudC5pdGVtRGF0YS50ZXh0ID09ICdSZW9yZGVyJykge1xuICAgICAgdGhpcy50b2dnbGVSZW9yZGVyTW9kZSgpO1xuICAgIH1cbiAgfVxuXG5cbiAgdG9nZ2xlRWRpdE1vZGUoKSB7XG4gICAgdGhpcy5pc0VkaXRNb2RlID0gdHJ1ZTtcbiAgICB0aGlzLmJhdGNoRWRpdCA9IFwiYmF0Y2hcIjtcbiAgICB0aGlzLmlzUmVvcmRlck1vZGUgPSBmYWxzZVxuICAgIHRoaXMubGlzdCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCk7XG4gIH1cblxuICB0b2dnbGVSZW9yZGVyTW9kZSgpIHtcbiAgICB0aGlzLmlzRWRpdE1vZGUgPSBmYWxzZTtcbiAgICB0aGlzLmJhdGNoRWRpdCA9IFwiXCI7XG4gICAgdGhpcy5hbGxvd1Jlb3JkZXJpbmcgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0RyYWdJY29ucyA9IHRydWU7XG4gICAgdGhpcy5pc1Jlb3JkZXJNb2RlID0gdHJ1ZVxuICAgIHRoaXMubGlzdCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCk7XG4gIH1cblxuICBvblRhYkNoYW5nZShldmVudDogYW55KSB7XG4gICAgLy8gSGFuZGxlIHRhYiBjaGFuZ2UgbG9naWMgaGVyZVxuICAgIGNvbnNvbGUubG9nKCdUYWIgY2hhbmdlZDonLCBldmVudC5pbmRleCk7XG4gICAgaWYgKGV2ZW50LmluZGV4ID09PSAwKSB7XG4gICAgICAvLyBDYWxsIHlvdXIgdG9nZ2xlRWRpdE1vZGUoKSBtZXRob2RcbiAgICAgIHRoaXMudG9nZ2xlRWRpdE1vZGUoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmluZGV4ID09PSAxKSB7XG4gICAgICAvLyBDYWxsIHlvdXIgdG9nZ2xlUmVvcmRlck1vZGUoKSBtZXRob2RcbiAgICAgIHRoaXMudG9nZ2xlUmVvcmRlck1vZGUoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBvblJlb3JkZXIoZSkge1xuICAgIGNvbnN0IHNvcnRPcmRlciA9ICdjdXN0b20nXG4gICAgY29uc3QgdmlzaWJsZVJvd3MgPSBlLmNvbXBvbmVudC5nZXRWaXNpYmxlUm93cygpO1xuICAgIGNvbnN0IHRvSW5kZXggPSB0aGlzLnRhc2tzRGF0YS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHZpc2libGVSb3dzW2UudG9JbmRleF0uZGF0YS5pZCk7XG4gICAgY29uc3QgZnJvbUluZGV4ID0gdGhpcy50YXNrc0RhdGEuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBlLml0ZW1EYXRhLmlkKTtcblxuICAgIHRoaXMudGFza3NEYXRhLnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgIHRoaXMudGFza3NEYXRhLnNwbGljZSh0b0luZGV4LCAwLCBlLml0ZW1EYXRhKTtcbiAgICAvL21vdmVJdGVtSW5BcnJheSh0aGlzLnRhc2tzRGF0YSwgZS5mcm9tSW5kZXgsIGUudG9JbmRleCk7XG4gICAgdGhpcy50YXNrc0RhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGl0ZW0ub3JkZXIgPSBpbmRleCArIDE7XG4gICAgfSk7XG5cbiAgICBhd2FpdCB0aGlzLm1hc3RlcnNTZXJ2aWNlLnVwZGF0ZUxvb2t1cE9yZGVyKHRoaXMudGFza3NEYXRhLCBzb3J0T3JkZXIpLnN1YnNjcmliZShhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLmxpc3QodGhpcy5zZWxlY3RlZENhdGVnb3J5SWQpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgc29ydEdyaWQob3JkZXI6IGFueSkge1xuXG4gICAgaWYgKG9yZGVyID09PSAnYXNjJykge1xuICAgICAgLy8gU29ydCB0aGUgZ3JpZCBpbiBhc2NlbmRpbmcgb3JkZXJcbiAgICAgIGNvbnN0IHNvcnRPcmRlciA9ICdhc2MnXG4gICAgICB0aGlzLnRhc2tzRGF0YS5zb3J0KChhLCBiKSA9PiBhLnZhbHVlLmxvY2FsZUNvbXBhcmUoYi52YWx1ZSkpO1xuXG4gICAgICB0aGlzLnRhc2tzRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gaXRlbS5vcmRlciA9IGluZGV4ICsgMSk7XG5cbiAgICAgIGF3YWl0IHRoaXMubWFzdGVyc1NlcnZpY2UudXBkYXRlTG9va3VwT3JkZXIodGhpcy50YXNrc0RhdGEsIHNvcnRPcmRlcikuc3Vic2NyaWJlKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5saXN0KHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb3J0IHRoZSBncmlkIGluIGRlc2NlbmRpbmcgb3JkZXJcbiAgICAgIGNvbnN0IHNvcnRPcmRlciA9ICdkZXNjJ1xuICAgICAgdGhpcy50YXNrc0RhdGEuc29ydCgoYSwgYikgPT4gYi52YWx1ZS5sb2NhbGVDb21wYXJlKGEudmFsdWUpKTtcblxuICAgICAgdGhpcy50YXNrc0RhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IGl0ZW0ub3JkZXIgPSBpbmRleCArIDEpO1xuXG4gICAgICBhd2FpdCB0aGlzLm1hc3RlcnNTZXJ2aWNlLnVwZGF0ZUxvb2t1cE9yZGVyKHRoaXMudGFza3NEYXRhLCBzb3J0T3JkZXIpLnN1YnNjcmliZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMubGlzdCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjaGVja0tleUR1cGxpY2F0ZShwYXJhbXM6IGFueSkge1xuICAgIGlmIChwYXJhbXMuZGF0YSAmJiBwYXJhbXMuZGF0YS5rZXkgJiYgcGFyYW1zLmRhdGEua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGVkaXRlZEtleSA9IHBhcmFtcy5kYXRhLmtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IG9jY3VycmVuY2VzID0gdGhpcy52aXNpYmxlUm93cy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5kYXRhLnBhcmVudGlkID0gaXRlbS5kYXRhLnBhcmVudGlkID09IG51bGwgPyAwIDogaXRlbS5kYXRhLnBhcmVudGlkXG4gICAgICAgIHBhcmFtcy5kYXRhLnBhcmVudGlkID0gcGFyYW1zLmRhdGEucGFyZW50aWQgPT0gbnVsbCA/IDAgOiBwYXJhbXMuZGF0YS5wYXJlbnRpZFxuICAgICAgICBpZiAocGFyYW1zLmRhdGEucGFyZW50aWQgPT0gaXRlbS5kYXRhLnBhcmVudGlkKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0uZGF0YSAmJiBpdGVtLmRhdGEua2V5ICYmIGl0ZW0uZGF0YS5rZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IGVkaXRlZEtleTtcbiAgICAgICAgfVxuICAgICAgfSkubGVuZ3RoO1xuXG4gICAgICBjb25zdCBpc0R1cGxpY2F0ZSA9IG9jY3VycmVuY2VzID4gMTtcbiAgICAgIHJldHVybiAhaXNEdXBsaWNhdGU7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tWYWx1ZUR1cGxpY2F0ZShwYXJhbXM6IGFueSkge1xuICAgIGlmIChwYXJhbXMuZGF0YSAmJiBwYXJhbXMuZGF0YS52YWx1ZSAmJiBwYXJhbXMuZGF0YS52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBlZGl0ZWRWYWx1ZSA9IHBhcmFtcy5kYXRhLnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgb2NjdXJyZW5jZXMgPSB0aGlzLnZpc2libGVSb3dzLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmRhdGEucGFyZW50aWQgPSBpdGVtLmRhdGEucGFyZW50aWQgPT0gbnVsbCA/IDAgOiBpdGVtLmRhdGEucGFyZW50aWRcbiAgICAgICAgcGFyYW1zLmRhdGEucGFyZW50aWQgPSBwYXJhbXMuZGF0YS5wYXJlbnRpZCA9PSBudWxsID8gMCA6IHBhcmFtcy5kYXRhLnBhcmVudGlkXG4gICAgICAgIGlmIChwYXJhbXMuZGF0YS5wYXJlbnRpZCA9PSBpdGVtLmRhdGEucGFyZW50aWQpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5kYXRhICYmIGl0ZW0uZGF0YS52YWx1ZSAmJiBpdGVtLmRhdGEudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IGVkaXRlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KS5sZW5ndGg7XG5cbiAgICAgIGNvbnN0IGlzRHVwbGljYXRlID0gb2NjdXJyZW5jZXMgPiAxO1xuICAgICAgcmV0dXJuICFpc0R1cGxpY2F0ZVxuICAgIH1cbiAgfVxuXG4gIG5vZGVTZWxlY3QoZXZlbnQ6IGFueSkge1xuXG4gICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzID0ge307XG4gICAgdGhpcy5mb3JtU3VibWl0ID0gZmFsc2U7XG4gICAgdGhpcy5ub2Rlc2VsZWN0dHlwZSA9ICdVUERBVEUnO1xuICAgIHRoaXMuc2F2ZU1vZGUgPSAnVVBEQVRFJztcbiAgICB0aGlzLm5vZGVUeXBlID0gZXZlbnQubm9kZS50eXBlO1xuICAgIHRoaXMuc2VsZWN0ZWRFdmVudCA9IGV2ZW50O1xuICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkID0gZXZlbnQubm9kZS5pZDtcbiAgICB0aGlzLnRhc2tzRGF0YSA9IFtdO1xuICAgIHRoaXMuYWN0aXZlVGFiSW5kZXggPSAwOyAvLyBTaW11bGF0ZSB0YWIgY2hhbmdlIGV2ZW50IHRvIGluZGV4IDBcbiAgICB0aGlzLm9uVGFiQ2hhbmdlKHsgaW5kZXg6IDAgfSk7XG4gIH1cblxuICBsaXN0KGlkKSB7XG5cbiAgICB0aGlzLm5vZGVzZWxlY3R0eXBlID0gJ1VQREFURSc7XG4gICAgdGhpcy5zYXZlTW9kZSA9ICdVUERBVEUnO1xuICAgIHRoaXMubm9kZVR5cGUgPSAnY2F0ZWdvcnknO1xuXG5cbiAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmdldExvb2t1cEJ5Y2F0ZWdvcnlJRChpZCkuc3Vic2NyaWJlKChpdGVtOiBhbnkpID0+IHtcblxuICAgICAgY29uc3QgbG9va3VwZGF0YWl0ZW1zID0gaXRlbVsnZGF0YSddO1xuXG4gICAgICB0aGlzLmNhdGVnb3J5Rm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgICAgaWQ6IGxvb2t1cGRhdGFpdGVtcy5pZCxcbiAgICAgICAgYXBwbGljYXRpb25pZDogbG9va3VwZGF0YWl0ZW1zLmFwcGxpY2F0aW9uaWQsXG4gICAgICAgIG5hbWU6IGxvb2t1cGRhdGFpdGVtcy5uYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogbG9va3VwZGF0YWl0ZW1zLmRlc2NyaXB0aW9uLFxuICAgICAgICByZWFkb25seTogbG9va3VwZGF0YWl0ZW1zLnJlYWRvbmx5LFxuICAgICAgICBpc2VuYWJsZWQ6IGxvb2t1cGRhdGFpdGVtcy5pc2VuYWJsZWQsXG4gICAgICAgIGxvb2t1cG9yZGVyIDogbG9va3VwZGF0YWl0ZW1zLmxvb2t1cG9yZGVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5tYXN0ZXJzU2VydmljZS5nZXRBbGxMb29rdXBCeWNhdGVnb3J5SUQoaWQpLnN1YnNjcmliZSgobm9kZXM6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnRhc2tzRGF0YSA9ICg8YW55Pm5vZGVzKS5kYXRhO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWREYXRhKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsaWRhdGlvblJ1bGVzID0gZXZlbnQuY29tcG9uZW50Lm9wdGlvbigndmFsaWRhdGlvblJ1bGVzJyk7XG4gICAgY29uc3QgaGFzVmFsaWRhdGlvbkVycm9ycyA9IHZhbGlkYXRpb25SdWxlcy5zb21lKChydWxlOiBhbnkpID0+ICFydWxlLmlzVmFsaWQpO1xuXG4gICAgaWYgKGhhc1ZhbGlkYXRpb25FcnJvcnMpIHtcbiAgICAgIHRoaXMuaXNTYXZlRGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFbmFibGUgdGhlIFNhdmUgaWNvblxuICAgICAgdGhpcy5pc1NhdmVEaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNhdmVDaGFuZ2VzKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2FkZGVkSXRlbXMnLCBldmVudCk7XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gZXZlbnQuY2hhbmdlcyB8fCBbXTtcblxuICAgIGxldCBrZXlzU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgbGV0IHZhbHVlc1NldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGxldCBsb29rdXBjYXRlZ29yeWlkO1xuXG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZS50eXBlID09PSAndXBkYXRlJykge1xuICAgICAgICBjb25zdCBvcmlnaW5hbERhdGEgPSB0aGlzLnRhc2tzRGF0YS5maWx0ZXIoKG9yaWdpbmFsSXRlbTogYW55KSA9PiBvcmlnaW5hbEl0ZW0uaWQgPT09IGNoYW5nZS5rZXkpO1xuICAgICAgICBjaGFuZ2UuZGF0YSA9IHsgLi4ub3JpZ2luYWxEYXRhWzBdLCAuLi5jaGFuZ2UuZGF0YSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAvLyAgIGlmIChjaGFuZ2UudHlwZSA9PT0gJ2luc2VydCcgfHwgY2hhbmdlLnR5cGUgPT09ICd1cGRhdGUnKSB7XG4gICAgLy8gICAgIGxvb2t1cGNhdGVnb3J5aWQgPSBjaGFuZ2UuZGF0YS5sb29rdXBjYXRlZ29yeWlkO1xuICAgIC8vICAgICBjb25zdCBpdGVtID0gY2hhbmdlLmRhdGE7XG5cbiAgICAvLyAgICAgLy8gQ2hlY2sgZm9yIGR1cGxpY2F0ZSBrZXlzIGFuZCB2YWx1ZXNcbiAgICAvLyAgICAgaWYgKGtleXNTZXQuaGFzKGl0ZW0ua2V5KSkge1xuICAgIC8vICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGBFcnJvcjogRHVwbGljYXRlIGtleSBmb3VuZCAtICR7aXRlbS5rZXl9YCk7XG4gICAgLy8gICAgICAgLy8gT3B0aW9uYWxseSwgeW91IGNhbiBwcmV2ZW50IGZ1cnRoZXIgcHJvY2Vzc2luZyBvciBoYW5kbGUgdGhlIGVycm9yIGRpZmZlcmVudGx5LlxuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIGtleXNTZXQuYWRkKGl0ZW0ua2V5KTtcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIGlmICh2YWx1ZXNTZXQuaGFzKGl0ZW0udmFsdWUpKSB7XG4gICAgLy8gICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoYEVycm9yOiBEdXBsaWNhdGUgdmFsdWUgZm91bmQgLSAke2l0ZW0udmFsdWV9YCk7XG4gICAgLy8gICAgICAgLy8gT3B0aW9uYWxseSwgeW91IGNhbiBwcmV2ZW50IGZ1cnRoZXIgcHJvY2Vzc2luZyBvciBoYW5kbGUgdGhlIGVycm9yIGRpZmZlcmVudGx5LlxuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIHZhbHVlc1NldC5hZGQoaXRlbS52YWx1ZSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgLy8ga2V5bGlzdDogIEFycmF5LmZyb20oa2V5c1NldCksXG4gICAgICAvLyB2YWx1ZWxpc3Q6IEFycmF5LmZyb20odmFsdWVzU2V0KSxcbiAgICAgIGRhdGE6IGNoYW5nZXMsXG4gICAgICAvLyBsb29rdXBjYXRlZ29yeWlkOiBsb29rdXBjYXRlZ29yeWlkXG4gICAgfTtcblxuICAgIC8vIE1ha2UgdGhlIEFQSSBjYWxsXG4gICAgdGhpcy5tYXN0ZXJzU2VydmljZS5hZGRPclVwZGF0ZUxvb2t1cChyZXF1ZXN0KS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIEFQSSBjYWxsIHdhcyBzdWNjZXNzZnVsLCB1cGRhdGUgVUkgb3IgcmVmcmVzaCBkYXRhXG4gICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLnN1Y2Nlc3MoJ1VwZGF0ZWQgU3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgIC8vIHRoaXMubG9hZFRyZWUoKTtcbiAgICAgICAgdGhpcy5jbGVhckZvcm0oKTtcbiAgICAgICAgdGhpcy5ub2RlU2VsZWN0KHRoaXMuc2VsZWN0ZWRFdmVudCk7XG4gICAgICB9LFxuICAgICAgKGVycjogYW55KSA9PiB7XG4gICAgICAgIC8vIEhhbmRsZSBBUEkgY2FsbCBlcnJvciB3aXRob3V0IHJlZnJlc2hpbmcgdGhlIGRhdGFcbiAgICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoZXJyLmVycm9yLm1lc3NhZ2UpO1xuXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG5cblxuXG5cbiAgaW5pdGlhbGl6ZUxvb2t1cEZvcm0oKSB7XG4gICAgdGhpcy5wYWdlRXJyb3JTaG93ID0gZmFsc2U7XG4gICAgdGhpcy5sb29rdXBGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICBpZDogWzBdLFxuICAgICAgbG9va3VwY2F0ZWdvcnlpZDogWzBdLFxuICAgICAgcGFyZW50aWQ6IFtudWxsXSxcbiAgICAgIC8vIG9wdGlvbmFsZGF0YTogdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAvLyAgIHJ1bGVzOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtdKVxuICAgICAgLy8gfSksXG4gICAgICAvLyBhY2Nlc3M6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgLy8gICBhc3NpZ246IFsnJywgW3RoaXMucmVxdWlyZWRJZlZhbGlkYXRvcigoKSA9PiAhdGhpcy5pc0dsb2JhbExvb2t1cCldXSxcbiAgICAgIC8vICAgdmlldzogWycnLCBbdGhpcy5yZXF1aXJlZElmVmFsaWRhdG9yKCgpID0+ICF0aGlzLmlzR2xvYmFsTG9va3VwKV1dXG4gICAgICAvLyB9KSxcbiAgICAgIGxvb2t1cGRhdGE6IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkoW3RoaXMuYWRkbG9va3VwZGF0YSgpXSksXG4gICAgICByZWFkb25seTogW2ZhbHNlXSxcbiAgICAgIGdsb2JhbDogW3RydWVdLFxuICAgICAgaXNlbmFibGVkOiBbdHJ1ZV1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIGdldCBkYXRhcnVsZXMoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMubG9va3VwRm9ybS5nZXQoJ29wdGlvbmFsZGF0YS5ydWxlcycpIGFzIEZvcm1BcnJheTtcbiAgLy8gfVxuXG4gIGdldCBsb29rdXBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmxvb2t1cEZvcm0uZ2V0KCdsb29rdXBkYXRhJykgYXMgRm9ybUFycmF5O1xuICB9XG5cbiAgYWRkUnVsZSgpOiBGb3JtR3JvdXAge1xuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHJvbGVzOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgcGVybWlzc2lvbjogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGFjdGlvbjogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgIH0pO1xuICB9XG5cbiAgLy8gb25BZGRSdWxlKCk6IHZvaWQge1xuICAvLyAgIHRoaXMuZGF0YXJ1bGVzLnB1c2godGhpcy5hZGRSdWxlKCkpO1xuICAvLyB9XG5cbiAgYWRkbG9va3VwZGF0YSgpOiBGb3JtR3JvdXAge1xuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGtleTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHZhbHVlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgb3JkZXI6IFswXVxuICAgIH0pO1xuICB9XG5cbiAgb25BZGRMb29rVXBEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMucGFnZUVycm9yU2hvdyA9IGZhbHNlO1xuICAgIHRoaXMubG9va3VwZGF0YS5wdXNoKHRoaXMuYWRkbG9va3VwZGF0YSgpKTtcbiAgfVxuXG4gIG9uRGVsZXRlTG9va3VwRGF0YShpOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxvb2t1cGRhdGEucmVtb3ZlQXQoaSk7XG4gIH1cblxuICAvLyBvbkRlbGV0ZVJ1bGUocm93SW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAvLyAgIHRoaXMuZGF0YXJ1bGVzLnJlbW92ZUF0KHJvd0luZGV4KTtcbiAgLy8gfVxuXG4gIG9uQ2xpY2tkZWxldGVDYXRlZ29yeSgpe1xuICAgIC8vIHRoaXMuc2F2ZU1vZGUgPSAnREVMRVRFJztcbiAgICB0aGlzLm5vZGVUeXBlID0gdGhpcy5zZWxlY3RlZEl0ZW0udHlwZTtcblxuICAgICQoJyNEZWxldGV1c2VyJykubW9kYWwoJ3Nob3cnKTtcbiAgfVxuXG4gIHNlYXJjaE1hc3RlcihldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICB0aGlzLmZpbHRlck1hc3Rlckxpc3QgPSB0aGlzLmNhdGVnb3JpZXMuZmlsdGVyKChhOiBhbnkpID0+IGFbJ25hbWUnXT8udG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKHZhbHVlKSk7XG4gIH1cblxuICBjbGVhclNlYXJjaCgpe1xuICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRyb2wnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcbiAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgdGhpcy5maWx0ZXJNYXN0ZXJMaXN0ID0gdGhpcy5jYXRlZ29yaWVzOyAvLyBSZXNldCB0aGUgZmlsdGVyZWQgbGlzdFxuICAgIH1cbiAgfVxuXG4gIG9uTm9kZUNvbnRleHRNZW51U2VsZWN0KGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoZXZlbnQubm9kZS50eXBlID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICBjb25zdCBwZXJtaXNzaW9uID0gdGhpcy5wZXJtaXNzaW9uU3RvcmUuc3RhdGU7XG4gICAgICB0aGlzLm1lbnVJdGVtcyA9IFtcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIGxhYmVsOiAnQ3JlYXRlIENhdGVnb3J5JyxcbiAgICAgICAgLy8gICBpY29uOiBQcmltZUljb25zLkFSUk9XX1VQX0xFRlQsXG4gICAgICAgIC8vICAgLy92aXNpYmxlOiBwZXJtaXNzaW9uLlNFVFRJTkdTX01BU19DUkVBVEVfQ0FUT0dPUlksXG4gICAgICAgIC8vICAgYmFkZ2U6ICdTRVRUSU5HU19NQVNfQ1JFQVRFX0NBVE9HT1JZJyxcbiAgICAgICAgLy8gICBjb21tYW5kOiAoY3JlYXRlRXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5zYXZlTW9kZSA9ICdJTlNFUlQnO1xuICAgICAgICAvLyAgICAgdGhpcy5ub2RlVHlwZSA9ICdjYXRlZ29yeSc7XG4gICAgICAgIC8vICAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCA9ICcnO1xuICAgICAgICAvLyAgICAgdGhpcy5jbGVhckZvcm0oKTtcbiAgICAgICAgLy8gICAgIHRoaXMubG9hZFRyZWUoKTtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGNyZWF0ZUV2ZW50KTtcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ0RlbGV0ZScsXG4gICAgICAgICAgaWNvbjogUHJpbWVJY29ucy5UUkFTSCxcbiAgICAgICAgICB2aXNpYmxlOiBwZXJtaXNzaW9uLlNFVFRJTkdTX01BU19ERUxFVEUsXG4gICAgICAgICAgYmFkZ2U6ICdTRVRUSU5HU19NQVNfREVMRVRFJyxcbiAgICAgICAgICBjb21tYW5kOiBkZWxldGVFdmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNhdmVNb2RlID0gJ0RFTEVURSc7XG4gICAgICAgICAgICB0aGlzLm5vZGVUeXBlID0gdGhpcy5zZWxlY3RlZEl0ZW0udHlwZTtcblxuICAgICAgICAgICAgJCgnI0RlbGV0ZXVzZXInKS5tb2RhbCgnc2hvdycpO1xuICAgICAgICAgICAgLy8gdGhpcy5jb25maXJtYXRpb25TZXJ2aWNlLmNvbmZpcm0oe1xuICAgICAgICAgICAgLy8gICB0YXJnZXQ6IGRlbGV0ZUV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgIC8vICAgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB0aGF0IHlvdSB3YW50IHRvIGRlbGV0ZT8nLFxuICAgICAgICAgICAgLy8gICBpY29uOiAncGkgcGktZXhjbGFtYXRpb24tdHJpYW5nbGUnLFxuICAgICAgICAgICAgLy8gICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmRlbGV0ZUl0ZW0oKTtcbiAgICAgICAgICAgIC8vICAgfSxcbiAgICAgICAgICAgIC8vICAgcmVqZWN0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgLy9ub3QgdG8gYmUgZW1wdHlcbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQubm9kZS50eXBlID09PSAnbG9va3VwJykge1xuICAgICAgdGhpcy5tZW51SXRlbXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ0NyZWF0ZSBMb29rdXAnLFxuICAgICAgICAgIGljb246IFByaW1lSWNvbnMuQVJST1dfRE9XTl9SSUdIVCxcbiAgICAgICAgICBjb21tYW5kOiBfZXZlbnRFcmFzZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEluc2VydEV2ZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdEZWxldGUnLFxuICAgICAgICAgIGljb246IFByaW1lSWNvbnMuVFJBU0gsXG4gICAgICAgICAgY29tbWFuZDogUmVtb3ZlRXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zYXZlTW9kZSA9ICdERUxFVEUnO1xuICAgICAgICAgICAgdGhpcy5ub2RlVHlwZSA9IHRoaXMuc2VsZWN0ZWRJdGVtLnR5cGU7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFJlbW92ZUV2ZW50KTtcbiAgICAgICAgICAgICQoJyNEZWxldGV1c2VyJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY29uZmlybWF0aW9uU2VydmljZS5jb25maXJtKHtcbiAgICAgICAgICAgIC8vICAgdGFyZ2V0OiBSZW1vdmVFdmVudC50YXJnZXQsXG4gICAgICAgICAgICAvLyAgIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGU/JyxcbiAgICAgICAgICAgIC8vICAgaWNvbjogJ3BpIHBpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJyxcbiAgICAgICAgICAgIC8vICAgYWNjZXB0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5kZWxldGVJdGVtKCk7XG4gICAgICAgICAgICAvLyAgIH0sXG4gICAgICAgICAgICAvLyAgIHJlamVjdDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIC8vbm90IHRvIGJlIGVtcHR5XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXTtcbiAgICB9XG4gIH1cbiAgc2V0SW5zZXJ0RXZlbnQoKSB7XG4gICAgdGhpcy5zYXZlTW9kZSA9ICdJTlNFUlQnO1xuICAgIHRoaXMubm9kZVR5cGUgPSB0aGlzLnNlbGVjdGVkSXRlbS50eXBlO1xuICAgIHRoaXMuY3JlYXRlTG9va3VwRm9ybSgpO1xuICAgIC8vIHRoaXMuY2xlYXJSdWxlcygpO1xuICB9XG5cblxuXG4gIG5vZGVFeHBhbmQoZXZlbnQ6IGFueSkge1xuICAgIGlmIChldmVudC5ub2RlICYmIGV2ZW50Lm5vZGUuZGF0YSAmJiBldmVudC5ub2RlLnR5cGUgIT09ICdsb29rdXAnKSB7XG4gICAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmdldExvb2t1cFRyZWUoZXZlbnQubm9kZS5kYXRhKS5zdWJzY3JpYmUoKG5vZGVzOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgc29ydGVkQ2hpbGRyZW4gPSAoPGFueT5ub2RlcykuZGF0YS5zb3J0KChhLCBiKSA9PiBhLnZhbHVlLmxvY2FsZUNvbXBhcmUoYi52YWx1ZSkpO1xuICAgICAgICBldmVudC5ub2RlLmNoaWxkcmVuID0gc29ydGVkQ2hpbGRyZW47XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG4gIHNhdmVDYXRlZ29yeSgpIHtcbiAgICBjb25zdCBjYXRlZ29yeSA9IHRoaXMuY2F0ZWdvcnlGb3JtLnZhbHVlO1xuICAgIHRoaXMuZm9ybVN1Ym1pdCA9IHRydWU7XG4gICAgY2F0ZWdvcnkuYXBwbGljYXRpb25pZCA9IHRoaXMuZW52aXJvbm1lbnQuYXBwbGljYXRpb25pZDtcbiAgICBjb25zb2xlLmxvZyhjYXRlZ29yeSk7XG4gICAgY2F0ZWdvcnkub3JkZXIgPSBjYXRlZ29yeS5vcmRlciA/IE51bWJlcihjYXRlZ29yeS5vcmRlcikgOiAxO1xuICAgIGlmICh0aGlzLmNhdGVnb3J5Rm9ybS52YWxpZCkge1xuICAgICAgaWYgKHRoaXMuc2F2ZU1vZGUgPT09ICdJTlNFUlQnKSB7XG4gICAgICAgIHRoaXMubWFzdGVyc1NlcnZpY2UuY3JlYXRlQ2F0ZWdvcnkoY2F0ZWdvcnkpLnN1YnNjcmliZSgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLnN1Y2Nlc3MoJ0NhdGVnb3J5IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZENhdGVnb3J5SWQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgdGhpcy5sb2FkVHJlZSgpO1xuICAgICAgICAgIHRoaXMuY2xlYXJGb3JtKCk7XG4gICAgICAgIH0sIChlcnI6IGFueSkgPT4gdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoZXJyLmVycm9yLm1lc3NhZ2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWFzdGVyc1NlcnZpY2UudXBkYXRlQ2F0ZWdvcnkoY2F0ZWdvcnkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hbGVydFNlcnZpY2Uuc3VjY2VzcygnQ2F0ZWdvcnkgdXBkYXRlZCBzdWNjZXNzZnVsbHkuJyk7XG4gICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICB0aGlzLmxpc3QodGhpcy5zZWxlY3RlZENhdGVnb3J5SWQpO1xuICAgICAgICAgIHRoaXMubG9hZFRyZWUoKTtcbiAgICAgICAgICB0aGlzLmNsZWFyRm9ybSgpO1xuICAgICAgICB9LCAoZXJyOiBhbnkpID0+IHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVyci5lcnJvci5tZXNzYWdlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoJ1BsZWFzZSBGaWxsIEFsbCBSZXF1aXJlZCBGaWVsZHMnKTtcbiAgICAvLyB9XG4gIH1cblxuICBzYXZlTG9va3VwKCkge1xuICAgIHRoaXMucGFnZUVycm9yU2hvdyA9IHRydWU7XG4gICAgY29uc3QgbG9va3VwZHRzID0gdGhpcy5sb29rdXBGb3JtLnZhbHVlO1xuICAgIGxvb2t1cGR0cy5hcHBsaWNhdGlvbmlkID0gdGhpcy5lbnZpcm9ubWVudC5hcHBsaWNhdGlvbmlkO1xuICAgIGxvb2t1cGR0cy5vcmRlciA9IGxvb2t1cGR0cy5vcmRlciA/IE51bWJlcihsb29rdXBkdHMub3JkZXIpIDogTnVtYmVyKDEpO1xuXG4gICAgaWYgKHRoaXMubG9va3VwRm9ybS52YWxpZCkge1xuXG4gICAgICBkZWxldGUgbG9va3VwZHRzLnJlYWRvbmx5O1xuICAgICAgbG9va3VwZHRzLmxvb2t1cC5vcmRlciA9IGxvb2t1cGR0cy5sb29rdXAub3JkZXIgPyBOdW1iZXIobG9va3VwZHRzLmxvb2t1cC5vcmRlcikgOiAxO1xuXG5cbiAgICAgIC8vIGlmIChsb29rdXAub3B0aW9uYWxkYXRhICYmIGxvb2t1cC5vcHRpb25hbGRhdGEucnVsZXMpIHtcbiAgICAgIC8vICAgbG9va3VwLm9wdGlvbmFsZGF0YS5ydWxlcyA9IGxvb2t1cC5vcHRpb25hbGRhdGEucnVsZXMubWFwKChydWxlOiBhbnkpID0+IHtcbiAgICAgIC8vICAgICBydWxlLnBlcm1pc3Npb24ucGFyZW50ID0gbnVsbDtcbiAgICAgIC8vICAgICByZXR1cm4gcnVsZTtcbiAgICAgIC8vICAgfSk7XG4gICAgICAvLyB9XG4gICAgICBpZiAodGhpcy5zYXZlTW9kZSA9PT0gJ0lOU0VSVCcpIHtcbiAgICAgICAgdGhpcy5tYXN0ZXJzU2VydmljZS5jcmVhdGVMb29rdXAobG9va3VwZHRzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLnN1Y2Nlc3MoJ0xvb2t1cCBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nKTtcbiAgICAgICAgICB0aGlzLmxvYWRUcmVlKCk7XG4gICAgICAgICAgdGhpcy5jbGVhckZvcm0oKVxuICAgICAgICB9LCAoZXJyOiBhbnkpID0+IHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVyci5lcnJvci5tZXNzYWdlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLnVwZGF0ZUxvb2t1cChsb29rdXBkdHMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hbGVydFNlcnZpY2Uuc3VjY2VzcygnTG9va3VwIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgICAgIHRoaXMubG9hZFRyZWUoKTtcbiAgICAgICAgICB0aGlzLmNsZWFyRm9ybSgpXG4gICAgICAgIH0sIChlcnI6IGFueSkgPT4gdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoZXJyLmVycm9yLm1lc3NhZ2UpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoJ0ludmFsaWQgbG9va3VwIGRhdGEuJyk7XG4gICAgfVxuICB9XG5cblxuXG4gIGNyZWF0ZUxvb2t1cEZvcm0oKSB7XG4gICAgdGhpcy5pbml0aWFsaXplTG9va3VwRm9ybSgpO1xuICAgIHRoaXMuc2V0R2xvYmFsKHRydWUpO1xuICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICB0aGlzLm5vZGVUeXBlID0gJ2xvb2t1cCc7XG4gICAgICB0aGlzLmxvb2t1cEZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICAgIGxvb2t1cGNhdGVnb3J5aWQ6IHRoaXMuc2VsZWN0ZWRJdGVtLmlkXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb29rdXBGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICBsb29rdXBjYXRlZ29yeWlkOiB0aGlzLnNlbGVjdGVkSXRlbS5sb29rdXBjYXRlZ29yeWlkLFxuICAgICAgICBwYXJlbnRpZDogdGhpcy5zZWxlY3RlZEl0ZW0uaWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldEdsb2JhbChjaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc0dsb2JhbExvb2t1cCA9IGNoZWNrZWQ7XG4gICAgdGhpcy5sb29rdXBGb3JtLmdldCgnYWNjZXNzJyk/LnBhdGNoVmFsdWUoe1xuICAgICAgdmlldzogW10sXG4gICAgICBhc3NpZ246IFtdXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRDb250ZXh0TWVudSgpIHtcbiAgICB0aGlzLm1lbnVJdGVtcyA9IFtcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdDcmVhdGUgQ2F0ZWdvcnknLFxuICAgICAgICBpY29uOiBQcmltZUljb25zLkFSUk9XX1VQX0xFRlQsXG4gICAgICAgIGNvbW1hbmQ6IChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5zYXZlTW9kZSA9ICdJTlNFUlQnO1xuICAgICAgICAgIHRoaXMubm9kZVR5cGUgPSAnY2F0ZWdvcnknO1xuICAgICAgICAgIHRoaXMuY2xlYXJGb3JtKCk7XG4gICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ0NyZWF0ZSBMb29rdXAnLFxuICAgICAgICBpY29uOiBQcmltZUljb25zLkFSUk9XX0RPV05fUklHSFQsXG4gICAgICAgIGNvbW1hbmQ6IF9ldmVudE5vZGUgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0SW5zZXJ0RXZlbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdEZWxldGUnLFxuICAgICAgICBpY29uOiBQcmltZUljb25zLlRSQVNILFxuICAgICAgICBjb21tYW5kOiBldmVudCA9PiB7XG4gICAgICAgICAgdGhpcy5zYXZlTW9kZSA9ICdERUxFVEUnO1xuICAgICAgICAgIHRoaXMubm9kZVR5cGUgPSB0aGlzLnNlbGVjdGVkSXRlbS50eXBlO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAgICQoJyNEZWxldGV1c2VyJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgICAvLyB0aGlzLmNvbmZpcm1hdGlvblNlcnZpY2UuY29uZmlybSh7XG4gICAgICAgICAgLy8gICB0YXJnZXQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgICAvLyAgIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGU/JyxcbiAgICAgICAgICAvLyAgIGljb246ICdwaSBwaS1leGNsYW1hdGlvbi10cmlhbmdsZScsXG4gICAgICAgICAgLy8gICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgICAvLyAgICAgLy9jb25maXJtIGFjdGlvblxuICAgICAgICAgIC8vICAgICB0aGlzLmRlbGV0ZUl0ZW0oKTtcbiAgICAgICAgICAvLyAgIH0sXG4gICAgICAgICAgLy8gICByZWplY3Q6ICgpID0+IHtcbiAgICAgICAgICAvLyAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbFxuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFRyZWUoKSB7XG4gICAgdGhpcy5wYWdlRXJyb3JTaG93ID0gZmFsc2U7XG4gICAgdGhpcy5tYXN0ZXJzU2VydmljZS5nZXRBbGxDYXRlZ29yeVRyZWUodGhpcy5lbnZpcm9ubWVudC5hcHBsaWNhdGlvbmlkKS5zdWJzY3JpYmUoKGl0ZW1zOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IGl0ZW1zO1xuICAgICAgaWYgKHRoaXMuY2F0ZWdvcmllcy5sZW5ndGgpIHtcbiAgICAgICAvLyB0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMuY2F0ZWdvcmllc1swXTtcbiAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhdGVnb3J5SWQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNhdGVnb3JpZXMuZmluZEluZGV4KChjYXRlZ29yeTogVHJlZU5vZGU8YW55PikgPT4gKGNhdGVnb3J5IGFzIGFueSkuaWQgPT09IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5jYXRlZ29yaWVzW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgICB0aGlzLmZpbHRlck1hc3Rlckxpc3QgPSB0aGlzLmNhdGVnb3JpZXM7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICB9XG4gIGNhbmNlbCgpIHtcbiAgICB0aGlzLmNhdGVnb3J5Rm9ybS5yZXNldCgpO1xuICAgIHRoaXMuZm9ybVN1Ym1pdCA9IGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlSXRlbSgpIHtcbiAgICB0aGlzLnNhdmVNb2RlID0gJ1VQREFURSc7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtLnR5cGUgPT09ICdsb29rdXAnKSB7XG4gICAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmRlbGV0ZUxvb2t1cCh0aGlzLnNlbGVjdGVkSXRlbS5pZCkuc3Vic2NyaWJlKChfaXRlbTogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICQoJyNEZWxldGV1c2VyJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgdGhpcy5hbGVydFNlcnZpY2Uuc3VjY2VzcygnTG9va3VwIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgICB0aGlzLmxvYWRUcmVlKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXN0ZXJzU2VydmljZS5kZWxldGVDYXRlZ29yeSh0aGlzLnNlbGVjdGVkSXRlbS5pZCkuc3Vic2NyaWJlKChfaXRlbTogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICQoJyNEZWxldGV1c2VyJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgdGhpcy5hbGVydFNlcnZpY2Uuc3VjY2VzcygnQ2F0ZWdvcnkgZGVsZXRlZCBzdWNjZXNzZnVsbHkuJyk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkID0gJyc7XG4gICAgICAgIHRoaXMub25DbGlja0hvbWUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlcXVpcmVkSWZWYWxpZGF0b3IocHJlZGljYXRlOiAoKSA9PiBhbnkpIHtcbiAgICByZXR1cm4gKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgIGlmICghZm9ybUNvbnRyb2wucGFyZW50KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHByZWRpY2F0ZSgpKSB7XG4gICAgICAgIHJldHVybiBWYWxpZGF0b3JzLnJlcXVpcmVkKGZvcm1Db250cm9sKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cblxufVxuIiwiPGhlYWQ+XG4gIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG4zLmRldmV4cHJlc3MuY29tL2pzbGliLzIzLjIuMy9jc3MvZHgubWF0ZXJpYWwuYmx1ZS5saWdodC5jc3NcIiAvPlxuICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS81LjE1LjQvY3NzL2FsbC5taW4uY3NzXCIgaW50ZWdyaXR5PVwic2hhMzg0LWRmU1Q2bzRlTWw0Mk1PdjcyZDdhTVIzemRUdGlFclVxNm5oQjY1ZUE2QVRsRkFxMVJmaWFESnQ5RkN4MFgxbzVcIiBjcm9zc29yaWdpbj1cImFub255bW91c1wiPlxuPC9oZWFkPlxuPGFwcC1hbGVydD48L2FwcC1hbGVydD5cbjxkaXYgY2xhc3M9XCJwZXJtaXNzaW9uXCI+XG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTQgY29sLW1kLTYgY29sLTEyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudCBweS0yXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBmYWRlIHNob3cgYWN0aXZlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMCBjb2wtMTIgZm9ybS1ncm91cCBiZ2ljb25zZWFyY2ggcHItMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtaW5wdXQtaWNvbi1yaWdodCB3LTEwMFwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicGkgcGktdGltZXMtY2lyY2xlXCIgKGNsaWNrKT1cImNsZWFyU2VhcmNoKClcIj48L2k+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgQ2F0ZWdvcnkgbmFtZVwiIHR5cGU9XCJ0ZXh0XCIgKGtleXVwKT1cInNlYXJjaE1hc3RlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PVwiU0VUVElOR1NfTUFTX1NFQVJDSF9CWV9OQU1FXCIgcElucHV0VGV4dCAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMiBjb2wtMTIgZm9ybS1ncm91cCBwbC0wIHRleHQtbWQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuY29tbW9uXCIgKGNsaWNrKT1cIm9uQ2xpY2tBZGRDYXRlZ29yeSgpXCI+QWRkPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFzdGVyYWNlc3NcIj5cbiAgICAgICAgICAgIDxwLXRyZWUgW3ZhbHVlXT1cImZpbHRlck1hc3Rlckxpc3RcIiBzZWxlY3Rpb25Nb2RlPVwic2luZ2xlXCIgWyhzZWxlY3Rpb24pXT1cInNlbGVjdGVkSXRlbVwiXG4gICAgICAgICAgICAgIChvbk5vZGVTZWxlY3QpPVwibm9kZVNlbGVjdCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L3AtdHJlZT5cbiAgICAgICAgICAgIDxwLWNvbnRleHRNZW51ICN0cmVlQ29udGV4dE1lbnUgW21vZGVsXT1cIm1lbnVJdGVtc1wiIGFwcGVuZFRvPVwiYm9keVwiPjwvcC1jb250ZXh0TWVudT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctOCBjb2wtbWQtNiBjb2wtMTIgbWFzdGVyLXJpZ2h0IG10LTJcIj5cbiAgICAgIDxwLWNvbmZpcm1Qb3B1cD48L3AtY29uZmlybVBvcHVwPlxuICAgICAgPHAtY2FyZCBpZD1cImNhdGVnb3J5Rm9ybVwiIGNsYXNzPVwicmJhYy1jYXJkXCIgW2Zvcm1Hcm91cF09XCJjYXRlZ29yeUZvcm1cIlxuICAgICAgICBbc3R5bGVdPVwieyB3aWR0aDogJzEwMCUnLCAnbWFyZ2luLWJvdHRvbSc6ICcxZW0nIH1cIj5cblxuICAgICAgICA8aW5wdXQgaWQ9XCJjaWRcIiB0eXBlPVwiaGlkZGVuXCIgZm9ybUNvbnRyb2xOYW1lPVwiaWRcIiAvPlxuICAgICAgICA8aW5wdXQgaWQ9XCJjYXBwbGljYXRpb25pZFwiIHR5cGU9XCJoaWRkZW5cIiBmb3JtQ29udHJvbE5hbWU9XCJhcHBsaWNhdGlvbmlkXCIgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1mbHVpZCBwLWZvcm1ncmlkIHAtZ3JpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgY29sLTEyIG1iLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdHJpcF9oZWFkIHRvZ2dsZWxlZnQgbS0wIHAtMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInJlcG9ydF9oZWFkIGZvbnQtd2VpZ2h0LWJvbGRcIj57e3NhdmVNb2RlID09PSAnSU5TRVJUJyA/ICdBZGQgQ2F0ZWdvcnknIDogJ1VwZGF0ZSBDYXRlZ29yeSd9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctNiBjb2wtbWQtMTIgY29sLTEyIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtTmFtZVwiIGNsYXNzPVwicmVmZXJyYWwtZm9ybS1sYWJlbHNcIj5OYW1lXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmVxdWlyZWRmaWVsZCB0ZXh0LWRhbmdlclwiPio8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBwVG9vbHRpcD1cInt7IGNhdGVnb3J5Rm9ybS5nZXQoJ25hbWUnKS52YWx1ZSB9fVwiIHRvb2x0aXBQb3NpdGlvbj1cInRvcFwiIGNsYXNzPVwidGV4dC10cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cIm1OYW1lXCIgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJuYW1lXCIgZmllbGRLZXk9XCJTRVRUSU5HU19NQVNfTkFNRVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgTmFtZVwiIGFyaWEtZGVzY3JpYmVkYnk9XCJtTmFtZVwiIFxuICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ25hbWUnLCAnQ2F0ZWdvcnkgTmFtZScsIHRydWUpXCIgcElucHV0VGV4dCBjbGFzcz1cIndpZGUtaW5wdXRcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwidmFsaWRhdGlvbkVycm9yc1snQ2F0ZWdvcnkgTmFtZSddXCIgY2xhc3M9XCJwLWVycm9yIGJsb2NrIG10LTFcIj57e3ZhbGlkYXRpb25FcnJvcnNbJ0NhdGVnb3J5IE5hbWUnXX19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXZhbGlkYXRpb25FcnJvcnNbJ0NhdGVnb3J5IE5hbWUnXSAmJiBcbiAgICAgICAgICAgIGNhdGVnb3J5Rm9ybS5jb250cm9sc1snbmFtZSddLmludmFsaWQgJiZcbiAgICAgICAgICAgIGNhdGVnb3J5Rm9ybS5jb250cm9sc1snbmFtZSddLmhhc0Vycm9yKCdyZXF1aXJlZCcpICYmIGNhdGVnb3J5Rm9ybS5jb250cm9sc1snbmFtZSddLmVycm9ycyAmJiBmb3JtU3VibWl0XCI+XG4gICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjYXRlZ29yeUZvcm0uY29udHJvbHNbJ25hbWUnXS5oYXNFcnJvcigncmVxdWlyZWQnKVwiIGNsYXNzPVwicC1lcnJvciBibG9jayBtdC0xXCI+Q2F0ZWdvcnkgTmFtZSBpcyByZXF1aXJlZDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy02IGNvbC1tZC0xMiBjb2wtMTIgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNkZXNjcmlwdGlvblwiIGNsYXNzPVwicmVmZXJyYWwtZm9ybS1sYWJlbHNcIj5EZXNjcmlwdGlvbiA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2Rlc2NyaXB0aW9uXCIgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJkZXNjcmlwdGlvblwiIGZpZWxkS2V5PVwiU0VUVElOR1NfTUFTX0RFU0NSWVBUSU9OXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBEZXNjcmlwdGlvblwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQsICdkZXNjcmlwdGlvbicsICdEZXNjcmlwdGlvbicsIGZhbHNlKVwiIHBJbnB1dFRleHQgY2xhc3M9XCJ3aWRlLWlucHV0XCIgLz5cbiAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInZhbGlkYXRpb25FcnJvcnNbJ0Rlc2NyaXB0aW9uJ11cIiBjbGFzcz1cInAtZXJyb3IgYmxvY2sgbXQtMVwiPnt7dmFsaWRhdGlvbkVycm9yc1snRGVzY3JpcHRpb24nXX19PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC0xMiBjb2wtMTIgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvcmRlclwiIGNsYXNzPVwicmVmZXJyYWwtZm9ybS1sYWJlbHMgZC1ub25lIGQtbGctaW5saW5lLWJsb2NrXCI+JiMxNjA7PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDMycHg7XCI+XG4gICAgICAgICAgICAgIDxwLWNoZWNrYm94IHN0IGlucHV0SWQ9XCJhY3RpdmVcIiBbYmluYXJ5XT1cInRydWVcIiBmb3JtQ29udHJvbE5hbWU9XCJpc2VuYWJsZWRcIiBmaWVsZEtleT1cIlNFVFRJTkdTX01BU19BQ1RJVkVcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiQWN0aXZlXCI+PC9wLWNoZWNrYm94PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgIDxkaXYgY2xhc3M9XCJtdC0yIHRleHQtcmlnaHRcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWItMiBidG4gYnRuLWRhbmdlclwiXG4gICAgICAgICAgICBmaWVsZEtleT1cIlNFVFRJTkdTX01BU19DQU5DRUxcIiAoY2xpY2spPVwib25DbGlja2RlbGV0ZUNhdGVnb3J5KClcIiAqbmdJZj1cInNhdmVNb2RlID09PSAnVVBEQVRFJ1wiPlxuICAgICAgICAgICAgRGVsZXRlXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1iLTIgYnRuIGJnLXdoaXRlIHRleHQtcHJpbWFyeSBib3JkZXIgYm9yZGVyLXByaW1hcnkgYnRuY2FuY2VsXCJcbiAgICAgICAgICAgIGZpZWxkS2V5PVwiU0VUVElOR1NfTUFTX0NBTkNFTFwiIChjbGljayk9XCJjbGVhckNhdGVnb3J5KClcIj5cbiAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtYi0yIGJ0biBidG4tcHJpbWFyeSBidG5jb21tb25cIiBmaWVsZEtleT1cIlNFVFRJTkdTX01BU19BRERfQ0FUT0dPUllcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNhdmVDYXRlZ29yeSgpXCI+XG4gICAgICAgICAgICB7eyBzYXZlTW9kZSA9PT0gJ1VQREFURScgPyAnVXBkYXRlJyA6ICdTYXZlJyB9fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcC1jYXJkPlxuXG4gICAgICA8ZGl2IGlkPVwidHJlZS1saXN0LWRlbW9cIiAqbmdJZj1cInNlbGVjdGVkQ2F0ZWdvcnlJZCAhPSAnJyBcIj5cbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICNsb29rdXB0YXNrcyAuZHgtZGF0YWdyaWQtcm93c3ZpZXcgLmR4LXJvdyB7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgI2xvb2t1cHRhc2tzIC5keC1oZWFkZXItcm93IC5keC1oZWFkZXItY2VsbCB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgI3NlYXJjaHBhbmVsIC5keC1kYXRhZ3JpZC1zZWFyY2gtcGFuZWwge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDBweDtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgPC9zdHlsZT5cblxuICAgICAgICA8cC10YWJWaWV3ICN0YWJWaWV3IFsoYWN0aXZlSW5kZXgpXT1cImFjdGl2ZVRhYkluZGV4XCIgKG9uQ2hhbmdlKT1cIm9uVGFiQ2hhbmdlKCRldmVudClcIj5cbiAgICAgICAgICA8cC10YWJQYW5lbCBoZWFkZXI9XCJFZGl0XCI+XG4gICAgICAgICAgICAgIDwhLS0gQ29udGVudCBmb3IgdGhlIEVkaXQgdGFiIC0tPlxuICAgICAgICAgIDwvcC10YWJQYW5lbD5cbiAgICAgICAgICA8cC10YWJQYW5lbCBoZWFkZXI9XCJSZW9yZGVyXCI+XG4gICAgICAgICAgICAgIDwhLS0gQ29udGVudCBmb3IgdGhlIFJlb3JkZXIgdGFiIC0tPlxuICAgICAgICAgIDwvcC10YWJQYW5lbD5cbiAgICAgICAgICA8L3AtdGFiVmlldz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNvcnQtb3B0aW9ucyBjb2wtbGctMyBjb2wtbWQtMTIgY29sLTEyIG1iLTNcIiAqbmdJZj1cImlzUmVvcmRlck1vZGVcIj5cbiAgICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cImNhdGVnb3J5Rm9ybVwiPlxuICAgICAgICAgICAgPHAtZHJvcGRvd25cbiAgICAgICAgICAgICAgW29wdGlvbnNdPVwic29ydE9yZGVyXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgYSBPcmRlclwiXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImxvb2t1cG9yZGVyXCJcbiAgICAgICAgICAgICAgb3B0aW9uTGFiZWw9XCJuYW1lXCJcbiAgICAgICAgICAgICAgb3B0aW9uVmFsdWU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgIHN0eWxlQ2xhc3M9XCJpY29uLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cInNvcnRHcmlkKCRldmVudC52YWx1ZSlcIj5cbiAgICAgICAgICAgIDwvcC1kcm9wZG93bj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZHgtdHJlZS1saXN0XG4gICAgICAgICAgaWQ9XCJsb29rdXB0YXNrc1wiXG4gICAgICAgICAgW2RhdGFTb3VyY2VdPVwidGFza3NEYXRhXCJcbiAgICAgICAgICBrZXlFeHByPVwiaWRcIlxuICAgICAgICAgIHBhcmVudElkRXhwcj1cInBhcmVudGlkXCJcbiAgICAgICAgICBbY29sdW1uQXV0b1dpZHRoXT1cInRydWVcIlxuICAgICAgICAgIFt3b3JkV3JhcEVuYWJsZWRdPVwidHJ1ZVwiXG4gICAgICAgICAgW3Nob3dCb3JkZXJzXT1cInRydWVcIlxuICAgICAgICAgIChvbkluaXROZXdSb3cpPVwiaW5pdE5ld1JvdygkZXZlbnQpXCJcbiAgICAgICAgICAob25TYXZpbmcpPVwic2F2ZUNoYW5nZXMoJGV2ZW50KVwiXG4gICAgICAgICAgKG9uQ2VsbFByZXBhcmVkKT1cIm9uQ2VsbFByZXBhcmVkKCRldmVudClcIlxuICAgICAgICAgIChvbkVkaXRDYW5jZWxlZCk9XCJvbkVkaXRDYW5jZWxlZCgkZXZlbnQpXCJcbiAgICAgICAgICAob25Ub29sYmFyUHJlcGFyaW5nKT1cIm9uVG9vbGJhclByZXBhcmluZygkZXZlbnQpXCJcbiAgICAgICAgICAob25Sb3dWYWxpZGF0aW5nKT1cIm9uUm93VmFsaWRhdGluZygkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkeG8tc29ydGluZyBtb2RlPVwibm9uZVwiPjwvZHhvLXNvcnRpbmc+XG4gICAgICAgICAgPGR4by1zZWFyY2gtcGFuZWwgaWQ9XCJzZWFyY2hwYW5lbFwiIGNsYXNzPVwiZHgtZGF0YWdyaWQtc2VhcmNoLXBhbmVsXCIgW3Zpc2libGVdPVwiaXNFZGl0TW9kZVwiIFt3aWR0aF09XCIzMDBcIiBbc3R5bGVdPVwieyAncG9zaXRpb24nOiAnYWJzb2x1dGUnLCAnbGVmdCc6ICcwJyB9XCI+PC9keG8tc2VhcmNoLXBhbmVsPlxuICAgICAgICAgIDxkeG8tZWRpdGluZ1xuICAgICAgICAgICAgbW9kZT1cImJhdGNoXCJcbiAgICAgICAgICAgIFthbGxvd0FkZGluZ109XCJpc0VkaXRNb2RlXCJcbiAgICAgICAgICAgIFthbGxvd1VwZGF0aW5nXT1cImlzRWRpdE1vZGVcIlxuICAgICAgICAgICAgW2FsbG93RGVsZXRpbmddPVwiaXNFZGl0TW9kZVwiXG4gICAgICAgICAgICBbdXNlSWNvbnNdPVwidHJ1ZVwiPlxuICAgICAgICAgIDwvZHhvLWVkaXRpbmc+XG4gICAgICAgICAgPGR4by1yb3ctZHJhZ2dpbmdcbiAgICAgICAgICAgIFthbGxvd1Jlb3JkZXJpbmddPVwiIWlzRWRpdE1vZGVcIlxuICAgICAgICAgICAgW29uUmVvcmRlcl09XCJvblJlb3JkZXJcIlxuICAgICAgICAgICAgW3Nob3dEcmFnSWNvbnNdPVwiZmFsc2VcIj5cbiAgICAgICAgICA8L2R4by1yb3ctZHJhZ2dpbmc+XG4gICAgICAgICAgPGR4by1oZWFkZXItZmlsdGVyPlxuICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAjbG9va3VwdGFza3MgLmR4LWhlYWRlci1yb3cgLmR4LWhlYWRlci1jZWxsIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgICA8L2R4by1oZWFkZXItZmlsdGVyPlxuXG4gICAgICAgICAgPGR4aS1jb2x1bW4gY2xhc3M9XCJkeC1oZWFkZXItcm93XCIgZGF0YUZpZWxkPVwia2V5XCIgY2FwdGlvbj1cIktleVwiIFttaW5XaWR0aF09XCIyMDBcIiBbbWF4V2lkdGhdPVwiMjAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVxdWlyZWQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIEtleTxzcGFuIGNsYXNzPVwicmVxdWlyZWQtbWFya2VyXCI+Kjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGR4aS12YWxpZGF0aW9uLXJ1bGUgdHlwZT1cInJlcXVpcmVkXCIgbWVzc2FnZT1cIktleSBpcyByZXF1aXJlZFwiPjwvZHhpLXZhbGlkYXRpb24tcnVsZT5cbiAgICAgICAgICAgIDxkeGktdmFsaWRhdGlvbi1ydWxlIHR5cGU9XCJwYXR0ZXJuXCIgW3BhdHRlcm5dPVwicGF0dGVyblwiIG1lc3NhZ2U9XCJBbGxvd2VkIGlucHV0IC0gQWxwaGEgbnVtZXJpYywgaHlwaGVuLCB1bmRlcnNjb3JlIGFuZCBzcGFjZS5cIj48L2R4aS12YWxpZGF0aW9uLXJ1bGU+XG4gICAgICAgICAgICA8ZHhpLXZhbGlkYXRpb24tcnVsZSB0eXBlPVwic3RyaW5nTGVuZ3RoXCIgW21heF09XCI1MFwiIG1lc3NhZ2U9XCJLZXkgbGltaXQgLSA1MCBjaGFyYWN0ZXJzXCI+PC9keGktdmFsaWRhdGlvbi1ydWxlPlxuICAgICAgICAgICAgPGR4aS12YWxpZGF0aW9uLXJ1bGUgdHlwZT1cImN1c3RvbVwiIFt2YWxpZGF0aW9uQ2FsbGJhY2tdPVwiY2hlY2tLZXlEdXBsaWNhdGVcIiBtZXNzYWdlPVwiS2V5IEFscmVhZHkgRXhpc3RzXCI+PC9keGktdmFsaWRhdGlvbi1ydWxlPlxuICAgICAgICAgIDwvZHhpLWNvbHVtbj5cbiAgICAgICAgICA8ZHhpLWNvbHVtbiBjbGFzcz1cImR4LWhlYWRlci1yb3dcIiBkYXRhRmllbGQ9XCJ2YWx1ZVwiIGNhcHRpb249XCJWYWx1ZVwiIFttaW5XaWR0aF09XCIyNTBcIiBbbWF4V2lkdGhdPVwiMjUwXCI+XG4gICAgICAgICAgICA8ZHhpLXZhbGlkYXRpb24tcnVsZSB0eXBlPVwicmVxdWlyZWRcIiBtZXNzYWdlPVwiVmFsdWUgaXMgcmVxdWlyZWRcIj48L2R4aS12YWxpZGF0aW9uLXJ1bGU+XG4gICAgICAgICAgICA8ZHhpLXZhbGlkYXRpb24tcnVsZSB0eXBlPVwic3RyaW5nTGVuZ3RoXCIgW21heF09XCIyNTBcIiBtZXNzYWdlPVwiVmFsdWUgbGltaXQgLSAyNTAgY2hhcmFjdGVyc1wiPjwvZHhpLXZhbGlkYXRpb24tcnVsZT5cbiAgICAgICAgICAgIDxkeGktdmFsaWRhdGlvbi1ydWxlIHR5cGU9XCJjdXN0b21cIiBbdmFsaWRhdGlvbkNhbGxiYWNrXT1cImNoZWNrVmFsdWVEdXBsaWNhdGVcIiBtZXNzYWdlPVwiVmFsdWUgQWxyZWFkeSBFeGlzdHNcIj48L2R4aS12YWxpZGF0aW9uLXJ1bGU+XG4gICAgICAgICAgPC9keGktY29sdW1uPlxuICAgICAgICA8L2R4LXRyZWUtbGlzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwibW9kYWxcIiBpZD1cIkRlbGV0ZXVzZXJcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiPlxuICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgPGg1IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5EZWxldGUge3t0aGlzLnNlbGVjdGVkSXRlbS50eXBlID09PSAnbG9va3VwJyA/ICdMb29rdXAnIDogJ0NhdGVnb3J5J319PC9oNT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHt7dGhpcy5zZWxlY3RlZEl0ZW0udHlwZSA9PT0gJ2xvb2t1cCcgPyAnTG9va3VwJyA6ICdDYXRlZ29yeSd9fT9cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtdC0yXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInB1bGwtcmlnaHQgbWItMiBidG4gYnRuLXByaW1hcnkgYnRuY29tbW9uIGRlbGV0ZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgKGNsaWNrKT1cImRlbGV0ZUl0ZW0oKVwiPlxuICAgICAgICAgICAgRGVsZXRlXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInB1bGwtcmlnaHQgbWItMiBtci0yIGJ0biBiZy13aGl0ZSB0ZXh0LXByaW1hcnkgYnRuY2FuY2VsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+Il19