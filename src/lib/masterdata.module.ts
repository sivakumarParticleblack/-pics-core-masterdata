import { NgModule } from '@angular/core';
import { MasterdataComponent } from './masterdata.component';
import { PicsMasterdataModule } from './pics-masterdata/pics-masterdata.module';
import { ConfirmationService } from 'primeng/api';
import { PermissionStore } from './pics-masterdata/@core/permissions/permission.store';
import { AlertService } from './pics-masterdata/@core/service/alert.service';
import { DataStoreService } from './pics-masterdata/@core/service/data-store.service';
import { RbacService } from './pics-masterdata/@core/service/rbac.service';



@NgModule({
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
})
export class MasterdataModule { }
