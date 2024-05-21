import * as i0 from '@angular/core';
import { Injectable, Component, Directive, Input, ViewChild, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { __awaiter } from 'tslib';
import * as i2$1 from '@angular/forms';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4 from 'primeng/api';
import { PrimeIcons, ConfirmationService } from 'primeng/api';
import * as i15 from 'devextreme-angular';
import { DxTreeListComponent, DxTreeListModule, DxSortableModule, DxTemplateModule, DxTabPanelModule } from 'devextreme-angular';
import { map } from 'rxjs/operators';
import * as i1 from '@angular/router';
import { NavigationStart } from '@angular/router';
import 'rxjs/add/operator/map';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i8 from 'primeng/tree';
import * as i9 from 'primeng/contextmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import * as i10 from 'primeng/confirmpopup';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import * as i11 from 'primeng/card';
import { CardModule } from 'primeng/card';
import * as i12 from 'primeng/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import * as i13 from 'primeng/tabview';
import { TabViewModule } from 'primeng/tabview';
import * as i14 from 'primeng/dropdown';
import { DropdownModule } from 'primeng/dropdown';
import * as i16 from 'devextreme-angular/ui/nested';
import * as i18 from 'primeng/inputtext';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';

class MasterdataService {
    constructor() { }
}
MasterdataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MasterdataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class RoleConfig {
}
RoleConfig.EndPoint = {
    role: {
        getAllUserRole: '/access-control/role',
        createRole: '/access-control/role/create',
        getLandingPage: '/platform/menu/application',
        addPolicyGroup: '/access-control/role',
        getAllOrgRole: '/access-control/role/organization/{orgid}',
        dossier: '/dossier'
    }
};
class UserConfig {
}
UserConfig.EndPoint = {
    User: {
        getAllUserList: '/org/user',
        getAllUserActiveInactive: '/org/user?includeInactiveUsers=true',
        activateUser: '/org/user/activate',
        createUser: '/org/user/create',
        userRole: '/org/user/role',
        managementgroup: '/org/team/managementgroup',
        getAllUserOrgList: '/org/user/organization/'
    },
    Provider: {
        getProviderList: '/ref/provider',
        searchProviderList: '/ref/provider/search',
        addProviderUser: '/ref/provider/create/account'
    }
};
class AttachmentConfig {
}
AttachmentConfig.EndPoint = {
    Attachments: {
        GetAttachmentReferral: '/ref/attachment/referral',
        GetCategoryLookup: '/lookup/lookupbycategoryname',
        UploadKey: '/common/files/upload-key',
        DownloadKey: '/common/files/download-key',
        PostAttachment: '/ref/attachment/create',
        PutAttachment: '/ref/attachment'
    }
};
class PolicyGroupConfig {
}
PolicyGroupConfig.EndPoint = {
    policyGroup: {
        getPolicyGroupList: '/platform/page-designer/policyGroup',
        getAllPolicyGroupList: '/platform/page-designer/policyGroup/all',
        createPolicyGroup: '/platform/page-designer/policyGroup',
        getOrgPolicyGroups: '/platform/page-designer/policyGroup/organization/{organizationid}'
    }
};
class PermissionsURL {
}
PermissionsURL.EndPoints = {
    permission: {
        permissionRoleById: '/access-control/permission/role/{id}',
        pagePermission: '/access-control/permission/page',
        getPermission: '/access-control/permission/{id}',
        createPermission: '/access-control/permission/create',
        updateDeletePermission: '/access-control/permission/{permissionid}',
        getPermissionTree: '/access-control/permission/page/{pageid}/{parentid}',
        getPermissionTypes: '/access-control/permission/type/{applicationid}',
        applicationPermissionsTree: '/access-control/permission/application/{applicationid}'
    },
    page: {
        createPage: '/platform/menu/create',
        updateDeletePage: '/platform/menu/{pageid}',
        AllPageTree: '/platform/menu/tree/{applicationid}'
    }
};
class AccessManagementConfig$1 {
}
AccessManagementConfig$1.EndPoint = {
    Organization: {
        getOrganizationList: '/org/organization/all',
        getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
    }
};
class MasterURL {
}
MasterURL.EndPoints = {
    lookup: {
        createCategory: '/platform/master/lookup/category',
        updateDeleteCategory: '/platform/master/lookup/category/{id}',
        lookup: '/platform/master/lookup/{id}',
        createLookup: '/platform/master/lookup',
        getPermissionRoleById: '/access-control/permission/role/{id}',
        getAllCategoryTree: '/platform/master/lookup/category/tree/{applicationid}',
        getLookupTree: '/platform/master/lookup/tree/{categoryid}',
        getLookupByCategoryId: '/platform/master/lookup/list/{id}',
        getAllLookupByCategoryId: '/platform/master/lookup/getAllLookup/{categoryId}',
        getPermissionsTree: '/access-control/permission/application/{applicationid}',
        addOrUpdateLookup: '/platform/master/lookup/addOrUpdateLookup',
        updateLookupOrders: '/platform/master/lookup/update/lookupOrders/{sortOrder}',
    }
};
class RBACINFO {
    constructor() {
        this.apiHost = '';
        this.tokenKey = '';
    }
}
class Environment {
}

class Store {
    constructor(initialState) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable();
    }
    get state() {
        return this._state$.getValue();
    }
    setState(nextState) {
        this._state$.next(nextState);
    }
}

