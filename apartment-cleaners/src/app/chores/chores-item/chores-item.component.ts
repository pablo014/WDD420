import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chores } from '../chores.model'
@Component({
  selector: 'app-chores-item',
  templateUrl: './chores-item.component.html',
  styleUrls: ['./chores-item.component.css']
})
export class ChoresItemComponent implements OnInit {

  @Input() chore: Chores;
  @Output() selectedChore = new EventEmitter<Chores>();
  @Input() index: string
  constructor() { }

  onSelected() {
    this.selectedChore.emit()
  }

  ngOnInit(): void {
  }

}
