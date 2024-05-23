import { Component, Input } from '@angular/core';
import { RBACINFO } from './pics-masterdata/@core/urls/rbac-url.config';
import * as i0 from "@angular/core";
import * as i1 from "./pics-masterdata/@core/permissions/permission.store";
import * as i2 from "./pics-masterdata/@core/service/data-store.service";
import * as i3 from "./pics-masterdata/masterdata/masterdata.component";
//import { FormBuilder, FormGroup } from '@angular/forms';
export class MasterdataComponent {
    //categoryForm: FormGroup;
    //isTextOverflow = false;
    //@ViewChild('nameInput') nameInput: ElementRef;
    constructor(permissionStore, _storeservice) {
        this.permissionStore = permissionStore;
        this._storeservice = _storeservice;
        this.RBACORG = new RBACINFO();
        //this.categoryForm = this.fb.group({
        //name: [''],
        //});    
    }
    ngOnInit() {
        this.mastersEvent.subscribe((val) => {
            this.RBACORG = val.RBACORG;
            this.PERMISSION = val.PERMISSION;
            this._storeservice.setData('RBACORG', this.RBACORG);
            this.permissionStore.setStore(this.PERMISSION);
            this._storeservice.setData('INPUTVALIDATIONMETHOD', this.INPUTVALIDATIONMETHOD);
            this._storeservice.setData('HTTPSERVICE', val.HTTPSERVICE);
            //this.categoryForm.get('name').valueChanges.subscribe(value => {
            // this.checkTextOverflow(value);
        });
        //})    
    }
}
MasterdataComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent, deps: [{ token: i1.PermissionStore }, { token: i2.DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
MasterdataComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MasterdataComponent, selector: "masterdata", inputs: { RBACORG: "RBACORG", PERMISSION: "PERMISSION", mastersEvent: "mastersEvent", INPUTVALIDATIONMETHOD: "INPUTVALIDATIONMETHOD" }, ngImport: i0, template: `
      <lib-masterdata></lib-masterdata>
  `, isInline: true, components: [{ type: i3.MasterdataComponent, selector: "lib-masterdata" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'masterdata',
                    template: `
      <lib-masterdata></lib-masterdata>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: i1.PermissionStore }, { type: i2.DataStoreService }]; }, propDecorators: { RBACORG: [{
                type: Input
            }], PERMISSION: [{
                type: Input
            }], mastersEvent: [{
                type: Input
            }], INPUTVALIDATIONMETHOD: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvbWFzdGVyZGF0YS9zcmMvbGliL21hc3RlcmRhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFnRCxNQUFNLGVBQWUsQ0FBQztBQUkvRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7O0FBQ3hFLDBEQUEwRDtBQVUxRCxNQUFNLE9BQU8sbUJBQW1CO0lBSzlCLDBCQUEwQjtJQUMxQix5QkFBeUI7SUFDekIsZ0RBQWdEO0lBRWhELFlBQ1UsZUFBZ0MsRUFDaEMsYUFBK0I7UUFEL0Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQVZ6QixZQUFPLEdBQWMsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQWFsRCxxQ0FBcUM7UUFDbkMsYUFBYTtRQUNmLFNBQVM7SUFDWCxDQUFDO0lBQ0QsUUFBUTtRQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFELGlFQUFpRTtZQUNoRSxpQ0FBaUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxRQUFRO0lBQ1YsQ0FBQzs7aUhBOUJVLG1CQUFtQjtxR0FBbkIsbUJBQW1CLDBMQU5wQjs7R0FFVDs0RkFJVSxtQkFBbUI7a0JBUi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRTs7R0FFVDtvQkFDRCxNQUFNLEVBQUUsRUFDUDtpQkFDRjtxSUFFaUIsT0FBTztzQkFBdEIsS0FBSztnQkFDVSxVQUFVO3NCQUF6QixLQUFLO2dCQUNVLFlBQVk7c0JBQTNCLEtBQUs7Z0JBQ1UscUJBQXFCO3NCQUFwQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBlcm1pc3Npb25TdG9yZSB9IGZyb20gJy4vcGljcy1tYXN0ZXJkYXRhL0Bjb3JlL3Blcm1pc3Npb25zL3Blcm1pc3Npb24uc3RvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JlU2VydmljZSB9IGZyb20gJy4vcGljcy1tYXN0ZXJkYXRhL0Bjb3JlL3NlcnZpY2UvZGF0YS1zdG9yZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJCQUNJTkZPIH0gZnJvbSAnLi9waWNzLW1hc3RlcmRhdGEvQGNvcmUvdXJscy9yYmFjLXVybC5jb25maWcnO1xuLy9pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXN0ZXJkYXRhJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxsaWItbWFzdGVyZGF0YT48L2xpYi1tYXN0ZXJkYXRhPlxuICBgLFxuICBzdHlsZXM6IFtcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXN0ZXJkYXRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcHVibGljIFJCQUNPUkc/OiBSQkFDSU5GTyA9IG5ldyBSQkFDSU5GTygpO1xuICBASW5wdXQoKSBwdWJsaWMgUEVSTUlTU0lPTj86IGFueTtcbiAgQElucHV0KCkgcHVibGljIG1hc3RlcnNFdmVudCE6IE9ic2VydmFibGU8YW55PjtcbiAgQElucHV0KCkgcHVibGljIElOUFVUVkFMSURBVElPTk1FVEhPRD8gOiBhbnk7XG4gIC8vY2F0ZWdvcnlGb3JtOiBGb3JtR3JvdXA7XG4gIC8vaXNUZXh0T3ZlcmZsb3cgPSBmYWxzZTtcbiAgLy9AVmlld0NoaWxkKCduYW1lSW5wdXQnKSBuYW1lSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwZXJtaXNzaW9uU3RvcmU6IFBlcm1pc3Npb25TdG9yZSxcbiAgICBwcml2YXRlIF9zdG9yZXNlcnZpY2U6IERhdGFTdG9yZVNlcnZpY2UsXG4gICAgLy9wcml2YXRlIGZiOiBGb3JtQnVpbGRlciAgICBcbiAgKSB7XG4gICAgLy90aGlzLmNhdGVnb3J5Rm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgLy9uYW1lOiBbJyddLFxuICAgIC8vfSk7ICAgIFxuICB9XG4gIG5nT25Jbml0KCkge1xuICAgICB0aGlzLm1hc3RlcnNFdmVudC5zdWJzY3JpYmUoKHZhbDogYW55KSA9PiB7XG4gICAgICB0aGlzLlJCQUNPUkcgPSB2YWwuUkJBQ09SRztcbiAgICAgIHRoaXMuUEVSTUlTU0lPTiA9IHZhbC5QRVJNSVNTSU9OO1xuICAgICAgdGhpcy5fc3RvcmVzZXJ2aWNlLnNldERhdGEoJ1JCQUNPUkcnLCB0aGlzLlJCQUNPUkcpO1xuICAgICAgdGhpcy5wZXJtaXNzaW9uU3RvcmUuc2V0U3RvcmUodGhpcy5QRVJNSVNTSU9OKTtcbiAgICAgIHRoaXMuX3N0b3Jlc2VydmljZS5zZXREYXRhKCdJTlBVVFZBTElEQVRJT05NRVRIT0QnLCB0aGlzLklOUFVUVkFMSURBVElPTk1FVEhPRCk7XG4gICAgICB0aGlzLl9zdG9yZXNlcnZpY2Uuc2V0RGF0YSgnSFRUUFNFUlZJQ0UnLHZhbC5IVFRQU0VSVklDRSk7XG4gICAgICAvL3RoaXMuY2F0ZWdvcnlGb3JtLmdldCgnbmFtZScpLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgIC8vIHRoaXMuY2hlY2tUZXh0T3ZlcmZsb3codmFsdWUpO1xuICAgICAgfSk7ICAgICAgXG4gICAgLy99KSAgICBcbiAgfVxuXG4gIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgLy8gICB0aGlzLmNoZWNrVGV4dE92ZXJmbG93KHRoaXMuY2F0ZWdvcnlGb3JtLmdldCgnbmFtZScpLnZhbHVlKTtcbiAgLy8gfSAgXG5cbiAgLy8gb25JbnB1dChldmVudDogRXZlbnQsIGZpZWxkTmFtZTogc3RyaW5nLCBmaWVsZExhYmVsOiBzdHJpbmcsIGlzUmVxdWlyZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgLy8gICB0aGlzLmNoZWNrVGV4dE92ZXJmbG93KCg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLnZhbHVlKTtcbiAgLy8gfVxuXG4gIC8vIGNoZWNrVGV4dE92ZXJmbG93KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgLy8gICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy8gICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IHRoaXMubmFtZUlucHV0Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgLy8gICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcbiAgLy8gICAgICAgdGhpcy5pc1RleHRPdmVyZmxvdyA9IGlucHV0RWxlbWVudC5zY3JvbGxXaWR0aCA+IGlucHV0RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxufSJdfQ==