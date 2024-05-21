import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { PermissionStore } from '../permissions/permission.store';



@Directive({
  selector: '[fieldKey]'
})
export class PermissionDirective implements AfterViewInit {
  @Input() fieldKey!: string;
  permissions: any;
  constructor(
    private readonly renderer: Renderer2,
    private elementRef: ElementRef,
    private dataStore: PermissionStore
  ) {
  }
  ngAfterViewInit() {
    const permissions =  this.dataStore.state;
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
        } else if (
          template.tagName === 'P-MULTISELECT' ||
          template.tagName === 'P-DROPDOWN' ||
          template.tagName === 'P-CHECKBOX' ||
          template.tagName === 'P-TREESELECT' ||
          template.tagName === 'P-RADIOBUTTON' ||
          template.tagName === 'P-CALENDAR'
        ) {
          if (template) {
            const r = document.createElement(this.elementRef.nativeElement.tagName.toLowerCase());
            r.innerHTML = template.innerHTML;
            r.className = template.className;
            r.className += ' p-disabled';
            this.elementRef.nativeElement.parentNode.replaceChild(r, template);
          }
        } else {
          this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', 'true');
          const childInputNodes = this.elementRef.nativeElement.querySelectorAll(
            'input, select, textarea, button, a, ng-select, div, lable'
          );
          childInputNodes.forEach((elem: any) => {
            this.renderer.setAttribute(elem, 'disabled', 'true');
          });
        }
      }
    }
  }
}