class PermissionStore extends Store {
    constructor() {
        super({});
    }
    setStore(data) {
        if (data) {
            this.setState(Object.assign(Object.assign({}, this.state), data));
        }
    }
    getStore(type = 'P') {
        if (type === 'P')
            return of(this.state);
        else
            return of(this.state);
    }
    flat(array) {
        let result = [];
        if (array) {
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
PermissionStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PermissionStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class DataStoreService {
    constructor() {
        this.currentStoreSubject = new BehaviorSubject({});
        this.currentStore = this.currentStoreSubject.asObservable();
        // test code
    }
    setData(key, value) {
        const currentStore = this.getCurrentStore();
        currentStore[key] = value;
        this.currentStoreSubject.next(currentStore);
    }
    setObject(value) {
        this.currentStoreSubject.next(value);
    }
    getData(key) {
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
    getCurrentStore() {
        return this.currentStoreSubject.value;
    }
}
DataStoreService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DataStoreService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class RbacService {
    constructor(storeService) {
        this.storeService = storeService;
        this.storeService.currentStore.subscribe(val => {
            if (val) {
                this.httpService = val.HTTPSERVICE;
            }
        });
    }
    getAllUserList(key) {
        return this.httpService.get(`${UserConfig.EndPoint.User.getAllUserList}/${key}`);
    }
    getAllUserOrgList(orgid) {
        return this.httpService.get(UserConfig.EndPoint.User.getAllUserOrgList + orgid);
    }
    saveUser(data) {
        return this.httpService.post(UserConfig.EndPoint.User.createUser, data);
    }
    updateUser(data, userid) {
        return this.httpService.put(`${UserConfig.EndPoint.User.getAllUserList}/${userid}`, data);
    }
    deleteUser(id) {
        return this.httpService.delete(`${UserConfig.EndPoint.User.getAllUserList}/${id}`);
    }
    activateUser(data) {
        return this.httpService.post(UserConfig.EndPoint.User.activateUser, data);
    }
    addProviderUser(data) {
        return this.httpService.post(UserConfig.EndPoint.Provider.addProviderUser, data);
    }
    addUserRole(data) {
        return this.httpService.post(UserConfig.EndPoint.User.userRole, data);
    }
    uploadKey(objparams) {
        return this.httpService.post(AttachmentConfig.EndPoint.Attachments.UploadKey, objparams);
    }
    getOrgPolicyGroupList(orgid) {
        return this.httpService.get(PolicyGroupConfig.EndPoint.policyGroup.getOrgPolicyGroups.replace('{organizationid}', String(orgid)));
    }
    getAllPolicyGroupList(policyGroupId) {
        const endPoint = policyGroupId
            ? `${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${policyGroupId}`
            : PolicyGroupConfig.EndPoint.policyGroup.getAllPolicyGroupList;
        return this.httpService.get(endPoint);
    }
    getPolicyGroupById(id) {
        return this.httpService.get(PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList + '/' + id);
    }
    getPolicyGroupsByManagementGroup(policyGroupId) {
        return this.httpService.get(`/org/policyGroup/managementgroup/${policyGroupId}`);
    }
    createPolicyGroup(data) {
        return this.httpService.post(PolicyGroupConfig.EndPoint.policyGroup.createPolicyGroup, data);
    }
    updatePolicyGroup(id, item) {
        return this.httpService.put(`${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${id}`, item);
    }
    deletePolicyGroup(id) {
        return this.httpService.delete(`${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${id}`);
    }
    getAllUserRole(id) {
        return this.httpService.get(RoleConfig.EndPoint.role.getAllOrgRole.replace('{orgid}', String(id)));
    }
    deleteRole(id) {
        return this.httpService.delete(`${RoleConfig.EndPoint.role.getAllUserRole}/${id}`);
    }
    getRoleById(roleid) {
        return this.httpService.get(`${RoleConfig.EndPoint.role.getAllUserRole}/${roleid}`);
    }
    createRole(data) {
        return this.httpService.post(RoleConfig.EndPoint.role.createRole, data);
    }
    updateRole(roleId, data) {
        return this.httpService.put(`${RoleConfig.EndPoint.role.getAllUserRole}/${roleId}`, data);
    }
    getLandingPage(id) {
        return this.httpService.get(`${RoleConfig.EndPoint.role.getLandingPage}/${id}`);
    }
    createPolicyGroupForRole(roleId, data) {
        return this.httpService.post(`${RoleConfig.EndPoint.role.addPolicyGroup}/${roleId}/policygroups`, data);
    }
    updatePolicyGroupForRole(roleId, data) {
        return this.httpService.put(`${RoleConfig.EndPoint.role.addPolicyGroup}/${roleId}/policygroups`, data);
    }
    getReportDashbaord() {
        return this.httpService.get(`${RoleConfig.EndPoint.role.dossier}`);
    }
    getPermissionRoleById(id) {
        return this.httpService.get(PermissionsURL.EndPoints.permission.permissionRoleById.replace('{id}', id));
    }
    getManagementGroupTree(_organizationid) {
        return this.httpService.get('/org/management-group/organization/tree');
    }
    getPermissionsTree(applicationid) {
        return this.httpService.get(PermissionsURL.EndPoints.permission.applicationPermissionsTree.replace('{applicationid}', applicationid));
    }
    getPagePermission(data) {
        return this.httpService.post(PermissionsURL.EndPoints.permission.pagePermission, data);
    }
    createPage(page) {
        return this.httpService.post(PermissionsURL.EndPoints.page.createPage, page);
    }
    updatePage(page) {
        return this.httpService.put(PermissionsURL.EndPoints.page.updateDeletePage.replace('{pageid}', page.id), page);
    }
    deletePage(pageId) {
        return this.httpService.delete(PermissionsURL.EndPoints.page.updateDeletePage.replace('{pageid}', pageId));
    }
    getPermission(id) {
        return this.httpService.get(PermissionsURL.EndPoints.permission.getPermission.replace('{id}', id));
    }
    createPermission(permission) {
        return this.httpService.post(PermissionsURL.EndPoints.permission.createPermission, permission);
    }
    updatePermission(permission) {
        return this.httpService.put(PermissionsURL.EndPoints.permission.updateDeletePermission.replace('{permissionid}', permission.id), permission);
    }
    deletePermission(permissionId) {
        return this.httpService.delete(PermissionsURL.EndPoints.permission.updateDeletePermission.replace('{permissionid}', permissionId));
    }
    getAllPageTree(applicationid) {
        return this.httpService
            .get(PermissionsURL.EndPoints.page.AllPageTree.replace('{applicationid}', applicationid))
            .pipe(map((item) => {
            return item.data;
        }));
    }
    getPermissionTree(pageid, parentid) {
        return this.httpService.get(PermissionsURL.EndPoints.permission.getPermissionTree.replace('{pageid}', pageid).replace('{parentid}', parentid));
    }
    getPermissionTypes(applicationid) {
        return this.httpService.get(PermissionsURL.EndPoints.permission.getPermissionTypes.replace('{applicationid}', applicationid));
    }
    getOrganizationPage(orgId) {
        return this.httpService.get(AccessManagementConfig$1.EndPoint.Organization.getOrganization.replace('{orgId}', orgId));
    }
    createCategory(category) {
        return this.httpService.post(MasterURL.EndPoints.lookup.createCategory, category);
    }
    updateCategory(category) {
        return this.httpService.put(MasterURL.EndPoints.lookup.updateDeleteCategory.replace('{id}', category.id), category);
    }
    deleteCategory(categoryId) {
        return this.httpService.delete(MasterURL.EndPoints.lookup.updateDeleteCategory.replace('{id}', categoryId));
    }
    getLookup(id) {
        return this.httpService.get(MasterURL.EndPoints.lookup.lookup.replace('{id}', id));
    }
    createLookup(lookup) {
        return this.httpService.post(MasterURL.EndPoints.lookup.createLookup, lookup);
    }
    updateLookup(lookup) {
        return this.httpService.put(MasterURL.EndPoints.lookup.lookup.replace('{id}', lookup.id), lookup);
    }
    deleteLookup(lookupId) {
        return this.httpService.delete(MasterURL.EndPoints.lookup.lookup.replace('{id}', lookupId));
    }
    getAllCategoryTree(applicationid) {
        return this.httpService
            .get(MasterURL.EndPoints.lookup.getAllCategoryTree.replace('{applicationid}', applicationid))
            .pipe(map((item) => {
            return item.data;
        }));
    }
    getLookupTree(categoryid) {
        return this.httpService.get(MasterURL.EndPoints.lookup.getLookupTree.replace('{categoryid}', categoryid));
    }
    getLookupBycategoryID(categoryid) {
        return this.httpService.get(MasterURL.EndPoints.lookup.getLookupByCategoryId.replace('{id}', categoryid));
    }
    getAllLookupBycategoryID(categoryid) {
        return this.httpService.get(MasterURL.EndPoints.lookup.getAllLookupByCategoryId.replace('{categoryId}', categoryid));
    }
    addOrUpdateLookup(lookup) {
        return this.httpService.post(MasterURL.EndPoints.lookup.addOrUpdateLookup, lookup);
    }
    updateLookupOrder(lookup, sortOrder) {
        return this.httpService.put((MasterURL.EndPoints.lookup.updateLookupOrders.replace('{sortOrder}', sortOrder)), lookup);
    }
}
RbacService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacService, deps: [{ token: DataStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
RbacService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: DataStoreService }]; } });

class AlertService {
    constructor(router) {
        this.router = router;
        this.subject = new Subject();
        this.keepAfterRouteChange = false;
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                }
                else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }
    getAlert() {
        return this.subject.asObservable();
    }
    success(message, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }
    error(message, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }
    info(message, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }
    warn(message, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }
    alert(type, message, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: type, message: message });
    }
    clear() {
        // clear alerts
        this.subject.next({});
    }
}
AlertService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService, deps: [{ token: i1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
AlertService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Router }]; } });
var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType || (AlertType = {}));
class Alert {
}
class UserGroupDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
class UserRolePageDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
class UserRoleDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
class UserDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
class AccessManagementConfig {
}
AccessManagementConfig.EndPoint = {
    Organization: {
        getOrganizationList: '/org/organization/all',
        getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
    }
};

