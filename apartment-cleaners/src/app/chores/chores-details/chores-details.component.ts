import { Component, OnInit } from '@angular/core';
import {Chores} from '../chores.model'
import {ChoresService} from '../chores.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-chores-details',
  templateUrl: './chores-details.component.html',
  styleUrls: ['./chores-details.component.css']
})
export class ChoresDetailsComponent implements OnInit {

  chore: Chores;
  id:string

  constructor(private choresService: ChoresService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.chore = this.choresService.getChore(this.id)
      })
  }
  deleteChore() {
    this.choresService.deleteChore(this.chore)
    this.router.navigate(['/chores'], {relativeTo: this.route})
  }


}
