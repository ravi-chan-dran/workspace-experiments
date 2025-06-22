import { Directive, ElementRef, HostBinding, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]'
})
export class RevealDirective implements OnDestroy {
  private observer: IntersectionObserver;
  @HostBinding('class.revealed') revealed = false;

  constructor(private el: ElementRef) {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.revealed = true;
        this.observer.disconnect();
      }
    });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
