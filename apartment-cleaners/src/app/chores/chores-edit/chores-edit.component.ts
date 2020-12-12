import { Component, OnInit } from '@angular/core';
import {Chores} from '../chores.model'
import {ChoresService} from '../chores.service'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-chores-edit',
  templateUrl: './chores-edit.component.html',
  styleUrls: ['./chores-edit.component.css']
})
export class ChoresEditComponent implements OnInit {

  chore: Chores
  // groupChores: Chores[] = []
  originalChore: Chores
  editMode: boolean = false
  id: string
  constructor(private choresService: ChoresService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id
      if(this.id == null || this.id == undefined) {
        this.editMode = false
        return
      }
      this.originalChore = this.choresService.getChore(this.id)
      if (this.originalChore == undefined || this.originalChore == null) {
        return
      }
      this.editMode = true
      this.chore = JSON.parse(JSON.stringify(this.originalChore))
    })
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
  onRemoveItem(index: number){
    
  }

  test(valid){
    console.log(valid)
  }
  onSubmit(form:NgForm){
    let value = form.value
    let newChore = new Chores(this.id, value['name'], value['detail'], value['equipment'], value['jobNum'])
    if (this.editMode){
      this.choresService.updateChore(this.originalChore, newChore)
    }
    else {
      this.choresService.addChore(newChore)
    }
    this.onCancel()
  }


}