const DISPLAY_IN_SECONDS = 8;
class AlertComponent {
    constructor(alertService) {
        this.alertService = alertService;
        this.alerts = [];
    }
    ngOnInit() {
        this.alertService.getAlert().subscribe((alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }
            // add alert to array
            this.alerts.push(alert);
            // remove alert after 5 seconds
            setTimeout(() => this.removeAlert(alert), DISPLAY_IN_SECONDS * 1000);
        });
    }
    removeAlert(alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
    cssClass(alert) {
        if (!alert) {
            return;
        }
        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }
}
AlertComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertComponent, deps: [{ token: AlertService }], target: i0.ɵɵFactoryTarget.Component });
AlertComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: AlertComponent, selector: "app-alert", ngImport: i0, template: "<div *ngFor=\"let alert of alerts\" class=\"alert-animate {{ cssClass(alert) }} alert-dismissable\">\n  {{ alert.message }}\n  <a class=\"close\" (click)=\"removeAlert(alert)\">&times;</a>\n</div>\n", styles: [".alert-animate{position:fixed;top:10px;left:auto;right:10px;z-index:999999;min-width:400px;text-transform:capitalize;margin:0 auto;animation-name:slideInDown;animation-duration:1s;animation-fill-mode:both}.alert-animate .close{padding:3px;border-radius:2px;color:#fff;opacity:1;text-align:center;line-height:17px;font-size:24px}@keyframes slideInDown{0%{transform:translateY(-100%);visibility:visible}to{transform:translateY(0)}}.alert-animate.alert-success{background:#04844b;color:#fff;border-color:#04844b}.alert-danger{background:#b92b28;border-color:#b92b28;color:#fff}.alert-info{color:#fff;background:#0f3164;border-color:#0f3164}\n"], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{
                    // moduleId: module.id,
                    selector: 'app-alert',
                    templateUrl: 'alert.component.html',
                    styleUrls: ['./alert.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: AlertService }]; } });

class PermissionDirective {
    constructor(renderer, elementRef, dataStore) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.dataStore = dataStore;
    }
    ngAfterViewInit() {
        const permissions = this.dataStore.state;
        if (permissions) {
            if (!permissions[this.fieldKey]) {
                const template = this.elementRef.nativeElement;
                if (template.tagName === 'A') {
                    if (template) {
                        const r = document.createElement(this.elementRef.nativeElement.tagName.toLowerCase());
                        r.innerHTML = template.innerHTML;
                        r.href = 'javascript:void(0);';
                        r['disabled'] = true;
                        r.className = template.className;
                        this.elementRef.nativeElement.parentNode.replaceChild(r, template);
                    }
                }
                else if (template.tagName === 'P-MULTISELECT' ||
                    template.tagName === 'P-DROPDOWN' ||
                    template.tagName === 'P-CHECKBOX' ||
                    template.tagName === 'P-TREESELECT' ||
                    template.tagName === 'P-RADIOBUTTON' ||
                    template.tagName === 'P-CALENDAR') {
                    if (template) {
                        const r = document.createElement(this.elementRef.nativeElement.tagName.toLowerCase());
                        r.innerHTML = template.innerHTML;
                        r.className = template.className;
                        r.className += ' p-disabled';
                        this.elementRef.nativeElement.parentNode.replaceChild(r, template);
                    }
                }
                else {
                    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', 'true');
                    const childInputNodes = this.elementRef.nativeElement.querySelectorAll('input, select, textarea, button, a, ng-select, div, lable');
                    childInputNodes.forEach((elem) => {
                        this.renderer.setAttribute(elem, 'disabled', 'true');
                    });
                }
            }
        }
    }
}
PermissionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: PermissionStore }], target: i0.ɵɵFactoryTarget.Directive });
PermissionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: PermissionDirective, selector: "[fieldKey]", inputs: { fieldKey: "fieldKey" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[fieldKey]'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: PermissionStore }]; }, propDecorators: { fieldKey: [{
                type: Input
            }] } });

