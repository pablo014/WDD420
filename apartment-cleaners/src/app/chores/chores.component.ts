import { Component, OnInit } from '@angular/core';
import {Chores} from './chores.model'
import {ChoresService} from './chores.service'

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.css']
})
export class ChoresComponent implements OnInit {

  selectedContact: Chores;

  constructor(private contactService: ChoresService) { }

  ngOnInit(): void {   
    this.contactService.choresSelectedEvent
    .subscribe(
      (chore: Chores) => {
        console.log(chore)
      this.selectedContact = chore
    })
  }

}
