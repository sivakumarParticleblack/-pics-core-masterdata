import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../permissions/permission.store";
export class PermissionDirective {
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
PermissionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.PermissionStore }], target: i0.ɵɵFactoryTarget.Directive });
PermissionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: PermissionDirective, selector: "[fieldKey]", inputs: { fieldKey: "fieldKey" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[fieldKey]'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.PermissionStore }]; }, propDecorators: { fieldKey: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvbWFzdGVyZGF0YS9zcmMvbGliL3BpY3MtbWFzdGVyZGF0YS9AY29yZS9kaXJlY3RpdmVzL3Blcm1pc3Npb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFjLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQzs7O0FBUXZGLE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsWUFDbUIsUUFBbUIsRUFDNUIsVUFBc0IsRUFDdEIsU0FBMEI7UUFGakIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUM1QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQWlCO0lBRXBDLENBQUM7SUFDRCxlQUFlO1FBQ2IsTUFBTSxXQUFXLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDekMsSUFBSSxXQUFXLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO2dCQUMvQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO29CQUM1QixJQUFJLFFBQVEsRUFBRTt3QkFDWixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RixDQUFDLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7d0JBQ2pDLENBQUMsQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7d0JBQy9CLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLENBQUMsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ3BFO2lCQUNGO3FCQUFNLElBQ0wsUUFBUSxDQUFDLE9BQU8sS0FBSyxlQUFlO29CQUNwQyxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVk7b0JBQ2pDLFFBQVEsQ0FBQyxPQUFPLEtBQUssWUFBWTtvQkFDakMsUUFBUSxDQUFDLE9BQU8sS0FBSyxjQUFjO29CQUNuQyxRQUFRLENBQUMsT0FBTyxLQUFLLGVBQWU7b0JBQ3BDLFFBQVEsQ0FBQyxPQUFPLEtBQUssWUFBWSxFQUNqQztvQkFDQSxJQUFJLFFBQVEsRUFBRTt3QkFDWixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RixDQUFDLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7d0JBQ2pDLENBQUMsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQzt3QkFDakMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxhQUFhLENBQUM7d0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUNwRTtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzdFLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUNwRSwyREFBMkQsQ0FDNUQsQ0FBQztvQkFDRixlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7d0JBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3ZELENBQUMsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7U0FDRjtJQUNILENBQUM7O2lIQWpEVSxtQkFBbUI7cUdBQW5CLG1CQUFtQjs0RkFBbkIsbUJBQW1CO2tCQUgvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjt1SkFFVSxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uU3RvcmUgfSBmcm9tICcuLi9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLnN0b3JlJztcblxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmaWVsZEtleV0nXG59KVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgZmllbGRLZXkhOiBzdHJpbmc7XG4gIHBlcm1pc3Npb25zOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkYXRhU3RvcmU6IFBlcm1pc3Npb25TdG9yZVxuICApIHtcbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgcGVybWlzc2lvbnMgPSAgdGhpcy5kYXRhU3RvcmUuc3RhdGU7XG4gICAgIGlmIChwZXJtaXNzaW9ucykge1xuICAgICAgaWYgKCFwZXJtaXNzaW9uc1t0aGlzLmZpZWxkS2V5XSkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAodGVtcGxhdGUudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICBjb25zdCByID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgci5pbm5lckhUTUwgPSB0ZW1wbGF0ZS5pbm5lckhUTUw7XG4gICAgICAgICAgICByLmhyZWYgPSAnamF2YXNjcmlwdDp2b2lkKDApOyc7XG4gICAgICAgICAgICByWydkaXNhYmxlZCddID0gdHJ1ZTtcbiAgICAgICAgICAgIHIuY2xhc3NOYW1lID0gdGVtcGxhdGUuY2xhc3NOYW1lO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQociwgdGVtcGxhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0ZW1wbGF0ZS50YWdOYW1lID09PSAnUC1NVUxUSVNFTEVDVCcgfHxcbiAgICAgICAgICB0ZW1wbGF0ZS50YWdOYW1lID09PSAnUC1EUk9QRE9XTicgfHxcbiAgICAgICAgICB0ZW1wbGF0ZS50YWdOYW1lID09PSAnUC1DSEVDS0JPWCcgfHxcbiAgICAgICAgICB0ZW1wbGF0ZS50YWdOYW1lID09PSAnUC1UUkVFU0VMRUNUJyB8fFxuICAgICAgICAgIHRlbXBsYXRlLnRhZ05hbWUgPT09ICdQLVJBRElPQlVUVE9OJyB8fFxuICAgICAgICAgIHRlbXBsYXRlLnRhZ05hbWUgPT09ICdQLUNBTEVOREFSJ1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICByLmlubmVySFRNTCA9IHRlbXBsYXRlLmlubmVySFRNTDtcbiAgICAgICAgICAgIHIuY2xhc3NOYW1lID0gdGVtcGxhdGUuY2xhc3NOYW1lO1xuICAgICAgICAgICAgci5jbGFzc05hbWUgKz0gJyBwLWRpc2FibGVkJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHIsIHRlbXBsYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgICBjb25zdCBjaGlsZElucHV0Tm9kZXMgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIGEsIG5nLXNlbGVjdCwgZGl2LCBsYWJsZSdcbiAgICAgICAgICApO1xuICAgICAgICAgIGNoaWxkSW5wdXROb2Rlcy5mb3JFYWNoKChlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW0sICdkaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==