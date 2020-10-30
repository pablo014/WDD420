import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model'
import {ContactService} from '../contact.service'
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit ,OnDestroy {
  contacts: Contact[] = [];
  subscribe: Subscription
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts()
    this.subscribe = this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts
    })
  }
  
  ngOnDestroy() {
    this.subscribe.unsubscribe
  }
}