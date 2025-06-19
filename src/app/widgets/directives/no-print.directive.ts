import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoPrint]',
})
export class NoPrintDirective {
  private readonly _el = inject(ElementRef);
  private _renderer = inject(Renderer2);

  constructor() {
    this._renderer.addClass(this._el.nativeElement, 'no-print');
  }
}
