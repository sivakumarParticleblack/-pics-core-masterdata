import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../permissions/permission.store";
export class ShowFieldDirective {
    constructor(templateRef, viewContainer, dataStore) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.dataStore = dataStore;
    }
    ngOnInit() {
        const permissions = this.dataStore.state;
        if (!permissions || !permissions[this.showField]) {
            this.viewContainer.clear();
        }
        else {
            this.viewContainer.createEmbeddedView(this.templateRef);
            const lookupIds = sessionStorage.getItem('LOOKUP_IDS');
            if (lookupIds) {
                const lookupIdArray = lookupIds.split(',');
                Object.entries(permissions)
                    .filter(item => item[0].startsWith('GALKP_'))
                    .forEach(([key, value]) => {
                    for (const _value of value) {
                        const _key = key.replace('GALKP_', '');
                        if (_key === this.showField &&
                            lookupIdArray.includes(String(_value['lookupid'])) &&
                            _value['action'] === 'H') {
                            this.viewContainer.clear();
                        }
                    }
                });
            }
        }
    }
}
ShowFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ShowFieldDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i1.PermissionStore }], target: i0.ɵɵFactoryTarget.Directive });
ShowFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: ShowFieldDirective, selector: "[showField]", inputs: { showField: "showField" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ShowFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[showField]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.PermissionStore }]; }, propDecorators: { showField: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1maWVsZC5kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL21hc3RlcmRhdGEvc3JjL2xpYi9waWNzLW1hc3RlcmRhdGEvQGNvcmUvZGlyZWN0aXZlcy9zaG93LWZpZWxkLmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXlDLE1BQU0sZUFBZSxDQUFDOzs7QUFNeEYsTUFBTSxPQUFPLGtCQUFrQjtJQUc3QixZQUNVLFdBQTZCLEVBQzdCLGFBQStCLEVBQy9CLFNBQTBCO1FBRjFCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsY0FBUyxHQUFULFNBQVMsQ0FBaUI7SUFDakMsQ0FBQztJQUVKLFFBQVE7UUFDTixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4RCxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZELElBQUksU0FBUyxFQUFFO2dCQUNiLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO3FCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUM1QyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO29CQUN4QixLQUFLLE1BQU0sTUFBTSxJQUFRLEtBQUssRUFBRTt3QkFDOUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQ3ZDLElBQ0UsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTOzRCQUN2QixhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs0QkFDbEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFDeEI7NEJBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt5QkFDNUI7cUJBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNGO0lBQ0gsQ0FBQzs7Z0hBbENVLGtCQUFrQjtvR0FBbEIsa0JBQWtCOzRGQUFsQixrQkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCOytKQUVVLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uU3RvcmUgfSBmcm9tICcuLi9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLnN0b3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3Nob3dGaWVsZF0nXG59KVxuZXhwb3J0IGNsYXNzIFNob3dGaWVsZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNob3dGaWVsZCE6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGRhdGFTdG9yZTogUGVybWlzc2lvblN0b3JlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHRoaXMuZGF0YVN0b3JlLnN0YXRlO1xuICAgIGlmICghcGVybWlzc2lvbnMgfHwgIXBlcm1pc3Npb25zW3RoaXMuc2hvd0ZpZWxkXSkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgICBjb25zdCBsb29rdXBJZHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdMT09LVVBfSURTJyk7XG4gICAgICBpZiAobG9va3VwSWRzKSB7XG4gICAgICAgIGNvbnN0IGxvb2t1cElkQXJyYXkgPSBsb29rdXBJZHMuc3BsaXQoJywnKTtcbiAgICAgICAgT2JqZWN0LmVudHJpZXMocGVybWlzc2lvbnMpXG4gICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW1bMF0uc3RhcnRzV2l0aCgnR0FMS1BfJykpXG4gICAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBfdmFsdWUgb2YgPFtdPnZhbHVlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IF9rZXkgPSBrZXkucmVwbGFjZSgnR0FMS1BfJywgJycpO1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgX2tleSA9PT0gdGhpcy5zaG93RmllbGQgJiZcbiAgICAgICAgICAgICAgICBsb29rdXBJZEFycmF5LmluY2x1ZGVzKFN0cmluZyhfdmFsdWVbJ2xvb2t1cGlkJ10pKSAmJlxuICAgICAgICAgICAgICAgIF92YWx1ZVsnYWN0aW9uJ10gPT09ICdIJ1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19