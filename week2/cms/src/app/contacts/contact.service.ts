import { EventEmitter, Injectable } from '@angular/core';
import {Contact} from './contact.model'
import {MOCKCONTACTS} from './MOCKCONTACTS'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>()

  contacts: Contact[] = []
  constructor() { 
    this.contacts = MOCKCONTACTS
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
   this.contactChangedEvent.emit(this.contacts.slice());
  }
}
