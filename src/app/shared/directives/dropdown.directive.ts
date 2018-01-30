import { Directive
,HostListener
,HostBinding
 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  private wasInside = false;

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') 
  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.wasInside = true;
  }

  @HostListener('document:click') 
  closeDropdown() {
    if (!this.wasInside) {
      this.isOpen = false;
    }
    this.wasInside = false;
  }

  constructor() { }

}
