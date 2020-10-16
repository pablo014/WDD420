import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model'
import { ContactService } from '../../contacts/contact.service'
@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const contact = this.contactService.getContact(this.message.id)
    this.messageSender = contact.name
  }

}
