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
import * as i19 from "@angular/common";
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
MasterdataComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MasterdataComponent, selector: "lib-masterdata", viewQueries: [{ propertyName: "treeList", first: true, predicate: DxTreeListComponent, descendants: true }], ngImport: i0, template: "<head>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn3.devexpress.com/jslib/23.2.3/css/dx.material.blue.light.css\" />\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\" integrity=\"sha384-dfST6o4eMl42MOv72d7aMR3zdTtiErUq6nhB65eA6ATlFAq1RfiaDJt9FCx0X1o5\" crossorigin=\"anonymous\">\n</head>\n<app-alert></app-alert>\n<div class=\"permission\">\n  <div class=\"row\">\n    <div class=\"col-lg-4 col-md-6 col-12\">\n      <div class=\"clearfix\"></div>\n      <div class=\"tab-content py-2\">\n        <div class=\"tab-pane fade show active\">\n          <div class=\"row\">\n            <div class=\"col-md-10 col-12 form-group bgiconsearch pr-1\">\n              <span class=\"p-input-icon-right w-100\">\n                <i class=\"pi pi-times-circle\" (click)=\"clearSearch()\"></i>\n                <input class=\"form-control\" placeholder=\"Search by Category name\" type=\"text\" (keyup)=\"searchMaster($event)\"\n                  fieldKey=\"SETTINGS_MAS_SEARCH_BY_NAME\" pInputText />\n              </span>\n            </div>\n            <div class=\"col-md-2 col-12 form-group pl-0 text-md-right\">\n              <button type=\"button\" class=\"btn btn-primary btncommon\" (click)=\"onClickAddCategory()\">Add</button>\n            </div>\n          </div>\n          <div class=\"clearfix\"></div>\n          <div class=\"masteracess\">\n            <p-tree [value]=\"filterMasterList\" selectionMode=\"single\" [(selection)]=\"selectedItem\"\n              (onNodeSelect)=\"nodeSelect($event)\">\n            </p-tree>\n            <p-contextMenu #treeContextMenu [model]=\"menuItems\" appendTo=\"body\"></p-contextMenu>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-lg-8 col-md-6 col-12 master-right mt-2\">\n      <p-confirmPopup></p-confirmPopup>\n      <p-card id=\"categoryForm\" class=\"rbac-card\" [formGroup]=\"categoryForm\"\n        [style]=\"{ width: '100%', 'margin-bottom': '1em' }\">\n\n        <input id=\"cid\" type=\"hidden\" formControlName=\"id\" />\n        <input id=\"capplicationid\" type=\"hidden\" formControlName=\"applicationid\" />\n\n        <div class=\"p-fluid p-formgrid p-grid\">\n          <div class=\"col-md-12 col-12 mb-3\">\n            <div class=\"strip_head toggleleft m-0 p-0\">\n              <span class=\"report_head font-weight-bold\">{{saveMode === 'INSERT' ? 'Add Category' : 'Update Category'}}</span>\n            </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12 col-12 mb-3\">\n            <label for=\"mName\" class=\"referral-form-labels\">Name\n              <span class=\"requiredfield text-danger\">*</span>\n            </label>\n            <input id=\"mName\" type=\"text\" formControlName=\"name\" fieldKey=\"SETTINGS_MAS_NAME\" placeholder=\"Enter Name\" aria-describedby=\"mName\"\n             (input)=\"onInput($event, 'name', 'Category Name', true)\" pInputText class=\"wide-input\" />\n            <div *ngIf=\"validationErrors['Category Name']\" class=\"p-error block mt-1\">{{validationErrors['Category Name']}}</div>\n            <div *ngIf=\"!validationErrors['Category Name'] && \n            categoryForm.controls['name'].invalid &&\n            categoryForm.controls['name'].hasError('required') && categoryForm.controls['name'].errors && formSubmit\">\n              <div *ngIf=\"categoryForm.controls['name'].hasError('required')\" class=\"p-error block mt-1\">Category Name is required</div>\n            </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12 col-12 mb-3\">\n            <label for=\"cdescription\" class=\"referral-form-labels\">Description </label>\n            <input id=\"cdescription\" type=\"text\" formControlName=\"description\" fieldKey=\"SETTINGS_MAS_DESCRYPTION\"\n              placeholder=\"Enter Description\" aria-describedby=\"cdescription\"\n              (input)=\"onInput($event, 'description', 'Description', false)\" pInputText class=\"wide-input\" />\n              <div *ngIf=\"validationErrors['Description']\" class=\"p-error block mt-1\">{{validationErrors['Description']}}</div>\n          </div>\n          <div class=\"col-lg-3 col-md-12 col-12 mb-3\">\n            <label for=\"corder\" class=\"referral-form-labels d-none d-lg-inline-block\">&#160;</label>\n            <div class=\"d-flex align-items-center\" style=\"height: 32px;\">\n              <p-checkbox st inputId=\"active\" [binary]=\"true\" formControlName=\"isenabled\" fieldKey=\"SETTINGS_MAS_ACTIVE\"\n                label=\"Active\"></p-checkbox>\n            </div>\n          </div>\n        </div>\n       <div class=\"mt-2 text-right\">\n          <button class=\"mb-2 btn btn-danger\"\n            fieldKey=\"SETTINGS_MAS_CANCEL\" (click)=\"onClickdeleteCategory()\" *ngIf=\"saveMode === 'UPDATE'\">\n            Delete\n          </button>\n          <button class=\"mb-2 btn bg-white text-primary border border-primary btncancel\"\n            fieldKey=\"SETTINGS_MAS_CANCEL\" (click)=\"clearCategory()\">\n            Cancel\n          </button>\n          <button class=\"mb-2 btn btn-primary btncommon\" fieldKey=\"SETTINGS_MAS_ADD_CATOGORY\"\n            (click)=\"saveCategory()\">\n            {{ saveMode === 'UPDATE' ? 'Update' : 'Save' }}\n          </button>\n        </div>\n      </p-card>\n\n      <div id=\"tree-list-demo\" *ngIf=\"selectedCategoryId != '' \">\n        <style>\n          #lookuptasks .dx-datagrid-rowsview .dx-row {\n            border-bottom: 1px solid #ddd;\n          }\n          #lookuptasks .dx-header-row .dx-header-cell {\n            font-weight: bold;\n          }\n          #searchpanel .dx-datagrid-search-panel {\n            margin-left: 0px;\n            padding-left: 0px;\n          }\n        </style>\n\n        <p-tabView #tabView [(activeIndex)]=\"activeTabIndex\" (onChange)=\"onTabChange($event)\">\n          <p-tabPanel header=\"Edit\">\n              <!-- Content for the Edit tab -->\n          </p-tabPanel>\n          <p-tabPanel header=\"Reorder\">\n              <!-- Content for the Reorder tab -->\n          </p-tabPanel>\n        </p-tabView>\n        <div class=\"sort-options col-lg-3 col-md-12 col-12 mb-3\" *ngIf=\"isReorderMode\">\n          <form [formGroup]=\"categoryForm\">\n            <p-dropdown\n              [options]=\"sortOrder\"\n              placeholder=\"Select a Order\"\n              formControlName=\"lookuporder\"\n              optionLabel=\"name\"\n              optionValue=\"value\"\n              styleClass=\"icon-dropdown\"\n              (onChange)=\"sortGrid($event.value)\">\n            </p-dropdown>\n          </form>\n        </div>\n        <dx-tree-list\n          id=\"lookuptasks\"\n          [dataSource]=\"tasksData\"\n          keyExpr=\"id\"\n          parentIdExpr=\"parentid\"\n          [columnAutoWidth]=\"true\"\n          [wordWrapEnabled]=\"true\"\n          [showBorders]=\"true\"\n          (onInitNewRow)=\"initNewRow($event)\"\n          (onSaving)=\"saveChanges($event)\"\n          (onCellPrepared)=\"onCellPrepared($event)\"\n          (onEditCanceled)=\"onEditCanceled($event)\"\n          (onToolbarPreparing)=\"onToolbarPreparing($event)\"\n          (onRowValidating)=\"onRowValidating($event)\"\n        >\n          <dxo-sorting mode=\"none\"></dxo-sorting>\n          <dxo-search-panel id=\"searchpanel\" class=\"dx-datagrid-search-panel\" [visible]=\"isEditMode\" [width]=\"300\" [style]=\"{ 'position': 'absolute', 'left': '0' }\"></dxo-search-panel>\n          <dxo-editing\n            mode=\"batch\"\n            [allowAdding]=\"isEditMode\"\n            [allowUpdating]=\"isEditMode\"\n            [allowDeleting]=\"isEditMode\"\n            [useIcons]=\"true\">\n          </dxo-editing>\n          <dxo-row-dragging\n            [allowReordering]=\"!isEditMode\"\n            [onReorder]=\"onReorder\"\n            [showDragIcons]=\"false\">\n          </dxo-row-dragging>\n          <dxo-header-filter>\n            <style>\n              #lookuptasks .dx-header-row .dx-header-cell {\n                font-weight: bold;\n              }\n            </style>\n          </dxo-header-filter>\n\n          <dxi-column class=\"dx-header-row\" dataField=\"key\" caption=\"Key\" [minWidth]=\"200\" [maxWidth]=\"200\">\n            <div class=\"required-header\">\n              Key<span class=\"required-marker\">*</span>\n            </div>\n            <dxi-validation-rule type=\"required\" message=\"Key is required\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"pattern\" [pattern]=\"pattern\" message=\"Allowed input - Alpha numeric, hyphen, underscore and space.\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"stringLength\" [max]=\"50\" message=\"Key limit - 50 characters\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"custom\" [validationCallback]=\"checkKeyDuplicate\" message=\"Key Already Exists\"></dxi-validation-rule>\n          </dxi-column>\n          <dxi-column class=\"dx-header-row\" dataField=\"value\" caption=\"Value\" [minWidth]=\"250\" [maxWidth]=\"250\">\n            <dxi-validation-rule type=\"required\" message=\"Value is required\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"stringLength\" [max]=\"250\" message=\"Value limit - 250 characters\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"custom\" [validationCallback]=\"checkValueDuplicate\" message=\"Value Already Exists\"></dxi-validation-rule>\n          </dxi-column>\n        </dx-tree-list>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal\" id=\"Deleteuser\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">Delete {{this.selectedItem.type === 'lookup' ? 'Lookup' : 'Category'}}</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Are you sure you want to delete the {{this.selectedItem.type === 'lookup' ? 'Lookup' : 'Category'}}?\n        <div class=\"clearfix\"></div>\n        <div class=\"mt-2\">\n          <button class=\"pull-right mb-2 btn btn-primary btncommon delete\" data-dismiss=\"modal\" (click)=\"deleteItem()\">\n            Delete\n          </button>\n          <button class=\"pull-right mb-2 mr-2 btn bg-white text-primary btncancel\" data-dismiss=\"modal\">Cancel</button>\n        </div>\n        <div class=\"clearfix\"></div>\n      </div>\n    </div>\n  </div>\n</div>", styles: ["@import\"devextreme/dist/css/dx.common.css\";@import\"devextreme/dist/css/dx.light.css\";.head-div{padding-top:9px;padding-left:7px}.bgiconsearch{margin-bottom:5px;padding-bottom:0;font-size:var(--base-font-size)}.masteracess{border:solid 1px var(--table-border);border-radius:2px;padding:5px 0;overflow-y:auto;background:var(--bg-light);max-height:calc(100vh - 243px);min-height:calc(100vh - 237px)}.masterempty{max-width:none;border-radius:50%;height:40px;width:40px}.row.masterdata{margin:0;border-bottom:solid 1px var(--table-border);padding:5px 0;cursor:pointer}.overflow_txt{overflow:hidden;text-overflow:ellipsis}span.namemaster{font-size:var(--base-font-size);color:#000}.masterid,span.emailmaster{font-size:var(--base-font-size);color:#9b9b9b}span.deletemaster{position:absolute;top:0px;right:15px;z-index:9;width:20px;float:right;cursor:pointer}span.deletemaster img{width:12px}.wide-input{width:100%}.activate{position:absolute;margin-top:-46px;margin-left:44rem}.toggleleft{font-size:13px;font-weight:600;display:block;margin-top:-12px;padding-bottom:13px}.report_button{margin-left:12px}:host ::ng-deep .ui-tree.permission-tree{width:100%}:host ::ng-deep .p-datatable .p-datatable-header{background:var(--background-color);color:var(--text-dark);border-color:var(--table-border)}:host ::ng-deep .p-datatable .p-datatable-thead tr th{background:var(--background-color);color:var(--text-dark);border-color:var(--table-border)}.p-datatable-wrapper tr td{text-align:left;border:none;padding:15px 8px;vertical-align:top}.p-datatable-wrapper tr td input{width:100%}.p-datatable-wrapper tr td button i{color:#f92929}::ng-deep #tree-list-demo{min-height:700px}::ng-deep #tasks{max-height:700px}.highlighted-row{background-color:#cbe4a9}.tab-container{display:flex;margin-bottom:10px}.tab-button{cursor:pointer;padding:10px;background-color:#f2f2f2;margin-right:5px;border-bottom:1px solid var(--table-border);background-color:var(--bg-light)}.tab-button.active{background-color:#ddd}.dx-datagrid-search-panel{margin-left:0;padding-left:0}.required-header{position:relative}.required-marker{color:red;margin-left:4px}:host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus{box-shadow:none}:host ::ng-deep .icon-dropdown li.p-dropdown-item{padding:.5rem 15px!important}:host ::ng-deep .icon-dropdown li.p-dropdown-item.p-highlight .userempty,:host ::ng-deep .icon-dropdown li.p-dropdown-item:hover .userempty,:host ::ng-deep .icon-dropdown li.p-dropdown-item:focus .userempty{color:#fff}:host ::ng-deep .icon-dropdown .userempty{height:inherit;padding:0;justify-content:start;font-size:19px;width:25px}:host ::ng-deep .p-card .p-card-content{padding:0}\n", "\n          #lookuptasks .dx-datagrid-rowsview .dx-row {\n            border-bottom: 1px solid #ddd;\n          }\n          #lookuptasks .dx-header-row .dx-header-cell {\n            font-weight: bold;\n          }\n          #searchpanel .dx-datagrid-search-panel {\n            margin-left: 0px;\n            padding-left: 0px;\n          }\n        ", "\n              #lookuptasks .dx-header-row .dx-header-cell {\n                font-weight: bold;\n              }\n            "], components: [{ type: i7.AlertComponent, selector: "app-alert" }, { type: i8.Tree, selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "togglerAriaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filteredNodes", "filterLocale", "scrollHeight", "virtualScroll", "virtualNodeHeight", "minBufferPx", "maxBufferPx", "indentation", "trackBy"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onFilter"] }, { type: i9.ContextMenu, selector: "p-contextMenu", inputs: ["model", "global", "target", "style", "styleClass", "appendTo", "autoZIndex", "baseZIndex", "triggerEvent"], outputs: ["onShow", "onHide"] }, { type: i10.ConfirmPopup, selector: "p-confirmPopup", inputs: ["key", "defaultFocus", "showTransitionOptions", "hideTransitionOptions", "autoZIndex", "baseZIndex", "style", "styleClass", "visible"] }, { type: i11.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { type: i12.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }, { type: i13.TabView, selector: "p-tabView", inputs: ["orientation", "style", "styleClass", "controlClose", "scrollable", "activeIndex"], outputs: ["onChange", "onClose", "activeIndexChange"] }, { type: i13.TabPanel, selector: "p-tabPanel", inputs: ["closable", "headerStyle", "headerStyleClass", "cache", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "selected", "disabled", "header", "leftIcon", "rightIcon"] }, { type: i14.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear"] }, { type: i15.DxTreeListComponent, selector: "dx-tree-list", inputs: ["accessKey", "activeStateEnabled", "allowColumnReordering", "allowColumnResizing", "autoExpandAll", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columns", "columnWidth", "customizeColumns", "dataSource", "dataStructure", "dateSerializationFormat", "disabled", "editing", "elementAttr", "errorRowEnabled", "expandedRowKeys", "expandNodesOnFiltering", "filterBuilder", "filterBuilderPopup", "filterMode", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "focusedColumnIndex", "focusedRowEnabled", "focusedRowIndex", "focusedRowKey", "focusStateEnabled", "hasItemsExpr", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "itemsExpr", "keyboardNavigation", "keyExpr", "loadPanel", "noDataText", "pager", "paging", "parentIdExpr", "remoteOperations", "renderAsync", "repaintChangesOnly", "rootValue", "rowAlternationEnabled", "rowDragging", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selection", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sorting", "stateStoring", "tabIndex", "toolbar", "twoWayBindingEnabled", "visible", "width", "wordWrapEnabled"], outputs: ["onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDisposing", "onEditCanceled", "onEditCanceling", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInitialized", "onInitNewRow", "onKeyDown", "onNodesInitialized", "onOptionChanged", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onSelectionChanged", "onToolbarPreparing", "accessKeyChange", "activeStateEnabledChange", "allowColumnReorderingChange", "allowColumnResizingChange", "autoExpandAllChange", "autoNavigateToFocusedRowChange", "cacheEnabledChange", "cellHintEnabledChange", "columnAutoWidthChange", "columnChooserChange", "columnFixingChange", "columnHidingEnabledChange", "columnMinWidthChange", "columnResizingModeChange", "columnsChange", "columnWidthChange", "customizeColumnsChange", "dataSourceChange", "dataStructureChange", "dateSerializationFormatChange", "disabledChange", "editingChange", "elementAttrChange", "errorRowEnabledChange", "expandedRowKeysChange", "expandNodesOnFilteringChange", "filterBuilderChange", "filterBuilderPopupChange", "filterModeChange", "filterPanelChange", "filterRowChange", "filterSyncEnabledChange", "filterValueChange", "focusedColumnIndexChange", "focusedRowEnabledChange", "focusedRowIndexChange", "focusedRowKeyChange", "focusStateEnabledChange", "hasItemsExprChange", "headerFilterChange", "heightChange", "highlightChangesChange", "hintChange", "hoverStateEnabledChange", "itemsExprChange", "keyboardNavigationChange", "keyExprChange", "loadPanelChange", "noDataTextChange", "pagerChange", "pagingChange", "parentIdExprChange", "remoteOperationsChange", "renderAsyncChange", "repaintChangesOnlyChange", "rootValueChange", "rowAlternationEnabledChange", "rowDraggingChange", "rtlEnabledChange", "scrollingChange", "searchPanelChange", "selectedRowKeysChange", "selectionChange", "showBordersChange", "showColumnHeadersChange", "showColumnLinesChange", "showRowLinesChange", "sortingChange", "stateStoringChange", "tabIndexChange", "toolbarChange", "twoWayBindingEnabledChange", "visibleChange", "widthChange", "wordWrapEnabledChange"] }, { type: i16.DxoSortingComponent, selector: "dxo-sorting", inputs: ["ascendingText", "clearText", "descendingText", "mode", "showSortIndexes"] }, { type: i16.DxoSearchPanelComponent, selector: "dxo-search-panel", inputs: ["highlightCaseSensitive", "highlightSearchText", "placeholder", "searchVisibleColumnsOnly", "text", "visible", "width"], outputs: ["textChange"] }, { type: i16.DxoEditingComponent, selector: "dxo-editing", inputs: ["allowAdding", "allowDeleting", "allowUpdating", "changes", "confirmDelete", "editColumnName", "editRowKey", "form", "mode", "newRowPosition", "popup", "refreshMode", "selectTextOnEditStart", "startEditAction", "texts", "useIcons", "allowAddShape", "allowChangeConnection", "allowChangeConnectorPoints", "allowChangeConnectorText", "allowChangeShapeText", "allowDeleteConnector", "allowDeleteShape", "allowMoveShape", "allowResizeShape", "allowDependencyAdding", "allowDependencyDeleting", "allowResourceAdding", "allowResourceDeleting", "allowResourceUpdating", "allowTaskAdding", "allowTaskDeleting", "allowTaskResourceUpdating", "allowTaskUpdating", "enabled", "allowDragging", "allowResizing", "allowTimeZoneEditing"], outputs: ["changesChange", "editColumnNameChange", "editRowKeyChange"] }, { type: i16.DxoRowDraggingComponent, selector: "dxo-row-dragging", inputs: ["allowDropInsideItem", "allowReordering", "autoScroll", "boundary", "container", "cursorOffset", "data", "dragDirection", "dragTemplate", "dropFeedbackMode", "filter", "group", "handle", "onAdd", "onDragChange", "onDragEnd", "onDragMove", "onDragStart", "onRemove", "onReorder", "scrollSensitivity", "scrollSpeed", "showDragIcons"] }, { type: i16.DxoHeaderFilterComponent, selector: "dxo-header-filter", inputs: ["allowSearch", "dataSource", "groupInterval", "height", "searchMode", "width", "searchTimeout", "texts", "visible", "showRelevantValues"] }, { type: i16.DxiColumnComponent, selector: "dxi-column", inputs: ["alignment", "allowEditing", "allowExporting", "allowFiltering", "allowFixing", "allowGrouping", "allowHeaderFiltering", "allowHiding", "allowReordering", "allowResizing", "allowSearch", "allowSorting", "autoExpandGroup", "buttons", "calculateCellValue", "calculateDisplayValue", "calculateFilterExpression", "calculateGroupValue", "calculateSortValue", "caption", "cellTemplate", "columns", "cssClass", "customizeText", "dataField", "dataType", "editCellTemplate", "editorOptions", "encodeHtml", "falseText", "filterOperations", "filterType", "filterValue", "filterValues", "fixed", "fixedPosition", "format", "formItem", "groupCellTemplate", "groupIndex", "headerCellTemplate", "headerFilter", "hidingPriority", "isBand", "lookup", "minWidth", "name", "ownerBand", "renderAsync", "selectedFilterOperation", "setCellValue", "showEditorAlways", "showInColumnChooser", "showWhenGrouped", "sortIndex", "sortingMethod", "sortOrder", "trueText", "type", "validationRules", "visible", "visibleIndex", "width"], outputs: ["filterValueChange", "filterValuesChange", "groupIndexChange", "selectedFilterOperationChange", "sortIndexChange", "sortOrderChange", "visibleChange", "visibleIndexChange"] }, { type: i16.DxiValidationRuleComponent, selector: "dxi-validation-rule", inputs: ["message", "trim", "type", "ignoreEmptyValue", "max", "min", "reevaluate", "validationCallback", "comparisonTarget", "comparisonType", "pattern"] }], directives: [{ type: i17.PermissionDirective, selector: "[fieldKey]", inputs: ["fieldKey"] }, { type: i18.InputText, selector: "[pInputText]" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i19.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvbWFzdGVyZGF0YS9zcmMvbGliL3BpY3MtbWFzdGVyZGF0YS9tYXN0ZXJkYXRhL21hc3RlcmRhdGEuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL21hc3RlcmRhdGEvc3JjL2xpYi9waWNzLW1hc3RlcmRhdGEvbWFzdGVyZGF0YS9tYXN0ZXJkYXRhLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQTBCLFVBQVUsRUFBOEIsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0csT0FBTyxFQUEyQyxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFNbEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBR3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPekQsTUFBTSxPQUFPLG1CQUFtQjtJQXdEOUIsWUFDVSxjQUEyQixFQUMzQixXQUF3QixFQUN4QixZQUEwQixFQUMxQixtQkFBd0MsRUFDeEMsZUFBZ0MsRUFDaEMsYUFBK0I7UUFML0IsbUJBQWMsR0FBZCxjQUFjLENBQWE7UUFDM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBMUR6QyxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBRTNCLHFCQUFnQixHQUFVLEVBQUUs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bUIsZ0RDbkJoQyxvK1VBOE1NOzRGRDVMTyxtQkFBbUI7a0JBTC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsV0FBVyxFQUFFLDZCQUE2QjtvQkFDMUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7aUJBQzNDO3NQQUVvRCxRQUFRO3NCQUExRCxTQUFTO3VCQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIEZvcm1BcnJheSwgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRyZWVOb2RlLCBNZW51SXRlbSwgQ29uZmlybWF0aW9uU2VydmljZSwgUHJpbWVJY29ucyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFBlcm1pc3Npb25TdG9yZSB9IGZyb20gJy4uL0Bjb3JlL3Blcm1pc3Npb25zL3Blcm1pc3Npb24uc3RvcmUnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi4vQGNvcmUvc2VydmljZS9hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IFJiYWNTZXJ2aWNlIH0gZnJvbSAnLi4vQGNvcmUvc2VydmljZS9yYmFjLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JlU2VydmljZSB9IGZyb20gJy4uL0Bjb3JlL3NlcnZpY2UvZGF0YS1zdG9yZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUkJBQ0lORk8gfSBmcm9tICcuLi9AY29yZS91cmxzL3JiYWMtdXJsLmNvbmZpZyc7XG5pbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBEeFRyZWVMaXN0TW9kdWxlIH0gZnJvbSAnZGV2ZXh0cmVtZS1hbmd1bGFyJztcbmltcG9ydCB7IER4VHJlZUxpc3RDb21wb25lbnQgfSBmcm9tICdkZXZleHRyZW1lLWFuZ3VsYXInO1xuZGVjbGFyZSBjb25zdCAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbWFzdGVyZGF0YScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXN0ZXJkYXRhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFzdGVyZGF0YS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1hc3RlcmRhdGFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKER4VHJlZUxpc3RDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmVlTGlzdDogRHhUcmVlTGlzdENvbXBvbmVudDtcbiAgdXBkYXRlTG9va1VwRm9ybTogRm9ybUdyb3VwO1xuICBjYXRlZ29yaWVzITogVHJlZU5vZGVbXTtcbiAgbWVudUl0ZW1zOiBNZW51SXRlbVtdID0gW107XG4gIGNhdGVnb3J5Rm9ybSE6IEZvcm1Hcm91cDtcbiAgZmlsdGVyTWFzdGVyTGlzdDogYW55W10gPSBbXTtcbiAgbG9va3VwRm9ybSE6IEZvcm1Hcm91cDtcbiAgbG9va3VwUnVsZUZvcm0hOiBGb3JtR3JvdXA7XG4gIHJvbGVzITogYW55W107XG4gIHBlcm1pc3Npb25zITogYW55W107XG4gIG5vZGVUeXBlOiBzdHJpbmc7XG4gIHNhdmVNb2RlOiBzdHJpbmc7XG4gIHNlbGVjdGVkSXRlbTogYW55ID0ge307XG4gIG5vZGVzZWxlY3R0eXBlOiBzdHJpbmc7XG4gIGlzR2xvYmFsTG9va3VwOiBib29sZWFuO1xuICBwYWdlRXJyb3JTaG93ID0gZmFsc2U7XG4gIGRhdGFDb250cm9sQWN0aW9ucyA9IFtcbiAgICB7IHZhbHVlOiAnJywgbmFtZTogJ1NlbGVjdCcgfSxcbiAgICB7IHZhbHVlOiAnSElERScsIG5hbWU6ICdIaWRlJyB9LFxuICAgIHsgdmFsdWU6ICdESVNBQkxFJywgbmFtZTogJ0Rpc2FibGUnIH0sXG4gICAgeyB2YWx1ZTogJ01BU0snLCBuYW1lOiAnTWFzaycgfVxuICBdO1xuICBzb3J0T3JkZXIgPSBbXG4gICAgeyB2YWx1ZTogJ2FzYycsIG5hbWU6ICdBU0MnIH0sXG4gICAgeyB2YWx1ZTogJ2Rlc2MnLCBuYW1lOiAnREVTQycgfVxuICBdO1xuICBlbnZpcm9ubWVudDogYW55O1xuICBSQkFDT1JHOiBSQkFDSU5GTyA9IG5ldyBSQkFDSU5GTygpO1xuICBvcmdTdWJzITogU3Vic2NyaXB0aW9uO1xuICBvcmdJZDogYW55O1xuICBzZWxlY3RlZENhdGVnb3J5SWQ6IGFueTtcbiAgdGFza3NEYXRhOiBhbnkgPSBbXTtcbiAgcm93RWRpdE1vZGU6IHN0cmluZyA9ICdiYXRjaCc7XG4gIHNlbGVjdGVkRXZlbnQ6IGFueTtcbiAgcGF0dGVybjogYW55ID0vXlthLXpBLVowLTktXyBdKyQvO1xuICAvL3BhdHRlcm46IGFueSA9IC9eW2EtekEtWjAtOSwuLyBfKi1dKyQvO1xuICBvcmRlclBhdHRlcm46IGFueSA9IC9eWzAtOV0rJC87XG4gIGFsbG93RHJvcEluc2lkZUl0ZW0gPSB0cnVlO1xuICBhbGxvd1Jlb3JkZXJpbmcgPSBmYWxzZTtcbiAgc2hvd0RyYWdJY29ucyA9IGZhbHNlO1xuICBpc0VkaXRNb2RlOiBib29sZWFuID0gdHJ1ZTtcblxuICBleHBhbmRlZFJvd0tleXM6IEFycmF5PG51bWJlcj4gPSBbMV07XG4gIGVkaXQ6IHN0cmluZztcbiAgZWRpdGJhdGNoOiBzdHJpbmc7XG4gIGJhdGNoRWRpdDogc3RyaW5nO1xuICB2aXNpYmxlUm93czogYW55O1xuICBpc1NhdmVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1Jlb3JkZXJNb2RlOiBib29sZWFuID0gZmFsc2U7XG4gIHNlbGVjdGVkU29ydE9yZGVyOiAnYXNjJyB8ICdkZXNjJyA9ICdhc2MnO1xuICBhY3RpdmVUYWJJbmRleCA9IDA7XG4gIGxvb2t1cG9yZGVyOiBGb3JtQ29udHJvbDtcbiAgZm9ybVN1Ym1pdCA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdmFsaWRhdGlvbkVycm9yczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBpbnB1dFZhbGlkYXRpb25NZXRob2Q6IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtYXN0ZXJzU2VydmljZTogUmJhY1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpcm1hdGlvblNlcnZpY2U6IENvbmZpcm1hdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwZXJtaXNzaW9uU3RvcmU6IFBlcm1pc3Npb25TdG9yZSxcbiAgICBwcml2YXRlIF9zdG9yZXNlcnZpY2U6IERhdGFTdG9yZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMubm9kZVR5cGUgPSAnY2F0ZWdvcnknO1xuICAgIHRoaXMuc2F2ZU1vZGUgPSAnSU5TRVJUJztcbiAgICB0aGlzLmlzR2xvYmFsTG9va3VwID0gdHJ1ZTtcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCA9ICcnO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUNhdGVnb3J5Rm9ybSgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUxvb2t1cEZvcm0oKTtcbiAgICB0aGlzLnNob3dEcmFnSWNvbnMgPSB0cnVlO1xuICAgIHRoaXMub25SZW9yZGVyID0gdGhpcy5vblJlb3JkZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoZWNrS2V5RHVwbGljYXRlID0gdGhpcy5jaGVja0tleUR1cGxpY2F0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hlY2tWYWx1ZUR1cGxpY2F0ZSA9IHRoaXMuY2hlY2tWYWx1ZUR1cGxpY2F0ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vcmdTdWJzID0gdGhpcy5fc3RvcmVzZXJ2aWNlLmN1cnJlbnRTdG9yZS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICB0aGlzLmlucHV0VmFsaWRhdGlvbk1ldGhvZCA9IHJlc1snSU5QVVRWQUxJREFUSU9OTUVUSE9EJ11cbiAgICAgIGlmIChyZXNbJ1JCQUNPUkcnXSAmJiByZXNbJ1JCQUNPUkcnXSAhPT0gJycpIHtcbiAgICAgICAgdGhpcy5SQkFDT1JHID0gcmVzWydSQkFDT1JHJ107XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUkJBQ09SRywgJ1JCQUNPUkcgUGVybWlzc29uJyk7XG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnQgPSB0aGlzLlJCQUNPUkdbJ2Vudmlyb25tZW50J107XG4gICAgICAgIHRoaXMub3JnSWQgPSBwYXJzZUludCh0aGlzLlJCQUNPUkdbJ29yZ0lEJ10pO1xuICAgICAgICBpZiAodGhpcy5lbnZpcm9ubWVudCkge1xuICAgICAgICAgIHRoaXMubG9hZFRyZWUoKTtcbiAgICAgICAgICB0aGlzLmxvYWRDb250ZXh0TWVudSgpO1xuICAgICAgICAgIHRoaXMubWFzdGVyc1NlcnZpY2UuZ2V0QWxsVXNlclJvbGUoKS5zdWJzY3JpYmUoKGl0ZW1zOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucm9sZXMgPSBpdGVtcy5kYXRhO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMubWFzdGVyc1NlcnZpY2UuZ2V0UGVybWlzc2lvbnNUcmVlKHRoaXMuZW52aXJvbm1lbnQuYXBwbGljYXRpb25pZCkuc3Vic2NyaWJlKChpdGVtczogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zID0gaXRlbXMuZGF0YTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMub3JnU3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUNhdGVnb3J5Rm9ybSgpIHtcbiAgICB0aGlzLmxvb2t1cG9yZGVyID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgdGhpcy5jYXRlZ29yeUZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGlkOiBbMF0sXG4gICAgICBhcHBsaWNhdGlvbmlkOiBbdGhpcy5lbnZpcm9ubWVudCA/IHRoaXMuZW52aXJvbm1lbnRbJ2FwcGxpY2F0aW9uaWQnXSA6ICcnXSxcbiAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBkZXNjcmlwdGlvbjogWycnXSxcbiAgICAgIHJlYWRvbmx5OiBbZmFsc2VdLFxuICAgICAgaXNlbmFibGVkOiBbdHJ1ZV0sXG4gICAgICBsb29rdXBvcmRlcjogdGhpcy5sb29rdXBvcmRlclxuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJDYXRlZ29yeSgpIHtcbiAgICAvL3RoaXMuY2xlYXJGb3JtKCk7XG4gICAgdGhpcy5mb3JtU3VibWl0ID0gZmFsc2U7XG4gICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzID0ge307XG4gICAgdGhpcy5pbml0aWFsaXplQ2F0ZWdvcnlGb3JtKCk7XG4gICAgdGhpcy5tYXN0ZXJzU2VydmljZS5nZXRMb29rdXBCeWNhdGVnb3J5SUQodGhpcy5zZWxlY3RlZENhdGVnb3J5SWQpLnN1YnNjcmliZSgoaXRlbTogYW55KSA9PiB7XG4gICAgICBjb25zdCBsb29rdXBkYXRhaXRlbXMgPSBpdGVtWydkYXRhJ107XG4gICAgICB0aGlzLmNhdGVnb3J5Rm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgICAgaWQ6IGxvb2t1cGRhdGFpdGVtcy5pZCxcbiAgICAgICAgYXBwbGljYXRpb25pZDogbG9va3VwZGF0YWl0ZW1zLmFwcGxpY2F0aW9uaWQsXG4gICAgICAgIG5hbWU6IGxvb2t1cGRhdGFpdGVtcy5uYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogbG9va3VwZGF0YWl0ZW1zLmRlc2NyaXB0aW9uLFxuICAgICAgICByZWFkb25seTogbG9va3VwZGF0YWl0ZW1zLnJlYWRvbmx5LFxuICAgICAgICBpc2VuYWJsZWQ6IGxvb2t1cGRhdGFpdGVtcy5pc2VuYWJsZWQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uSW5wdXQoZXZlbnQ6IEV2ZW50LCBmaWVsZHR5cGU6IGFueSwgbGFiZWw6IGFueSwgcmVxdWlyZWQ6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBlcnJvciA9ICB0aGlzLmlucHV0VmFsaWRhdGlvbk1ldGhvZChldmVudCwgZmllbGR0eXBlLCBsYWJlbCwgcmVxdWlyZWQpO1xuICAgIGlmIChlcnJvciAmJiB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnNbbGFiZWxdID0gZXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnZhbGlkYXRpb25FcnJvcnNbbGFiZWxdO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2tIb21lKCkge1xuICAgIHRoaXMuc2F2ZU1vZGUgPSAnSU5TRVJUJztcbiAgICB0aGlzLm5vZGVUeXBlID0gJ2NhdGVnb3J5JztcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCA9ICcnO1xuICAgIHRoaXMuY2xlYXJGb3JtKCk7XG4gICAgdGhpcy5sb2FkVHJlZSgpO1xuICAgIHRoaXMuZm9ybVN1Ym1pdCA9IGZhbHNlO1xuICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuICB9XG5cbiAgY2xlYXJGb3JtKCkge1xuICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuICAgIHRoaXMuZm9ybVN1Ym1pdCA9IGZhbHNlO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUNhdGVnb3J5Rm9ybSgpO1xuICAgIHRoaXMudGFza3NEYXRhID0gW107XG4gIH1cblxuICBvbkNsaWNrQWRkQ2F0ZWdvcnkoKSB7XG4gICAgdGhpcy5zYXZlTW9kZSA9ICdJTlNFUlQnO1xuICAgIHRoaXMubm9kZVR5cGUgPSAnY2F0ZWdvcnknO1xuICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkID0gJyc7XG4gICAgdGhpcy5jbGVhckZvcm0oKTtcbiAgICB0aGlzLmxvYWRUcmVlKCk7XG4gIH1cblxuICAvLyBvbkNsaWNrRGVsZXRlQ2F0ZWdvcnkoKSB7XG4gIC8vICAgdGhpcy5zYXZlTW9kZSA9ICdERUxFVEUnO1xuICAvLyAgIHRoaXMubm9kZVR5cGUgPSB0aGlzLnNlbGVjdGVkSXRlbS50eXBlO1xuICAvLyAgICQoJyNEZWxldGV1c2VyJykubW9kYWwoJ3Nob3cnKTtcbiAgLy8gfVxuXG4gIGluaXROZXdSb3coZSkge1xuICAgIGUuZGF0YS5vcmRlciA9IDA7XG4gICAgLy9lLmRhdGEuaWQgPSAwO1xuICAgIGUuZGF0YS5sb29rdXBjYXRlZ29yeWlkID0gdGhpcy5zZWxlY3RlZENhdGVnb3J5SWQ7XG4gIH1cblxuICBvbkNlbGxQcmVwYXJlZChldmVudDogYW55KSB7XG4gICAgLy8gVGhlIGV2ZW50IHBhcmFtZXRlciBjb250YWlucyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgQ29tcG9uZW50IGRhdGFcbiAgICB0aGlzLnZpc2libGVSb3dzID0gZXZlbnQuY29tcG9uZW50LmdldFZpc2libGVSb3dzKCk7XG4gIH1cblxuICBvbkVkaXRDYW5jZWxlZChldmVudDogYW55KSB7XG4gICAgdGhpcy5saXN0KHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkKTtcbiAgfVxuXG4gIG9uVG9vbGJhclByZXBhcmluZyhlOiBhbnkpIHtcbiAgICBsZXQgdG9vbGJhckl0ZW1zID0gZS50b29sYmFyT3B0aW9ucy5pdGVtcztcblxuICAgIC8vIE1vZGlmaWVzIGFuIGV4aXN0aW5nIGl0ZW1cbiAgICB0b29sYmFySXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gXCJzZWFyY2hQYW5lbFwiKSB7XG4gICAgICAgIGl0ZW0ubG9jYXRpb24gPSBcImJlZm9yZVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG9uUm93VmFsaWRhdGluZyhlKSB7XG4gICAgY29uc29sZS5sb2coJ2V2ZW50JywgZSlcbiAgICBpZiAoZS5pc1ZhbGlkID09IGZhbHNlKSB7XG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcihgUGxlYXNlIGNvcnJlY3QgZXhpc3Rpbmcgcm93LWxldmVsIHZhbGlkYXRpb24ocykuYClcbiAgICB9XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICAgIHRoaXMuaXNTYXZlRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAvLyAgICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGUuZWxlbWVudC5maW5kKFwiW2FyaWEtbGFiZWw9J1NwZWljaGVybiddXCIpLmR4QnV0dG9uKFwiaW5zdGFuY2VcIik7XG4gICAgLy8gICAgIHNhdmVCdXR0b24ub3B0aW9uKFwiZGlzYWJsZWRcIiwgdGhpcy5pc1NhdmVEaXNhYmxlZCk7XG4gICAgLy8gfVxuICB9XG4gIC8vICAgb25Sb3dWYWxpZGF0aW5nKGUpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdldmVudCcsIGUpO1xuXG4gIC8vICAgICBjb25zdCBzYXZlQnV0dG9uID0gZS5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHgtdHJlZWxpc3Qtc2F2ZS1idXR0b25cIik7IC8vIFVzZSB0aGUgY29ycmVjdCBjbGFzcyBuYW1lXG5cbiAgLy8gICAgIGlmIChlLmlzVmFsaWQgPT09IGZhbHNlKSB7XG4gIC8vICAgICAgICAgdGhpcy5pc1NhdmVEaXNhYmxlZCA9IHRydWU7XG4gIC8vICAgICAgICAvLyBzYXZlQnV0dG9uLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgLy8gICAgICAgIC8vIHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGBFcnJvcjogRHVwbGljYXRlIHZhbHVlIGZvdW5kYCk7XG4gIC8vICAgICB9IGVsc2Uge1xuICAvLyAgICAgICAgIHRoaXMuaXNTYXZlRGlzYWJsZWQgPSBmYWxzZTtcbiAgLy8gICAgICAgLy8gIHNhdmVCdXR0b24ucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgLy8gICAgIH1cbiAgLy8gIH1cblxuICBoYW5kbGVUYWJDbGljayhldmVudDogYW55KSB7XG4gICAgY29uc29sZS5sb2coJ1RhYiBjbGlja2VkOicsIGV2ZW50Lml0ZW1EYXRhKTtcbiAgICBpZiAoZXZlbnQuaXRlbURhdGEudGV4dCA9PSAnRWRpdCcpIHtcbiAgICAgIHRoaXMudG9nZ2xlRWRpdE1vZGUoKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50Lml0ZW1EYXRhLnRleHQgPT0gJ1Jlb3JkZXInKSB7XG4gICAgICB0aGlzLnRvZ2dsZVJlb3JkZXJNb2RlKCk7XG4gICAgfVxuICB9XG5cblxuICB0b2dnbGVFZGl0TW9kZSgpIHtcbiAgICB0aGlzLmlzRWRpdE1vZGUgPSB0cnVlO1xuICAgIHRoaXMuYmF0Y2hFZGl0ID0gXCJiYXRjaFwiO1xuICAgIHRoaXMuaXNSZW9yZGVyTW9kZSA9IGZhbHNlXG4gICAgdGhpcy5saXN0KHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkKTtcbiAgfVxuXG4gIHRvZ2dsZVJlb3JkZXJNb2RlKCkge1xuICAgIHRoaXMuaXNFZGl0TW9kZSA9IGZhbHNlO1xuICAgIHRoaXMuYmF0Y2hFZGl0ID0gXCJcIjtcbiAgICB0aGlzLmFsbG93UmVvcmRlcmluZyA9IHRydWU7XG4gICAgdGhpcy5zaG93RHJhZ0ljb25zID0gdHJ1ZTtcbiAgICB0aGlzLmlzUmVvcmRlck1vZGUgPSB0cnVlXG4gICAgdGhpcy5saXN0KHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkKTtcbiAgfVxuXG4gIG9uVGFiQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAvLyBIYW5kbGUgdGFiIGNoYW5nZSBsb2dpYyBoZXJlXG4gICAgY29uc29sZS5sb2coJ1RhYiBjaGFuZ2VkOicsIGV2ZW50LmluZGV4KTtcbiAgICBpZiAoZXZlbnQuaW5kZXggPT09IDApIHtcbiAgICAgIC8vIENhbGwgeW91ciB0b2dnbGVFZGl0TW9kZSgpIG1ldGhvZFxuICAgICAgdGhpcy50b2dnbGVFZGl0TW9kZSgpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuaW5kZXggPT09IDEpIHtcbiAgICAgIC8vIENhbGwgeW91ciB0b2dnbGVSZW9yZGVyTW9kZSgpIG1ldGhvZFxuICAgICAgdGhpcy50b2dnbGVSZW9yZGVyTW9kZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG9uUmVvcmRlcihlKSB7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gJ2N1c3RvbSdcbiAgICBjb25zdCB2aXNpYmxlUm93cyA9IGUuY29tcG9uZW50LmdldFZpc2libGVSb3dzKCk7XG4gICAgY29uc3QgdG9JbmRleCA9IHRoaXMudGFza3NEYXRhLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gdmlzaWJsZVJvd3NbZS50b0luZGV4XS5kYXRhLmlkKTtcbiAgICBjb25zdCBmcm9tSW5kZXggPSB0aGlzLnRhc2tzRGF0YS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGUuaXRlbURhdGEuaWQpO1xuXG4gICAgdGhpcy50YXNrc0RhdGEuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgdGhpcy50YXNrc0RhdGEuc3BsaWNlKHRvSW5kZXgsIDAsIGUuaXRlbURhdGEpO1xuICAgIC8vbW92ZUl0ZW1JbkFycmF5KHRoaXMudGFza3NEYXRhLCBlLmZyb21JbmRleCwgZS50b0luZGV4KTtcbiAgICB0aGlzLnRhc2tzRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaXRlbS5vcmRlciA9IGluZGV4ICsgMTtcbiAgICB9KTtcblxuICAgIGF3YWl0IHRoaXMubWFzdGVyc1NlcnZpY2UudXBkYXRlTG9va3VwT3JkZXIodGhpcy50YXNrc0RhdGEsIHNvcnRPcmRlcikuc3Vic2NyaWJlKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMubGlzdCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzb3J0R3JpZChvcmRlcjogYW55KSB7XG5cbiAgICBpZiAob3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAvLyBTb3J0IHRoZSBncmlkIGluIGFzY2VuZGluZyBvcmRlclxuICAgICAgY29uc3Qgc29ydE9yZGVyID0gJ2FzYydcbiAgICAgIHRoaXMudGFza3NEYXRhLnNvcnQoKGEsIGIpID0+IGEudmFsdWUubG9jYWxlQ29tcGFyZShiLnZhbHVlKSk7XG5cbiAgICAgIHRoaXMudGFza3NEYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBpdGVtLm9yZGVyID0gaW5kZXggKyAxKTtcblxuICAgICAgYXdhaXQgdGhpcy5tYXN0ZXJzU2VydmljZS51cGRhdGVMb29rdXBPcmRlcih0aGlzLnRhc2tzRGF0YSwgc29ydE9yZGVyKS5zdWJzY3JpYmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmxpc3QodGhpcy5zZWxlY3RlZENhdGVnb3J5SWQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvcnQgdGhlIGdyaWQgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgICAgY29uc3Qgc29ydE9yZGVyID0gJ2Rlc2MnXG4gICAgICB0aGlzLnRhc2tzRGF0YS5zb3J0KChhLCBiKSA9PiBiLnZhbHVlLmxvY2FsZUNvbXBhcmUoYS52YWx1ZSkpO1xuXG4gICAgICB0aGlzLnRhc2tzRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gaXRlbS5vcmRlciA9IGluZGV4ICsgMSk7XG5cbiAgICAgIGF3YWl0IHRoaXMubWFzdGVyc1NlcnZpY2UudXBkYXRlTG9va3VwT3JkZXIodGhpcy50YXNrc0RhdGEsIHNvcnRPcmRlcikuc3Vic2NyaWJlKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5saXN0KHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrS2V5RHVwbGljYXRlKHBhcmFtczogYW55KSB7XG4gICAgaWYgKHBhcmFtcy5kYXRhICYmIHBhcmFtcy5kYXRhLmtleSAmJiBwYXJhbXMuZGF0YS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZWRpdGVkS2V5ID0gcGFyYW1zLmRhdGEua2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgb2NjdXJyZW5jZXMgPSB0aGlzLnZpc2libGVSb3dzLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmRhdGEucGFyZW50aWQgPSBpdGVtLmRhdGEucGFyZW50aWQgPT0gbnVsbCA/IDAgOiBpdGVtLmRhdGEucGFyZW50aWRcbiAgICAgICAgcGFyYW1zLmRhdGEucGFyZW50aWQgPSBwYXJhbXMuZGF0YS5wYXJlbnRpZCA9PSBudWxsID8gMCA6IHBhcmFtcy5kYXRhLnBhcmVudGlkXG4gICAgICAgIGlmIChwYXJhbXMuZGF0YS5wYXJlbnRpZCA9PSBpdGVtLmRhdGEucGFyZW50aWQpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5kYXRhICYmIGl0ZW0uZGF0YS5rZXkgJiYgaXRlbS5kYXRhLmtleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gZWRpdGVkS2V5O1xuICAgICAgICB9XG4gICAgICB9KS5sZW5ndGg7XG5cbiAgICAgIGNvbnN0IGlzRHVwbGljYXRlID0gb2NjdXJyZW5jZXMgPiAxO1xuICAgICAgcmV0dXJuICFpc0R1cGxpY2F0ZTtcbiAgICB9XG4gIH1cblxuICBjaGVja1ZhbHVlRHVwbGljYXRlKHBhcmFtczogYW55KSB7XG4gICAgaWYgKHBhcmFtcy5kYXRhICYmIHBhcmFtcy5kYXRhLnZhbHVlICYmIHBhcmFtcy5kYXRhLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGVkaXRlZFZhbHVlID0gcGFyYW1zLmRhdGEudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBvY2N1cnJlbmNlcyA9IHRoaXMudmlzaWJsZVJvd3MuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uZGF0YS5wYXJlbnRpZCA9IGl0ZW0uZGF0YS5wYXJlbnRpZCA9PSBudWxsID8gMCA6IGl0ZW0uZGF0YS5wYXJlbnRpZFxuICAgICAgICBwYXJhbXMuZGF0YS5wYXJlbnRpZCA9IHBhcmFtcy5kYXRhLnBhcmVudGlkID09IG51bGwgPyAwIDogcGFyYW1zLmRhdGEucGFyZW50aWRcbiAgICAgICAgaWYgKHBhcmFtcy5kYXRhLnBhcmVudGlkID09IGl0ZW0uZGF0YS5wYXJlbnRpZCkge1xuICAgICAgICAgIHJldHVybiBpdGVtLmRhdGEgJiYgaXRlbS5kYXRhLnZhbHVlICYmIGl0ZW0uZGF0YS52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gZWRpdGVkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pLmxlbmd0aDtcblxuICAgICAgY29uc3QgaXNEdXBsaWNhdGUgPSBvY2N1cnJlbmNlcyA+IDE7XG4gICAgICByZXR1cm4gIWlzRHVwbGljYXRlXG4gICAgfVxuICB9XG5cbiAgbm9kZVNlbGVjdChldmVudDogYW55KSB7XG5cbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSB7fTtcbiAgICB0aGlzLmZvcm1TdWJtaXQgPSBmYWxzZTtcbiAgICB0aGlzLm5vZGVzZWxlY3R0eXBlID0gJ1VQREFURSc7XG4gICAgdGhpcy5zYXZlTW9kZSA9ICdVUERBVEUnO1xuICAgIHRoaXMubm9kZVR5cGUgPSBldmVudC5ub2RlLnR5cGU7XG4gICAgdGhpcy5zZWxlY3RlZEV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5SWQgPSBldmVudC5ub2RlLmlkO1xuICAgIHRoaXMudGFza3NEYXRhID0gW107XG4gICAgdGhpcy5hY3RpdmVUYWJJbmRleCA9IDA7IC8vIFNpbXVsYXRlIHRhYiBjaGFuZ2UgZXZlbnQgdG8gaW5kZXggMFxuICAgIHRoaXMub25UYWJDaGFuZ2UoeyBpbmRleDogMCB9KTtcbiAgfVxuXG4gIGxpc3QoaWQpIHtcblxuICAgIHRoaXMubm9kZXNlbGVjdHR5cGUgPSAnVVBEQVRFJztcbiAgICB0aGlzLnNhdmVNb2RlID0gJ1VQREFURSc7XG4gICAgdGhpcy5ub2RlVHlwZSA9ICdjYXRlZ29yeSc7XG5cblxuICAgIHRoaXMubWFzdGVyc1NlcnZpY2UuZ2V0TG9va3VwQnljYXRlZ29yeUlEKGlkKS5zdWJzY3JpYmUoKGl0ZW06IGFueSkgPT4ge1xuXG4gICAgICBjb25zdCBsb29rdXBkYXRhaXRlbXMgPSBpdGVtWydkYXRhJ107XG5cbiAgICAgIHRoaXMuY2F0ZWdvcnlGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICBpZDogbG9va3VwZGF0YWl0ZW1zLmlkLFxuICAgICAgICBhcHBsaWNhdGlvbmlkOiBsb29rdXBkYXRhaXRlbXMuYXBwbGljYXRpb25pZCxcbiAgICAgICAgbmFtZTogbG9va3VwZGF0YWl0ZW1zLm5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBsb29rdXBkYXRhaXRlbXMuZGVzY3JpcHRpb24sXG4gICAgICAgIHJlYWRvbmx5OiBsb29rdXBkYXRhaXRlbXMucmVhZG9ubHksXG4gICAgICAgIGlzZW5hYmxlZDogbG9va3VwZGF0YWl0ZW1zLmlzZW5hYmxlZCxcbiAgICAgICAgbG9va3Vwb3JkZXIgOiBsb29rdXBkYXRhaXRlbXMubG9va3Vwb3JkZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmdldEFsbExvb2t1cEJ5Y2F0ZWdvcnlJRChpZCkuc3Vic2NyaWJlKChub2RlczogYW55KSA9PiB7XG4gICAgICAgIHRoaXMudGFza3NEYXRhID0gKDxhbnk+bm9kZXMpLmRhdGE7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tWYWxpZERhdGEoZXZlbnQpIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uUnVsZXMgPSBldmVudC5jb21wb25lbnQub3B0aW9uKCd2YWxpZGF0aW9uUnVsZXMnKTtcbiAgICBjb25zdCBoYXNWYWxpZGF0aW9uRXJyb3JzID0gdmFsaWRhdGlvblJ1bGVzLnNvbWUoKHJ1bGU6IGFueSkgPT4gIXJ1bGUuaXNWYWxpZCk7XG5cbiAgICBpZiAoaGFzVmFsaWRhdGlvbkVycm9ycykge1xuICAgICAgdGhpcy5pc1NhdmVEaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVuYWJsZSB0aGUgU2F2ZSBpY29uXG4gICAgICB0aGlzLmlzU2F2ZURpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc2F2ZUNoYW5nZXMoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnYWRkZWRJdGVtcycsIGV2ZW50KTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBldmVudC5jaGFuZ2VzIHx8IFtdO1xuXG4gICAgbGV0IGtleXNTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBsZXQgdmFsdWVzU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgbGV0IGxvb2t1cGNhdGVnb3J5aWQ7XG5cbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICd1cGRhdGUnKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRGF0YSA9IHRoaXMudGFza3NEYXRhLmZpbHRlcigob3JpZ2luYWxJdGVtOiBhbnkpID0+IG9yaWdpbmFsSXRlbS5pZCA9PT0gY2hhbmdlLmtleSk7XG4gICAgICAgIGNoYW5nZS5kYXRhID0geyAuLi5vcmlnaW5hbERhdGFbMF0sIC4uLmNoYW5nZS5kYXRhIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgIC8vICAgaWYgKGNoYW5nZS50eXBlID09PSAnaW5zZXJ0JyB8fCBjaGFuZ2UudHlwZSA9PT0gJ3VwZGF0ZScpIHtcbiAgICAvLyAgICAgbG9va3VwY2F0ZWdvcnlpZCA9IGNoYW5nZS5kYXRhLmxvb2t1cGNhdGVnb3J5aWQ7XG4gICAgLy8gICAgIGNvbnN0IGl0ZW0gPSBjaGFuZ2UuZGF0YTtcblxuICAgIC8vICAgICAvLyBDaGVjayBmb3IgZHVwbGljYXRlIGtleXMgYW5kIHZhbHVlc1xuICAgIC8vICAgICBpZiAoa2V5c1NldC5oYXMoaXRlbS5rZXkpKSB7XG4gICAgLy8gICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoYEVycm9yOiBEdXBsaWNhdGUga2V5IGZvdW5kIC0gJHtpdGVtLmtleX1gKTtcbiAgICAvLyAgICAgICAvLyBPcHRpb25hbGx5LCB5b3UgY2FuIHByZXZlbnQgZnVydGhlciBwcm9jZXNzaW5nIG9yIGhhbmRsZSB0aGUgZXJyb3IgZGlmZmVyZW50bHkuXG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAga2V5c1NldC5hZGQoaXRlbS5rZXkpO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKHZhbHVlc1NldC5oYXMoaXRlbS52YWx1ZSkpIHtcbiAgICAvLyAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcihgRXJyb3I6IER1cGxpY2F0ZSB2YWx1ZSBmb3VuZCAtICR7aXRlbS52YWx1ZX1gKTtcbiAgICAvLyAgICAgICAvLyBPcHRpb25hbGx5LCB5b3UgY2FuIHByZXZlbnQgZnVydGhlciBwcm9jZXNzaW5nIG9yIGhhbmRsZSB0aGUgZXJyb3IgZGlmZmVyZW50bHkuXG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgdmFsdWVzU2V0LmFkZChpdGVtLnZhbHVlKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICAvLyBrZXlsaXN0OiAgQXJyYXkuZnJvbShrZXlzU2V0KSxcbiAgICAgIC8vIHZhbHVlbGlzdDogQXJyYXkuZnJvbSh2YWx1ZXNTZXQpLFxuICAgICAgZGF0YTogY2hhbmdlcyxcbiAgICAgIC8vIGxvb2t1cGNhdGVnb3J5aWQ6IGxvb2t1cGNhdGVnb3J5aWRcbiAgICB9O1xuXG4gICAgLy8gTWFrZSB0aGUgQVBJIGNhbGxcbiAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmFkZE9yVXBkYXRlTG9va3VwKHJlcXVlc3QpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gQVBJIGNhbGwgd2FzIHN1Y2Nlc3NmdWwsIHVwZGF0ZSBVSSBvciByZWZyZXNoIGRhdGFcbiAgICAgICAgdGhpcy5hbGVydFNlcnZpY2Uuc3VjY2VzcygnVXBkYXRlZCBTdWNjZXNzZnVsbHknKTtcbiAgICAgICAgLy8gdGhpcy5sb2FkVHJlZSgpO1xuICAgICAgICB0aGlzLmNsZWFyRm9ybSgpO1xuICAgICAgICB0aGlzLm5vZGVTZWxlY3QodGhpcy5zZWxlY3RlZEV2ZW50KTtcbiAgICAgIH0sXG4gICAgICAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgLy8gSGFuZGxlIEFQSSBjYWxsIGVycm9yIHdpdGhvdXQgcmVmcmVzaGluZyB0aGUgZGF0YVxuICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcihlcnIuZXJyb3IubWVzc2FnZSk7XG5cbiAgICAgIH1cbiAgICApO1xuICB9XG5cblxuXG5cblxuICBpbml0aWFsaXplTG9va3VwRm9ybSgpIHtcbiAgICB0aGlzLnBhZ2VFcnJvclNob3cgPSBmYWxzZTtcbiAgICB0aGlzLmxvb2t1cEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGlkOiBbMF0sXG4gICAgICBsb29rdXBjYXRlZ29yeWlkOiBbMF0sXG4gICAgICBwYXJlbnRpZDogW251bGxdLFxuICAgICAgLy8gb3B0aW9uYWxkYXRhOiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIC8vICAgcnVsZXM6IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkoW10pXG4gICAgICAvLyB9KSxcbiAgICAgIC8vIGFjY2VzczogdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAvLyAgIGFzc2lnbjogWycnLCBbdGhpcy5yZXF1aXJlZElmVmFsaWRhdG9yKCgpID0+ICF0aGlzLmlzR2xvYmFsTG9va3VwKV1dLFxuICAgICAgLy8gICB2aWV3OiBbJycsIFt0aGlzLnJlcXVpcmVkSWZWYWxpZGF0b3IoKCkgPT4gIXRoaXMuaXNHbG9iYWxMb29rdXApXV1cbiAgICAgIC8vIH0pLFxuICAgICAgbG9va3VwZGF0YTogdGhpcy5mb3JtQnVpbGRlci5hcnJheShbdGhpcy5hZGRsb29rdXBkYXRhKCldKSxcbiAgICAgIHJlYWRvbmx5OiBbZmFsc2VdLFxuICAgICAgZ2xvYmFsOiBbdHJ1ZV0sXG4gICAgICBpc2VuYWJsZWQ6IFt0cnVlXVxuICAgIH0pO1xuICB9XG5cbiAgLy8gZ2V0IGRhdGFydWxlcygpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5sb29rdXBGb3JtLmdldCgnb3B0aW9uYWxkYXRhLnJ1bGVzJykgYXMgRm9ybUFycmF5O1xuICAvLyB9XG5cbiAgZ2V0IGxvb2t1cGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9va3VwRm9ybS5nZXQoJ2xvb2t1cGRhdGEnKSBhcyBGb3JtQXJyYXk7XG4gIH1cblxuICBhZGRSdWxlKCk6IEZvcm1Hcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgcm9sZXM6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBwZXJtaXNzaW9uOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgYWN0aW9uOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSk7XG4gIH1cblxuICAvLyBvbkFkZFJ1bGUoKTogdm9pZCB7XG4gIC8vICAgdGhpcy5kYXRhcnVsZXMucHVzaCh0aGlzLmFkZFJ1bGUoKSk7XG4gIC8vIH1cblxuICBhZGRsb29rdXBkYXRhKCk6IEZvcm1Hcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAga2V5OiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgdmFsdWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBvcmRlcjogWzBdXG4gICAgfSk7XG4gIH1cblxuICBvbkFkZExvb2tVcERhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlRXJyb3JTaG93ID0gZmFsc2U7XG4gICAgdGhpcy5sb29rdXBkYXRhLnB1c2godGhpcy5hZGRsb29rdXBkYXRhKCkpO1xuICB9XG5cbiAgb25EZWxldGVMb29rdXBEYXRhKGk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubG9va3VwZGF0YS5yZW1vdmVBdChpKTtcbiAgfVxuXG4gIC8vIG9uRGVsZXRlUnVsZShyb3dJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gIC8vICAgdGhpcy5kYXRhcnVsZXMucmVtb3ZlQXQocm93SW5kZXgpO1xuICAvLyB9XG5cbiAgb25DbGlja2RlbGV0ZUNhdGVnb3J5KCl7XG4gICAgLy8gdGhpcy5zYXZlTW9kZSA9ICdERUxFVEUnO1xuICAgIHRoaXMubm9kZVR5cGUgPSB0aGlzLnNlbGVjdGVkSXRlbS50eXBlO1xuXG4gICAgJCgnI0RlbGV0ZXVzZXInKS5tb2RhbCgnc2hvdycpO1xuICB9XG5cbiAgc2VhcmNoTWFzdGVyKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIHRoaXMuZmlsdGVyTWFzdGVyTGlzdCA9IHRoaXMuY2F0ZWdvcmllcy5maWx0ZXIoKGE6IGFueSkgPT4gYVsnbmFtZSddPy50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgodmFsdWUpKTtcbiAgfVxuXG4gIGNsZWFyU2VhcmNoKCl7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29udHJvbCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICB0aGlzLmZpbHRlck1hc3Rlckxpc3QgPSB0aGlzLmNhdGVnb3JpZXM7IC8vIFJlc2V0IHRoZSBmaWx0ZXJlZCBsaXN0XG4gICAgfVxuICB9XG5cbiAgb25Ob2RlQ29udGV4dE1lbnVTZWxlY3QoZXZlbnQ6IGFueSkge1xuICAgIGlmIChldmVudC5ub2RlLnR5cGUgPT09ICdjYXRlZ29yeScpIHtcbiAgICAgIGNvbnN0IHBlcm1pc3Npb24gPSB0aGlzLnBlcm1pc3Npb25TdG9yZS5zdGF0ZTtcbiAgICAgIHRoaXMubWVudUl0ZW1zID0gW1xuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgbGFiZWw6ICdDcmVhdGUgQ2F0ZWdvcnknLFxuICAgICAgICAvLyAgIGljb246IFByaW1lSWNvbnMuQVJST1dfVVBfTEVGVCxcbiAgICAgICAgLy8gICAvL3Zpc2libGU6IHBlcm1pc3Npb24uU0VUVElOR1NfTUFTX0NSRUFURV9DQVRPR09SWSxcbiAgICAgICAgLy8gICBiYWRnZTogJ1NFVFRJTkdTX01BU19DUkVBVEVfQ0FUT0dPUlknLFxuICAgICAgICAvLyAgIGNvbW1hbmQ6IChjcmVhdGVFdmVudDogYW55KSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLnNhdmVNb2RlID0gJ0lOU0VSVCc7XG4gICAgICAgIC8vICAgICB0aGlzLm5vZGVUeXBlID0gJ2NhdGVnb3J5JztcbiAgICAgICAgLy8gICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUlkID0gJyc7XG4gICAgICAgIC8vICAgICB0aGlzLmNsZWFyRm9ybSgpO1xuICAgICAgICAvLyAgICAgdGhpcy5sb2FkVHJlZSgpO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coY3JlYXRlRXZlbnQpO1xuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnRGVsZXRlJyxcbiAgICAgICAgICBpY29uOiBQcmltZUljb25zLlRSQVNILFxuICAgICAgICAgIHZpc2libGU6IHBlcm1pc3Npb24uU0VUVElOR1NfTUFTX0RFTEVURSxcbiAgICAgICAgICBiYWRnZTogJ1NFVFRJTkdTX01BU19ERUxFVEUnLFxuICAgICAgICAgIGNvbW1hbmQ6IGRlbGV0ZUV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZU1vZGUgPSAnREVMRVRFJztcbiAgICAgICAgICAgIHRoaXMubm9kZVR5cGUgPSB0aGlzLnNlbGVjdGVkSXRlbS50eXBlO1xuXG4gICAgICAgICAgICAkKCcjRGVsZXRldXNlcicpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAvLyB0aGlzLmNvbmZpcm1hdGlvblNlcnZpY2UuY29uZmlybSh7XG4gICAgICAgICAgICAvLyAgIHRhcmdldDogZGVsZXRlRXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgLy8gICBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlPycsXG4gICAgICAgICAgICAvLyAgIGljb246ICdwaSBwaS1leGNsYW1hdGlvbi10cmlhbmdsZScsXG4gICAgICAgICAgICAvLyAgIGFjY2VwdDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuZGVsZXRlSXRlbSgpO1xuICAgICAgICAgICAgLy8gICB9LFxuICAgICAgICAgICAgLy8gICByZWplY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICAvL25vdCB0byBiZSBlbXB0eVxuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChldmVudC5ub2RlLnR5cGUgPT09ICdsb29rdXAnKSB7XG4gICAgICB0aGlzLm1lbnVJdGVtcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnQ3JlYXRlIExvb2t1cCcsXG4gICAgICAgICAgaWNvbjogUHJpbWVJY29ucy5BUlJPV19ET1dOX1JJR0hULFxuICAgICAgICAgIGNvbW1hbmQ6IF9ldmVudEVyYXNlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5zZXJ0RXZlbnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ0RlbGV0ZScsXG4gICAgICAgICAgaWNvbjogUHJpbWVJY29ucy5UUkFTSCxcbiAgICAgICAgICBjb21tYW5kOiBSZW1vdmVFdmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNhdmVNb2RlID0gJ0RFTEVURSc7XG4gICAgICAgICAgICB0aGlzLm5vZGVUeXBlID0gdGhpcy5zZWxlY3RlZEl0ZW0udHlwZTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coUmVtb3ZlRXZlbnQpO1xuICAgICAgICAgICAgJCgnI0RlbGV0ZXVzZXInKS5tb2RhbCgnc2hvdycpO1xuICAgICAgICAgICAgLy8gdGhpcy5jb25maXJtYXRpb25TZXJ2aWNlLmNvbmZpcm0oe1xuICAgICAgICAgICAgLy8gICB0YXJnZXQ6IFJlbW92ZUV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgIC8vICAgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB0aGF0IHlvdSB3YW50IHRvIGRlbGV0ZT8nLFxuICAgICAgICAgICAgLy8gICBpY29uOiAncGkgcGktZXhjbGFtYXRpb24tdHJpYW5nbGUnLFxuICAgICAgICAgICAgLy8gICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmRlbGV0ZUl0ZW0oKTtcbiAgICAgICAgICAgIC8vICAgfSxcbiAgICAgICAgICAgIC8vICAgcmVqZWN0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgLy9ub3QgdG8gYmUgZW1wdHlcbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdO1xuICAgIH1cbiAgfVxuICBzZXRJbnNlcnRFdmVudCgpIHtcbiAgICB0aGlzLnNhdmVNb2RlID0gJ0lOU0VSVCc7XG4gICAgdGhpcy5ub2RlVHlwZSA9IHRoaXMuc2VsZWN0ZWRJdGVtLnR5cGU7XG4gICAgdGhpcy5jcmVhdGVMb29rdXBGb3JtKCk7XG4gICAgLy8gdGhpcy5jbGVhclJ1bGVzKCk7XG4gIH1cblxuXG5cbiAgbm9kZUV4cGFuZChldmVudDogYW55KSB7XG4gICAgaWYgKGV2ZW50Lm5vZGUgJiYgZXZlbnQubm9kZS5kYXRhICYmIGV2ZW50Lm5vZGUudHlwZSAhPT0gJ2xvb2t1cCcpIHtcbiAgICAgIHRoaXMubWFzdGVyc1NlcnZpY2UuZ2V0TG9va3VwVHJlZShldmVudC5ub2RlLmRhdGEpLnN1YnNjcmliZSgobm9kZXM6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBzb3J0ZWRDaGlsZHJlbiA9ICg8YW55Pm5vZGVzKS5kYXRhLnNvcnQoKGEsIGIpID0+IGEudmFsdWUubG9jYWxlQ29tcGFyZShiLnZhbHVlKSk7XG4gICAgICAgIGV2ZW50Lm5vZGUuY2hpbGRyZW4gPSBzb3J0ZWRDaGlsZHJlbjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgc2F2ZUNhdGVnb3J5KCkge1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gdGhpcy5jYXRlZ29yeUZvcm0udmFsdWU7XG4gICAgdGhpcy5mb3JtU3VibWl0ID0gdHJ1ZTtcbiAgICBjYXRlZ29yeS5hcHBsaWNhdGlvbmlkID0gdGhpcy5lbnZpcm9ubWVudC5hcHBsaWNhdGlvbmlkO1xuICAgIGNvbnNvbGUubG9nKGNhdGVnb3J5KTtcbiAgICBjYXRlZ29yeS5vcmRlciA9IGNhdGVnb3J5Lm9yZGVyID8gTnVtYmVyKGNhdGVnb3J5Lm9yZGVyKSA6IDE7XG4gICAgaWYgKHRoaXMuY2F0ZWdvcnlGb3JtLnZhbGlkKSB7XG4gICAgICBpZiAodGhpcy5zYXZlTW9kZSA9PT0gJ0lOU0VSVCcpIHtcbiAgICAgICAgdGhpcy5tYXN0ZXJzU2VydmljZS5jcmVhdGVDYXRlZ29yeShjYXRlZ29yeSkuc3Vic2NyaWJlKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5hbGVydFNlcnZpY2Uuc3VjY2VzcygnQ2F0ZWdvcnkgY3JlYXRlZCBzdWNjZXNzZnVsbHkuJyk7XG4gICAgICAgICAgLy90aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICB0aGlzLmxvYWRUcmVlKCk7XG4gICAgICAgICAgdGhpcy5jbGVhckZvcm0oKTtcbiAgICAgICAgfSwgKGVycjogYW55KSA9PiB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcihlcnIuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXN0ZXJzU2VydmljZS51cGRhdGVDYXRlZ29yeShjYXRlZ29yeSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5zdWNjZXNzKCdDYXRlZ29yeSB1cGRhdGVkIHN1Y2Nlc3NmdWxseS4nKTtcbiAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgIHRoaXMubGlzdCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCk7XG4gICAgICAgICAgdGhpcy5sb2FkVHJlZSgpO1xuICAgICAgICAgIHRoaXMuY2xlYXJGb3JtKCk7XG4gICAgICAgIH0sIChlcnI6IGFueSkgPT4gdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoZXJyLmVycm9yLm1lc3NhZ2UpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcignUGxlYXNlIEZpbGwgQWxsIFJlcXVpcmVkIEZpZWxkcycpO1xuICAgIC8vIH1cbiAgfVxuXG4gIHNhdmVMb29rdXAoKSB7XG4gICAgdGhpcy5wYWdlRXJyb3JTaG93ID0gdHJ1ZTtcbiAgICBjb25zdCBsb29rdXBkdHMgPSB0aGlzLmxvb2t1cEZvcm0udmFsdWU7XG4gICAgbG9va3VwZHRzLmFwcGxpY2F0aW9uaWQgPSB0aGlzLmVudmlyb25tZW50LmFwcGxpY2F0aW9uaWQ7XG4gICAgbG9va3VwZHRzLm9yZGVyID0gbG9va3VwZHRzLm9yZGVyID8gTnVtYmVyKGxvb2t1cGR0cy5vcmRlcikgOiBOdW1iZXIoMSk7XG5cbiAgICBpZiAodGhpcy5sb29rdXBGb3JtLnZhbGlkKSB7XG5cbiAgICAgIGRlbGV0ZSBsb29rdXBkdHMucmVhZG9ubHk7XG4gICAgICBsb29rdXBkdHMubG9va3VwLm9yZGVyID0gbG9va3VwZHRzLmxvb2t1cC5vcmRlciA/IE51bWJlcihsb29rdXBkdHMubG9va3VwLm9yZGVyKSA6IDE7XG5cblxuICAgICAgLy8gaWYgKGxvb2t1cC5vcHRpb25hbGRhdGEgJiYgbG9va3VwLm9wdGlvbmFsZGF0YS5ydWxlcykge1xuICAgICAgLy8gICBsb29rdXAub3B0aW9uYWxkYXRhLnJ1bGVzID0gbG9va3VwLm9wdGlvbmFsZGF0YS5ydWxlcy5tYXAoKHJ1bGU6IGFueSkgPT4ge1xuICAgICAgLy8gICAgIHJ1bGUucGVybWlzc2lvbi5wYXJlbnQgPSBudWxsO1xuICAgICAgLy8gICAgIHJldHVybiBydWxlO1xuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIH1cbiAgICAgIGlmICh0aGlzLnNhdmVNb2RlID09PSAnSU5TRVJUJykge1xuICAgICAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmNyZWF0ZUxvb2t1cChsb29rdXBkdHMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hbGVydFNlcnZpY2Uuc3VjY2VzcygnTG9va3VwIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgICAgIHRoaXMubG9hZFRyZWUoKTtcbiAgICAgICAgICB0aGlzLmNsZWFyRm9ybSgpXG4gICAgICAgIH0sIChlcnI6IGFueSkgPT4gdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoZXJyLmVycm9yLm1lc3NhZ2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWFzdGVyc1NlcnZpY2UudXBkYXRlTG9va3VwKGxvb2t1cGR0cykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5zdWNjZXNzKCdMb29rdXAgdXBkYXRlZCBzdWNjZXNzZnVsbHkuJyk7XG4gICAgICAgICAgdGhpcy5sb2FkVHJlZSgpO1xuICAgICAgICAgIHRoaXMuY2xlYXJGb3JtKClcbiAgICAgICAgfSwgKGVycjogYW55KSA9PiB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcihlcnIuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcignSW52YWxpZCBsb29rdXAgZGF0YS4nKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgY3JlYXRlTG9va3VwRm9ybSgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVMb29rdXBGb3JtKCk7XG4gICAgdGhpcy5zZXRHbG9iYWwodHJ1ZSk7XG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09ICdjYXRlZ29yeScpIHtcbiAgICAgIHRoaXMubm9kZVR5cGUgPSAnbG9va3VwJztcbiAgICAgIHRoaXMubG9va3VwRm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgICAgbG9va3VwY2F0ZWdvcnlpZDogdGhpcy5zZWxlY3RlZEl0ZW0uaWRcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvb2t1cEZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICAgIGxvb2t1cGNhdGVnb3J5aWQ6IHRoaXMuc2VsZWN0ZWRJdGVtLmxvb2t1cGNhdGVnb3J5aWQsXG4gICAgICAgIHBhcmVudGlkOiB0aGlzLnNlbGVjdGVkSXRlbS5pZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0R2xvYmFsKGNoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmlzR2xvYmFsTG9va3VwID0gY2hlY2tlZDtcbiAgICB0aGlzLmxvb2t1cEZvcm0uZ2V0KCdhY2Nlc3MnKT8ucGF0Y2hWYWx1ZSh7XG4gICAgICB2aWV3OiBbXSxcbiAgICAgIGFzc2lnbjogW11cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZENvbnRleHRNZW51KCkge1xuICAgIHRoaXMubWVudUl0ZW1zID0gW1xuICAgICAge1xuICAgICAgICBsYWJlbDogJ0NyZWF0ZSBDYXRlZ29yeScsXG4gICAgICAgIGljb246IFByaW1lSWNvbnMuQVJST1dfVVBfTEVGVCxcbiAgICAgICAgY29tbWFuZDogKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLnNhdmVNb2RlID0gJ0lOU0VSVCc7XG4gICAgICAgICAgdGhpcy5ub2RlVHlwZSA9ICdjYXRlZ29yeSc7XG4gICAgICAgICAgdGhpcy5jbGVhckZvcm0oKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnQ3JlYXRlIExvb2t1cCcsXG4gICAgICAgIGljb246IFByaW1lSWNvbnMuQVJST1dfRE9XTl9SSUdIVCxcbiAgICAgICAgY29tbWFuZDogX2V2ZW50Tm9kZSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRJbnNlcnRFdmVudCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ0RlbGV0ZScsXG4gICAgICAgIGljb246IFByaW1lSWNvbnMuVFJBU0gsXG4gICAgICAgIGNvbW1hbmQ6IGV2ZW50ID0+IHtcbiAgICAgICAgICB0aGlzLnNhdmVNb2RlID0gJ0RFTEVURSc7XG4gICAgICAgICAgdGhpcy5ub2RlVHlwZSA9IHRoaXMuc2VsZWN0ZWRJdGVtLnR5cGU7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgICAgJCgnI0RlbGV0ZXVzZXInKS5tb2RhbCgnc2hvdycpO1xuICAgICAgICAgIC8vIHRoaXMuY29uZmlybWF0aW9uU2VydmljZS5jb25maXJtKHtcbiAgICAgICAgICAvLyAgIHRhcmdldDogZXZlbnQudGFyZ2V0LFxuICAgICAgICAgIC8vICAgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB0aGF0IHlvdSB3YW50IHRvIGRlbGV0ZT8nLFxuICAgICAgICAgIC8vICAgaWNvbjogJ3BpIHBpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJyxcbiAgICAgICAgICAvLyAgIGFjY2VwdDogKCkgPT4ge1xuICAgICAgICAgIC8vICAgICAvL2NvbmZpcm0gYWN0aW9uXG4gICAgICAgICAgLy8gICAgIHRoaXMuZGVsZXRlSXRlbSgpO1xuICAgICAgICAgIC8vICAgfSxcbiAgICAgICAgICAvLyAgIHJlamVjdDogKCkgPT4ge1xuICAgICAgICAgIC8vICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsXG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkVHJlZSgpIHtcbiAgICB0aGlzLnBhZ2VFcnJvclNob3cgPSBmYWxzZTtcbiAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmdldEFsbENhdGVnb3J5VHJlZSh0aGlzLmVudmlyb25tZW50LmFwcGxpY2F0aW9uaWQpLnN1YnNjcmliZSgoaXRlbXM6IGFueSkgPT4ge1xuICAgICAgdGhpcy5jYXRlZ29yaWVzID0gaXRlbXM7XG4gICAgICBpZiAodGhpcy5jYXRlZ29yaWVzLmxlbmd0aCkge1xuICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5jYXRlZ29yaWVzWzBdO1xuICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJZCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2F0ZWdvcmllcy5maW5kSW5kZXgoKGNhdGVnb3J5OiBUcmVlTm9kZTxhbnk+KSA9PiAoY2F0ZWdvcnkgYXMgYW55KS5pZCA9PT0gdGhpcy5zZWxlY3RlZENhdGVnb3J5SWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmNhdGVnb3JpZXNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAgIHRoaXMuZmlsdGVyTWFzdGVyTGlzdCA9IHRoaXMuY2F0ZWdvcmllcztcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmNsZWFyU2VhcmNoKCk7XG4gIH1cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuY2F0ZWdvcnlGb3JtLnJlc2V0KCk7XG4gICAgdGhpcy5mb3JtU3VibWl0ID0gZmFsc2U7XG4gIH1cblxuICBkZWxldGVJdGVtKCkge1xuICAgIHRoaXMuc2F2ZU1vZGUgPSAnVVBEQVRFJztcbiAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW0udHlwZSA9PT0gJ2xvb2t1cCcpIHtcbiAgICAgIHRoaXMubWFzdGVyc1NlcnZpY2UuZGVsZXRlTG9va3VwKHRoaXMuc2VsZWN0ZWRJdGVtLmlkKS5zdWJzY3JpYmUoKF9pdGVtOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgJCgnI0RlbGV0ZXVzZXInKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5zdWNjZXNzKCdMb29rdXAgZGVsZXRlZCBzdWNjZXNzZnVsbHkuJyk7XG4gICAgICAgIHRoaXMubG9hZFRyZWUoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hc3RlcnNTZXJ2aWNlLmRlbGV0ZUNhdGVnb3J5KHRoaXMuc2VsZWN0ZWRJdGVtLmlkKS5zdWJzY3JpYmUoKF9pdGVtOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgJCgnI0RlbGV0ZXVzZXInKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5zdWNjZXNzKCdDYXRlZ29yeSBkZWxldGVkIHN1Y2Nlc3NmdWxseS4nKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5SWQgPSAnJztcbiAgICAgICAgdGhpcy5vbkNsaWNrSG9tZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVxdWlyZWRJZlZhbGlkYXRvcihwcmVkaWNhdGU6ICgpID0+IGFueSkge1xuICAgIHJldHVybiAoZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgaWYgKCFmb3JtQ29udHJvbC5wYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAocHJlZGljYXRlKCkpIHtcbiAgICAgICAgcmV0dXJuIFZhbGlkYXRvcnMucmVxdWlyZWQoZm9ybUNvbnRyb2wpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG59XG4iLCI8aGVhZD5cbiAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbjMuZGV2ZXhwcmVzcy5jb20vanNsaWIvMjMuMi4zL2Nzcy9keC5tYXRlcmlhbC5ibHVlLmxpZ2h0LmNzc1wiIC8+XG4gIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzUuMTUuNC9jc3MvYWxsLm1pbi5jc3NcIiBpbnRlZ3JpdHk9XCJzaGEzODQtZGZTVDZvNGVNbDQyTU92NzJkN2FNUjN6ZFR0aUVyVXE2bmhCNjVlQTZBVGxGQXExUmZpYURKdDlGQ3gwWDFvNVwiIGNyb3Nzb3JpZ2luPVwiYW5vbnltb3VzXCI+XG48L2hlYWQ+XG48YXBwLWFsZXJ0PjwvYXBwLWFsZXJ0PlxuPGRpdiBjbGFzcz1cInBlcm1pc3Npb25cIj5cbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctNCBjb2wtbWQtNiBjb2wtMTJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50IHB5LTJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lIGZhZGUgc2hvdyBhY3RpdmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEwIGNvbC0xMiBmb3JtLWdyb3VwIGJnaWNvbnNlYXJjaCBwci0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1pbnB1dC1pY29uLXJpZ2h0IHctMTAwXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJwaSBwaS10aW1lcy1jaXJjbGVcIiAoY2xpY2spPVwiY2xlYXJTZWFyY2goKVwiPjwvaT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBieSBDYXRlZ29yeSBuYW1lXCIgdHlwZT1cInRleHRcIiAoa2V5dXApPVwic2VhcmNoTWFzdGVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgZmllbGRLZXk9XCJTRVRUSU5HU19NQVNfU0VBUkNIX0JZX05BTUVcIiBwSW5wdXRUZXh0IC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIGNvbC0xMiBmb3JtLWdyb3VwIHBsLTAgdGV4dC1tZC1yaWdodFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG5jb21tb25cIiAoY2xpY2spPVwib25DbGlja0FkZENhdGVnb3J5KClcIj5BZGQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXN0ZXJhY2Vzc1wiPlxuICAgICAgICAgICAgPHAtdHJlZSBbdmFsdWVdPVwiZmlsdGVyTWFzdGVyTGlzdFwiIHNlbGVjdGlvbk1vZGU9XCJzaW5nbGVcIiBbKHNlbGVjdGlvbildPVwic2VsZWN0ZWRJdGVtXCJcbiAgICAgICAgICAgICAgKG9uTm9kZVNlbGVjdCk9XCJub2RlU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgICAgIDwvcC10cmVlPlxuICAgICAgICAgICAgPHAtY29udGV4dE1lbnUgI3RyZWVDb250ZXh0TWVudSBbbW9kZWxdPVwibWVudUl0ZW1zXCIgYXBwZW5kVG89XCJib2R5XCI+PC9wLWNvbnRleHRNZW51PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImNvbC1sZy04IGNvbC1tZC02IGNvbC0xMiBtYXN0ZXItcmlnaHQgbXQtMlwiPlxuICAgICAgPHAtY29uZmlybVBvcHVwPjwvcC1jb25maXJtUG9wdXA+XG4gICAgICA8cC1jYXJkIGlkPVwiY2F0ZWdvcnlGb3JtXCIgY2xhc3M9XCJyYmFjLWNhcmRcIiBbZm9ybUdyb3VwXT1cImNhdGVnb3J5Rm9ybVwiXG4gICAgICAgIFtzdHlsZV09XCJ7IHdpZHRoOiAnMTAwJScsICdtYXJnaW4tYm90dG9tJzogJzFlbScgfVwiPlxuXG4gICAgICAgIDxpbnB1dCBpZD1cImNpZFwiIHR5cGU9XCJoaWRkZW5cIiBmb3JtQ29udHJvbE5hbWU9XCJpZFwiIC8+XG4gICAgICAgIDxpbnB1dCBpZD1cImNhcHBsaWNhdGlvbmlkXCIgdHlwZT1cImhpZGRlblwiIGZvcm1Db250cm9sTmFtZT1cImFwcGxpY2F0aW9uaWRcIiAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWZsdWlkIHAtZm9ybWdyaWQgcC1ncmlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBjb2wtMTIgbWItM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0cmlwX2hlYWQgdG9nZ2xlbGVmdCBtLTAgcC0wXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmVwb3J0X2hlYWQgZm9udC13ZWlnaHQtYm9sZFwiPnt7c2F2ZU1vZGUgPT09ICdJTlNFUlQnID8gJ0FkZCBDYXRlZ29yeScgOiAnVXBkYXRlIENhdGVnb3J5J319PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy02IGNvbC1tZC0xMiBjb2wtMTIgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1OYW1lXCIgY2xhc3M9XCJyZWZlcnJhbC1mb3JtLWxhYmVsc1wiPk5hbWVcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyZXF1aXJlZGZpZWxkIHRleHQtZGFuZ2VyXCI+Kjwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtTmFtZVwiIHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwibmFtZVwiIGZpZWxkS2V5PVwiU0VUVElOR1NfTUFTX05BTUVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIE5hbWVcIiBhcmlhLWRlc2NyaWJlZGJ5PVwibU5hbWVcIlxuICAgICAgICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ25hbWUnLCAnQ2F0ZWdvcnkgTmFtZScsIHRydWUpXCIgcElucHV0VGV4dCBjbGFzcz1cIndpZGUtaW5wdXRcIiAvPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInZhbGlkYXRpb25FcnJvcnNbJ0NhdGVnb3J5IE5hbWUnXVwiIGNsYXNzPVwicC1lcnJvciBibG9jayBtdC0xXCI+e3t2YWxpZGF0aW9uRXJyb3JzWydDYXRlZ29yeSBOYW1lJ119fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiF2YWxpZGF0aW9uRXJyb3JzWydDYXRlZ29yeSBOYW1lJ10gJiYgXG4gICAgICAgICAgICBjYXRlZ29yeUZvcm0uY29udHJvbHNbJ25hbWUnXS5pbnZhbGlkICYmXG4gICAgICAgICAgICBjYXRlZ29yeUZvcm0uY29udHJvbHNbJ25hbWUnXS5oYXNFcnJvcigncmVxdWlyZWQnKSAmJiBjYXRlZ29yeUZvcm0uY29udHJvbHNbJ25hbWUnXS5lcnJvcnMgJiYgZm9ybVN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY2F0ZWdvcnlGb3JtLmNvbnRyb2xzWyduYW1lJ10uaGFzRXJyb3IoJ3JlcXVpcmVkJylcIiBjbGFzcz1cInAtZXJyb3IgYmxvY2sgbXQtMVwiPkNhdGVnb3J5IE5hbWUgaXMgcmVxdWlyZWQ8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctNiBjb2wtbWQtMTIgY29sLTEyIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjZGVzY3JpcHRpb25cIiBjbGFzcz1cInJlZmVycmFsLWZvcm0tbGFiZWxzXCI+RGVzY3JpcHRpb24gPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNkZXNjcmlwdGlvblwiIHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwiZGVzY3JpcHRpb25cIiBmaWVsZEtleT1cIlNFVFRJTkdTX01BU19ERVNDUllQVElPTlwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgRGVzY3JpcHRpb25cIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY2Rlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnZGVzY3JpcHRpb24nLCAnRGVzY3JpcHRpb24nLCBmYWxzZSlcIiBwSW5wdXRUZXh0IGNsYXNzPVwid2lkZS1pbnB1dFwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJ2YWxpZGF0aW9uRXJyb3JzWydEZXNjcmlwdGlvbiddXCIgY2xhc3M9XCJwLWVycm9yIGJsb2NrIG10LTFcIj57e3ZhbGlkYXRpb25FcnJvcnNbJ0Rlc2NyaXB0aW9uJ119fTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtMTIgY29sLTEyIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb3JkZXJcIiBjbGFzcz1cInJlZmVycmFsLWZvcm0tbGFiZWxzIGQtbm9uZSBkLWxnLWlubGluZS1ibG9ja1wiPiYjMTYwOzwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclwiIHN0eWxlPVwiaGVpZ2h0OiAzMnB4O1wiPlxuICAgICAgICAgICAgICA8cC1jaGVja2JveCBzdCBpbnB1dElkPVwiYWN0aXZlXCIgW2JpbmFyeV09XCJ0cnVlXCIgZm9ybUNvbnRyb2xOYW1lPVwiaXNlbmFibGVkXCIgZmllbGRLZXk9XCJTRVRUSU5HU19NQVNfQUNUSVZFXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkFjdGl2ZVwiPjwvcC1jaGVja2JveD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICA8ZGl2IGNsYXNzPVwibXQtMiB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1iLTIgYnRuIGJ0bi1kYW5nZXJcIlxuICAgICAgICAgICAgZmllbGRLZXk9XCJTRVRUSU5HU19NQVNfQ0FOQ0VMXCIgKGNsaWNrKT1cIm9uQ2xpY2tkZWxldGVDYXRlZ29yeSgpXCIgKm5nSWY9XCJzYXZlTW9kZSA9PT0gJ1VQREFURSdcIj5cbiAgICAgICAgICAgIERlbGV0ZVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtYi0yIGJ0biBiZy13aGl0ZSB0ZXh0LXByaW1hcnkgYm9yZGVyIGJvcmRlci1wcmltYXJ5IGJ0bmNhbmNlbFwiXG4gICAgICAgICAgICBmaWVsZEtleT1cIlNFVFRJTkdTX01BU19DQU5DRUxcIiAoY2xpY2spPVwiY2xlYXJDYXRlZ29yeSgpXCI+XG4gICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWItMiBidG4gYnRuLXByaW1hcnkgYnRuY29tbW9uXCIgZmllbGRLZXk9XCJTRVRUSU5HU19NQVNfQUREX0NBVE9HT1JZXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzYXZlQ2F0ZWdvcnkoKVwiPlxuICAgICAgICAgICAge3sgc2F2ZU1vZGUgPT09ICdVUERBVEUnID8gJ1VwZGF0ZScgOiAnU2F2ZScgfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3AtY2FyZD5cblxuICAgICAgPGRpdiBpZD1cInRyZWUtbGlzdC1kZW1vXCIgKm5nSWY9XCJzZWxlY3RlZENhdGVnb3J5SWQgIT0gJycgXCI+XG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgICAjbG9va3VwdGFza3MgLmR4LWRhdGFncmlkLXJvd3N2aWV3IC5keC1yb3cge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgICAgfVxuICAgICAgICAgICNsb29rdXB0YXNrcyAuZHgtaGVhZGVyLXJvdyAuZHgtaGVhZGVyLWNlbGwge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgfVxuICAgICAgICAgICNzZWFyY2hwYW5lbCAuZHgtZGF0YWdyaWQtc2VhcmNoLXBhbmVsIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwcHg7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDBweDtcbiAgICAgICAgICB9XG4gICAgICAgIDwvc3R5bGU+XG5cbiAgICAgICAgPHAtdGFiVmlldyAjdGFiVmlldyBbKGFjdGl2ZUluZGV4KV09XCJhY3RpdmVUYWJJbmRleFwiIChvbkNoYW5nZSk9XCJvblRhYkNoYW5nZSgkZXZlbnQpXCI+XG4gICAgICAgICAgPHAtdGFiUGFuZWwgaGVhZGVyPVwiRWRpdFwiPlxuICAgICAgICAgICAgICA8IS0tIENvbnRlbnQgZm9yIHRoZSBFZGl0IHRhYiAtLT5cbiAgICAgICAgICA8L3AtdGFiUGFuZWw+XG4gICAgICAgICAgPHAtdGFiUGFuZWwgaGVhZGVyPVwiUmVvcmRlclwiPlxuICAgICAgICAgICAgICA8IS0tIENvbnRlbnQgZm9yIHRoZSBSZW9yZGVyIHRhYiAtLT5cbiAgICAgICAgICA8L3AtdGFiUGFuZWw+XG4gICAgICAgIDwvcC10YWJWaWV3PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic29ydC1vcHRpb25zIGNvbC1sZy0zIGNvbC1tZC0xMiBjb2wtMTIgbWItM1wiICpuZ0lmPVwiaXNSZW9yZGVyTW9kZVwiPlxuICAgICAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwiY2F0ZWdvcnlGb3JtXCI+XG4gICAgICAgICAgICA8cC1kcm9wZG93blxuICAgICAgICAgICAgICBbb3B0aW9uc109XCJzb3J0T3JkZXJcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBhIE9yZGVyXCJcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwibG9va3Vwb3JkZXJcIlxuICAgICAgICAgICAgICBvcHRpb25MYWJlbD1cIm5hbWVcIlxuICAgICAgICAgICAgICBvcHRpb25WYWx1ZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgc3R5bGVDbGFzcz1cImljb24tZHJvcGRvd25cIlxuICAgICAgICAgICAgICAob25DaGFuZ2UpPVwic29ydEdyaWQoJGV2ZW50LnZhbHVlKVwiPlxuICAgICAgICAgICAgPC9wLWRyb3Bkb3duPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkeC10cmVlLWxpc3RcbiAgICAgICAgICBpZD1cImxvb2t1cHRhc2tzXCJcbiAgICAgICAgICBbZGF0YVNvdXJjZV09XCJ0YXNrc0RhdGFcIlxuICAgICAgICAgIGtleUV4cHI9XCJpZFwiXG4gICAgICAgICAgcGFyZW50SWRFeHByPVwicGFyZW50aWRcIlxuICAgICAgICAgIFtjb2x1bW5BdXRvV2lkdGhdPVwidHJ1ZVwiXG4gICAgICAgICAgW3dvcmRXcmFwRW5hYmxlZF09XCJ0cnVlXCJcbiAgICAgICAgICBbc2hvd0JvcmRlcnNdPVwidHJ1ZVwiXG4gICAgICAgICAgKG9uSW5pdE5ld1Jvdyk9XCJpbml0TmV3Um93KCRldmVudClcIlxuICAgICAgICAgIChvblNhdmluZyk9XCJzYXZlQ2hhbmdlcygkZXZlbnQpXCJcbiAgICAgICAgICAob25DZWxsUHJlcGFyZWQpPVwib25DZWxsUHJlcGFyZWQoJGV2ZW50KVwiXG4gICAgICAgICAgKG9uRWRpdENhbmNlbGVkKT1cIm9uRWRpdENhbmNlbGVkKCRldmVudClcIlxuICAgICAgICAgIChvblRvb2xiYXJQcmVwYXJpbmcpPVwib25Ub29sYmFyUHJlcGFyaW5nKCRldmVudClcIlxuICAgICAgICAgIChvblJvd1ZhbGlkYXRpbmcpPVwib25Sb3dWYWxpZGF0aW5nKCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgPGR4by1zb3J0aW5nIG1vZGU9XCJub25lXCI+PC9keG8tc29ydGluZz5cbiAgICAgICAgICA8ZHhvLXNlYXJjaC1wYW5lbCBpZD1cInNlYXJjaHBhbmVsXCIgY2xhc3M9XCJkeC1kYXRhZ3JpZC1zZWFyY2gtcGFuZWxcIiBbdmlzaWJsZV09XCJpc0VkaXRNb2RlXCIgW3dpZHRoXT1cIjMwMFwiIFtzdHlsZV09XCJ7ICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsICdsZWZ0JzogJzAnIH1cIj48L2R4by1zZWFyY2gtcGFuZWw+XG4gICAgICAgICAgPGR4by1lZGl0aW5nXG4gICAgICAgICAgICBtb2RlPVwiYmF0Y2hcIlxuICAgICAgICAgICAgW2FsbG93QWRkaW5nXT1cImlzRWRpdE1vZGVcIlxuICAgICAgICAgICAgW2FsbG93VXBkYXRpbmddPVwiaXNFZGl0TW9kZVwiXG4gICAgICAgICAgICBbYWxsb3dEZWxldGluZ109XCJpc0VkaXRNb2RlXCJcbiAgICAgICAgICAgIFt1c2VJY29uc109XCJ0cnVlXCI+XG4gICAgICAgICAgPC9keG8tZWRpdGluZz5cbiAgICAgICAgICA8ZHhvLXJvdy1kcmFnZ2luZ1xuICAgICAgICAgICAgW2FsbG93UmVvcmRlcmluZ109XCIhaXNFZGl0TW9kZVwiXG4gICAgICAgICAgICBbb25SZW9yZGVyXT1cIm9uUmVvcmRlclwiXG4gICAgICAgICAgICBbc2hvd0RyYWdJY29uc109XCJmYWxzZVwiPlxuICAgICAgICAgIDwvZHhvLXJvdy1kcmFnZ2luZz5cbiAgICAgICAgICA8ZHhvLWhlYWRlci1maWx0ZXI+XG4gICAgICAgICAgICA8c3R5bGU+XG4gICAgICAgICAgICAgICNsb29rdXB0YXNrcyAuZHgtaGVhZGVyLXJvdyAuZHgtaGVhZGVyLWNlbGwge1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3N0eWxlPlxuICAgICAgICAgIDwvZHhvLWhlYWRlci1maWx0ZXI+XG5cbiAgICAgICAgICA8ZHhpLWNvbHVtbiBjbGFzcz1cImR4LWhlYWRlci1yb3dcIiBkYXRhRmllbGQ9XCJrZXlcIiBjYXB0aW9uPVwiS2V5XCIgW21pbldpZHRoXT1cIjIwMFwiIFttYXhXaWR0aF09XCIyMDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXF1aXJlZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgS2V5PHNwYW4gY2xhc3M9XCJyZXF1aXJlZC1tYXJrZXJcIj4qPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZHhpLXZhbGlkYXRpb24tcnVsZSB0eXBlPVwicmVxdWlyZWRcIiBtZXNzYWdlPVwiS2V5IGlzIHJlcXVpcmVkXCI+PC9keGktdmFsaWRhdGlvbi1ydWxlPlxuICAgICAgICAgICAgPGR4aS12YWxpZGF0aW9uLXJ1bGUgdHlwZT1cInBhdHRlcm5cIiBbcGF0dGVybl09XCJwYXR0ZXJuXCIgbWVzc2FnZT1cIkFsbG93ZWQgaW5wdXQgLSBBbHBoYSBudW1lcmljLCBoeXBoZW4sIHVuZGVyc2NvcmUgYW5kIHNwYWNlLlwiPjwvZHhpLXZhbGlkYXRpb24tcnVsZT5cbiAgICAgICAgICAgIDxkeGktdmFsaWRhdGlvbi1ydWxlIHR5cGU9XCJzdHJpbmdMZW5ndGhcIiBbbWF4XT1cIjUwXCIgbWVzc2FnZT1cIktleSBsaW1pdCAtIDUwIGNoYXJhY3RlcnNcIj48L2R4aS12YWxpZGF0aW9uLXJ1bGU+XG4gICAgICAgICAgICA8ZHhpLXZhbGlkYXRpb24tcnVsZSB0eXBlPVwiY3VzdG9tXCIgW3ZhbGlkYXRpb25DYWxsYmFja109XCJjaGVja0tleUR1cGxpY2F0ZVwiIG1lc3NhZ2U9XCJLZXkgQWxyZWFkeSBFeGlzdHNcIj48L2R4aS12YWxpZGF0aW9uLXJ1bGU+XG4gICAgICAgICAgPC9keGktY29sdW1uPlxuICAgICAgICAgIDxkeGktY29sdW1uIGNsYXNzPVwiZHgtaGVhZGVyLXJvd1wiIGRhdGFGaWVsZD1cInZhbHVlXCIgY2FwdGlvbj1cIlZhbHVlXCIgW21pbldpZHRoXT1cIjI1MFwiIFttYXhXaWR0aF09XCIyNTBcIj5cbiAgICAgICAgICAgIDxkeGktdmFsaWRhdGlvbi1ydWxlIHR5cGU9XCJyZXF1aXJlZFwiIG1lc3NhZ2U9XCJWYWx1ZSBpcyByZXF1aXJlZFwiPjwvZHhpLXZhbGlkYXRpb24tcnVsZT5cbiAgICAgICAgICAgIDxkeGktdmFsaWRhdGlvbi1ydWxlIHR5cGU9XCJzdHJpbmdMZW5ndGhcIiBbbWF4XT1cIjI1MFwiIG1lc3NhZ2U9XCJWYWx1ZSBsaW1pdCAtIDI1MCBjaGFyYWN0ZXJzXCI+PC9keGktdmFsaWRhdGlvbi1ydWxlPlxuICAgICAgICAgICAgPGR4aS12YWxpZGF0aW9uLXJ1bGUgdHlwZT1cImN1c3RvbVwiIFt2YWxpZGF0aW9uQ2FsbGJhY2tdPVwiY2hlY2tWYWx1ZUR1cGxpY2F0ZVwiIG1lc3NhZ2U9XCJWYWx1ZSBBbHJlYWR5IEV4aXN0c1wiPjwvZHhpLXZhbGlkYXRpb24tcnVsZT5cbiAgICAgICAgICA8L2R4aS1jb2x1bW4+XG4gICAgICAgIDwvZHgtdHJlZS1saXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJtb2RhbFwiIGlkPVwiRGVsZXRldXNlclwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCI+XG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJtb2RhbC10aXRsZVwiPkRlbGV0ZSB7e3RoaXMuc2VsZWN0ZWRJdGVtLnR5cGUgPT09ICdsb29rdXAnID8gJ0xvb2t1cCcgOiAnQ2F0ZWdvcnknfX08L2g1PlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUge3t0aGlzLnNlbGVjdGVkSXRlbS50eXBlID09PSAnbG9va3VwJyA/ICdMb29rdXAnIDogJ0NhdGVnb3J5J319P1xuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm10LTJcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicHVsbC1yaWdodCBtYi0yIGJ0biBidG4tcHJpbWFyeSBidG5jb21tb24gZGVsZXRlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiAoY2xpY2spPVwiZGVsZXRlSXRlbSgpXCI+XG4gICAgICAgICAgICBEZWxldGVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicHVsbC1yaWdodCBtYi0yIG1yLTIgYnRuIGJnLXdoaXRlIHRleHQtcHJpbWFyeSBidG5jYW5jZWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj4iXX0=