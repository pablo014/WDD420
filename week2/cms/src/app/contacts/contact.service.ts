import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Contact} from './contact.model'
import {MOCKCONTACTS} from './MOCKCONTACTS'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>()
  maxContactId: number

  contacts: Contact[] = []
  constructor(private http: HttpClient ) { 
    // this.contacts = MOCKCONTACTS
    // this.maxContactId = this.getMaxId()
    this.http.get('https://wdd430-87992.firebaseio.com/contacts.json').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts
        this.maxContactId = this.getMaxId()
        this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
        this.contactChangedEvent.next(this.contacts.slice())
      }, (error)=>{
        console.log(error)
      }
    )
  }
  getContacts() {
    return this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0).slice()
  }
  getContact(id:string) {
    for(let contact of this.contacts) {
      if(contact.id == id) {
        return contact
      }
    }
    return null
  }
  deleteContact(contact: Contact) { 
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   this.storeContacts()
  }
  getMaxId(): number {
    var maxId = 0;
    let currentid: number
    for (let contact of this.contacts) {
      currentid =  parseInt(contact.id)
      if (currentid > maxId) {
        maxId = currentid
      }
    }
    return maxId
  }
  addContact(newContact: Contact) {
    if(!newContact) {
      return
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString()
    this.contacts.push(newContact)
    this.storeContacts()
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || ! newContact) {
      return
    }
    var pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return
    }
    newContact.id = originalContact.id
    this.contacts[pos] = newContact
    this.storeContacts()
  }
  storeContacts() {
    let contactsJson = JSON.stringify(this.contacts)
    this.http.put('https://wdd430-87992.firebaseio.com/contacts.json', contactsJson, {
      headers: new HttpHeaders({"Content-Type": "applications/json"}),
    }).subscribe(()=>{this.contactChangedEvent.next(this.contacts.slice())})
  }
}
