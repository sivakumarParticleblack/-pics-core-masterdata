export class RoleConfig {
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
export class UserConfig {
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
export class AttachmentConfig {
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
export class PolicyGroupConfig {
}
PolicyGroupConfig.EndPoint = {
    policyGroup: {
        getPolicyGroupList: '/platform/page-designer/policyGroup',
        getAllPolicyGroupList: '/platform/page-designer/policyGroup/all',
        createPolicyGroup: '/platform/page-designer/policyGroup',
        getOrgPolicyGroups: '/platform/page-designer/policyGroup/organization/{organizationid}'
    }
};
export class PermissionsURL {
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
export class AccessManagementConfig {
}
AccessManagementConfig.EndPoint = {
    Organization: {
        getOrganizationList: '/org/organization/all',
        getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
    }
};
export class MasterURL {
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
export class RBACINFO {
    constructor() {
        this.apiHost = '';
        this.tokenKey = '';
    }
}
export class Environment {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy11cmwuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL21hc3RlcmRhdGEvc3JjL2xpYi9waWNzLW1hc3RlcmRhdGEvQGNvcmUvdXJscy9yYmFjLXVybC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFVBQVU7O0FBQ1AsbUJBQVEsR0FBRztJQUN2QixJQUFJLEVBQUU7UUFDSixjQUFjLEVBQUUsc0JBQXNCO1FBQ3RDLFVBQVUsRUFBRSw2QkFBNkI7UUFDekMsY0FBYyxFQUFFLDRCQUE0QjtRQUM1QyxjQUFjLEVBQUUsc0JBQXNCO1FBQ3RDLGFBQWEsRUFBRSwyQ0FBMkM7UUFDMUQsT0FBTyxFQUFFLFVBQVU7S0FDcEI7Q0FDRixDQUFDO0FBR0osTUFBTSxPQUFPLFVBQVU7O0FBQ1AsbUJBQVEsR0FBRztJQUN2QixJQUFJLEVBQUU7UUFDSixjQUFjLEVBQUUsV0FBVztRQUMzQix3QkFBd0IsRUFBRSxxQ0FBcUM7UUFDL0QsWUFBWSxFQUFFLG9CQUFvQjtRQUNsQyxVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsZUFBZSxFQUFFLDJCQUEyQjtRQUM1QyxpQkFBaUIsRUFBRSx5QkFBeUI7S0FDN0M7SUFDRCxRQUFRLEVBQUU7UUFDUixlQUFlLEVBQUUsZUFBZTtRQUNoQyxrQkFBa0IsRUFBRSxzQkFBc0I7UUFDMUMsZUFBZSxFQUFFLDhCQUE4QjtLQUNoRDtDQUNGLENBQUM7QUFFSixNQUFNLE9BQU8sZ0JBQWdCOztBQUNiLHlCQUFRLEdBQUc7SUFDdkIsV0FBVyxFQUFFO1FBQ1gscUJBQXFCLEVBQUUsMEJBQTBCO1FBQ2pELGlCQUFpQixFQUFFLDhCQUE4QjtRQUNqRCxTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsY0FBYyxFQUFFLHdCQUF3QjtRQUN4QyxhQUFhLEVBQUUsaUJBQWlCO0tBQ2pDO0NBQ0YsQ0FBQztBQUVKLE1BQU0sT0FBTyxpQkFBaUI7O0FBQ2QsMEJBQVEsR0FBRztJQUN2QixXQUFXLEVBQUU7UUFDWCxrQkFBa0IsRUFBRSxxQ0FBcUM7UUFDekQscUJBQXFCLEVBQUUseUNBQXlDO1FBQ2hFLGlCQUFpQixFQUFFLHFDQUFxQztRQUN4RCxrQkFBa0IsRUFBRSxtRUFBbUU7S0FDeEY7Q0FDRixDQUFDO0FBRUosTUFBTSxPQUFPLGNBQWM7O0FBQ1gsd0JBQVMsR0FBRztJQUN4QixVQUFVLEVBQUU7UUFDVixrQkFBa0IsRUFBRSxzQ0FBc0M7UUFDMUQsY0FBYyxFQUFFLGlDQUFpQztRQUNqRCxhQUFhLEVBQUUsaUNBQWlDO1FBQ2hELGdCQUFnQixFQUFFLG1DQUFtQztRQUNyRCxzQkFBc0IsRUFBRSwyQ0FBMkM7UUFDbkUsaUJBQWlCLEVBQUUscURBQXFEO1FBQ3hFLGtCQUFrQixFQUFFLGlEQUFpRDtRQUNyRSwwQkFBMEIsRUFBRSx3REFBd0Q7S0FDckY7SUFDRCxJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsdUJBQXVCO1FBQ25DLGdCQUFnQixFQUFFLHlCQUF5QjtRQUMzQyxXQUFXLEVBQUUscUNBQXFDO0tBQ25EO0NBQ0YsQ0FBQztBQUVKLE1BQU0sT0FBTyxzQkFBc0I7O0FBQ25CLCtCQUFRLEdBQUc7SUFDdkIsWUFBWSxFQUFFO1FBQ1osbUJBQW1CLEVBQUUsdUJBQXVCO1FBQzVDLGVBQWUsRUFBRSx5R0FBeUc7S0FDM0g7Q0FDRixDQUFDO0FBRUosTUFBTSxPQUFPLFNBQVM7O0FBQ04sbUJBQVMsR0FBRztJQUN4QixNQUFNLEVBQUU7UUFDTixjQUFjLEVBQUUsa0NBQWtDO1FBQ2xELG9CQUFvQixFQUFFLHVDQUF1QztRQUM3RCxNQUFNLEVBQUUsOEJBQThCO1FBQ3RDLFlBQVksRUFBRSx5QkFBeUI7UUFDdkMscUJBQXFCLEVBQUUsc0NBQXNDO1FBQzdELGtCQUFrQixFQUFFLHVEQUF1RDtRQUMzRSxhQUFhLEVBQUUsMkNBQTJDO1FBQzFELHFCQUFxQixFQUFFLG1DQUFtQztRQUMxRCx3QkFBd0IsRUFBRSxtREFBbUQ7UUFDN0Usa0JBQWtCLEVBQUUsd0RBQXdEO1FBQzVFLGlCQUFpQixFQUFFLDJDQUEyQztRQUM5RCxrQkFBa0IsRUFBRSx5REFBeUQ7S0FDOUU7Q0FDRixDQUFDO0FBRUosTUFBTSxPQUFPLFFBQVE7SUFBckI7UUFDRSxZQUFPLEdBQUUsRUFBRSxDQUFDO1FBQ1osYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUloQixDQUFDO0NBQUE7QUFDRCxNQUFNLE9BQU8sV0FBVztDQU92QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBSb2xlQ29uZmlnIHtcbiAgcHVibGljIHN0YXRpYyBFbmRQb2ludCA9IHtcbiAgICByb2xlOiB7XG4gICAgICBnZXRBbGxVc2VyUm9sZTogJy9hY2Nlc3MtY29udHJvbC9yb2xlJyxcbiAgICAgIGNyZWF0ZVJvbGU6ICcvYWNjZXNzLWNvbnRyb2wvcm9sZS9jcmVhdGUnLFxuICAgICAgZ2V0TGFuZGluZ1BhZ2U6ICcvcGxhdGZvcm0vbWVudS9hcHBsaWNhdGlvbicsXG4gICAgICBhZGRQb2xpY3lHcm91cDogJy9hY2Nlc3MtY29udHJvbC9yb2xlJyxcbiAgICAgIGdldEFsbE9yZ1JvbGU6ICcvYWNjZXNzLWNvbnRyb2wvcm9sZS9vcmdhbml6YXRpb24ve29yZ2lkfScsXG4gICAgICBkb3NzaWVyOiAnL2Rvc3NpZXInXG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVXNlckNvbmZpZyB7XG4gIHB1YmxpYyBzdGF0aWMgRW5kUG9pbnQgPSB7XG4gICAgVXNlcjoge1xuICAgICAgZ2V0QWxsVXNlckxpc3Q6ICcvb3JnL3VzZXInLFxuICAgICAgZ2V0QWxsVXNlckFjdGl2ZUluYWN0aXZlOiAnL29yZy91c2VyP2luY2x1ZGVJbmFjdGl2ZVVzZXJzPXRydWUnLFxuICAgICAgYWN0aXZhdGVVc2VyOiAnL29yZy91c2VyL2FjdGl2YXRlJyxcbiAgICAgIGNyZWF0ZVVzZXI6ICcvb3JnL3VzZXIvY3JlYXRlJyxcbiAgICAgIHVzZXJSb2xlOiAnL29yZy91c2VyL3JvbGUnLFxuICAgICAgbWFuYWdlbWVudGdyb3VwOiAnL29yZy90ZWFtL21hbmFnZW1lbnRncm91cCcsXG4gICAgICBnZXRBbGxVc2VyT3JnTGlzdDogJy9vcmcvdXNlci9vcmdhbml6YXRpb24vJ1xuICAgIH0sXG4gICAgUHJvdmlkZXI6IHtcbiAgICAgIGdldFByb3ZpZGVyTGlzdDogJy9yZWYvcHJvdmlkZXInLFxuICAgICAgc2VhcmNoUHJvdmlkZXJMaXN0OiAnL3JlZi9wcm92aWRlci9zZWFyY2gnLFxuICAgICAgYWRkUHJvdmlkZXJVc2VyOiAnL3JlZi9wcm92aWRlci9jcmVhdGUvYWNjb3VudCdcbiAgICB9XG4gIH07XG59XG5leHBvcnQgY2xhc3MgQXR0YWNobWVudENvbmZpZyB7XG4gIHB1YmxpYyBzdGF0aWMgRW5kUG9pbnQgPSB7XG4gICAgQXR0YWNobWVudHM6IHtcbiAgICAgIEdldEF0dGFjaG1lbnRSZWZlcnJhbDogJy9yZWYvYXR0YWNobWVudC9yZWZlcnJhbCcsXG4gICAgICBHZXRDYXRlZ29yeUxvb2t1cDogJy9sb29rdXAvbG9va3VwYnljYXRlZ29yeW5hbWUnLFxuICAgICAgVXBsb2FkS2V5OiAnL2NvbW1vbi9maWxlcy91cGxvYWQta2V5JyxcbiAgICAgIERvd25sb2FkS2V5OiAnL2NvbW1vbi9maWxlcy9kb3dubG9hZC1rZXknLFxuICAgICAgUG9zdEF0dGFjaG1lbnQ6ICcvcmVmL2F0dGFjaG1lbnQvY3JlYXRlJyxcbiAgICAgIFB1dEF0dGFjaG1lbnQ6ICcvcmVmL2F0dGFjaG1lbnQnXG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGNsYXNzIFBvbGljeUdyb3VwQ29uZmlnIHtcbiAgcHVibGljIHN0YXRpYyBFbmRQb2ludCA9IHtcbiAgICBwb2xpY3lHcm91cDoge1xuICAgICAgZ2V0UG9saWN5R3JvdXBMaXN0OiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvcG9saWN5R3JvdXAnLFxuICAgICAgZ2V0QWxsUG9saWN5R3JvdXBMaXN0OiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvcG9saWN5R3JvdXAvYWxsJyxcbiAgICAgIGNyZWF0ZVBvbGljeUdyb3VwOiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvcG9saWN5R3JvdXAnLFxuICAgICAgZ2V0T3JnUG9saWN5R3JvdXBzOiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvcG9saWN5R3JvdXAvb3JnYW5pemF0aW9uL3tvcmdhbml6YXRpb25pZH0nXG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25zVVJMIHtcbiAgcHVibGljIHN0YXRpYyBFbmRQb2ludHMgPSB7XG4gICAgcGVybWlzc2lvbjoge1xuICAgICAgcGVybWlzc2lvblJvbGVCeUlkOiAnL2FjY2Vzcy1jb250cm9sL3Blcm1pc3Npb24vcm9sZS97aWR9JyxcbiAgICAgIHBhZ2VQZXJtaXNzaW9uOiAnL2FjY2Vzcy1jb250cm9sL3Blcm1pc3Npb24vcGFnZScsXG4gICAgICBnZXRQZXJtaXNzaW9uOiAnL2FjY2Vzcy1jb250cm9sL3Blcm1pc3Npb24ve2lkfScsXG4gICAgICBjcmVhdGVQZXJtaXNzaW9uOiAnL2FjY2Vzcy1jb250cm9sL3Blcm1pc3Npb24vY3JlYXRlJyxcbiAgICAgIHVwZGF0ZURlbGV0ZVBlcm1pc3Npb246ICcvYWNjZXNzLWNvbnRyb2wvcGVybWlzc2lvbi97cGVybWlzc2lvbmlkfScsXG4gICAgICBnZXRQZXJtaXNzaW9uVHJlZTogJy9hY2Nlc3MtY29udHJvbC9wZXJtaXNzaW9uL3BhZ2Uve3BhZ2VpZH0ve3BhcmVudGlkfScsXG4gICAgICBnZXRQZXJtaXNzaW9uVHlwZXM6ICcvYWNjZXNzLWNvbnRyb2wvcGVybWlzc2lvbi90eXBlL3thcHBsaWNhdGlvbmlkfScsXG4gICAgICBhcHBsaWNhdGlvblBlcm1pc3Npb25zVHJlZTogJy9hY2Nlc3MtY29udHJvbC9wZXJtaXNzaW9uL2FwcGxpY2F0aW9uL3thcHBsaWNhdGlvbmlkfSdcbiAgICB9LFxuICAgIHBhZ2U6IHtcbiAgICAgIGNyZWF0ZVBhZ2U6ICcvcGxhdGZvcm0vbWVudS9jcmVhdGUnLFxuICAgICAgdXBkYXRlRGVsZXRlUGFnZTogJy9wbGF0Zm9ybS9tZW51L3twYWdlaWR9JyxcbiAgICAgIEFsbFBhZ2VUcmVlOiAnL3BsYXRmb3JtL21lbnUvdHJlZS97YXBwbGljYXRpb25pZH0nXG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGNsYXNzIEFjY2Vzc01hbmFnZW1lbnRDb25maWcge1xuICBwdWJsaWMgc3RhdGljIEVuZFBvaW50ID0ge1xuICAgIE9yZ2FuaXphdGlvbjoge1xuICAgICAgZ2V0T3JnYW5pemF0aW9uTGlzdDogJy9vcmcvb3JnYW5pemF0aW9uL2FsbCcsXG4gICAgICBnZXRPcmdhbml6YXRpb246ICcvcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9wYWdlL29yZ2FuaXphdGlvbi97b3JnSWR9P3JldHVyblVzZXJQYWdlPWZhbHNlJmV4Y2x1ZGVOb0FjdGl2ZVZlcnNpb25QYWdlcz10cnVlJ1xuICAgIH1cbiAgfTtcbn1cbmV4cG9ydCBjbGFzcyBNYXN0ZXJVUkwge1xuICBwdWJsaWMgc3RhdGljIEVuZFBvaW50cyA9IHtcbiAgICBsb29rdXA6IHtcbiAgICAgIGNyZWF0ZUNhdGVnb3J5OiAnL3BsYXRmb3JtL21hc3Rlci9sb29rdXAvY2F0ZWdvcnknLFxuICAgICAgdXBkYXRlRGVsZXRlQ2F0ZWdvcnk6ICcvcGxhdGZvcm0vbWFzdGVyL2xvb2t1cC9jYXRlZ29yeS97aWR9JyxcbiAgICAgIGxvb2t1cDogJy9wbGF0Zm9ybS9tYXN0ZXIvbG9va3VwL3tpZH0nLFxuICAgICAgY3JlYXRlTG9va3VwOiAnL3BsYXRmb3JtL21hc3Rlci9sb29rdXAnLFxuICAgICAgZ2V0UGVybWlzc2lvblJvbGVCeUlkOiAnL2FjY2Vzcy1jb250cm9sL3Blcm1pc3Npb24vcm9sZS97aWR9JyxcbiAgICAgIGdldEFsbENhdGVnb3J5VHJlZTogJy9wbGF0Zm9ybS9tYXN0ZXIvbG9va3VwL2NhdGVnb3J5L3RyZWUve2FwcGxpY2F0aW9uaWR9JyxcbiAgICAgIGdldExvb2t1cFRyZWU6ICcvcGxhdGZvcm0vbWFzdGVyL2xvb2t1cC90cmVlL3tjYXRlZ29yeWlkfScsXG4gICAgICBnZXRMb29rdXBCeUNhdGVnb3J5SWQ6ICcvcGxhdGZvcm0vbWFzdGVyL2xvb2t1cC9saXN0L3tpZH0nLCAgICAgIFxuICAgICAgZ2V0QWxsTG9va3VwQnlDYXRlZ29yeUlkOiAnL3BsYXRmb3JtL21hc3Rlci9sb29rdXAvZ2V0QWxsTG9va3VwL3tjYXRlZ29yeUlkfScsXG4gICAgICBnZXRQZXJtaXNzaW9uc1RyZWU6ICcvYWNjZXNzLWNvbnRyb2wvcGVybWlzc2lvbi9hcHBsaWNhdGlvbi97YXBwbGljYXRpb25pZH0nLFxuICAgICAgYWRkT3JVcGRhdGVMb29rdXA6ICcvcGxhdGZvcm0vbWFzdGVyL2xvb2t1cC9hZGRPclVwZGF0ZUxvb2t1cCcsXG4gICAgICB1cGRhdGVMb29rdXBPcmRlcnM6ICcvcGxhdGZvcm0vbWFzdGVyL2xvb2t1cC91cGRhdGUvbG9va3VwT3JkZXJzL3tzb3J0T3JkZXJ9JyxcbiAgICB9XG4gIH07XG59XG5leHBvcnQgY2xhc3MgUkJBQ0lORk8ge1xuICBhcGlIb3N0ID0nJztcbiAgdG9rZW5LZXkgPSAnJztcbiAgb3RoZXJzPzogYW55O1xuICBvcmdJRD86IGFueTtcbiAgZW52aXJvbm1lbnQ/OiBFbnZpcm9ubWVudDtcbn1cbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudCB7XG4gIG1zdHJVc2VybmFtZT86IHN0cmluZztcbiAgbXN0clBhc3N3b3JkPzogc3RyaW5nO1xuICBtc3RyVVJMPzogc3RyaW5nO1xuICBtc3RyUHJvamVjdElEPzogc3RyaW5nO1xuICBhcHBsaWNhdGlvbmlkPzogc3RyaW5nO1xuICBwcmlvcml0eT86IHN0cmluZ1xufVxuXG4iXX0=