import { Component, Input } from '@angular/core';
import { RBACINFO } from './pics-masterdata/@core/urls/rbac-url.config';
import * as i0 from "@angular/core";
import * as i1 from "./pics-masterdata/@core/permissions/permission.store";
import * as i2 from "./pics-masterdata/@core/service/data-store.service";
import * as i3 from "./pics-masterdata/masterdata/masterdata.component";
export class MasterdataComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvbWFzdGVyZGF0YS9zcmMvbGliL21hc3RlcmRhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBSXpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7Ozs7QUFVeEUsTUFBTSxPQUFPLG1CQUFtQjtJQU05QixZQUNVLGVBQWdDLEVBQ2hDLGFBQStCO1FBRC9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFQekIsWUFBTyxHQUFjLElBQUksUUFBUSxFQUFFLENBQUM7SUFTcEQsQ0FBQztJQUNELFFBQVE7UUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMzRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7O2lIQXBCVSxtQkFBbUI7cUdBQW5CLG1CQUFtQiwwTEFOcEI7O0dBRVQ7NEZBSVUsbUJBQW1CO2tCQVIvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUU7O0dBRVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQ1A7aUJBQ0Y7cUlBRWlCLE9BQU87c0JBQXRCLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxZQUFZO3NCQUEzQixLQUFLO2dCQUNVLHFCQUFxQjtzQkFBcEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGVybWlzc2lvblN0b3JlIH0gZnJvbSAnLi9waWNzLW1hc3RlcmRhdGEvQGNvcmUvcGVybWlzc2lvbnMvcGVybWlzc2lvbi5zdG9yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi9waWNzLW1hc3RlcmRhdGEvQGNvcmUvc2VydmljZS9kYXRhLXN0b3JlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUkJBQ0lORk8gfSBmcm9tICcuL3BpY3MtbWFzdGVyZGF0YS9AY29yZS91cmxzL3JiYWMtdXJsLmNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hc3RlcmRhdGEnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGxpYi1tYXN0ZXJkYXRhPjwvbGliLW1hc3RlcmRhdGE+XG4gIGAsXG4gIHN0eWxlczogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hc3RlcmRhdGFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgUkJBQ09SRz86IFJCQUNJTkZPID0gbmV3IFJCQUNJTkZPKCk7XG4gIEBJbnB1dCgpIHB1YmxpYyBQRVJNSVNTSU9OPzogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgbWFzdGVyc0V2ZW50ITogT2JzZXJ2YWJsZTxhbnk+O1xuICBASW5wdXQoKSBwdWJsaWMgSU5QVVRWQUxJREFUSU9OTUVUSE9EPyA6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBlcm1pc3Npb25TdG9yZTogUGVybWlzc2lvblN0b3JlLFxuICAgIHByaXZhdGUgX3N0b3Jlc2VydmljZTogRGF0YVN0b3JlU2VydmljZVxuICApIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICAgdGhpcy5tYXN0ZXJzRXZlbnQuc3Vic2NyaWJlKCh2YWw6IGFueSkgPT4ge1xuICAgICAgdGhpcy5SQkFDT1JHID0gdmFsLlJCQUNPUkc7XG4gICAgICB0aGlzLlBFUk1JU1NJT04gPSB2YWwuUEVSTUlTU0lPTjtcbiAgICAgIHRoaXMuX3N0b3Jlc2VydmljZS5zZXREYXRhKCdSQkFDT1JHJywgdGhpcy5SQkFDT1JHKTtcbiAgICAgIHRoaXMucGVybWlzc2lvblN0b3JlLnNldFN0b3JlKHRoaXMuUEVSTUlTU0lPTik7XG4gICAgICB0aGlzLl9zdG9yZXNlcnZpY2Uuc2V0RGF0YSgnSU5QVVRWQUxJREFUSU9OTUVUSE9EJywgdGhpcy5JTlBVVFZBTElEQVRJT05NRVRIT0QpO1xuICAgICAgdGhpcy5fc3RvcmVzZXJ2aWNlLnNldERhdGEoJ0hUVFBTRVJWSUNFJyx2YWwuSFRUUFNFUlZJQ0UpXG4gICAgfSlcbiAgfVxufVxuIl19