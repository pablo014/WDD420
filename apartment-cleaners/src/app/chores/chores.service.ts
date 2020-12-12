import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Chores} from './chores.model'

@Injectable({
  providedIn: 'root'
})
export class ChoresService {


  choresSelectedEvent = new EventEmitter<Chores>();
  choresChangedEvent = new Subject<Chores[]>()


  chores: Chores[] = []
  constructor(private http: HttpClient ) { 
  }
  getChores() {
    this.http.get<{message: string, chores: Chores[]}>('http://localhost:3000/chores').subscribe(
      (choresData) => {
        this.chores = choresData.chores
        this.chores.sort((a, b) => a.jobNum > b.jobNum ? 1 : b.jobNum > a.jobNum ? -1 : 0)
        this.choresChangedEvent.next(this.chores.slice())
      }, (error)=>{
        console.log(error)
      }
    )
  }
  getChore(id:string) {
    for(let chore of this.chores) {
      if(chore.id == id) {
        return chore
      }
    }
    return null
  }
  deleteChore(chore: Chores) {

    if (!chore) {
      return;
    }

    const pos = this.chores.findIndex(c => c.id === chore.id);

    if (pos < 0) {
      return;
    }

    console.log(chore.id)
    // delete from database
    this.http.delete('http://localhost:3000/chores/' + chore.id)
      .subscribe(
        (response: Response) => {
          this.chores.splice(pos, 1);
          this.storeChores();
        }
      );
  }
  getMaxId(): number {
    var maxId = 0;
    let currentid: number
    for (let chore of this.chores) {
      currentid =  parseInt(chore.id)
      if (currentid > maxId) {
        maxId = currentid
      }
    }
    return maxId
  }
  addChore(chore: Chores) {
    if (!chore) {
      return;
    }

    // make sure id of the new Chore is empty
    chore.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, chore: Chores }>('http://localhost:3000/chores',
      chore,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new chore to chores
          this.chores.push(responseData.chore);
          this.storeChores();
        }
      );
  }
  updateChore(originalChore: Chores, newChore: Chores) {
    if (!originalChore || !newChore) {
      return;
    }

    const pos = this.chores.findIndex(d => d.id === originalChore.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Chore to the id of the old Chore
    newChore.id = originalChore.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/chores/' + originalChore.id,
      newChore, { headers: headers })
      .subscribe(
        (response: Response) => {
          console.log('inside put')
          this.chores[pos] = newChore;
          this.storeChores();
        }
      );
  }
  storeChores() {
    let choresJson = JSON.stringify(this.chores)
    // this.http.put('http://localhost:3000/chores', choresJson, {
    //   headers: new HttpHeaders({"Content-Type": "applications/json"}),
    // }).subscribe(()=>{this.choresChangedEvent.next(this.chores.slice())})
    this.getChores()
  }
}
