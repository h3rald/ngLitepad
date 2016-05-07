import { Directive, ElementRef } from 'angular2/core';

@Directive({
  selector: '[focused]'
})
export class Focused {
    constructor(private elementRef: ElementRef) {}
    
    ngAfterContentInit() {
        this.elementRef.nativeElement.focus();
    }
}