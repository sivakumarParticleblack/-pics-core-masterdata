import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { TreeNode, MenuItem, ConfirmationService, PrimeIcons } from 'primeng/api';
import { PermissionStore } from '../@core/permissions/permission.store';
import { AlertService } from '../@core/service/alert.service';
import { RbacService } from '../@core/service/rbac.service';
import { DataStoreService } from '../@core/service/data-store.service';
import { Subscription } from 'rxjs';
import { RBACINFO } from '../@core/urls/rbac-url.config';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DxTreeListModule } from 'devextreme-angular';
import { DxTreeListComponent } from 'devextreme-angular';
declare const $: any;
@Component({
  selector: 'lib-masterdata',
  templateUrl: './masterdata.component.html',
  styleUrls: ['./masterdata.component.scss']
})
export class MasterdataComponent implements OnInit {
  @ViewChild(DxTreeListComponent, { static: false }) treeList: DxTreeListComponent;
  updateLookUpForm: FormGroup;
  categories!: TreeNode[];
  menuItems: MenuItem[] = [];
  categoryForm!: FormGroup;
  filterMasterList: any[] = [];
  lookupForm!: FormGroup;
  lookupRuleForm!: FormGroup;
  roles!: any[];
  permissions!: any[];
  nodeType: string;
  saveMode: string;
  selectedItem: any = {};
  nodeselecttype: string;
  isGlobalLookup: boolean;
  pageErrorShow = false;
  dataControlActions = [
    { value: '', name: 'Select' },
    { value: 'HIDE', name: 'Hide' },
    { value: 'DISABLE', name: 'Disable' },
    { value: 'MASK', name: 'Mask' }
  ];
  sortOrder = [
    { value: 'asc', name: 'ASC' },
    { value: 'desc', name: 'DESC' }
  ];
  environment: any;
  RBACORG: RBACINFO = new RBACINFO();
  orgSubs!: Subscription;
  orgId: any;
  selectedCategoryId: any;
  tasksData: any = [];
  rowEditMode: string = 'batch';
  selectedEvent: any;
  pattern: any =/^[a-zA-Z0-9-_ ]+$/;
  //pattern: any = /^[a-zA-Z0-9,./ _*-]+$/;
  orderPattern: any = /^[0-9]+$/;
  allowDropInsideItem = true;
  allowReordering = false;
  showDragIcons = false;
  isEditMode: boolean = true;

