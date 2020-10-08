import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor: string = 'transparent'
  @Input('appBetterHighlight') highlightColor: string = 'blue'
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;
  
  constructor(private elRef: ElementRef, private renderer: Renderer2) { 

  }

  ngOnInit() {
    this.backgroundColor = this.defaultColor
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  }

  @HostListener('mouseenter') mouseover() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
    this.backgroundColor = this.highlightColor
  }

  @HostListener('mouseleave') mouseleave() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent');
    this.backgroundColor = this.defaultColor
  }
}
