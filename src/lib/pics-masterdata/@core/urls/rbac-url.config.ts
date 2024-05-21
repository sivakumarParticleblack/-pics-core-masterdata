export class RoleConfig {
  public static EndPoint = {
    role: {
      getAllUserRole: '/access-control/role',
      createRole: '/access-control/role/create',
      getLandingPage: '/platform/menu/application',
      addPolicyGroup: '/access-control/role',
      getAllOrgRole: '/access-control/role/organization/{orgid}',
      dossier: '/dossier'
    }
  };
}

export class UserConfig {
  public static EndPoint = {
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
}
export class AttachmentConfig {
  public static EndPoint = {
    Attachments: {
      GetAttachmentReferral: '/ref/attachment/referral',
      GetCategoryLookup: '/lookup/lookupbycategoryname',
      UploadKey: '/common/files/upload-key',
      DownloadKey: '/common/files/download-key',
      PostAttachment: '/ref/attachment/create',
      PutAttachment: '/ref/attachment'
    }
  };
}
export class PolicyGroupConfig {
  public static EndPoint = {
    policyGroup: {
      getPolicyGroupList: '/platform/page-designer/policyGroup',
      getAllPolicyGroupList: '/platform/page-designer/policyGroup/all',
      createPolicyGroup: '/platform/page-designer/policyGroup',
      getOrgPolicyGroups: '/platform/page-designer/policyGroup/organization/{organizationid}'
    }
  };
}
export class PermissionsURL {
  public static EndPoints = {
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
}
export class AccessManagementConfig {
  public static EndPoint = {
    Organization: {
      getOrganizationList: '/org/organization/all',
      getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
    }
  };
}
export class MasterURL {
  public static EndPoints = {
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
}
export class RBACINFO {
  apiHost ='';
  tokenKey = '';
  others?: any;
  orgID?: any;
  environment?: Environment;
}
export class Environment {
  mstrUsername?: string;
  mstrPassword?: string;
  mstrURL?: string;
  mstrProjectID?: string;
  applicationid?: string;
  priority?: string
}

