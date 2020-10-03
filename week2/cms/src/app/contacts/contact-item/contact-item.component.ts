import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model'

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() selectedContact = new EventEmitter<Contact>();
  constructor() { }

  onSelected() {
    this.selectedContact.emit()
  }

  ngOnInit(): void {
  }

}