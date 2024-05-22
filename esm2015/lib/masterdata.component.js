import { Component, Input, ViewChild } from '@angular/core';
import { RBACINFO } from './pics-masterdata/@core/urls/rbac-url.config';
import * as i0 from "@angular/core";
import * as i1 from "./pics-masterdata/@core/permissions/permission.store";
import * as i2 from "./pics-masterdata/@core/service/data-store.service";
import * as i3 from "@angular/forms";
import * as i4 from "./pics-masterdata/masterdata/masterdata.component";
export class MasterdataComponent {
    constructor(permissionStore, _storeservice, fb) {
        this.permissionStore = permissionStore;
        this._storeservice = _storeservice;
        this.fb = fb;
        this.RBACORG = new RBACINFO();
        this.isTextOverflow = false;
        this.categoryForm = this.fb.group({
            name: [''],
        });
    }
    ngOnInit() {
        this.mastersEvent.subscribe((val) => {
            this.RBACORG = val.RBACORG;
            this.PERMISSION = val.PERMISSION;
            this._storeservice.setData('RBACORG', this.RBACORG);
            this.permissionStore.setStore(this.PERMISSION);
            this._storeservice.setData('INPUTVALIDATIONMETHOD', this.INPUTVALIDATIONMETHOD);
            this._storeservice.setData('HTTPSERVICE', val.HTTPSERVICE);
            this.categoryForm.get('name').valueChanges.subscribe(value => {
                this.checkTextOverflow(value);
            });
        });
    }
    ngAfterViewInit() {
        this.checkTextOverflow(this.categoryForm.get('name').value);
    }
    onInput(event, fieldName, fieldLabel, isRequired) {
        this.checkTextOverflow(event.target.value);
    }
    checkTextOverflow(value) {
        setTimeout(() => {
            const inputElement = this.nameInput.nativeElement;
            if (inputElement) {
                this.isTextOverflow = inputElement.scrollWidth > inputElement.clientWidth;
            }
        });
    }
}
MasterdataComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent, deps: [{ token: i1.PermissionStore }, { token: i2.DataStoreService }, { token: i3.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
MasterdataComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MasterdataComponent, selector: "masterdata", inputs: { RBACORG: "RBACORG", PERMISSION: "PERMISSION", mastersEvent: "mastersEvent", INPUTVALIDATIONMETHOD: "INPUTVALIDATIONMETHOD" }, viewQueries: [{ propertyName: "nameInput", first: true, predicate: ["nameInput"], descendants: true }], ngImport: i0, template: `
      <lib-masterdata></lib-masterdata>
  `, isInline: true, components: [{ type: i4.MasterdataComponent, selector: "lib-masterdata" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'masterdata',
                    template: `
      <lib-masterdata></lib-masterdata>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: i1.PermissionStore }, { type: i2.DataStoreService }, { type: i3.FormBuilder }]; }, propDecorators: { RBACORG: [{
                type: Input
            }], PERMISSION: [{
                type: Input
            }], mastersEvent: [{
                type: Input
            }], INPUTVALIDATIONMETHOD: [{
                type: Input
            }], nameInput: [{
                type: ViewChild,
                args: ['nameInput']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvbWFzdGVyZGF0YS9zcmMvbGliL21hc3RlcmRhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF5QixTQUFTLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFJL0YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7QUFXeEUsTUFBTSxPQUFPLG1CQUFtQjtJQVM5QixZQUNVLGVBQWdDLEVBQ2hDLGFBQStCLEVBQy9CLEVBQWU7UUFGZixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLE9BQUUsR0FBRixFQUFFLENBQWE7UUFYVCxZQUFPLEdBQWMsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUtwRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQVFyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2hDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxRQUFRO1FBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVksRUFBRSxTQUFpQixFQUFFLFVBQWtCLEVBQUUsVUFBbUI7UUFDOUUsSUFBSSxDQUFDLGlCQUFpQixDQUFvQixLQUFLLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFhO1FBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWlDLENBQUM7WUFDdEUsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDO2FBQzNFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztpSEEvQ1UsbUJBQW1CO3FHQUFuQixtQkFBbUIsa1NBTnBCOztHQUVUOzRGQUlVLG1CQUFtQjtrQkFSL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFOztHQUVUO29CQUNELE1BQU0sRUFBRSxFQUNQO2lCQUNGOytKQUVpQixPQUFPO3NCQUF0QixLQUFLO2dCQUNVLFVBQVU7c0JBQXpCLEtBQUs7Z0JBQ1UsWUFBWTtzQkFBM0IsS0FBSztnQkFDVSxxQkFBcUI7c0JBQXBDLEtBQUs7Z0JBR2tCLFNBQVM7c0JBQWhDLFNBQVM7dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uU3RvcmUgfSBmcm9tICcuL3BpY3MtbWFzdGVyZGF0YS9AY29yZS9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLnN0b3JlJztcbmltcG9ydCB7IERhdGFTdG9yZVNlcnZpY2UgfSBmcm9tICcuL3BpY3MtbWFzdGVyZGF0YS9AY29yZS9zZXJ2aWNlL2RhdGEtc3RvcmUuc2VydmljZSc7XG5pbXBvcnQgeyBSQkFDSU5GTyB9IGZyb20gJy4vcGljcy1tYXN0ZXJkYXRhL0Bjb3JlL3VybHMvcmJhYy11cmwuY29uZmlnJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hc3RlcmRhdGEnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGxpYi1tYXN0ZXJkYXRhPjwvbGliLW1hc3RlcmRhdGE+XG4gIGAsXG4gIHN0eWxlczogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hc3RlcmRhdGFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBwdWJsaWMgUkJBQ09SRz86IFJCQUNJTkZPID0gbmV3IFJCQUNJTkZPKCk7XG4gIEBJbnB1dCgpIHB1YmxpYyBQRVJNSVNTSU9OPzogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgbWFzdGVyc0V2ZW50ITogT2JzZXJ2YWJsZTxhbnk+O1xuICBASW5wdXQoKSBwdWJsaWMgSU5QVVRWQUxJREFUSU9OTUVUSE9EPyA6IGFueTtcbiAgY2F0ZWdvcnlGb3JtOiBGb3JtR3JvdXA7XG4gIGlzVGV4dE92ZXJmbG93ID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoJ25hbWVJbnB1dCcpIG5hbWVJbnB1dDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBlcm1pc3Npb25TdG9yZTogUGVybWlzc2lvblN0b3JlLFxuICAgIHByaXZhdGUgX3N0b3Jlc2VydmljZTogRGF0YVN0b3JlU2VydmljZSxcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlciAgICBcbiAgKSB7XG4gICAgdGhpcy5jYXRlZ29yeUZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIG5hbWU6IFsnJ10sXG4gICAgfSk7ICAgIFxuICB9XG4gIG5nT25Jbml0KCkge1xuICAgICB0aGlzLm1hc3RlcnNFdmVudC5zdWJzY3JpYmUoKHZhbDogYW55KSA9PiB7XG4gICAgICB0aGlzLlJCQUNPUkcgPSB2YWwuUkJBQ09SRztcbiAgICAgIHRoaXMuUEVSTUlTU0lPTiA9IHZhbC5QRVJNSVNTSU9OO1xuICAgICAgdGhpcy5fc3RvcmVzZXJ2aWNlLnNldERhdGEoJ1JCQUNPUkcnLCB0aGlzLlJCQUNPUkcpO1xuICAgICAgdGhpcy5wZXJtaXNzaW9uU3RvcmUuc2V0U3RvcmUodGhpcy5QRVJNSVNTSU9OKTtcbiAgICAgIHRoaXMuX3N0b3Jlc2VydmljZS5zZXREYXRhKCdJTlBVVFZBTElEQVRJT05NRVRIT0QnLCB0aGlzLklOUFVUVkFMSURBVElPTk1FVEhPRCk7XG4gICAgICB0aGlzLl9zdG9yZXNlcnZpY2Uuc2V0RGF0YSgnSFRUUFNFUlZJQ0UnLHZhbC5IVFRQU0VSVklDRSk7XG4gICAgICB0aGlzLmNhdGVnb3J5Rm9ybS5nZXQoJ25hbWUnKS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy5jaGVja1RleHRPdmVyZmxvdyh2YWx1ZSk7XG4gICAgICB9KTsgICAgICBcbiAgICB9KSAgICBcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrVGV4dE92ZXJmbG93KHRoaXMuY2F0ZWdvcnlGb3JtLmdldCgnbmFtZScpLnZhbHVlKTtcbiAgfSAgXG5cbiAgb25JbnB1dChldmVudDogRXZlbnQsIGZpZWxkTmFtZTogc3RyaW5nLCBmaWVsZExhYmVsOiBzdHJpbmcsIGlzUmVxdWlyZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrVGV4dE92ZXJmbG93KCg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLnZhbHVlKTtcbiAgfVxuXG4gIGNoZWNrVGV4dE92ZXJmbG93KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IHRoaXMubmFtZUlucHV0Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5pc1RleHRPdmVyZmxvdyA9IGlucHV0RWxlbWVudC5zY3JvbGxXaWR0aCA+IGlucHV0RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4iXX0=