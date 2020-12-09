import { Component, OnDestroy, OnInit } from '@angular/core';
import {ChoresService} from '../chores.service'
import {Chores} from '../chores.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chores-list',
  templateUrl: './chores-list.component.html',
  styleUrls: ['./chores-list.component.css']
})
export class ChoresListComponent implements OnInit, OnDestroy {

  chores: Chores[] = [];
  subscribe: Subscription
  term = '';
  
  constructor(private choresService: ChoresService) { }

  ngOnInit(): void {
    this.choresService.getChores()
    this.subscribe = this.choresService.choresChangedEvent.subscribe((chores: Chores[]) => {
      this.chores = chores
    })
  }
  
  ngOnDestroy() {
    this.subscribe.unsubscribe
  }

}
