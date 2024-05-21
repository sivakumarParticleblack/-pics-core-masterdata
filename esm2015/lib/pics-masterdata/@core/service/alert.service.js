import { Injectable } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class AlertService {
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
export var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType || (AlertType = {}));
export class Alert {
}
export class UserGroupDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
export class UserRolePageDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
export class UserRoleDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
export class UserDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
export class AccessManagementConfig {
}
AccessManagementConfig.EndPoint = {
    Organization: {
        getOrganizationList: '/org/organization/all',
        getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9tYXN0ZXJkYXRhL3NyYy9saWIvcGljcy1tYXN0ZXJkYXRhL0Bjb3JlL3NlcnZpY2UvYWxlcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sdUJBQXVCLENBQUM7OztBQUc3QixNQUFNLE9BQU8sWUFBWTtJQUl2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUgxQixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVMsQ0FBQztRQUMvQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFHbkMsa0ZBQWtGO1FBQ2xGLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLElBQUksS0FBSyxZQUFZLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7b0JBQzdCLHNDQUFzQztvQkFDdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztpQkFDbkM7cUJBQU07b0JBQ0wsdUJBQXVCO29CQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2Q7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFlLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFlLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFlLEVBQUUsT0FBZSxFQUFFLG9CQUFvQixHQUFHLEtBQUs7UUFDbEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsS0FBSztRQUNILGVBQWU7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBTSxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDOzswR0EvQ1UsWUFBWTs4R0FBWixZQUFZOzRGQUFaLFlBQVk7a0JBRDFCLFVBQVU7O0FBc0RULE1BQU0sQ0FBTixJQUFZLFNBS1g7QUFMRCxXQUFZLFNBQVM7SUFDbkIsK0NBQU8sQ0FBQTtJQUNQLDJDQUFLLENBQUE7SUFDTCx5Q0FBSSxDQUFBO0lBQ0osK0NBQU8sQ0FBQTtBQUNULENBQUMsRUFMVyxTQUFTLEtBQVQsU0FBUyxRQUtwQjtBQUNELE1BQU0sT0FBTyxLQUFLO0NBR2pCO0FBZ0JELE1BQU0sT0FBTyxZQUFZO0lBSXZCLFlBQVksSUFBNEI7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLGVBQWU7SUFPMUIsWUFBWSxJQUErQjtRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sV0FBVztJQVV0QixZQUFZLElBQTJCO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxPQUFPO0lBVWxCLFlBQVksSUFBdUI7UUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBQ0QsTUFBTSxPQUFPLHNCQUFzQjs7QUFDbkIsK0JBQVEsR0FBRztJQUN2QixZQUFZLEVBQUU7UUFDWixtQkFBbUIsRUFBRSx1QkFBdUI7UUFDNUMsZUFBZSxFQUFFLHlHQUF5RztLQUMzSDtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU3RhcnQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbkBJbmplY3RhYmxlKClcbiAgZXhwb3J0IGNsYXNzIEFsZXJ0U2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8QWxlcnQ+KCk7XG4gICAgcHJpdmF0ZSBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgLy8gY2xlYXIgYWxlcnQgbWVzc2FnZXMgb24gcm91dGUgY2hhbmdlIHVubGVzcyAna2VlcEFmdGVyUm91dGVDaGFuZ2UnIGZsYWcgaXMgdHJ1ZVxuICAgICAgcm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpIHtcbiAgICAgICAgICBpZiAodGhpcy5rZWVwQWZ0ZXJSb3V0ZUNoYW5nZSkge1xuICAgICAgICAgICAgLy8gb25seSBrZWVwIGZvciBhIHNpbmdsZSByb3V0ZSBjaGFuZ2VcbiAgICAgICAgICAgIHRoaXMua2VlcEFmdGVyUm91dGVDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2xlYXIgYWxlcnQgbWVzc2FnZXNcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEFsZXJ0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmFsZXJ0KEFsZXJ0VHlwZS5TdWNjZXNzLCBtZXNzYWdlLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSk7XG4gICAgfVxuXG4gICAgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmFsZXJ0KEFsZXJ0VHlwZS5FcnJvciwgbWVzc2FnZSwga2VlcEFmdGVyUm91dGVDaGFuZ2UpO1xuICAgIH1cblxuICAgIGluZm8obWVzc2FnZTogc3RyaW5nLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmFsZXJ0KEFsZXJ0VHlwZS5JbmZvLCBtZXNzYWdlLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSk7XG4gICAgfVxuXG4gICAgd2FybihtZXNzYWdlOiBzdHJpbmcsIGtlZXBBZnRlclJvdXRlQ2hhbmdlID0gZmFsc2UpIHtcbiAgICAgIHRoaXMuYWxlcnQoQWxlcnRUeXBlLldhcm5pbmcsIG1lc3NhZ2UsIGtlZXBBZnRlclJvdXRlQ2hhbmdlKTtcbiAgICB9XG5cbiAgICBhbGVydCh0eXBlOiBBbGVydFR5cGUsIG1lc3NhZ2U6IHN0cmluZywga2VlcEFmdGVyUm91dGVDaGFuZ2UgPSBmYWxzZSkge1xuICAgICAgdGhpcy5rZWVwQWZ0ZXJSb3V0ZUNoYW5nZSA9IGtlZXBBZnRlclJvdXRlQ2hhbmdlO1xuICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoPEFsZXJ0PnsgdHlwZTogdHlwZSwgbWVzc2FnZTogbWVzc2FnZSB9KTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgIC8vIGNsZWFyIGFsZXJ0c1xuICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoPGFueT57fSk7XG4gICAgfVxuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgRHluYW1pY09iamVjdCB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuICB9XG5cbiAgZXhwb3J0IGVudW0gQWxlcnRUeXBlIHtcbiAgICBTdWNjZXNzLFxuICAgIEVycm9yLFxuICAgIEluZm8sXG4gICAgV2FybmluZ1xuICB9XG4gIGV4cG9ydCBjbGFzcyBBbGVydCB7XG4gICAgdHlwZSE6IEFsZXJ0VHlwZTtcbiAgICBtZXNzYWdlITogc3RyaW5nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgSW5zaWdodHMge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzZXJpZXM6IFNlcmllc1tdO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgU2VyaWVzIHtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBtb250aDogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTdGF0dXMge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2YWx1ZTogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFVzZXJHcm91cER0byB7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZyB8IG51bGw7XG4gICAgY29uc3RydWN0b3IoZGF0YT86IFBhcnRpYWw8VXNlckdyb3VwRHRvPikge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgVXNlclJvbGVQYWdlRHRvIHtcbiAgICBpZD86IG51bWJlcjtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHJvdXRlPzogc3RyaW5nO1xuICAgIGljb24/OiBzdHJpbmcgfCBudWxsO1xuICAgIG9yZGVyPzogbnVtYmVyO1xuICAgIGlzbWVudT86IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3IoZGF0YT86IFBhcnRpYWw8VXNlclJvbGVQYWdlRHRvPikge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY2xhc3MgVXNlclJvbGVEdG8ge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xuICAgIHByaW9yaXR5PzogbnVtYmVyO1xuICAgIG9yZGVyPzogbnVtYmVyO1xuICAgIGRlZmF1bHRwYWdlPzogVXNlclJvbGVQYWdlRHRvO1xuICAgIGRlZmF1bHRwYWdlaWQ/OiBudW1iZXI7XG4gICAgcGFyZW50aWQ/OiBudW1iZXIgfCBudWxsO1xuICAgIHBhcmVudD86IFVzZXJSb2xlRHRvIHwgbnVsbDtcbiAgICBjb25zdHJ1Y3RvcihkYXRhPzogUGFydGlhbDxVc2VyUm9sZUR0bz4pIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFVzZXJEdG8ge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xuICAgIHByaW9yaXR5PzogbnVtYmVyO1xuICAgIG9yZGVyPzogbnVtYmVyO1xuICAgIGRlZmF1bHRwYWdlPzogVXNlclJvbGVQYWdlRHRvO1xuICAgIGRlZmF1bHRwYWdlaWQ/OiBudW1iZXI7XG4gICAgcGFyZW50aWQ/OiBudW1iZXIgfCBudWxsO1xuICAgIHBhcmVudD86IFVzZXJSb2xlRHRvIHwgbnVsbDtcbiAgICBjb25zdHJ1Y3RvcihkYXRhPzogUGFydGlhbDxVc2VyRHRvPikge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgZXhwb3J0IGNsYXNzIEFjY2Vzc01hbmFnZW1lbnRDb25maWcge1xuICAgIHB1YmxpYyBzdGF0aWMgRW5kUG9pbnQgPSB7XG4gICAgICBPcmdhbml6YXRpb246IHtcbiAgICAgICAgZ2V0T3JnYW5pemF0aW9uTGlzdDogJy9vcmcvb3JnYW5pemF0aW9uL2FsbCcsXG4gICAgICAgIGdldE9yZ2FuaXphdGlvbjogJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL3BhZ2Uvb3JnYW5pemF0aW9uL3tvcmdJZH0/cmV0dXJuVXNlclBhZ2U9ZmFsc2UmZXhjbHVkZU5vQWN0aXZlVmVyc2lvblBhZ2VzPXRydWUnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuIl19