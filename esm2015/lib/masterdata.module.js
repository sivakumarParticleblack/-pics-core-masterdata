import { NgModule } from '@angular/core';
import { MasterdataComponent } from './masterdata.component';
import { PicsMasterdataModule } from './pics-masterdata/pics-masterdata.module';
import { ConfirmationService } from 'primeng/api';
import { PermissionStore } from './pics-masterdata/@core/permissions/permission.store';
import { AlertService } from './pics-masterdata/@core/service/alert.service';
import { DataStoreService } from './pics-masterdata/@core/service/data-store.service';
import { RbacService } from './pics-masterdata/@core/service/rbac.service';
import * as i0 from "@angular/core";
export class MasterdataModule {
}
MasterdataModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MasterdataModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataModule, declarations: [MasterdataComponent], imports: [PicsMasterdataModule], exports: [MasterdataComponent] });
MasterdataModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataModule, providers: [RbacService, AlertService, ConfirmationService, PermissionStore, DataStoreService], imports: [[
            PicsMasterdataModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MasterdataModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MasterdataComponent
                    ],
                    imports: [
                        PicsMasterdataModule
                    ],
                    exports: [
                        MasterdataComponent
                    ],
                    providers: [RbacService, AlertService, ConfirmationService, PermissionStore, DataStoreService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyZGF0YS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvbWFzdGVyZGF0YS9zcmMvbGliL21hc3RlcmRhdGEubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDdEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOztBQWdCM0UsTUFBTSxPQUFPLGdCQUFnQjs7OEdBQWhCLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLGlCQVZ6QixtQkFBbUIsYUFHbkIsb0JBQW9CLGFBR3BCLG1CQUFtQjsrR0FJVixnQkFBZ0IsYUFGaEIsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxZQU5yRjtZQUNQLG9CQUFvQjtTQUNyQjs0RkFNVSxnQkFBZ0I7a0JBWjVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7aUJBQy9GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hc3RlcmRhdGFDb21wb25lbnQgfSBmcm9tICcuL21hc3RlcmRhdGEuY29tcG9uZW50JztcbmltcG9ydCB7IFBpY3NNYXN0ZXJkYXRhTW9kdWxlIH0gZnJvbSAnLi9waWNzLW1hc3RlcmRhdGEvcGljcy1tYXN0ZXJkYXRhLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25TZXJ2aWNlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUGVybWlzc2lvblN0b3JlIH0gZnJvbSAnLi9waWNzLW1hc3RlcmRhdGEvQGNvcmUvcGVybWlzc2lvbnMvcGVybWlzc2lvbi5zdG9yZSc7XG5pbXBvcnQgeyBBbGVydFNlcnZpY2UgfSBmcm9tICcuL3BpY3MtbWFzdGVyZGF0YS9AY29yZS9zZXJ2aWNlL2FsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JlU2VydmljZSB9IGZyb20gJy4vcGljcy1tYXN0ZXJkYXRhL0Bjb3JlL3NlcnZpY2UvZGF0YS1zdG9yZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJiYWNTZXJ2aWNlIH0gZnJvbSAnLi9waWNzLW1hc3RlcmRhdGEvQGNvcmUvc2VydmljZS9yYmFjLnNlcnZpY2UnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWFzdGVyZGF0YUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgUGljc01hc3RlcmRhdGFNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hc3RlcmRhdGFDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbUmJhY1NlcnZpY2UsIEFsZXJ0U2VydmljZSwgQ29uZmlybWF0aW9uU2VydmljZSwgUGVybWlzc2lvblN0b3JlLCBEYXRhU3RvcmVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBNYXN0ZXJkYXRhTW9kdWxlIHsgfVxuIl19