import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionStore } from '../permissions/permission.store';

@Directive({
  selector: '[showField]'
})
export class ShowFieldDirective implements OnInit {
  @Input() showField!: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private dataStore: PermissionStore
  ) {}

  ngOnInit(): void {
    const permissions = this.dataStore.state;
    if (!permissions || !permissions[this.showField]) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
      const lookupIds = sessionStorage.getItem('LOOKUP_IDS');
      if (lookupIds) {
        const lookupIdArray = lookupIds.split(',');
        Object.entries(permissions)
          .filter(item => item[0].startsWith('GALKP_'))
          .forEach(([key, value]) => {
            for (const _value of <[]>value) {
              const _key = key.replace('GALKP_', '');
              if (
                _key === this.showField &&
                lookupIdArray.includes(String(_value['lookupid'])) &&
                _value['action'] === 'H'
              ) {
                this.viewContainer.clear();
              }
            }
          });
      }
    }
  }
}