class MasterdataComponent$1 {
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
MasterdataComponent$1.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent$1, deps: [{ token: RbacService }, { token: i2$1.FormBuilder }, { token: AlertService }, { token: i4.ConfirmationService }, { token: PermissionStore }, { token: DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
MasterdataComponent$1.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MasterdataComponent$1, selector: "lib-masterdata", viewQueries: [{ propertyName: "treeList", first: true, predicate: DxTreeListComponent, descendants: true }], ngImport: i0, template: "<head>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn3.devexpress.com/jslib/23.2.3/css/dx.material.blue.light.css\" />\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\" integrity=\"sha384-dfST6o4eMl42MOv72d7aMR3zdTtiErUq6nhB65eA6ATlFAq1RfiaDJt9FCx0X1o5\" crossorigin=\"anonymous\">\n</head>\n<app-alert></app-alert>\n<div class=\"permission\">\n  <div class=\"row\">\n    <div class=\"col-lg-4 col-md-6 col-12\">\n      <div class=\"clearfix\"></div>\n      <div class=\"tab-content py-2\">\n        <div class=\"tab-pane fade show active\">\n          <div class=\"row\">\n            <div class=\"col-md-10 col-12 form-group bgiconsearch pr-1\">\n              <span class=\"p-input-icon-right w-100\">\n                <i class=\"pi pi-times-circle\" (click)=\"clearSearch()\"></i>\n                <input class=\"form-control\" placeholder=\"Search by Category name\" type=\"text\" (keyup)=\"searchMaster($event)\"\n                  fieldKey=\"SETTINGS_MAS_SEARCH_BY_NAME\" pInputText />\n              </span>\n            </div>\n            <div class=\"col-md-2 col-12 form-group pl-0 text-md-right\">\n              <button type=\"button\" class=\"btn btn-primary btncommon\" (click)=\"onClickAddCategory()\">Add</button>\n            </div>\n          </div>\n          <div class=\"clearfix\"></div>\n          <div class=\"masteracess\">\n            <p-tree [value]=\"filterMasterList\" selectionMode=\"single\" [(selection)]=\"selectedItem\"\n              (onNodeSelect)=\"nodeSelect($event)\">\n            </p-tree>\n            <p-contextMenu #treeContextMenu [model]=\"menuItems\" appendTo=\"body\"></p-contextMenu>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-lg-8 col-md-6 col-12 master-right mt-2\">\n      <p-confirmPopup></p-confirmPopup>\n      <p-card id=\"categoryForm\" class=\"rbac-card\" [formGroup]=\"categoryForm\"\n        [style]=\"{ width: '100%', 'margin-bottom': '1em' }\">\n\n        <input id=\"cid\" type=\"hidden\" formControlName=\"id\" />\n        <input id=\"capplicationid\" type=\"hidden\" formControlName=\"applicationid\" />\n\n        <div class=\"p-fluid p-formgrid p-grid\">\n          <div class=\"col-md-12 col-12 mb-3\">\n            <div class=\"strip_head toggleleft m-0 p-0\">\n              <span class=\"report_head font-weight-bold\">{{saveMode === 'INSERT' ? 'Add Category' : 'Update Category'}}</span>\n            </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12 col-12 mb-3\">\n            <label for=\"mName\" class=\"referral-form-labels\">Name\n              <span class=\"requiredfield text-danger\">*</span>\n            </label>\n            <input id=\"mName\" type=\"text\" formControlName=\"name\" fieldKey=\"SETTINGS_MAS_NAME\" placeholder=\"Enter Name\" aria-describedby=\"mName\"\n             (input)=\"onInput($event, 'name', 'Category Name', true)\" pInputText class=\"wide-input\" />\n            <div *ngIf=\"validationErrors['Category Name']\" class=\"p-error block mt-1\">{{validationErrors['Category Name']}}</div>\n            <div *ngIf=\"!validationErrors['Category Name'] && \n            categoryForm.controls['name'].invalid &&\n            categoryForm.controls['name'].hasError('required') && categoryForm.controls['name'].errors && formSubmit\">\n              <div *ngIf=\"categoryForm.controls['name'].hasError('required')\" class=\"p-error block mt-1\">Category Name is required</div>\n            </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12 col-12 mb-3\">\n            <label for=\"cdescription\" class=\"referral-form-labels\">Description </label>\n            <input id=\"cdescription\" type=\"text\" formControlName=\"description\" fieldKey=\"SETTINGS_MAS_DESCRYPTION\"\n              placeholder=\"Enter Description\" aria-describedby=\"cdescription\"\n              (input)=\"onInput($event, 'description', 'Description', false)\" pInputText class=\"wide-input\" />\n              <div *ngIf=\"validationErrors['Description']\" class=\"p-error block mt-1\">{{validationErrors['Description']}}</div>\n          </div>\n          <div class=\"col-lg-3 col-md-12 col-12 mb-3\">\n            <label for=\"corder\" class=\"referral-form-labels d-none d-lg-inline-block\">&#160;</label>\n            <div class=\"d-flex align-items-center\" style=\"height: 32px;\">\n              <p-checkbox st inputId=\"active\" [binary]=\"true\" formControlName=\"isenabled\" fieldKey=\"SETTINGS_MAS_ACTIVE\"\n                label=\"Active\"></p-checkbox>\n            </div>\n          </div>\n        </div>\n       <div class=\"mt-2 text-right\">\n          <button class=\"mb-2 btn btn-danger\"\n            fieldKey=\"SETTINGS_MAS_CANCEL\" (click)=\"onClickdeleteCategory()\" *ngIf=\"saveMode === 'UPDATE'\">\n            Delete\n          </button>\n          <button class=\"mb-2 btn bg-white text-primary border border-primary btncancel\"\n            fieldKey=\"SETTINGS_MAS_CANCEL\" (click)=\"clearCategory()\">\n            Cancel\n          </button>\n          <button class=\"mb-2 btn btn-primary btncommon\" fieldKey=\"SETTINGS_MAS_ADD_CATOGORY\"\n            (click)=\"saveCategory()\">\n            {{ saveMode === 'UPDATE' ? 'Update' : 'Save' }}\n          </button>\n        </div>\n      </p-card>\n\n      <div id=\"tree-list-demo\" *ngIf=\"selectedCategoryId != '' \">\n        <style>\n          #lookuptasks .dx-datagrid-rowsview .dx-row {\n            border-bottom: 1px solid #ddd;\n          }\n          #lookuptasks .dx-header-row .dx-header-cell {\n            font-weight: bold;\n          }\n          #searchpanel .dx-datagrid-search-panel {\n            margin-left: 0px;\n            padding-left: 0px;\n          }\n        </style>\n\n        <p-tabView #tabView [(activeIndex)]=\"activeTabIndex\" (onChange)=\"onTabChange($event)\">\n          <p-tabPanel header=\"Edit\">\n              <!-- Content for the Edit tab -->\n          </p-tabPanel>\n          <p-tabPanel header=\"Reorder\">\n              <!-- Content for the Reorder tab -->\n          </p-tabPanel>\n        </p-tabView>\n        <div class=\"sort-options col-lg-3 col-md-12 col-12 mb-3\" *ngIf=\"isReorderMode\">\n          <form [formGroup]=\"categoryForm\">\n            <p-dropdown\n              [options]=\"sortOrder\"\n              placeholder=\"Select a Order\"\n              formControlName=\"lookuporder\"\n              optionLabel=\"name\"\n              optionValue=\"value\"\n              styleClass=\"icon-dropdown\"\n              (onChange)=\"sortGrid($event.value)\">\n            </p-dropdown>\n          </form>\n        </div>\n        <dx-tree-list\n          id=\"lookuptasks\"\n          [dataSource]=\"tasksData\"\n          keyExpr=\"id\"\n          parentIdExpr=\"parentid\"\n          [columnAutoWidth]=\"true\"\n          [wordWrapEnabled]=\"true\"\n          [showBorders]=\"true\"\n          (onInitNewRow)=\"initNewRow($event)\"\n          (onSaving)=\"saveChanges($event)\"\n          (onCellPrepared)=\"onCellPrepared($event)\"\n          (onEditCanceled)=\"onEditCanceled($event)\"\n          (onToolbarPreparing)=\"onToolbarPreparing($event)\"\n          (onRowValidating)=\"onRowValidating($event)\"\n        >\n          <dxo-sorting mode=\"none\"></dxo-sorting>\n          <dxo-search-panel id=\"searchpanel\" class=\"dx-datagrid-search-panel\" [visible]=\"isEditMode\" [width]=\"300\" [style]=\"{ 'position': 'absolute', 'left': '0' }\"></dxo-search-panel>\n          <dxo-editing\n            mode=\"batch\"\n            [allowAdding]=\"isEditMode\"\n            [allowUpdating]=\"isEditMode\"\n            [allowDeleting]=\"isEditMode\"\n            [useIcons]=\"true\">\n          </dxo-editing>\n          <dxo-row-dragging\n            [allowReordering]=\"!isEditMode\"\n            [onReorder]=\"onReorder\"\n            [showDragIcons]=\"false\">\n          </dxo-row-dragging>\n          <dxo-header-filter>\n            <style>\n              #lookuptasks .dx-header-row .dx-header-cell {\n                font-weight: bold;\n              }\n            </style>\n          </dxo-header-filter>\n\n          <dxi-column class=\"dx-header-row\" dataField=\"key\" caption=\"Key\" [minWidth]=\"200\" [maxWidth]=\"200\">\n            <div class=\"required-header\">\n              Key<span class=\"required-marker\">*</span>\n            </div>\n            <dxi-validation-rule type=\"required\" message=\"Key is required\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"pattern\" [pattern]=\"pattern\" message=\"Allowed input - Alpha numeric, hyphen, underscore and space.\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"stringLength\" [max]=\"50\" message=\"Key limit - 50 characters\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"custom\" [validationCallback]=\"checkKeyDuplicate\" message=\"Key Already Exists\"></dxi-validation-rule>\n          </dxi-column>\n          <dxi-column class=\"dx-header-row\" dataField=\"value\" caption=\"Value\" [minWidth]=\"250\" [maxWidth]=\"250\">\n            <dxi-validation-rule type=\"required\" message=\"Value is required\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"stringLength\" [max]=\"250\" message=\"Value limit - 250 characters\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"custom\" [validationCallback]=\"checkValueDuplicate\" message=\"Value Already Exists\"></dxi-validation-rule>\n          </dxi-column>\n        </dx-tree-list>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal\" id=\"Deleteuser\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">Delete {{this.selectedItem.type === 'lookup' ? 'Lookup' : 'Category'}}</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Are you sure you want to delete the {{this.selectedItem.type === 'lookup' ? 'Lookup' : 'Category'}}?\n        <div class=\"clearfix\"></div>\n        <div class=\"mt-2\">\n          <button class=\"pull-right mb-2 btn btn-primary btncommon delete\" data-dismiss=\"modal\" (click)=\"deleteItem()\">\n            Delete\n          </button>\n          <button class=\"pull-right mb-2 mr-2 btn bg-white text-primary btncancel\" data-dismiss=\"modal\">Cancel</button>\n        </div>\n        <div class=\"clearfix\"></div>\n      </div>\n    </div>\n  </div>\n</div>", styles: ["@import\"devextreme/dist/css/dx.common.css\";@import\"devextreme/dist/css/dx.light.css\";.head-div{padding-top:9px;padding-left:7px}.bgiconsearch{margin-bottom:5px;padding-bottom:0;font-size:var(--base-font-size)}.masteracess{border:solid 1px var(--table-border);border-radius:2px;padding:5px 0;overflow-y:auto;background:var(--bg-light);max-height:calc(100vh - 243px);min-height:calc(100vh - 237px)}.masterempty{max-width:none;border-radius:50%;height:40px;width:40px}.row.masterdata{margin:0;border-bottom:solid 1px var(--table-border);padding:5px 0;cursor:pointer}.overflow_txt{overflow:hidden;text-overflow:ellipsis}span.namemaster{font-size:var(--base-font-size);color:#000}.masterid,span.emailmaster{font-size:var(--base-font-size);color:#9b9b9b}span.deletemaster{position:absolute;top:0px;right:15px;z-index:9;width:20px;float:right;cursor:pointer}span.deletemaster img{width:12px}.wide-input{width:100%}.activate{position:absolute;margin-top:-46px;margin-left:44rem}.toggleleft{font-size:13px;font-weight:600;display:block;margin-top:-12px;padding-bottom:13px}.report_button{margin-left:12px}:host ::ng-deep .ui-tree.permission-tree{width:100%}:host ::ng-deep .p-datatable .p-datatable-header{background:var(--background-color);color:var(--text-dark);border-color:var(--table-border)}:host ::ng-deep .p-datatable .p-datatable-thead tr th{background:var(--background-color);color:var(--text-dark);border-color:var(--table-border)}.p-datatable-wrapper tr td{text-align:left;border:none;padding:15px 8px;vertical-align:top}.p-datatable-wrapper tr td input{width:100%}.p-datatable-wrapper tr td button i{color:#f92929}::ng-deep #tree-list-demo{min-height:700px}::ng-deep #tasks{max-height:700px}.highlighted-row{background-color:#cbe4a9}.tab-container{display:flex;margin-bottom:10px}.tab-button{cursor:pointer;padding:10px;background-color:#f2f2f2;margin-right:5px;border-bottom:1px solid var(--table-border);background-color:var(--bg-light)}.tab-button.active{background-color:#ddd}.dx-datagrid-search-panel{margin-left:0;padding-left:0}.required-header{position:relative}.required-marker{color:red;margin-left:4px}:host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus{box-shadow:none}:host ::ng-deep .icon-dropdown li.p-dropdown-item{padding:.5rem 15px!important}:host ::ng-deep .icon-dropdown li.p-dropdown-item.p-highlight .userempty,:host ::ng-deep .icon-dropdown li.p-dropdown-item:hover .userempty,:host ::ng-deep .icon-dropdown li.p-dropdown-item:focus .userempty{color:#fff}:host ::ng-deep .icon-dropdown .userempty{height:inherit;padding:0;justify-content:start;font-size:19px;width:25px}:host ::ng-deep .p-card .p-card-content{padding:0}\n", "\n          #lookuptasks .dx-datagrid-rowsview .dx-row {\n            border-bottom: 1px solid #ddd;\n          }\n          #lookuptasks .dx-header-row .dx-header-cell {\n            font-weight: bold;\n          }\n          #searchpanel .dx-datagrid-search-panel {\n            margin-left: 0px;\n            padding-left: 0px;\n          }\n        ", "\n              #lookuptasks .dx-header-row .dx-header-cell {\n                font-weight: bold;\n              }\n            "], components: [{ type: AlertComponent, selector: "app-alert" }, { type: i8.Tree, selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "togglerAriaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filteredNodes", "filterLocale", "scrollHeight", "virtualScroll", "virtualNodeHeight", "minBufferPx", "maxBufferPx", "indentation", "trackBy"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onFilter"] }, { type: i9.ContextMenu, selector: "p-contextMenu", inputs: ["model", "global", "target", "style", "styleClass", "appendTo", "autoZIndex", "baseZIndex", "triggerEvent"], outputs: ["onShow", "onHide"] }, { type: i10.ConfirmPopup, selector: "p-confirmPopup", inputs: ["key", "defaultFocus", "showTransitionOptions", "hideTransitionOptions", "autoZIndex", "baseZIndex", "style", "styleClass", "visible"] }, { type: i11.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { type: i12.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }, { type: i13.TabView, selector: "p-tabView", inputs: ["orientation", "style", "styleClass", "controlClose", "scrollable", "activeIndex"], outputs: ["onChange", "onClose", "activeIndexChange"] }, { type: i13.TabPanel, selector: "p-tabPanel", inputs: ["closable", "headerStyle", "headerStyleClass", "cache", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "selected", "disabled", "header", "leftIcon", "rightIcon"] }, { type: i14.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear"] }, { type: i15.DxTreeListComponent, selector: "dx-tree-list", inputs: ["accessKey", "activeStateEnabled", "allowColumnReordering", "allowColumnResizing", "autoExpandAll", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columns", "columnWidth", "customizeColumns", "dataSource", "dataStructure", "dateSerializationFormat", "disabled", "editing", "elementAttr", "errorRowEnabled", "expandedRowKeys", "expandNodesOnFiltering", "filterBuilder", "filterBuilderPopup", "filterMode", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "focusedColumnIndex", "focusedRowEnabled", "focusedRowIndex", "focusedRowKey", "focusStateEnabled", "hasItemsExpr", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "itemsExpr", "keyboardNavigation", "keyExpr", "loadPanel", "noDataText", "pager", "paging", "parentIdExpr", "remoteOperations", "renderAsync", "repaintChangesOnly", "rootValue", "rowAlternationEnabled", "rowDragging", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selection", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sorting", "stateStoring", "tabIndex", "toolbar", "twoWayBindingEnabled", "visible", "width", "wordWrapEnabled"], outputs: ["onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDisposing", "onEditCanceled", "onEditCanceling", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInitialized", "onInitNewRow", "onKeyDown", "onNodesInitialized", "onOptionChanged", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onSelectionChanged", "onToolbarPreparing", "accessKeyChange", "activeStateEnabledChange", "allowColumnReorderingChange", "allowColumnResizingChange", "autoExpandAllChange", "autoNavigateToFocusedRowChange", "cacheEnabledChange", "cellHintEnabledChange", "columnAutoWidthChange", "columnChooserChange", "columnFixingChange", "columnHidingEnabledChange", "columnMinWidthChange", "columnResizingModeChange", "columnsChange", "columnWidthChange", "customizeColumnsChange", "dataSourceChange", "dataStructureChange", "dateSerializationFormatChange", "disabledChange", "editingChange", "elementAttrChange", "errorRowEnabledChange", "expandedRowKeysChange", "expandNodesOnFilteringChange", "filterBuilderChange", "filterBuilderPopupChange", "filterModeChange", "filterPanelChange", "filterRowChange", "filterSyncEnabledChange", "filterValueChange", "focusedColumnIndexChange", "focusedRowEnabledChange", "focusedRowIndexChange", "focusedRowKeyChange", "focusStateEnabledChange", "hasItemsExprChange", "headerFilterChange", "heightChange", "highlightChangesChange", "hintChange", "hoverStateEnabledChange", "itemsExprChange", "keyboardNavigationChange", "keyExprChange", "loadPanelChange", "noDataTextChange", "pagerChange", "pagingChange", "parentIdExprChange", "remoteOperationsChange", "renderAsyncChange", "repaintChangesOnlyChange", "rootValueChange", "rowAlternationEnabledChange", "rowDraggingChange", "rtlEnabledChange", "scrollingChange", "searchPanelChange", "selectedRowKeysChange", "selectionChange", "showBordersChange", "showColumnHeadersChange", "showColumnLinesChange", "showRowLinesChange", "sortingChange", "stateStoringChange", "tabIndexChange", "toolbarChange", "twoWayBindingEnabledChange", "visibleChange", "widthChange", "wordWrapEnabledChange"] }, { type: i16.DxoSortingComponent, selector: "dxo-sorting", inputs: ["ascendingText", "clearText", "descendingText", "mode", "showSortIndexes"] }, { type: i16.DxoSearchPanelComponent, selector: "dxo-search-panel", inputs: ["highlightCaseSensitive", "highlightSearchText", "placeholder", "searchVisibleColumnsOnly", "text", "visible", "width"], outputs: ["textChange"] }, { type: i16.DxoEditingComponent, selector: "dxo-editing", inputs: ["allowAdding", "allowDeleting", "allowUpdating", "changes", "confirmDelete", "editColumnName", "editRowKey", "form", "mode", "newRowPosition", "popup", "refreshMode", "selectTextOnEditStart", "startEditAction", "texts", "useIcons", "allowAddShape", "allowChangeConnection", "allowChangeConnectorPoints", "allowChangeConnectorText", "allowChangeShapeText", "allowDeleteConnector", "allowDeleteShape", "allowMoveShape", "allowResizeShape", "allowDependencyAdding", "allowDependencyDeleting", "allowResourceAdding", "allowResourceDeleting", "allowResourceUpdating", "allowTaskAdding", "allowTaskDeleting", "allowTaskResourceUpdating", "allowTaskUpdating", "enabled", "allowDragging", "allowResizing", "allowTimeZoneEditing"], outputs: ["changesChange", "editColumnNameChange", "editRowKeyChange"] }, { type: i16.DxoRowDraggingComponent, selector: "dxo-row-dragging", inputs: ["allowDropInsideItem", "allowReordering", "autoScroll", "boundary", "container", "cursorOffset", "data", "dragDirection", "dragTemplate", "dropFeedbackMode", "filter", "group", "handle", "onAdd", "onDragChange", "onDragEnd", "onDragMove", "onDragStart", "onRemove", "onReorder", "scrollSensitivity", "scrollSpeed", "showDragIcons"] }, { type: i16.DxoHeaderFilterComponent, selector: "dxo-header-filter", inputs: ["allowSearch", "dataSource", "groupInterval", "height", "searchMode", "width", "searchTimeout", "texts", "visible", "showRelevantValues"] }, { type: i16.DxiColumnComponent, selector: "dxi-column", inputs: ["alignment", "allowEditing", "allowExporting", "allowFiltering", "allowFixing", "allowGrouping", "allowHeaderFiltering", "allowHiding", "allowReordering", "allowResizing", "allowSearch", "allowSorting", "autoExpandGroup", "buttons", "calculateCellValue", "calculateDisplayValue", "calculateFilterExpression", "calculateGroupValue", "calculateSortValue", "caption", "cellTemplate", "columns", "cssClass", "customizeText", "dataField", "dataType", "editCellTemplate", "editorOptions", "encodeHtml", "falseText", "filterOperations", "filterType", "filterValue", "filterValues", "fixed", "fixedPosition", "format", "formItem", "groupCellTemplate", "groupIndex", "headerCellTemplate", "headerFilter", "hidingPriority", "isBand", "lookup", "minWidth", "name", "ownerBand", "renderAsync", "selectedFilterOperation", "setCellValue", "showEditorAlways", "showInColumnChooser", "showWhenGrouped", "sortIndex", "sortingMethod", "sortOrder", "trueText", "type", "validationRules", "visible", "visibleIndex", "width"], outputs: ["filterValueChange", "filterValuesChange", "groupIndexChange", "selectedFilterOperationChange", "sortIndexChange", "sortOrderChange", "visibleChange", "visibleIndexChange"] }, { type: i16.DxiValidationRuleComponent, selector: "dxi-validation-rule", inputs: ["message", "trim", "type", "ignoreEmptyValue", "max", "min", "reevaluate", "validationCallback", "comparisonTarget", "comparisonType", "pattern"] }], directives: [{ type: PermissionDirective, selector: "[fieldKey]", inputs: ["fieldKey"] }, { type: i18.InputText, selector: "[pInputText]" }, { type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2$1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent$1, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-masterdata',
                    templateUrl: './masterdata.component.html',
                    styleUrls: ['./masterdata.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RbacService }, { type: i2$1.FormBuilder }, { type: AlertService }, { type: i4.ConfirmationService }, { type: PermissionStore }, { type: DataStoreService }]; }, propDecorators: { treeList: [{
                type: ViewChild,
                args: [DxTreeListComponent, { static: false }]
            }] } });

class MasterdataComponent {
    constructor(permissionStore, _storeservice) {
        this.permissionStore = permissionStore;
        this._storeservice = _storeservice;
        this.RBACORG = new RBACINFO();
    }
    ngOnInit() {
        this.mastersEvent.subscribe((val) => {
            this.RBACORG = val.RBACORG;
            this.PERMISSION = val.PERMISSION;
            this._storeservice.setData('RBACORG', this.RBACORG);
            this.permissionStore.setStore(this.PERMISSION);
            this._storeservice.setData('INPUTVALIDATIONMETHOD', this.INPUTVALIDATIONMETHOD);
            this._storeservice.setData('HTTPSERVICE', val.HTTPSERVICE);
        });
    }
}
MasterdataComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent, deps: [{ token: PermissionStore }, { token: DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
MasterdataComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MasterdataComponent, selector: "masterdata", inputs: { RBACORG: "RBACORG", PERMISSION: "PERMISSION", mastersEvent: "mastersEvent", INPUTVALIDATIONMETHOD: "INPUTVALIDATIONMETHOD" }, ngImport: i0, template: `
      <lib-masterdata></lib-masterdata>
  `, isInline: true, components: [{ type: MasterdataComponent$1, selector: "lib-masterdata" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'masterdata',
                    template: `
      <lib-masterdata></lib-masterdata>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: PermissionStore }, { type: DataStoreService }]; }, propDecorators: { RBACORG: [{
                type: Input
            }], PERMISSION: [{
                type: Input
            }], mastersEvent: [{
                type: Input
            }], INPUTVALIDATIONMETHOD: [{
                type: Input
            }] } });

class ShowFieldDirective {
    constructor(templateRef, viewContainer, dataStore) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.dataStore = dataStore;
    }
    ngOnInit() {
        const permissions = this.dataStore.state;
        if (!permissions || !permissions[this.showField]) {
            this.viewContainer.clear();
        }
        else {
            this.viewContainer.createEmbeddedView(this.templateRef);
            const lookupIds = sessionStorage.getItem('LOOKUP_IDS');
            if (lookupIds) {
                const lookupIdArray = lookupIds.split(',');
                Object.entries(permissions)
                    .filter(item => item[0].startsWith('GALKP_'))
                    .forEach(([key, value]) => {
                    for (const _value of value) {
                        const _key = key.replace('GALKP_', '');
                        if (_key === this.showField &&
                            lookupIdArray.includes(String(_value['lookupid'])) &&
                            _value['action'] === 'H') {
                            this.viewContainer.clear();
                        }
                    }
                });
            }
        }
    }
}
ShowFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ShowFieldDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: PermissionStore }], target: i0.ɵɵFactoryTarget.Directive });
ShowFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: ShowFieldDirective, selector: "[showField]", inputs: { showField: "showField" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ShowFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[showField]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: PermissionStore }]; }, propDecorators: { showField: [{
                type: Input
            }] } });

class DirectivesModule {
}
DirectivesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DirectivesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DirectivesModule, declarations: [PermissionDirective, ShowFieldDirective], imports: [CommonModule], exports: [PermissionDirective, ShowFieldDirective] });
DirectivesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DirectivesModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PermissionDirective, ShowFieldDirective],
                    imports: [CommonModule],
                    exports: [PermissionDirective, ShowFieldDirective]
                }]
        }] });

class AlertModule {
}
AlertModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AlertModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertModule, declarations: [AlertComponent], imports: [CommonModule], exports: [AlertComponent] });
AlertModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [AlertComponent],
                    exports: [AlertComponent]
                }]
        }] });

//import { DxTextBoxModule } from "devextreme-angular";
class PicsMasterdataModule {
}
PicsMasterdataModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PicsMasterdataModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PicsMasterdataModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PicsMasterdataModule, bootstrap: [MasterdataComponent$1], declarations: [MasterdataComponent$1], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        TabMenuModule,
        TabViewModule,
        TreeSelectModule,
        HttpClientModule,
        CheckboxModule,
        DropdownModule,
        CardModule,
        ConfirmDialogModule,
        AccordionModule,
        MessageModule,
        TableModule,
        InputTextModule,
        CalendarModule,
        EditorModule,
        FieldsetModule,
        ButtonModule,
        RadioButtonModule,
        InputTextareaModule,
        InputMaskModule,
        StepsModule,
        ToastModule,
        RippleModule,
        AvatarModule,
        BadgeModule,
        MultiSelectModule,
        InputSwitchModule,
        ProgressSpinnerModule,
        SpeedDialModule,
        OrderListModule,
        FileUploadModule,
        DialogModule,
        PasswordModule,
        KnobModule,
        SidebarModule,
        ContextMenuModule,
        ConfirmPopupModule,
        DirectivesModule,
        AlertModule,
        DragDropModule,
        DxTreeListModule,
        //DxTextBoxModule,
        DxSortableModule,
        DxTemplateModule,
        MatTooltipModule,
        DxTabPanelModule], exports: [MasterdataComponent$1] });
PicsMasterdataModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PicsMasterdataModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgbModule,
            TabMenuModule,
            TabViewModule,
            TreeSelectModule,
            HttpClientModule,
            CheckboxModule,
            DropdownModule,
            CardModule,
            ConfirmDialogModule,
            AccordionModule,
            MessageModule,
            TableModule,
            InputTextModule,
            CalendarModule,
            EditorModule,
            FieldsetModule,
            ButtonModule,
            RadioButtonModule,
            InputTextareaModule,
            InputMaskModule,
            StepsModule,
            ToastModule,
            RippleModule,
            AvatarModule,
            BadgeModule,
            MultiSelectModule,
            InputSwitchModule,
            ProgressSpinnerModule,
            SpeedDialModule,
            OrderListModule,
            FileUploadModule,
            DialogModule,
            PasswordModule,
            KnobModule,
            SidebarModule,
            ContextMenuModule,
            ConfirmPopupModule,
            DirectivesModule,
            AlertModule,
            DragDropModule,
            DxTreeListModule,
            //DxTextBoxModule,
            DxSortableModule,
            DxTemplateModule,
            MatTooltipModule,
            DxTabPanelModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PicsMasterdataModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MasterdataComponent$1
                    ],
                    bootstrap: [MasterdataComponent$1],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgbModule,
                        TabMenuModule,
                        TabViewModule,
                        TreeSelectModule,
                        HttpClientModule,
                        CheckboxModule,
                        DropdownModule,
                        CardModule,
                        ConfirmDialogModule,
                        AccordionModule,
                        MessageModule,
                        TableModule,
                        InputTextModule,
                        CalendarModule,
                        EditorModule,
                        FieldsetModule,
                        ButtonModule,
                        RadioButtonModule,
                        InputTextareaModule,
                        InputMaskModule,
                        StepsModule,
                        ToastModule,
                        RippleModule,
                        AvatarModule,
                        BadgeModule,
                        MultiSelectModule,
                        InputSwitchModule,
                        ProgressSpinnerModule,
                        SpeedDialModule,
                        OrderListModule,
                        FileUploadModule,
                        DialogModule,
                        PasswordModule,
                        KnobModule,
                        SidebarModule,
                        ContextMenuModule,
                        ConfirmPopupModule,
                        DirectivesModule,
                        AlertModule,
                        DragDropModule,
                        DxTreeListModule,
                        //DxTextBoxModule,
                        DxSortableModule,
                        DxTemplateModule,
                        MatTooltipModule,
                        DxTabPanelModule
                    ],
                    exports: [
                        MasterdataComponent$1
                    ],
                    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
                }]
        }] });

class MasterdataModule {
}
MasterdataModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MasterdataModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataModule, declarations: [MasterdataComponent], imports: [PicsMasterdataModule], exports: [MasterdataComponent] });
MasterdataModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataModule, providers: [RbacService, AlertService, ConfirmationService, PermissionStore, DataStoreService], imports: [[
            PicsMasterdataModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MasterdataComponent
                    ],
                    imports: [
                        PicsMasterdataModule
                    ],
                    exports: [
                        MasterdataComponent
                    ],
                    providers: [RbacService, AlertService, ConfirmationService, PermissionStore, DataStoreService]
                }]
        }] });

/*
 * Public API Surface of masterdata
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MasterdataComponent, MasterdataModule, MasterdataService };
//# sourceMappingURL=pics-core-masterdata.js.map
