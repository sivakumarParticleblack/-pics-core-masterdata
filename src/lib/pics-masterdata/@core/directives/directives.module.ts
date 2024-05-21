import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from './permission.directive';
import { ShowFieldDirective } from './show-field.directives';

@NgModule({
  declarations: [PermissionDirective, ShowFieldDirective],
  imports: [CommonModule],
  exports: [PermissionDirective, ShowFieldDirective]
})
export class DirectivesModule {}
