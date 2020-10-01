import { Component, 
  OnInit, 
  Input, 
  ViewEncapsulation, 
  OnChanges, 
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked, 
  AfterViewInit, 
  AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements 
OnInit,
OnChanges,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {
  @Input('srvElement') element: {type:string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef;
  constructor() { 
    console.log('constructor called!')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!')
  }

  ngOnInit(): void {
    console.log('ngoninit callerd')
    console.log('Text Content' + this.header.nativeElement.textContent)
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent)
  }

  ngDoCheck() {
    console.log('ngdocheck called!')
  }

  ngAfterContentInit() {
    console.log('ngaftercontentinit called!')
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent)
  }

  ngAfterContentChecked() {
    console.log('ngaftercontentchecked called!')
  }

  ngAfterViewChecked() {
    console.log('ngafterviewchecked called!')
  }

  ngAfterViewInit() {
    console.log('ngafterviewinit called!')
    console.log('Text Content' + this.header.nativeElement.textContent)
  }

  ngOnDestroy() {
    console.log('ngondestroycalled')
  }
}
