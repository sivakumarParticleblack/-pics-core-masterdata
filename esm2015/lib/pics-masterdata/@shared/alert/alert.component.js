import { Component } from '@angular/core';
import { AlertType } from '../../@core/service/alert.service';
import * as i0 from "@angular/core";
import * as i1 from "../../@core/service/alert.service";
import * as i2 from "@angular/common";
const DISPLAY_IN_SECONDS = 8;
export class AlertComponent {
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
AlertComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertComponent, deps: [{ token: i1.AlertService }], target: i0.ɵɵFactoryTarget.Component });
AlertComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: AlertComponent, selector: "app-alert", ngImport: i0, template: "<div *ngFor=\"let alert of alerts\" class=\"alert-animate {{ cssClass(alert) }} alert-dismissable\">\n  {{ alert.message }}\n  <a class=\"close\" (click)=\"removeAlert(alert)\">&times;</a>\n</div>\n", styles: [".alert-animate{position:fixed;top:10px;left:auto;right:10px;z-index:999999;min-width:400px;text-transform:capitalize;margin:0 auto;animation-name:slideInDown;animation-duration:1s;animation-fill-mode:both}.alert-animate .close{padding:3px;border-radius:2px;color:#fff;opacity:1;text-align:center;line-height:17px;font-size:24px}@keyframes slideInDown{0%{transform:translateY(-100%);visibility:visible}to{transform:translateY(0)}}.alert-animate.alert-success{background:#04844b;color:#fff;border-color:#04844b}.alert-danger{background:#b92b28;border-color:#b92b28;color:#fff}.alert-info{color:#fff;background:#0f3164;border-color:#0f3164}\n"], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{
                    // moduleId: module.id,
                    selector: 'app-alert',
                    templateUrl: 'alert.component.html',
                    styleUrls: ['./alert.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.AlertService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL21hc3RlcmRhdGEvc3JjL2xpYi9waWNzLW1hc3RlcmRhdGEvQHNoYXJlZC9hbGVydC9hbGVydC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvbWFzdGVyZGF0YS9zcmMvbGliL3BpY3MtbWFzdGVyZGF0YS9Ac2hhcmVkL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUF1QixTQUFTLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQUNuRixNQUFNLGtCQUFrQixHQUFHLENBQUMsQ0FBQztBQU83QixNQUFNLE9BQU8sY0FBYztJQUd6QixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUY5QyxXQUFNLEdBQVksRUFBRSxDQUFDO0lBRTRCLENBQUM7SUFFbEQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDViwrQ0FBK0M7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixPQUFPO2FBQ1I7WUFFRCxxQkFBcUI7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsK0JBQStCO1lBQy9CLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLGtCQUFrQixHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFZO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFZO1FBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPO1NBQ1I7UUFFRCx1Q0FBdUM7UUFDdkMsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssU0FBUyxDQUFDLE9BQU87Z0JBQ3BCLE9BQU8scUJBQXFCLENBQUM7WUFDL0IsS0FBSyxTQUFTLENBQUMsS0FBSztnQkFDbEIsT0FBTyxvQkFBb0IsQ0FBQztZQUM5QixLQUFLLFNBQVMsQ0FBQyxJQUFJO2dCQUNqQixPQUFPLGtCQUFrQixDQUFDO1lBQzVCLEtBQUssU0FBUyxDQUFDLE9BQU87Z0JBQ3BCLE9BQU8scUJBQXFCLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs0R0F4Q1UsY0FBYztnR0FBZCxjQUFjLGlEQ1QzQix3TUFJQTs0RkRLYSxjQUFjO2tCQU4xQixTQUFTO21CQUFDO29CQUNULHVCQUF1QjtvQkFDdkIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFdBQVcsRUFBRSxzQkFBc0I7b0JBQ25DLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbGVydCwgQWxlcnRTZXJ2aWNlLCBBbGVydFR5cGUgfSBmcm9tICcuLi8uLi9AY29yZS9zZXJ2aWNlL2FsZXJ0LnNlcnZpY2UnO1xuY29uc3QgRElTUExBWV9JTl9TRUNPTkRTID0gODtcbkBDb21wb25lbnQoe1xuICAvLyBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1hbGVydCcsXG4gIHRlbXBsYXRlVXJsOiAnYWxlcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgYWxlcnRzOiBBbGVydFtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFsZXJ0U2VydmljZS5nZXRBbGVydCgpLnN1YnNjcmliZSgoYWxlcnQ6IEFsZXJ0KSA9PiB7XG4gICAgICBpZiAoIWFsZXJ0KSB7XG4gICAgICAgIC8vIGNsZWFyIGFsZXJ0cyB3aGVuIGFuIGVtcHR5IGFsZXJ0IGlzIHJlY2VpdmVkXG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIGFsZXJ0IHRvIGFycmF5XG4gICAgICB0aGlzLmFsZXJ0cy5wdXNoKGFsZXJ0KTtcbiAgICAgIC8vIHJlbW92ZSBhbGVydCBhZnRlciA1IHNlY29uZHNcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmVBbGVydChhbGVydCksIERJU1BMQVlfSU5fU0VDT05EUyAqIDEwMDApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQWxlcnQoYWxlcnQ6IEFsZXJ0KSB7XG4gICAgdGhpcy5hbGVydHMgPSB0aGlzLmFsZXJ0cy5maWx0ZXIoeCA9PiB4ICE9PSBhbGVydCk7XG4gIH1cblxuICBjc3NDbGFzcyhhbGVydDogQWxlcnQpIHtcbiAgICBpZiAoIWFsZXJ0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIGNzcyBjbGFzcyBiYXNlZCBvbiBhbGVydCB0eXBlXG4gICAgc3dpdGNoIChhbGVydC50eXBlKSB7XG4gICAgICBjYXNlIEFsZXJ0VHlwZS5TdWNjZXNzOlxuICAgICAgICByZXR1cm4gJ2FsZXJ0IGFsZXJ0LXN1Y2Nlc3MnO1xuICAgICAgY2FzZSBBbGVydFR5cGUuRXJyb3I6XG4gICAgICAgIHJldHVybiAnYWxlcnQgYWxlcnQtZGFuZ2VyJztcbiAgICAgIGNhc2UgQWxlcnRUeXBlLkluZm86XG4gICAgICAgIHJldHVybiAnYWxlcnQgYWxlcnQtaW5mbyc7XG4gICAgICBjYXNlIEFsZXJ0VHlwZS5XYXJuaW5nOlxuICAgICAgICByZXR1cm4gJ2FsZXJ0IGFsZXJ0LXdhcm5pbmcnO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiAqbmdGb3I9XCJsZXQgYWxlcnQgb2YgYWxlcnRzXCIgY2xhc3M9XCJhbGVydC1hbmltYXRlIHt7IGNzc0NsYXNzKGFsZXJ0KSB9fSBhbGVydC1kaXNtaXNzYWJsZVwiPlxuICB7eyBhbGVydC5tZXNzYWdlIH19XG4gIDxhIGNsYXNzPVwiY2xvc2VcIiAoY2xpY2spPVwicmVtb3ZlQWxlcnQoYWxlcnQpXCI+JnRpbWVzOzwvYT5cbjwvZGl2PlxuIl19