import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessManagementConfig, AttachmentConfig, MasterURL, PermissionsURL, PolicyGroupConfig, RoleConfig, UserConfig } from './../urls/rbac-url.config';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class RbacService {
  httpService:any
  constructor(private storeService:DataStoreService) {
    this.storeService.currentStore.subscribe(val=>{
      if(val){
        this.httpService = val.HTTPSERVICE
      }
    })
  }

  getAllUserList(key?: string): Observable<any> {
    return this.httpService.get(`${UserConfig.EndPoint.User.getAllUserList}/${key}`);
  }
  getAllUserOrgList(orgid: any) {
    return this.httpService.get(UserConfig.EndPoint.User.getAllUserOrgList + orgid);
  }
  saveUser(data: any) {
    return this.httpService.post(UserConfig.EndPoint.User.createUser, data);
  }
  updateUser(data: any, userid: string) {
    return this.httpService.put(`${UserConfig.EndPoint.User.getAllUserList}/${userid}`, data);
  }
  deleteUser(id?: string) {
    return this.httpService.delete(`${UserConfig.EndPoint.User.getAllUserList}/${id}`);
  }
  activateUser(data: any) {
    return this.httpService.post(UserConfig.EndPoint.User.activateUser, data);
  }
  addProviderUser(data: any) {
    return this.httpService.post(UserConfig.EndPoint.Provider.addProviderUser, data);
  }
  addUserRole(data: any) {
    return this.httpService.post(UserConfig.EndPoint.User.userRole, data);
  }
  uploadKey(objparams: any) {
    return this.httpService.post(AttachmentConfig.EndPoint.Attachments.UploadKey, objparams);
  }
  getOrgPolicyGroupList(orgid: any) {
    return this.httpService.get(
      PolicyGroupConfig.EndPoint.policyGroup.getOrgPolicyGroups.replace('{organizationid}', String(orgid))
    );
  }
  getAllPolicyGroupList(policyGroupId?: number) {
    const endPoint = policyGroupId
      ? `${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${policyGroupId}`
      : PolicyGroupConfig.EndPoint.policyGroup.getAllPolicyGroupList;
    return this.httpService.get(endPoint);
  }
  getPolicyGroupById(id: any) {
    return this.httpService.get(PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList + '/' + id);
  }

  getPolicyGroupsByManagementGroup(policyGroupId: number) {
    return this.httpService.get(`/org/policyGroup/managementgroup/${policyGroupId}`);
  }

  createPolicyGroup(data: any) {
    return this.httpService.post(PolicyGroupConfig.EndPoint.policyGroup.createPolicyGroup, data);
  }

  updatePolicyGroup(id: number, item: any) {
    return this.httpService.put(`${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${id}`, item);
  }

  deletePolicyGroup(id: string) {
    return this.httpService.delete(`${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${id}`);
  }
  getAllUserRole(id?: any) {
    return this.httpService.get(RoleConfig.EndPoint.role.getAllOrgRole.replace('{orgid}', String(id)));
  }

  deleteRole(id: string) {
    return this.httpService.delete(`${RoleConfig.EndPoint.role.getAllUserRole}/${id}`);
  }

  getRoleById(roleid: string) {
    return this.httpService.get(`${RoleConfig.EndPoint.role.getAllUserRole}/${roleid}`);
  }

  createRole(data: any) {
    return this.httpService.post(RoleConfig.EndPoint.role.createRole, data);
  }

  updateRole(roleId: any, data: any) {
    return this.httpService.put(`${RoleConfig.EndPoint.role.getAllUserRole}/${roleId}`, data);
  }

  getLandingPage(id: any) {
    return this.httpService.get(`${RoleConfig.EndPoint.role.getLandingPage}/${id}`);
  }

  createPolicyGroupForRole(roleId: number, data: any) {
    return this.httpService.post(`${RoleConfig.EndPoint.role.addPolicyGroup}/${roleId}/policygroups`, data);
  }

  updatePolicyGroupForRole(roleId: number, data: any) {
    return this.httpService.put(`${RoleConfig.EndPoint.role.addPolicyGroup}/${roleId}/policygroups`, data);
  }
  getReportDashbaord() {
    return this.httpService.get(`${RoleConfig.EndPoint.role.dossier}`);
  }
  getPermissionRoleById(id: string) {
    return this.httpService.get(PermissionsURL.EndPoints.permission.permissionRoleById.replace('{id}', id));
  }
  getManagementGroupTree(_organizationid: any) {
    return this.httpService.get('/org/management-group/organization/tree');
  }
  getPermissionsTree(applicationid: any) {
    return this.httpService.get(
      PermissionsURL.EndPoints.permission.applicationPermissionsTree.replace('{applicationid}', applicationid)
    );
  }

  getPagePermission(data: any) {
    return this.httpService.post(PermissionsURL.EndPoints.permission.pagePermission, data);
  }

  createPage(page: any) {
    return this.httpService.post(PermissionsURL.EndPoints.page.createPage, page);
  }

  updatePage(page: any) {
    return this.httpService.put(PermissionsURL.EndPoints.page.updateDeletePage.replace('{pageid}', page.id), page);
  }

  deletePage(pageId: any) {
    return this.httpService.delete(PermissionsURL.EndPoints.page.updateDeletePage.replace('{pageid}', pageId));
  }

  getPermission(id: any) {
    return this.httpService.get(PermissionsURL.EndPoints.permission.getPermission.replace('{id}', id));
  }

  createPermission(permission: any) {
    return this.httpService.post(PermissionsURL.EndPoints.permission.createPermission, permission);
  }

  updatePermission(permission: any) {
    return this.httpService.put(
      PermissionsURL.EndPoints.permission.updateDeletePermission.replace('{permissionid}', permission.id),
      permission
    );
  }

  deletePermission(permissionId: any) {
    return this.httpService.delete(
      PermissionsURL.EndPoints.permission.updateDeletePermission.replace('{permissionid}', permissionId)
    );
  }

  getAllPageTree(applicationid: any): Observable<TreeNode[]> {
    return this.httpService
      .get(PermissionsURL.EndPoints.page.AllPageTree.replace('{applicationid}', applicationid))
      .pipe(
        map((item: any) => {
          return item.data as TreeNode[];
        })
      );
  }

  getPermissionTree(pageid: any, parentid: any) {
    return this.httpService.get(
      PermissionsURL.EndPoints.permission.getPermissionTree.replace('{pageid}', pageid).replace('{parentid}', parentid)
    );
  }

  getPermissionTypes(applicationid: any) {
    return this.httpService.get(
      PermissionsURL.EndPoints.permission.getPermissionTypes.replace('{applicationid}', applicationid)
    );
  }
  getOrganizationPage(orgId: any) {
    return this.httpService.get(AccessManagementConfig.EndPoint.Organization.getOrganization.replace('{orgId}', orgId));
  }
  createCategory(category: any) {
    return this.httpService.post(MasterURL.EndPoints.lookup.createCategory, category);
  }

  updateCategory(category: any) {
    return this.httpService.put(MasterURL.EndPoints.lookup.updateDeleteCategory.replace('{id}', category.id), category);
  }

  deleteCategory(categoryId: any) {
    return this.httpService.delete(MasterURL.EndPoints.lookup.updateDeleteCategory.replace('{id}', categoryId));
  }

  getLookup(id: any) {
    return this.httpService.get(MasterURL.EndPoints.lookup.lookup.replace('{id}', id));
  }

  createLookup(lookup: any) {
    return this.httpService.post(MasterURL.EndPoints.lookup.createLookup, lookup);
  }

  updateLookup(lookup: any) {
    return this.httpService.put(MasterURL.EndPoints.lookup.lookup.replace('{id}', lookup.id), lookup);
  }

  deleteLookup(lookupId: any) {
    return this.httpService.delete(MasterURL.EndPoints.lookup.lookup.replace('{id}', lookupId));
  }

  getAllCategoryTree(applicationid: any): Observable<TreeNode[]> {
    return this.httpService
      .get(MasterURL.EndPoints.lookup.getAllCategoryTree.replace('{applicationid}', applicationid))
      .pipe(
        map((item: any) => {
          return item.data as TreeNode[];
        })
      );
  }

  getLookupTree(categoryid: any) {
    return this.httpService.get(MasterURL.EndPoints.lookup.getLookupTree.replace('{categoryid}', categoryid));
  }

  getLookupBycategoryID(categoryid: any) {
    return this.httpService.get(MasterURL.EndPoints.lookup.getLookupByCategoryId.replace('{id}', categoryid));
  }

  getAllLookupBycategoryID(categoryid: any) {
    return this.httpService.get(MasterURL.EndPoints.lookup.getAllLookupByCategoryId.replace('{categoryId}', categoryid));
  }

  addOrUpdateLookup(lookup: any) {
    return this.httpService.post(MasterURL.EndPoints.lookup.addOrUpdateLookup, lookup);
  }

  updateLookupOrder(lookup: any, sortOrder: any) {
    return this.httpService.put((MasterURL.EndPoints.lookup.updateLookupOrders.replace('{sortOrder}', sortOrder)), lookup);
  }
}
