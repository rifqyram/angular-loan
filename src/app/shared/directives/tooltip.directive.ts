import {Directive, ElementRef, HostListener, Input, OnDestroy} from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy{

  @Input() tooltip = '';
  @Input() delay? = 190;
  @Input() backgroundColor = 'grey';
  @Input() color = 'white';

  private myPopup: any;
  private timer: any;

  constructor(private el: ElementRef) { }

  ngOnDestroy(): void {
    if (this.myPopup) { this.myPopup.remove() }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      this.createTooltipPopup();
    }, this.delay)
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) { this.myPopup.remove() }
    this.el.nativeElement.style.position = 'none'
  }

  private createTooltipPopup() {
    let popup = document.createElement('div');
    popup.innerHTML = this.tooltip;
    popup.setAttribute("class", "tooltip-container");
    popup.style.backgroundColor = this.backgroundColor;
    popup.style.color = this.color;
    this.el.nativeElement.style.position = 'relative'
    this.el.nativeElement.appendChild(popup);
    this.myPopup = popup;
  }
}