  expandedRowKeys: Array<number> = [1];
  edit: string;
  editbatch: string;
  batchEdit: string;
  visibleRows: any;
  isSaveDisabled: boolean = false;
  isReorderMode: boolean = false;
  selectedSortOrder: 'asc' | 'desc' = 'asc';
  activeTabIndex = 0;
  lookuporder: FormControl;
  formSubmit : boolean = false;
  validationErrors: { [key: string]: string } = {};
  inputValidationMethod: any;
  constructor(
    private mastersService: RbacService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private permissionStore: PermissionStore,
    private _storeservice: DataStoreService,
  ) {
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

  ngOnInit(): void {
    this.orgSubs = this._storeservice.currentStore.subscribe((res: any) => {
      this.inputValidationMethod = res['INPUTVALIDATIONMETHOD']
      if (res['RBACORG'] && res['RBACORG'] !== '') {
        this.RBACORG = res['RBACORG'];
        console.log(this.RBACORG, 'RBACORG Permisson');
        this.environment = this.RBACORG['environment'];
        this.orgId = parseInt(this.RBACORG['orgID']);
        if (this.environment) {
          this.loadTree();
          this.loadContextMenu();
          this.mastersService.getAllUserRole().subscribe((items: any) => {
            this.roles = items.data;
          });
          this.mastersService.getPermissionsTree(this.environment.applicationid).subscribe((items: any) => {
            this.permissions = items.data;
          });
        }
      }
    });
  }
  ngOnDestroy(): void {
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
    this.mastersService.getLookupBycategoryID(this.selectedCategoryId).subscribe((item: any) => {
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

  onInput(event: Event, fieldtype: any, label: any, required: boolean) {
    const error =  this.inputValidationMethod(event, fieldtype, label, required);
    if (error && typeof error === 'string') {
      this.validationErrors[label] = error;
    } else {
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

  onCellPrepared(event: any) {
    // The event parameter contains information about the Component data
    this.visibleRows = event.component.getVisibleRows();
  }

  onEditCanceled(event: any) {
    this.list(this.selectedCategoryId);
  }

  onToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items;

    // Modifies an existing item
    toolbarItems.forEach(function (item) {
      if (item.name === "searchPanel") {
        item.location = "before";
      }
    });
  }
  onRowValidating(e) {
    console.log('event', e)
    if (e.isValid == false) {
      this.alertService.error(`Please correct existing row-level validation(s).`)
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

  handleTabClick(event: any) {
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
    this.isReorderMode = false
    this.list(this.selectedCategoryId);
  }

  toggleReorderMode() {
    this.isEditMode = false;
    this.batchEdit = "";
    this.allowReordering = true;
    this.showDragIcons = true;
    this.isReorderMode = true
    this.list(this.selectedCategoryId);
  }

  onTabChange(event: any) {
    // Handle tab change logic here
    console.log('Tab changed:', event.index);
    if (event.index === 0) {
      // Call your toggleEditMode() method
      this.toggleEditMode();
    } else if (event.index === 1) {
      // Call your toggleReorderMode() method
      this.toggleReorderMode();
    }
  }

  async onReorder(e) {
    const sortOrder = 'custom'
    const visibleRows = e.component.getVisibleRows();
    const toIndex = this.tasksData.findIndex((item) => item.id === visibleRows[e.toIndex].data.id);
    const fromIndex = this.tasksData.findIndex((item) => item.id === e.itemData.id);

    this.tasksData.splice(fromIndex, 1);
    this.tasksData.splice(toIndex, 0, e.itemData);
    //moveItemInArray(this.tasksData, e.fromIndex, e.toIndex);
    this.tasksData.forEach((item, index) => {
      item.order = index + 1;
    });

    await this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(async () => {
      await this.list(this.selectedCategoryId);
    });
  }

  async sortGrid(order: any) {

    if (order === 'asc') {
      // Sort the grid in ascending order
      const sortOrder = 'asc'
      this.tasksData.sort((a, b) => a.value.localeCompare(b.value));

      this.tasksData.forEach((item, index) => item.order = index + 1);

      await this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(async () => {
        await this.list(this.selectedCategoryId);
      });
    } else {
      // Sort the grid in descending order
      const sortOrder = 'desc'
      this.tasksData.sort((a, b) => b.value.localeCompare(a.value));

      this.tasksData.forEach((item, index) => item.order = index + 1);

      await this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(async () => {
        await this.list(this.selectedCategoryId);
      });
    }
  }

  checkKeyDuplicate(params: any) {
    if (params.data && params.data.key && params.data.key.length > 0) {
      const editedKey = params.data.key.trim().toLowerCase();
      const occurrences = this.visibleRows.filter((item) => {
        item.data.parentid = item.data.parentid == null ? 0 : item.data.parentid
        params.data.parentid = params.data.parentid == null ? 0 : params.data.parentid
        if (params.data.parentid == item.data.parentid) {
          return item.data && item.data.key && item.data.key.trim().toLowerCase() === editedKey;
        }
      }).length;

      const isDuplicate = occurrences > 1;
      return !isDuplicate;
    }
  }

  checkValueDuplicate(params: any) {
    if (params.data && params.data.value && params.data.value.length > 0) {
      const editedValue = params.data.value.trim().toLowerCase();
      const occurrences = this.visibleRows.filter((item) => {
        item.data.parentid = item.data.parentid == null ? 0 : item.data.parentid
        params.data.parentid = params.data.parentid == null ? 0 : params.data.parentid
        if (params.data.parentid == item.data.parentid) {
          return item.data && item.data.value && item.data.value.trim().toLowerCase() === editedValue;
        }
      }).length;

      const isDuplicate = occurrences > 1;
      return !isDuplicate
    }
  }

  nodeSelect(event: any) {

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


    this.mastersService.getLookupBycategoryID(id).subscribe((item: any) => {

      const lookupdataitems = item['data'];

      this.categoryForm.patchValue({
        id: lookupdataitems.id,
        applicationid: lookupdataitems.applicationid,
        name: lookupdataitems.name,
        description: lookupdataitems.description,
        readonly: lookupdataitems.readonly,
        isenabled: lookupdataitems.isenabled,
        lookuporder : lookupdataitems.lookuporder
      });

      this.mastersService.getAllLookupBycategoryID(id).subscribe((nodes: any) => {
        this.tasksData = (<any>nodes).data;
      });

    });
  }

  checkValidData(event) {
    const validationRules = event.component.option('validationRules');
    const hasValidationErrors = validationRules.some((rule: any) => !rule.isValid);

    if (hasValidationErrors) {
      this.isSaveDisabled = true;
    } else {
      // Enable the Save icon
      this.isSaveDisabled = false;
    }
  }

  saveChanges(event) {
    console.log('addedItems', event);

    const changes = event.changes || [];

    let keysSet = new Set<string>();
    let valuesSet = new Set<string>();
    let lookupcategoryid;

    for (const change of changes) {
      if (change.type === 'update') {
        const originalData = this.tasksData.filter((originalItem: any) => originalItem.id === change.key);
        change.data = { ...originalData[0], ...change.data };
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
    this.mastersService.addOrUpdateLookup(request).subscribe(
      () => {
        // API call was successful, update UI or refresh data
        this.alertService.success('Updated Successfully');
        // this.loadTree();
        this.clearForm();
        this.nodeSelect(this.selectedEvent);
      },
      (err: any) => {
        // Handle API call error without refreshing the data
        this.alertService.error(err.error.message);

      }
    );
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
    return this.lookupForm.get('lookupdata') as FormArray;
  }

  addRule(): FormGroup {
    return this.formBuilder.group({
      roles: ['', Validators.required],
      permission: ['', Validators.required],
      action: ['', Validators.required]
    });
  }

  // onAddRule(): void {
  //   this.datarules.push(this.addRule());
  // }

  addlookupdata(): FormGroup {
    return this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      order: [0]
    });
  }

  onAddLookUpData(): void {
    this.pageErrorShow = false;
    this.lookupdata.push(this.addlookupdata());
  }

  onDeleteLookupData(i: number): void {
    this.lookupdata.removeAt(i);
  }

  // onDeleteRule(rowIndex: number): void {
  //   this.datarules.removeAt(rowIndex);
  // }

  onClickdeleteCategory(){
    // this.saveMode = 'DELETE';
    this.nodeType = this.selectedItem.type;

    $('#Deleteuser').modal('show');
  }

  searchMaster(event: Event) {
    const value = (event.target as HTMLInputElement).value.toUpperCase();
    this.filterMasterList = this.categories.filter((a: any) => a['name']?.toUpperCase().startsWith(value));
  }

  clearSearch(){
    const inputElement = document.querySelector('.form-control') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
      this.filterMasterList = this.categories; // Reset the filtered list
    }
  }

  onNodeContextMenuSelect(event: any) {
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
    } else if (event.node.type === 'lookup') {
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



  nodeExpand(event: any) {
    if (event.node && event.node.data && event.node.type !== 'lookup') {
      this.mastersService.getLookupTree(event.node.data).subscribe((nodes: any) => {
        const sortedChildren = (<any>nodes).data.sort((a, b) => a.value.localeCompare(b.value));
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
        this.mastersService.createCategory(category).subscribe((response: any) => {
          this.alertService.success('Category created successfully.');
          //this.selectedCategoryId = response.data;
          this.cancel();
          this.loadTree();
          this.clearForm();
        }, (err: any) => this.alertService.error(err.error.message));
      } else {
        this.mastersService.updateCategory(category).subscribe(() => {
          this.alertService.success('Category updated successfully.');
          this.cancel();
          this.list(this.selectedCategoryId);
          this.loadTree();
          this.clearForm();
        }, (err: any) => this.alertService.error(err.error.message));
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
          this.clearForm()
        }, (err: any) => this.alertService.error(err.error.message));
      } else {
        this.mastersService.updateLookup(lookupdts).subscribe(() => {
          this.alertService.success('Lookup updated successfully.');
          this.loadTree();
          this.clearForm()
        }, (err: any) => this.alertService.error(err.error.message));
      }
    } else {
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
    } else {
      this.lookupForm.patchValue({
        lookupcategoryid: this.selectedItem.lookupcategoryid,
        parentid: this.selectedItem.id
      });
    }
  }

  setGlobal(checked: boolean) {
    this.isGlobalLookup = checked;
    this.lookupForm.get('access')?.patchValue({
      view: [],
      assign: []
    });
  }

  private loadContextMenu() {
    this.menuItems = [
      {
        label: 'Create Category',
        icon: PrimeIcons.ARROW_UP_LEFT,
        command: (event: any) => {
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

  private loadTree() {
    this.pageErrorShow = false;
    this.mastersService.getAllCategoryTree(this.environment.applicationid).subscribe((items: any) => {
      this.categories = items;
      if (this.categories.length) {
       // this.selectedItem = this.categories[0];
       if (this.selectedCategoryId) {
        const index = this.categories.findIndex((category: TreeNode<any>) => (category as any).id === this.selectedCategoryId);
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
      this.mastersService.deleteLookup(this.selectedItem.id).subscribe((_item: any) => {
        this.cancel();
        $('#Deleteuser').modal('hide');
        this.alertService.success('Lookup deleted successfully.');
        this.loadTree();
      });
    } else {
      this.mastersService.deleteCategory(this.selectedItem.id).subscribe((_item: any) => {
        this.cancel();
        $('#Deleteuser').modal('hide');
        this.alertService.success('Category deleted successfully.');
        this.selectedCategoryId = '';
        this.onClickHome();
      });
    }
  }

  requiredIfValidator(predicate: () => any) {
    return (formControl: AbstractControl) => {
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
