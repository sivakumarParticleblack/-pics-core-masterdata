import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';
import { DirectivesModule } from './@core/directives/directives.module';
import { AlertModule } from './@shared/alert/alert.module';
import { MasterdataComponent } from './masterdata/masterdata.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DxTreeListModule, DxSortableModule, DxTemplateModule, DxTabPanelModule   } from 'devextreme-angular';
import { MatTooltipModule } from '@angular/material/tooltip';

//import { DxTextBoxModule } from "devextreme-angular";


@NgModule({
  declarations: [
    MasterdataComponent
  ],
  bootstrap: [MasterdataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TabMenuModule,
    TabViewModule,
    TreeSelectModule,
    HttpClientModule,
    CheckboxModule,
    DropdownModule,
    CardModule,
    ConfirmDialogModule,
    AccordionModule,
    MessageModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    EditorModule,
    FieldsetModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    InputMaskModule,
    StepsModule,
    ToastModule,
    RippleModule,
    AvatarModule,
    BadgeModule,
    MultiSelectModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    SpeedDialModule,
    OrderListModule,
    FileUploadModule,
    DialogModule,
    PasswordModule,
    KnobModule,
    SidebarModule,
    ContextMenuModule,
    ConfirmPopupModule,
    DirectivesModule,
    AlertModule,
    DragDropModule,
    DxTreeListModule,
    //DxTextBoxModule,
    DxSortableModule,
    DxTemplateModule,
    MatTooltipModule,
    DxTabPanelModule  
  ],
  exports: [
    MasterdataComponent
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class PicsMasterdataModule { }
