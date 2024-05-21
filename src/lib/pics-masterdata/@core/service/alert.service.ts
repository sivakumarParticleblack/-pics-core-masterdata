import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
  export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
      // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
      router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
            // only keep for a single route change
            this.keepAfterRouteChange = false;
          } else {
            // clear alert messages
            this.clear();
          }
        }
      });
    }

    getAlert(): Observable<any> {
      return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
      this.alert(AlertType.Success, message, keepAfterRouteChange);
    }

    error(message: string, keepAfterRouteChange = false) {
      this.alert(AlertType.Error, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false) {
      this.alert(AlertType.Info, message, keepAfterRouteChange);
    }

    warn(message: string, keepAfterRouteChange = false) {
      this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }

    alert(type: AlertType, message: string, keepAfterRouteChange = false) {
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next(<Alert>{ type: type, message: message });
    }

    clear() {
      // clear alerts
      this.subject.next(<any>{});
    }
  }
  export interface DynamicObject {
    [key: string]: any;
  }

  export enum AlertType {
    Success,
    Error,
    Info,
    Warning
  }
  export class Alert {
    type!: AlertType;
    message!: string;
  }
  export interface Insights {
    name: string;
    series: Series[];
  }
  export interface Series {
    value: number;
    name: string;
    month: string;
  }

  export interface Status {
    name: string;
    value: number;
  }

  export class UserGroupDto {
    id?: number;
    name?: string;
    description?: string | null;
    constructor(data?: Partial<UserGroupDto>) {
      Object.assign(this, data);
    }
  }

  export class UserRolePageDto {
    id?: number;
    name?: string;
    route?: string;
    icon?: string | null;
    order?: number;
    ismenu?: boolean;
    constructor(data?: Partial<UserRolePageDto>) {
      Object.assign(this, data);
    }
  }

  export class UserRoleDto {
    id?: number;
    name?: string;
    description?: string | null;
    priority?: number;
    order?: number;
    defaultpage?: UserRolePageDto;
    defaultpageid?: number;
    parentid?: number | null;
    parent?: UserRoleDto | null;
    constructor(data?: Partial<UserRoleDto>) {
      Object.assign(this, data);
    }
  }

  export class UserDto {
    id?: number;
    name?: string;
    description?: string | null;
    priority?: number;
    order?: number;
    defaultpage?: UserRolePageDto;
    defaultpageid?: number;
    parentid?: number | null;
    parent?: UserRoleDto | null;
    constructor(data?: Partial<UserDto>) {
      Object.assign(this, data);
    }
  }
  export class AccessManagementConfig {
    public static EndPoint = {
      Organization: {
        getOrganizationList: '/org/organization/all',
        getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
      }
    };
  }
