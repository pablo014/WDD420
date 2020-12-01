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
    this.http.get('http://localhost:3000/contacts').subscribe(
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
  deleteContact(document: Contact) {

    if (!document) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + document.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.storeContacts();
        }
      );
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
  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Document is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.contact);
          this.storeContacts();
        }
      );
  }
  updateContact(originalDocument: Contact, newDocument: Contact) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newDocument;
          this.storeContacts();
        }
      );
  }
  storeContacts() {
    let contactsJson = JSON.stringify(this.contacts)
    this.http.put('http://localhost:3000/contacts', contactsJson, {
      headers: new HttpHeaders({"Content-Type": "applications/json"}),
    }).subscribe(()=>{this.contactChangedEvent.next(this.contacts.slice())})
  }
}
