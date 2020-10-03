import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selectedView = new EventEmitter<string>();

  constructor() { }

  onSelect(type:string) {
    this.selectedView.emit(type)
  }

  ngOnInit(): void {
  }

}
